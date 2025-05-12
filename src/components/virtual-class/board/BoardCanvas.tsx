
// src/components/virtual-class/board/BoardCanvas.tsx
import React, { useEffect, useRef } from 'react';
import { useCanvasSetup } from './hooks/useCanvasSetup';
import { PageContentRenderer } from './canvas/PageContentRenderer';
import { StrokeRenderer } from './canvas/StrokeRenderer';
import { usePuterWhiteboard } from '@/hooks/whiteboard';
import { AnnotationTool } from '@/types/virtualClass';

export const BoardCanvas: React.FC<{
  isPaused: boolean;
  currentPage: number;
  setCurrentPage: (n: number) => void;
  activeTool: AnnotationTool;
  toolColor: string;
  toolSize: number;
}> = ({ isPaused, currentPage, setCurrentPage, activeTool, toolColor, toolSize }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D|null>(null);

  const { handlePointerDown, handlePointerMove, handlePointerUp } = useCanvasSetup({
    canvasRef,
    contextRef,
    currentPage,
    isPaused,
    activeTool,
    toolColor,
    toolSize
  });

  const { strokes, currentStroke } = usePuterWhiteboard({ initialPage: currentPage });

  // Handle rendering of the canvas content
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Ensure the context is properly initialized
    if (!contextRef.current) {
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        console.error("Failed to get 2D context from canvas");
        return;
      }
      contextRef.current = ctx;
    }

    const ctx = contextRef.current;
    if (!ctx) {
      console.error("Canvas context is null, cannot render");
      return;
    }
    
    // Get normalized dimensions (without DPI scaling)
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.width / dpr;
    const height = canvas.height / dpr;

    // Clear the canvas first
    ctx.clearRect(0, 0, width, height);
    
    // Fill with white background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);
    
    // Render page content
    PageContentRenderer({
      context: ctx,
      currentPage,
      totalPages: 5, // Assuming 5 total pages from VirtualBoardContainer
      canvasWidth: width,
      canvasHeight: height
    });
    
    // Render strokes on top
    StrokeRenderer({
      context: ctx,
      strokes,
      currentStroke
    });
  }, [strokes, currentStroke, currentPage]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 ${activeTool !== 'none' ? 'cursor-crosshair' : ''} ${isPaused ? 'opacity-50' : ''}`}
      style={{ touchAction: 'none' }} // Prevent browser gestures from interfering
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    />
  );
};
