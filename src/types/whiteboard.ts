
// Types for whiteboard strokes
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
