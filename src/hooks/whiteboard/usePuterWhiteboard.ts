
import { useState } from 'react';
import { usePuter } from '@/contexts/PuterContext';
import { serializeWhiteboardState } from '@/utils/whiteboard-utils';
import { useWhiteboardUser } from './useWhiteboardUser';
import { useStrokeOperations } from './useStrokeOperations';
import { useWhiteboardStorage } from './useWhiteboardStorage';
import { WhiteboardHookProps, WhiteboardHookResult } from './types';
import { Stroke } from '@/types/whiteboard';

// Use explicit "export type" for re-exporting types
export type { Stroke } from '@/types/whiteboard';

export const usePuterWhiteboard = ({ initialPage = 1 }: WhiteboardHookProps = {}): WhiteboardHookResult => {
  const { isLoaded, isDbAvailable } = usePuter();
  const [currentPage, setCurrentPage] = useState(initialPage);
  const { userId } = useWhiteboardUser();
  const { strokes, saveStroke, clearBoard } = useWhiteboardStorage(currentPage);
  const { 
    currentStroke, 
    isDrawing, 
    setIsDrawing,
    setCurrentStroke,
    startStroke: initStroke,
    addPoint: addStrokePoint
  } = useStrokeOperations(userId, currentPage);

  const startStroke = (x: number, y: number, tool: 'pen' | 'highlighter' | 'eraser', color: string, size: number) => {
    initStroke(x, y, tool, color, size);
  };

  const addPoint = (x: number, y: number) => {
    addStrokePoint(x, y);
  };

  const endStroke = async () => {
    setIsDrawing(false);
    
    if (!currentStroke || currentStroke.points.length < 2) {
      setCurrentStroke(null);
      return;
    }
    
    // Save the finished stroke
    await saveStroke(currentStroke);
    setCurrentStroke(null);
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
    userId
  };
};
