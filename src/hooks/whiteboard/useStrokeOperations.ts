
// src/hooks/whiteboard/useStrokeOperations.ts
import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Stroke } from '@/types/whiteboard';

export function useStrokeOperations(userId: string, currentPage: number) {
  const [currentStroke, setCurrentStroke] = useState<Stroke | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  const startStroke = useCallback((x: number, y: number, tool: 'pen' | 'highlighter' | 'eraser', color: string, size: number) => {
    setIsDrawing(true);
    setCurrentStroke({
      id: uuidv4(),
      tool,
      color,
      size,
      points: [{ x, y }],
      userId,
      timestamp: Date.now(),
      page: currentPage
    });
  }, [userId, currentPage]);

  const addPoint = useCallback((x: number, y: number) => {
    setCurrentStroke(prev =>
      prev ? { ...prev, points: [...prev.points, { x, y }] } : prev
    );
  }, []);

  const endStroke = useCallback(() => {
    setIsDrawing(false);
  }, []);

  return { 
    currentStroke, 
    isDrawing, 
    setIsDrawing,
    setCurrentStroke,
    startStroke, 
    addPoint, 
    endStroke 
  };
}
