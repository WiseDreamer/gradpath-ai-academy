
import React, { useEffect, useRef } from 'react';
import { AnnotationTool } from '@/types/virtualClass';
import { usePuterWhiteboard } from '@/hooks/whiteboard';

interface UseCanvasSetupProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  contextRef: React.MutableRefObject<CanvasRenderingContext2D | null>;
  currentPage: number;
  isPaused: boolean;
  activeTool: AnnotationTool;
  toolColor: string;
  toolSize: number;
}

interface UseCanvasSetupResult {
  handlePointerDown: (e: React.PointerEvent<HTMLCanvasElement>) => void;
  handlePointerMove: (e: React.PointerEvent<HTMLCanvasElement>) => void;
  handlePointerUp: () => void;
}

export const useCanvasSetup = ({
  canvasRef,
  contextRef,
  currentPage,
  isPaused,
  activeTool,
  toolColor,
  toolSize
}: UseCanvasSetupProps): UseCanvasSetupResult => {
  const { startStroke, addPoint, endStroke } = usePuterWhiteboard({ initialPage: currentPage });

  // Initialize canvas
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    if (!context) return;
    
    // Set up the canvas dimensions
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (!container) return;
      
      const { width, height } = container.getBoundingClientRect();
      
      // Set canvas display size
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      
      // Set canvas resolution (accounting for high-DPI displays)
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, width * dpr);
      canvas.height = Math.max(1, height * dpr);
      
      // Scale the context for high-DPI display
      context.scale(dpr, dpr);
      
      // Draw background
      context.fillStyle = '#FFFFFF';
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Store context in the ref
      contextRef.current = context;
    };

    resizeCanvas();
    
    // Set up resize observer for more reliable resize detection
    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(canvas.parentElement || canvas);
    
    // Cleanup
    return () => {
      resizeObserver.disconnect();
    };
  }, [canvasRef, contextRef, currentPage]);

  // Handle pointer events
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (activeTool === 'none' || isPaused) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    startStroke(
      x, 
      y, 
      activeTool as 'pen' | 'highlighter' | 'eraser', 
      toolColor, 
      toolSize
    );
  };
  
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isPaused) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    addPoint(x, y);
  };
  
  const handlePointerUp = () => {
    if (isPaused) return;
    endStroke();
  };

  return {
    handlePointerDown,
    handlePointerMove,
    handlePointerUp
  };
};
