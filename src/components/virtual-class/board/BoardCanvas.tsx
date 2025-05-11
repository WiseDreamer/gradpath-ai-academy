import React, { useRef, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { AnnotationTool } from '@/types/virtualClass';
import { usePuterWhiteboard } from '@/hooks/whiteboard';

// Import new components
import { PageContentRenderer } from './canvas/PageContentRenderer';
import { StrokeRenderer } from './canvas/StrokeRenderer';
import { PauseOverlay } from './overlays/PauseOverlay';
import { LoadingOverlay } from './overlays/LoadingOverlay';
import { LocalStorageIndicator } from './overlays/LocalStorageIndicator';
import { useCanvasSetup } from './hooks/useCanvasSetup';

interface BoardCanvasProps {
  isPaused: boolean;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  annotations: any[];
  setAnnotations: (annotations: any[]) => void;
  activeTool: AnnotationTool;
  toolColor: string;
  toolSize: number;
}

export const BoardCanvas: React.FC<BoardCanvasProps> = ({
  isPaused,
  currentPage,
  setCurrentPage,
  annotations,
  setAnnotations,
  activeTool,
  toolColor,
  toolSize
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [totalPages] = React.useState(5); // Mock total pages
  
  const {
    strokes,
    currentStroke,
    isLoaded,
    isDbAvailable
  } = usePuterWhiteboard(currentPage);

  // Use our new canvas setup hook
  const {
    handlePointerDown,
    handlePointerMove,
    handlePointerUp
  } = useCanvasSetup({
    canvasRef,
    contextRef,
    currentPage,
    isPaused,
    activeTool,
    toolColor,
    toolSize
  });

  // Draw all content when strokes or currentStroke change
  useEffect(() => {
    if (!contextRef.current || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const context = contextRef.current;
    const { width, height } = canvas.getBoundingClientRect();
    
    // Draw page content and strokes
    if (context) {
      // Render page content
      PageContentRenderer({
        context,
        currentPage,
        totalPages,
        canvasWidth: width,
        canvasHeight: height
      });
      
      // Render strokes
      StrokeRenderer({
        context,
        strokes,
        currentStroke
      });
    }
  }, [strokes, currentStroke, currentPage, totalPages]);

  // Update parent component's current page when it changes here
  useEffect(() => {
    setCurrentPage(currentPage);
  }, [currentPage, setCurrentPage]);

  return (
    <div className="flex-1 relative overflow-hidden touch-none">
      <canvas
        ref={canvasRef}
        className={cn(
          "absolute inset-0",
          activeTool !== 'none' ? "cursor-crosshair" : "cursor-default",
          isPaused && "opacity-50"
        )}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      />
      
      {/* Conditionally render overlays */}
      {isPaused && <PauseOverlay />}
      {!isLoaded && <LoadingOverlay />}
      {isLoaded && !isDbAvailable && <LocalStorageIndicator />}
    </div>
  );
};
