// src/hooks/whiteboard/useStrokeOperations.ts
import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Stroke } from '@/types/whiteboard';

export function useStrokeOperations(userId: string, currentPage: number) {
  const [currentStroke, setCurrentStroke] = useState<Stroke | null>(null);

  const startStroke = useCallback((x: number, y: number, tool: string, color: string, size: number) => {
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
    if (currentStroke) {
      // Hand off to storage / sync
      // e.g. storage.addStroke(currentStroke)
      setCurrentStroke(null);
    }
  }, [currentStroke]);

  return { currentStroke, startStroke, addPoint, endStroke };
}
