
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
  const isDrawing = useRef(false);

  // Initialize and resize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const initializeCanvas = () => {
      console.log('Initializing canvas...');
      
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
      
      // Reset any transforms before applying new ones
      context.resetTransform();
      
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
        
        console.log('Resizing canvas to match container size');
        initializeCanvas();
      }
    };

    // Set up resize observer
    const ro = new ResizeObserver(() => {
      console.log('ResizeObserver triggered');
      resizeCanvas();
    });
    
    ro.observe(canvas.parentElement || canvas);
    
    // Backup with window resize event
    const handleResize = () => {
      console.log('Window resize event');
      resizeCanvas();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [canvasRef, contextRef]);

  // Handle pointer events
  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (isPaused) {
        console.log('Pointer down ignored - paused');
        return;
      }
      
      // If no tool is selected or tool is 'none', ignore
      if (activeTool === 'none') {
        console.log('Pointer down ignored - no active tool');
        return;
      }
      
      const canvas = canvasRef.current;
      if (!canvas) {
        console.error('Canvas ref is null in handlePointerDown');
        return;
      }
      
      const rect = canvas.getBoundingClientRect();
      console.log('PointerDown with tool:', activeTool, 'at position:', e.clientX - rect.left, e.clientY - rect.top);
      
      // Set drawing flag
      isDrawing.current = true;
      
      // Ensure we're passing the correct tool type
      const toolType = activeTool === 'text' ? 'pen' : activeTool;
      
      // Ensure context is available
      if (contextRef.current) {
        startStroke(
          (e.clientX - rect.left),
          (e.clientY - rect.top),
          toolType as 'pen' | 'highlighter' | 'eraser',
          toolColor,
          toolSize
        );
      } else {
        console.error('No canvas context available');
      }
      
      // Prevent default to stop text selection
      e.preventDefault();
      
      // Capture the pointer to ensure we get all events
      canvas.setPointerCapture(e.pointerId);
    },
    [activeTool, isPaused, startStroke, toolColor, toolSize, canvasRef, contextRef]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (isPaused || !isDrawing.current) {
        return;
      }
      
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
    if (isPaused) return;
    
    if (isDrawing.current) {
      console.log('Pointer up - ending stroke');
      endStroke();
      isDrawing.current = false;
      
      // Release pointer capture
      const canvas = canvasRef.current;
      if (canvas) {
        try {
          canvas.releasePointerCapture(e.pointerId);
        } catch (err) {
          console.error('Error releasing pointer capture:', err);
        }
      }
    }
    
    // Prevent default
    e.preventDefault();
  }, [endStroke, isPaused, canvasRef]);

  // Create a native event handler for pointercancel
  const handleNativePointerCancel = useCallback((e: PointerEvent) => {
    if (!isPaused && isDrawing.current) {
      console.log('Pointer cancel - ending stroke');
      endStroke();
      isDrawing.current = false;
    }
    // Prevent default
    e.preventDefault();
  }, [endStroke, isPaused]);

  // Cancel aborts
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Use native event handler for DOM addEventListener
    canvas.addEventListener('pointercancel', handleNativePointerCancel);
    return () => {
      canvas.removeEventListener('pointercancel', handleNativePointerCancel);
    };
  }, [handleNativePointerCancel, canvasRef]);

  return { handlePointerDown, handlePointerMove, handlePointerUp };
};
