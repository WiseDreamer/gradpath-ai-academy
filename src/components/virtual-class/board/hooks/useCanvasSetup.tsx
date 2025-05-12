// src/components/virtual-class/board/hooks/useCanvasSetup.tsx
import { useEffect, useRef, useCallback } from 'react';
import { AnnotationTool } from '@/types/virtualClass';
import { usePuterWhiteboard } from '@/hooks/whiteboard';

export const useCanvasSetup = ({
  canvasRef,
  contextRef,
  currentPage,
  isPaused,
  activeTool,
  toolColor,
  toolSize,
}: {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  contextRef: React.MutableRefObject<CanvasRenderingContext2D | null>;
  currentPage: number;
  isPaused: boolean;
  activeTool: AnnotationTool;
  toolColor: string;
  toolSize: number;
}) => {
  const { startStroke, addPoint, endStroke } = usePuterWhiteboard({ initialPage: currentPage });
  const lastDpr = useRef(window.devicePixelRatio || 1);

  // Initialize and resize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const dpr = window.devicePixelRatio || 1;
      lastDpr.current = dpr;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      context.resetTransform();
      context.scale(dpr, dpr);
      context.fillStyle = '#FFFFFF';
      context.fillRect(0, 0, rect.width, rect.height);
      contextRef.current = context;
    };

    resizeCanvas();
    const ro = new ResizeObserver(resizeCanvas);
    ro.observe(canvas.parentElement!);
    return () => ro.disconnect();
  }, [canvasRef, contextRef, currentPage]);

  // Handle pointer events
  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (isPaused || activeTool === 'none') return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      startStroke(
        (e.clientX - rect.left),
        (e.clientY - rect.top),
        activeTool,
        toolColor,
        toolSize
      );
    },
    [activeTool, isPaused, startStroke, toolColor, toolSize]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (isPaused) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      addPoint(
        (e.clientX - rect.left),
        (e.clientY - rect.top)
      );
    },
    [addPoint, isPaused]
  );

  const handlePointerUp = useCallback(() => {
    if (!isPaused) endStroke();
  }, [endStroke, isPaused]);

  // Cancel aborts
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.addEventListener('pointercancel', handlePointerUp);
    return () => canvas.removeEventListener('pointercancel', handlePointerUp);
  }, [handlePointerUp]);

  return { handlePointerDown, handlePointerMove, handlePointerUp };
};
