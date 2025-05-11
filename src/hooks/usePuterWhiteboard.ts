
import { useState, useEffect, useRef } from 'react';
import { usePuter } from '@/contexts/PuterContext';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';
import { Stroke, StrokePoint } from '@/types/whiteboard';
import { generateUserId, serializeWhiteboardState } from '@/utils/whiteboard-utils';
import { WhiteboardStorageService } from '@/services/whiteboard-storage';

export { Stroke, StrokePoint } from '@/types/whiteboard';

export const usePuterWhiteboard = (initialPage = 1) => {
  const { puter, isLoaded, isDbAvailable } = usePuter();
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentStroke, setCurrentStroke] = useState<Stroke | null>(null);
  const userId = useRef(generateUserId());
  const localStrokesRef = useRef<Stroke[]>([]);
  const { toast } = useToast();
  // Track if sync error toast was shown already
  const syncErrorShown = useRef(false);

  // Set up database connection when Puter is loaded
  useEffect(() => {
    if (!isLoaded || !puter) return;
    
    // Check for DB access
    if (!isDbAvailable) {
      console.log("Puter.js loaded but DB is not available. Using local storage only.");
      
      // If Puter.js is loaded but DB is not available, load strokes from local storage
      const loadedStrokes = WhiteboardStorageService.loadStrokesFromLocalStorage(currentPage);
      setStrokes(loadedStrokes);
      localStrokesRef.current = loadedStrokes;
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
      WhiteboardStorageService.loadStrokesFromPuter(currentPage, puter)
        .then((existingStrokes) => {
          if (existingStrokes) {
            setStrokes(existingStrokes);
          }
        });
      
      return () => {
        // Clean up subscription
        subscription?.unsubscribe?.();
      };
    } catch (error) {
      console.error("Failed to initialize Puter whiteboard:", error);
      
      // If DB initialization fails, load strokes from local storage
      const loadedStrokes = WhiteboardStorageService.loadStrokesFromLocalStorage(currentPage);
      setStrokes(loadedStrokes);
      
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
      const loadedStrokes = WhiteboardStorageService.loadStrokesFromLocalStorage(currentPage);
      setStrokes(loadedStrokes);
      return;
    }
    
    if (!isDbAvailable) {
      // If DB is not available, load strokes from local storage
      const loadedStrokes = WhiteboardStorageService.loadStrokesFromLocalStorage(currentPage);
      setStrokes(loadedStrokes);
      return;
    }
    
    // Try to load from Puter DB
    WhiteboardStorageService.loadStrokesFromPuter(currentPage, puter)
      .then((existingStrokes) => {
        if (existingStrokes) {
          setStrokes(existingStrokes);
        } else {
          // Fallback to local storage
          const loadedStrokes = WhiteboardStorageService.loadStrokesFromLocalStorage(currentPage);
          setStrokes(loadedStrokes);
        }
      });
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
    WhiteboardStorageService.saveStrokesToLocalStorage(updatedStrokes, currentPage);
    
    // Save to database if Puter is available and DB is accessible
    if (isLoaded && puter && isDbAvailable) {
      await WhiteboardStorageService.saveStrokeToPuter(
        currentStroke, 
        puter, 
        syncErrorShown, 
        toast
      );
    }
    
    setCurrentStroke(null);
  };

  const clearBoard = async () => {
    // Clear local state
    setStrokes([]);
    
    // Clear local storage
    WhiteboardStorageService.saveStrokesToLocalStorage([], currentPage);
    localStrokesRef.current = [];
    
    // Clear from database if Puter is available and DB is accessible
    if (isLoaded && puter && isDbAvailable) {
      const success = await WhiteboardStorageService.clearStrokesFromPuter(currentPage, puter);
      if (!success) {
        toast({
          title: "Local clear only",
          description: "The whiteboard was cleared locally only.",
          variant: "default"
        });
      }
    }
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
    serializeForAI: () => serializeWhiteboardState(strokes, currentPage),
    isLoaded,
    isDbAvailable,
    userId: userId.current
  };
};
