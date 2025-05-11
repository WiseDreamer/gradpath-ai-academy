
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Stroke } from '@/types/whiteboard';

export const useStrokeOperations = (
  userId: string, 
  currentPage: number
) => {
  const [currentStroke, setCurrentStroke] = useState<Stroke | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const startStroke = (x: number, y: number, tool: 'pen' | 'highlighter' | 'eraser', color: string, size: number) => {
    const newStroke: Stroke = {
      id: uuidv4(),
      tool,
      color,
      size,
      points: [{ x, y }],
      userId,
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

  return {
    currentStroke,
    isDrawing,
    setIsDrawing,
    setCurrentStroke,
    startStroke,
    addPoint
  };
};
