
import { Stroke } from '@/types/whiteboard';

export interface WhiteboardHookProps {
  initialPage?: number;
}

export interface WhiteboardHookResult {
  strokes: Stroke[];
  currentStroke: Stroke | null;
  isDrawing: boolean;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  startStroke: (x: number, y: number, tool: 'pen' | 'highlighter' | 'eraser', color: string, size: number) => void;
  addPoint: (x: number, y: number) => void;
  endStroke: () => Promise<void>;
  clearBoard: () => Promise<void>;
  serializeForAI: () => string;
  isLoaded: boolean;
  isDbAvailable: boolean;
  userId: string;
}
