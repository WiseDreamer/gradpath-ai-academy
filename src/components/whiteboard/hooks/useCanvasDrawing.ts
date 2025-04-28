
import { RefObject } from 'react';
import { CanvasRefType, ContextRefType, DrawingStateRefType, Tool, ThemeMode } from '../types';

interface UseCanvasDrawingProps {
  canvasRef: CanvasRefType;
  contextRef: ContextRefType;
  isDrawing: DrawingStateRefType;
  activeTool: Tool;
  penColor: string;
  highlighterColor: string;
  penSize: number;
  themeMode: ThemeMode;
}

export const useCanvasDrawing = ({
  canvasRef,
  contextRef,
  isDrawing,
  activeTool,
  penColor,
  highlighterColor,
  penSize,
  themeMode,
}: UseCanvasDrawingProps) => {
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !contextRef.current || activeTool === 'none') return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    contextRef.current.beginPath();
    contextRef.current.moveTo(x, y);
    isDrawing.current = true;
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current || !canvasRef.current || !contextRef.current || activeTool === 'none') return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();
  };

  const finishDrawing = () => {
    if (contextRef.current) {
      contextRef.current.closePath();
    }
    isDrawing.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !contextRef.current || activeTool === 'none') return;
    
    e.preventDefault();
    const touch = e.touches[0];
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    contextRef.current.beginPath();
    contextRef.current.moveTo(x, y);
    isDrawing.current = true;
    
    if (contextRef.current) {
      if (activeTool === 'pen') {
        contextRef.current.strokeStyle = penColor;
        contextRef.current.lineWidth = penSize;
        contextRef.current.globalAlpha = 1;
      } else if (activeTool === 'highlighter') {
        contextRef.current.strokeStyle = highlighterColor;
        contextRef.current.lineWidth = penSize * 3;
        contextRef.current.globalAlpha = 0.5;
      } else if (activeTool === 'eraser') {
        contextRef.current.strokeStyle = themeMode === 'light' ? '#FFFFFF' : '#2d2d2d';
        contextRef.current.lineWidth = penSize * 2;
        contextRef.current.globalAlpha = 1;
      }
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current || !canvasRef.current || !contextRef.current || activeTool === 'none') return;
    
    e.preventDefault();
    const touch = e.touches[0];
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();
  };

  const handleTouchEnd = () => {
    if (contextRef.current) {
      contextRef.current.closePath();
    }
    isDrawing.current = false;
  };

  return {
    startDrawing,
    draw,
    finishDrawing,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  };
};
