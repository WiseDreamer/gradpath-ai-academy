
import { v4 as uuidv4 } from 'uuid';

// Generate a mock user ID for demonstration
export const generateUserId = (): string => {
  return localStorage.getItem('whiteboard_user_id') || 
    (() => {
      const id = uuidv4();
      localStorage.setItem('whiteboard_user_id', id);
      return id;
    })();
};

export const serializeWhiteboardState = (strokes: any[], currentPage: number): string => {
  return JSON.stringify({
    strokes: strokes.map(stroke => ({
      tool: stroke.tool,
      color: stroke.color,
      points: stroke.points
    })),
    page: currentPage
  });
};
