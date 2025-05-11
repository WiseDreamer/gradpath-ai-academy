
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
  const { puter, isLoaded, isDbAvailable } = usePuter();
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentStroke, setCurrentStroke] = useState<Stroke | null>(null);
  const userId = useRef(generateUserId());
  const localStrokesRef = useRef<Stroke[]>([]);
  const { toast } = useToast();

  // Set up database connection when Puter is loaded
  useEffect(() => {
    if (!isLoaded || !puter) return;
    
    // Check for DB access
    if (!isDbAvailable) {
      console.log("Puter.js loaded but DB is not available. Using local storage only.");
      
      // If Puter.js is loaded but DB is not available, load strokes from local storage
      const savedStrokes = localStorage.getItem(`whiteboard_strokes_page_${currentPage}`);
      if (savedStrokes) {
        try {
          const parsedStrokes = JSON.parse(savedStrokes) as Stroke[];
          setStrokes(parsedStrokes);
          localStrokesRef.current = parsedStrokes;
        } catch (error) {
          console.error("Failed to parse saved strokes:", error);
        }
      }
      
      return;
    }
    
    try {
      if (!puter.db) {
        throw new Error("Puter DB is not available");
      }
      
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
      
      // If DB initialization fails, load strokes from local storage
      const savedStrokes = localStorage.getItem(`whiteboard_strokes_page_${currentPage}`);
      if (savedStrokes) {
        try {
          setStrokes(JSON.parse(savedStrokes));
        } catch (e) {
          console.error("Failed to parse saved strokes:", e);
        }
      }
      
      toast({
        title: "Using local whiteboard",
        description: "Your drawings will be saved locally only.",
        variant: "default"
      });
    }
  }, [isLoaded, puter, currentPage, toast, isDbAvailable]);

  // Handle page change
  useEffect(() => {
    if (!isLoaded || !puter) {
      // If Puter.js is not loaded, try to load strokes from local storage
      const savedStrokes = localStorage.getItem(`whiteboard_strokes_page_${currentPage}`);
      if (savedStrokes) {
        try {
          setStrokes(JSON.parse(savedStrokes));
        } catch (e) {
          console.error("Failed to parse saved strokes:", e);
        }
      } else {
        setStrokes([]);
      }
      return;
    }
    
    if (!isDbAvailable) {
      // If DB is not available, load strokes from local storage
      const savedStrokes = localStorage.getItem(`whiteboard_strokes_page_${currentPage}`);
      if (savedStrokes) {
        try {
          setStrokes(JSON.parse(savedStrokes));
        } catch (e) {
          console.error("Failed to parse saved strokes:", e);
        }
      } else {
        setStrokes([]);
      }
      return;
    }
    
    try {
      if (!puter.db) {
        throw new Error("Puter DB is not available");
      }
      
      const strokesTable = puter.db.table('whiteboard_strokes');
      strokesTable.where('page', '==', currentPage).get().then((existingStrokes: Stroke[]) => {
        setStrokes(existingStrokes || []);
      });
    } catch (error) {
      console.error("Failed to load page data:", error);
      
      // If loading fails, try to get data from local storage
      const savedStrokes = localStorage.getItem(`whiteboard_strokes_page_${currentPage}`);
      if (savedStrokes) {
        try {
          setStrokes(JSON.parse(savedStrokes));
        } catch (e) {
          console.error("Failed to parse saved strokes:", e);
        }
      } else {
        setStrokes([]);
      }
    }
  }, [currentPage, isLoaded, puter, isDbAvailable]);

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
    
    // Update local storage reference
    const updatedStrokes = [...localStrokesRef.current, currentStroke];
    localStrokesRef.current = updatedStrokes;
    localStorage.setItem(`whiteboard_strokes_page_${currentPage}`, JSON.stringify(updatedStrokes));
    
    // Save to database if Puter is available and DB is accessible
    if (isLoaded && puter && isDbAvailable && puter.db) {
      try {
        const strokesTable = puter.db.table('whiteboard_strokes');
        await strokesTable.insert(currentStroke);
      } catch (error) {
        console.error("Failed to save stroke to Puter DB:", error);
        
        // Already saved to localStorage above, so no additional fallback needed
        if (!toast.isActive('sync-error')) {
          toast({
            id: 'sync-error',
            title: "Local mode active",
            description: "Your drawings are saved locally only.",
            variant: "default"
          });
        }
      }
    }
    
    setCurrentStroke(null);
  };

  const clearBoard = async () => {
    // Clear local state
    setStrokes([]);
    
    // Clear local storage
    localStorage.setItem(`whiteboard_strokes_page_${currentPage}`, JSON.stringify([]));
    localStrokesRef.current = [];
    
    // Clear from database if Puter is available and DB is accessible
    if (isLoaded && puter && isDbAvailable && puter.db) {
      try {
        const strokesTable = puter.db.table('whiteboard_strokes');
        await strokesTable.where('page', '==', currentPage).delete();
      } catch (error) {
        console.error("Failed to clear board from Puter DB:", error);
        
        // Already cleared local state above
        toast({
          title: "Local clear only",
          description: "The whiteboard was cleared locally only.",
          variant: "default"
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
    isLoaded: isLoaded, // Keep this as is since components rely on it
    isDbAvailable, // Add this flag
    userId: userId.current
  };
};
