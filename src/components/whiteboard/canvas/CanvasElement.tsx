
import React, { useEffect } from 'react';
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
  // Add event listeners with passive: false to fix the preventDefault issue
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const touchStartHandler = (e: TouchEvent) => {
      e.preventDefault();
      if (handleTouchStart && e instanceof TouchEvent) {
        const syntheticEvent = e as unknown as React.TouchEvent<HTMLCanvasElement>;
        handleTouchStart(syntheticEvent);
      }
    };
    
    const touchMoveHandler = (e: TouchEvent) => {
      e.preventDefault();
      if (handleTouchMove && e instanceof TouchEvent) {
        const syntheticEvent = e as unknown as React.TouchEvent<HTMLCanvasElement>;
        handleTouchMove(syntheticEvent);
      }
    };
    
    const touchEndHandler = () => {
      if (handleTouchEnd) {
        handleTouchEnd();
      }
    };

    // Add event listeners with {passive: false}
    canvas.addEventListener('touchstart', touchStartHandler, { passive: false });
    canvas.addEventListener('touchmove', touchMoveHandler, { passive: false });
    canvas.addEventListener('touchend', touchEndHandler);

    return () => {
      canvas.removeEventListener('touchstart', touchStartHandler);
      canvas.removeEventListener('touchmove', touchMoveHandler);
      canvas.removeEventListener('touchend', touchEndHandler);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={finishDrawing}
      onMouseLeave={finishDrawing}
      className="w-full h-full absolute top-0 left-0 cursor-crosshair z-0"
      style={{ backgroundColor: themeMode === 'light' ? '#ffffff' : '#2d2d2d' }}
    />
  );
};
