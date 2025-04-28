
import React from 'react';
import { Tool, ThemeMode, CanvasRefType } from '../types';

interface CanvasElementProps {
  canvasRef: CanvasRefType;
  themeMode: ThemeMode;
  startDrawing: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  draw: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  finishDrawing: () => void;
  handleTouchStart: (e: React.TouchEvent<HTMLCanvasElement>) => void;
  handleTouchMove: (e: React.TouchEvent<HTMLCanvasElement>) => void;
  handleTouchEnd: () => void;
}

export const CanvasElement: React.FC<CanvasElementProps> = ({
  canvasRef,
  themeMode,
  startDrawing,
  draw,
  finishDrawing,
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd
}) => {
  return (
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={finishDrawing}
      onMouseLeave={finishDrawing}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="w-full h-full absolute top-0 left-0 cursor-crosshair z-0"
      style={{ backgroundColor: themeMode === 'light' ? '#ffffff' : '#2d2d2d' }}
    />
  );
};
