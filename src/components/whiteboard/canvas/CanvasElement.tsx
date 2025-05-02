
import React, { useEffect } from 'react';
import { ThemeMode, CanvasRefType } from '../types';

interface CanvasElementProps {
  canvasRef: CanvasRefType;
  themeMode: ThemeMode;
  startDrawing: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  draw: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  finishDrawing: () => void;
}

export const CanvasElement: React.FC<CanvasElementProps> = ({
  canvasRef,
  themeMode,
  startDrawing,
  draw,
  finishDrawing
}) => {
  // Set background color based on theme
  const backgroundColor = themeMode === 'light' ? '#ffffff' : '#2d2d2d';
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      if (e.touches && e.touches[0]) {
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        const mouseEvent = new MouseEvent('mousedown', {
          clientX: touch.clientX,
          clientY: touch.clientY,
          bubbles: true
        });
        canvas.dispatchEvent(mouseEvent);
      }
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (e.touches && e.touches[0]) {
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        const mouseEvent = new MouseEvent('mousemove', {
          clientX: touch.clientX,
          clientY: touch.clientY,
          bubbles: true
        });
        canvas.dispatchEvent(mouseEvent);
      }
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault();
      const mouseEvent = new MouseEvent('mouseup', {
        bubbles: true
      });
      canvas.dispatchEvent(mouseEvent);
    };

    // Add event listeners with {passive: false}
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, [canvasRef]);

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={finishDrawing}
      onMouseLeave={finishDrawing}
      className="w-full h-full absolute top-0 left-0 cursor-crosshair z-0"
      style={{ backgroundColor }}
    />
  );
};
