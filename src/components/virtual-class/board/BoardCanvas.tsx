// src/components/virtual-class/board/BoardCanvas.tsx
import React, { useEffect, useRef } from 'react';
import { useCanvasSetup } from './hooks/useCanvasSetup';
import { PageContentRenderer } from './canvas/PageContentRenderer';
import { StrokeRenderer } from './canvas/StrokeRenderer';

export const BoardCanvas: React.FC<{
  isPaused: boolean;
  currentPage: number;
  setCurrentPage: (n: number) => void;
  activeTool: string;
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

  useEffect(() => {
    const ctx = contextRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;
    const rect = canvas.getBoundingClientRect();
    PageContentRenderer(ctx, currentPage, rect.width, rect.height);
    StrokeRenderer(ctx, strokes, currentStroke);
  }, [strokes, currentStroke, currentPage]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 ${activeTool!=='none'?'cursor-crosshair':''} ${isPaused?'opacity-50':''}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    />
  );
};
