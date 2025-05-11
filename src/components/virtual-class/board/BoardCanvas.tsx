
import React, { useRef, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { AnnotationTool } from '@/types/virtualClass';
import { usePuterWhiteboard } from '@/hooks/usePuterWhiteboard';

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
  const { toast } = useToast();

  const {
    strokes,
    currentStroke,
    isDrawing,
    startStroke,
    addPoint,
    endStroke,
    clearBoard,
    isLoaded
  } = usePuterWhiteboard(currentPage);

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
      
      // Draw mock content for this page
      drawPageContent(context, currentPage);
    };

    resizeCanvas();
    
    // Set up resize observer for more reliable resize detection
    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(canvas.parentElement || canvas);
    
    // Cleanup
    return () => {
      resizeObserver.disconnect();
    };
  }, [canvasRef, currentPage]);

  // Draw all strokes when they change
  useEffect(() => {
    if (!contextRef.current || !canvasRef.current) return;
    
    // Clear the canvas
    const canvas = canvasRef.current;
    const context = contextRef.current;
    context.fillStyle = '#FFFFFF';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw page content
    drawPageContent(context, currentPage);
    
    // Draw all strokes
    strokes.forEach(stroke => {
      if (stroke.points.length < 2) return;
      
      context.beginPath();
      context.moveTo(stroke.points[0].x, stroke.points[0].y);
      
      // Set drawing style based on tool
      if (stroke.tool === 'pen') {
        context.strokeStyle = stroke.color;
        context.lineWidth = stroke.size;
        context.globalAlpha = 1;
      } else if (stroke.tool === 'highlighter') {
        context.strokeStyle = stroke.color;
        context.lineWidth = stroke.size * 3;
        context.globalAlpha = 0.3;
      } else if (stroke.tool === 'eraser') {
        context.strokeStyle = '#FFFFFF';
        context.lineWidth = stroke.size * 2;
        context.globalAlpha = 1;
      }
      
      context.lineCap = 'round';
      context.lineJoin = 'round';
      
      // Draw the line
      for (let i = 1; i < stroke.points.length; i++) {
        context.lineTo(stroke.points[i].x, stroke.points[i].y);
      }
      
      context.stroke();
    });
    
    // Draw current stroke if it exists
    if (currentStroke && currentStroke.points.length >= 2) {
      context.beginPath();
      context.moveTo(currentStroke.points[0].x, currentStroke.points[0].y);
      
      // Set drawing style based on tool
      if (currentStroke.tool === 'pen') {
        context.strokeStyle = currentStroke.color;
        context.lineWidth = currentStroke.size;
        context.globalAlpha = 1;
      } else if (currentStroke.tool === 'highlighter') {
        context.strokeStyle = currentStroke.color;
        context.lineWidth = currentStroke.size * 3;
        context.globalAlpha = 0.3;
      } else if (currentStroke.tool === 'eraser') {
        context.strokeStyle = '#FFFFFF';
        context.lineWidth = currentStroke.size * 2;
        context.globalAlpha = 1;
      }
      
      for (let i = 1; i < currentStroke.points.length; i++) {
        context.lineTo(currentStroke.points[i].x, currentStroke.points[i].y);
      }
      
      context.stroke();
    }
  }, [strokes, currentStroke, currentPage]);
  
  // Draw mock content for the page
  const drawPageContent = (ctx: CanvasRenderingContext2D, pageNumber: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const { width, height } = canvas.getBoundingClientRect();
    
    // Clear canvas
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);
    
    // Draw page number
    ctx.font = '16px Arial';
    ctx.fillStyle = '#333333';
    ctx.textAlign = 'center';
    ctx.fillText(`Page ${pageNumber} of ${totalPages}`, width / 2, 30);
    
    // Draw different content based on page number
    switch(pageNumber) {
      case 1:
        // Title page
        ctx.font = 'bold 24px Arial';
        ctx.fillText('Linear Algebra', width / 2, height / 3);
        
        ctx.font = '18px Arial';
        ctx.fillText('Introduction to Eigenvalues and Eigenvectors', width / 2, height / 3 + 40);
        
        ctx.font = '14px Arial';
        ctx.fillText('University of Oxford', width / 2, height / 3 + 80);
        break;
        
      case 2:
        // Definition page
        ctx.font = 'bold 20px Arial';
        ctx.fillText('Definitions', width / 2, 70);
        
        ctx.font = '16px Arial';
        ctx.textAlign = 'left';
        ctx.fillText('• Eigenvalue: A scalar λ such that Av = λv for some non-zero vector v', 50, 120);
        ctx.fillText('• Eigenvector: A non-zero vector v such that Av = λv', 50, 160);
        ctx.fillText('• Characteristic Equation: det(A - λI) = 0', 50, 200);
        break;
        
      case 3:
        // Example page
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Example', width / 2, 70);
        
        ctx.font = '16px Arial';
        ctx.textAlign = 'left';
        ctx.fillText('For matrix A = ', 50, 120);
        
        // Draw a 2x2 matrix
        ctx.beginPath();
        ctx.moveTo(150, 100);
        ctx.lineTo(150, 140);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(200, 100);
        ctx.lineTo(200, 140);
        ctx.stroke();
        
        ctx.fillText('2  1', 160, 120);
        ctx.fillText('1  2', 160, 140);
        
        ctx.fillText('Eigenvalues: λ₁ = 3, λ₂ = 1', 50, 180);
        ctx.fillText('Eigenvectors: v₁ = (1,1)ᵀ, v₂ = (1,-1)ᵀ', 50, 210);
        break;
        
      case 4:
        // Application page
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Applications', width / 2, 70);
        
        ctx.font = '16px Arial';
        ctx.textAlign = 'left';
        ctx.fillText('• Principal Component Analysis', 50, 120);
        ctx.fillText('• Google PageRank Algorithm', 50, 160);
        ctx.fillText('• Quantum Mechanics', 50, 200);
        ctx.fillText('• Vibration Analysis', 50, 240);
        break;
        
      case 5:
        // Summary page
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Summary', width / 2, 70);
        
        ctx.font = '16px Arial';
        ctx.textAlign = 'left';
        ctx.fillText('• Eigenvalues and eigenvectors reveal the fundamental structure of a matrix', 50, 120);
        ctx.fillText('• The characteristic equation det(A - λI) = 0 helps find eigenvalues', 50, 160);
        ctx.fillText('• Eigenvectors correspond to directions that are only scaled by the matrix', 50, 200);
        ctx.fillText('• Many practical applications across various fields', 50, 240);
        break;
    }
  };

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
      
      {/* Pause overlay */}
      {isPaused && (
        <div className="absolute inset-0 bg-gray-100/40 flex items-center justify-center">
          <div className="bg-white/90 p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold">Class Paused</h3>
            <p className="text-gray-600 mt-2">Click Resume to continue learning</p>
          </div>
        </div>
      )}

      {/* Loading overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-700">Connecting to collaboration server...</p>
          </div>
        </div>
      )}
    </div>
  );
};
