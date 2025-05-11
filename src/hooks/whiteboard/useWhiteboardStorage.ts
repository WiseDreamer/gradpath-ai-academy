
import { useState, useRef, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { WhiteboardStorageService } from '@/services/whiteboard-storage';
import { usePuter } from '@/contexts/PuterContext';
import { Stroke } from '@/types/whiteboard';

export const useWhiteboardStorage = (currentPage: number) => {
  const { puter, isLoaded, isDbAvailable } = usePuter();
  const [strokes, setStrokes] = useState<Stroke[]>([]);
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
        if (newStroke.userId !== localStorage.getItem('whiteboard_user_id')) {
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

  const saveStroke = async (stroke: Stroke): Promise<void> => {
    // Add stroke to local state
    setStrokes(prev => [...prev, stroke]);
    
    // Update local storage reference
    const updatedStrokes = [...localStrokesRef.current, stroke];
    localStrokesRef.current = updatedStrokes;
    WhiteboardStorageService.saveStrokesToLocalStorage(updatedStrokes, currentPage);
    
    // Save to database if Puter is available and DB is accessible
    if (isLoaded && puter && isDbAvailable) {
      await WhiteboardStorageService.saveStrokeToPuter(
        stroke, 
        puter, 
        syncErrorShown, 
        toast
      );
    }
  };

  const clearBoard = async (): Promise<void> => {
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
    saveStroke,
    clearBoard
  };
};
