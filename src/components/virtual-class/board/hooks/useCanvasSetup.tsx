
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
  const isInitialized = useRef(false);

  // Initialize and resize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const initializeCanvas = () => {
      const context = canvas.getContext('2d', { alpha: false });
      if (!context) {
        console.error('Failed to get canvas context');
        return;
      }
      
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) {
        console.error('Canvas parent element has no dimensions');
        return;
      }
      
      const dpr = window.devicePixelRatio || 1;
      lastDpr.current = dpr;
      
      // Set canvas dimensions
      canvas.width = Math.max(1, rect.width * dpr);
      canvas.height = Math.max(1, rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      
      // Scale context for high DPI display
      context.scale(dpr, dpr);
      
      // Set initial fill (this ensures we have a white background)
      context.fillStyle = '#FFFFFF';
      context.fillRect(0, 0, rect.width, rect.height);
      
      // Store the context
      contextRef.current = context;
      isInitialized.current = true;
      
      console.log('Canvas initialized with dimensions:', rect.width, 'x', rect.height);
    };

    // Initialize canvas if not already done
    if (!isInitialized.current) {
      initializeCanvas();
    }

    const resizeCanvas = () => {
      if (!canvas.parentElement) return;
      
      const rect = canvas.parentElement.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) {
        // Try again later when the component is fully rendered
        requestAnimationFrame(resizeCanvas);
        return;
      }
      
      const dpr = window.devicePixelRatio || 1;
      
      // Only resize if dimensions have changed
      if (canvas.width !== Math.max(1, rect.width * dpr) || 
          canvas.height !== Math.max(1, rect.height * dpr) ||
          dpr !== lastDpr.current) {
        
        initializeCanvas();
      }
    };

    // Set up resize observer
    const ro = new ResizeObserver(() => {
      resizeCanvas();
    });
    
    ro.observe(canvas.parentElement || canvas);
    
    // Backup with window resize event
    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [canvasRef, contextRef]);

  // Handle pointer events
  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (isPaused || activeTool === 'none') {
        console.log('Pointer down ignored - paused:', isPaused, 'activeTool:', activeTool);
        return;
      }
      
      const canvas = canvasRef.current;
      if (!canvas) {
        console.error('Canvas ref is null in handlePointerDown');
        return;
      }
      
      const rect = canvas.getBoundingClientRect();
      console.log('PointerDown with tool:', activeTool, 'at position:', e.clientX - rect.left, e.clientY - rect.top);
      
      // Ensure we're passing the correct tool type
      const toolType = activeTool === 'text' ? 'pen' : activeTool;
      
      startStroke(
        (e.clientX - rect.left),
        (e.clientY - rect.top),
        toolType as 'pen' | 'highlighter' | 'eraser',
        toolColor,
        toolSize
      );
      
      // Prevent default to stop text selection
      e.preventDefault();
    },
    [activeTool, isPaused, startStroke, toolColor, toolSize, canvasRef]
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
      
      // Prevent default to stop text selection
      e.preventDefault();
    },
    [addPoint, isPaused, canvasRef]
  );

  const handlePointerUp = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isPaused) {
      console.log('Pointer up - ending stroke');
      endStroke();
    }
    
    // Prevent default
    e.preventDefault();
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
