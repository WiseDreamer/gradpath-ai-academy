
import { useState, useEffect, useRef } from 'react';
import { usePuter } from '@/contexts/PuterContext';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';

// Types for strokes
export interface StrokePoint {
  x: number;
  y: number;
}

export interface Stroke {
  id: string;
  tool: 'pen' | 'highlighter' | 'eraser';
  color: string;
  size: number;
  points: StrokePoint[];
  userId: string;
  timestamp: number;
  page: number;
}

export interface WhiteboardState {
  strokes: Stroke[];
  currentPage: number;
}

// Generate a mock user ID for demonstration
const generateUserId = () => {
  return localStorage.getItem('whiteboard_user_id') || 
    (() => {
      const id = uuidv4();
      localStorage.setItem('whiteboard_user_id', id);
      return id;
    })();
};

export const usePuterWhiteboard = (initialPage = 1) => {
  const { puter, isLoaded } = usePuter();
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentStroke, setCurrentStroke] = useState<Stroke | null>(null);
  const userId = useRef(generateUserId());
  const { toast } = useToast();

  // Set up database connection when Puter is loaded
  useEffect(() => {
    if (!isLoaded || !puter) return;

    try {
      const strokesTable = puter.db.table('whiteboard_strokes');
      
      // Subscribe to new strokes
      const subscription = strokesTable.on('insert', (newStroke: Stroke) => {
        // Only add strokes from other users (our strokes are added locally)
        if (newStroke.userId !== userId.current) {
          setStrokes(prev => [...prev, newStroke]);
        }
      });
      
      // Load existing strokes
      strokesTable.where('page', '==', currentPage).get().then((existingStrokes: Stroke[]) => {
        setStrokes(existingStrokes || []);
      });
      
      return () => {
        // Clean up subscription
        subscription?.unsubscribe?.();
      };
    } catch (error) {
      console.error("Failed to initialize Puter whiteboard:", error);
      toast({
        title: "Connection issue",
        description: "Failed to connect to the collaborative whiteboard.",
        variant: "destructive"
      });
    }
  }, [isLoaded, puter, currentPage, toast]);

  // Handle page change
  useEffect(() => {
    if (!isLoaded || !puter) return;
    
    try {
      const strokesTable = puter.db.table('whiteboard_strokes');
      strokesTable.where('page', '==', currentPage).get().then((existingStrokes: Stroke[]) => {
        setStrokes(existingStrokes || []);
      });
    } catch (error) {
      console.error("Failed to load page data:", error);
    }
  }, [currentPage, isLoaded, puter]);

  const startStroke = (x: number, y: number, tool: 'pen' | 'highlighter' | 'eraser', color: string, size: number) => {
    const newStroke: Stroke = {
      id: uuidv4(),
      tool,
      color,
      size,
      points: [{ x, y }],
      userId: userId.current,
      timestamp: Date.now(),
      page: currentPage
    };
    
    setCurrentStroke(newStroke);
    setIsDrawing(true);
  };

  const addPoint = (x: number, y: number) => {
    if (!isDrawing || !currentStroke) return;
    
    setCurrentStroke(prev => {
      if (!prev) return null;
      return {
        ...prev,
        points: [...prev.points, { x, y }]
      };
    });
  };

  const endStroke = async () => {
    setIsDrawing(false);
    
    if (!currentStroke || currentStroke.points.length < 2) {
      setCurrentStroke(null);
      return;
    }
    
    // Add stroke to local state
    setStrokes(prev => [...prev, currentStroke]);
    
    // Save to database if Puter is available
    if (isLoaded && puter) {
      try {
        const strokesTable = puter.db.table('whiteboard_strokes');
        await strokesTable.insert(currentStroke);
      } catch (error) {
        console.error("Failed to save stroke:", error);
        toast({
          title: "Sync error",
          description: "Failed to sync your drawing with others.",
          variant: "destructive"
        });
      }
    }
    
    setCurrentStroke(null);
  };

  const clearBoard = async () => {
    // Clear local state
    setStrokes([]);
    
    // Clear from database if Puter is available
    if (isLoaded && puter) {
      try {
        const strokesTable = puter.db.table('whiteboard_strokes');
        await strokesTable.where('page', '==', currentPage).delete();
      } catch (error) {
        console.error("Failed to clear board:", error);
        toast({
          title: "Clear error",
          description: "Failed to clear the whiteboard.",
          variant: "destructive"
        });
      }
    }
  };

  const serializeForAI = () => {
    return JSON.stringify({
      strokes: strokes.map(stroke => ({
        tool: stroke.tool,
        color: stroke.color,
        points: stroke.points
      })),
      page: currentPage
    });
  };

  return {
    strokes,
    currentStroke,
    isDrawing,
    currentPage,
    setCurrentPage,
    startStroke,
    addPoint,
    endStroke,
    clearBoard,
    serializeForAI,
    isLoaded: isLoaded && !!puter,
    userId: userId.current
  };
};
