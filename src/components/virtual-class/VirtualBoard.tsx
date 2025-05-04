
import React, { useRef, useState, useEffect } from 'react';
import { Eraser, Pen, Highlighter, Undo, Redo, ChevronLeft, ChevronRight, Settings, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface VirtualBoardProps {
  isPaused: boolean;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  annotations: any[];
  setAnnotations: (annotations: any[]) => void;
}

export const VirtualBoard: React.FC<VirtualBoardProps> = ({
  isPaused,
  currentPage,
  setCurrentPage,
  annotations,
  setAnnotations
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [activeTool, setActiveTool] = useState<'pen' | 'highlighter' | 'eraser' | 'text' | 'none'>('none');
  const [toolColor, setToolColor] = useState('#000000');
  const [toolSize, setToolSize] = useState(2);
  const [totalPages, setTotalPages] = useState(5); // Mock total pages
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
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
    
    // Draw existing annotations for this page
    const pageAnnotations = annotations.filter(annotation => annotation.page === pageNumber);
    pageAnnotations.forEach(annotation => {
      // Drawing code for annotations would go here
    });
  };

  // Handle drawing tools
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (activeTool === 'none' || !contextRef.current || isPaused) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    contextRef.current.beginPath();
    contextRef.current.moveTo(x, y);
    
    // Set drawing style based on active tool
    if (activeTool === 'pen') {
      contextRef.current.strokeStyle = toolColor;
      contextRef.current.lineWidth = toolSize;
      contextRef.current.globalAlpha = 1;
    } else if (activeTool === 'highlighter') {
      contextRef.current.strokeStyle = toolColor;
      contextRef.current.lineWidth = toolSize * 3;
      contextRef.current.globalAlpha = 0.3;
    } else if (activeTool === 'eraser') {
      contextRef.current.strokeStyle = '#FFFFFF';
      contextRef.current.lineWidth = toolSize * 2;
      contextRef.current.globalAlpha = 1;
    }
    
    contextRef.current.lineCap = 'round';
    contextRef.current.lineJoin = 'round';
    
    setIsDrawing(true);
    
    // Store the starting point for the annotation
    const newAnnotation = {
      tool: activeTool,
      color: toolColor,
      size: toolSize,
      page: currentPage,
      points: [{x, y}]
    };
    
    // Add to annotations
    setAnnotations([...annotations, newAnnotation]);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !contextRef.current || isPaused) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();
    
    // Update the current annotation with the new point
    const updatedAnnotations = [...annotations];
    const currentAnnotation = updatedAnnotations[updatedAnnotations.length - 1];
    currentAnnotation.points.push({x, y});
    setAnnotations(updatedAnnotations);
  };

  const stopDrawing = () => {
    if (!contextRef.current) return;
    
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const handleToolClick = (tool: 'pen' | 'highlighter' | 'eraser' | 'text' | 'none') => {
    setActiveTool(prevTool => prevTool === tool ? 'none' : tool);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSaveAnnotations = () => {
    toast({
      title: "Annotations Saved",
      description: "Your annotations have been saved successfully.",
    });
  };

  return (
    <div className="relative flex flex-col h-full w-full bg-gray-50">
      {/* Toolbar */}
      <div className="bg-white border-b border-gray-200 p-2 flex justify-between items-center">
        <div className="flex items-center space-x-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant={activeTool === 'pen' ? "secondary" : "outline"} 
                size="sm" 
                onClick={() => handleToolClick('pen')}
              >
                <Pen className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Pen Tool</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant={activeTool === 'highlighter' ? "secondary" : "outline"} 
                size="sm" 
                onClick={() => handleToolClick('highlighter')}
              >
                <Highlighter className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Highlighter Tool</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant={activeTool === 'eraser' ? "secondary" : "outline"} 
                size="sm" 
                onClick={() => handleToolClick('eraser')}
              >
                <Eraser className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Eraser Tool</TooltipContent>
          </Tooltip>
          
          {!isMobile && (
            <>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => toast({ title: "Undo", description: "Undo functionality will be implemented soon." })}
                  >
                    <Undo className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Undo</TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => toast({ title: "Redo", description: "Redo functionality will be implemented soon." })}
                  >
                    <Redo className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Redo</TooltipContent>
              </Tooltip>
              
              <input 
                type="color" 
                value={toolColor}
                onChange={(e) => setToolColor(e.target.value)}
                className="w-8 h-8 p-0 border border-gray-300 rounded-md"
              />
            </>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {!isMobile && (
            <>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleSaveAnnotations}
              >
                <Download className="h-4 w-4 mr-2" />
                Save
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => toast({ title: "Settings", description: "Settings panel will be implemented soon." })}
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </>
          )}
        </div>
      </div>
      
      {/* Canvas Area */}
      <div className="flex-1 relative overflow-hidden">
        <canvas
          ref={canvasRef}
          className={cn(
            "absolute inset-0 cursor-crosshair",
            isPaused && "opacity-50"
          )}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={(e) => {
            // Implement touch events for mobile
            e.preventDefault();
          }}
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
      </div>
      
      {/* Navigation controls */}
      <div className="bg-white border-t border-gray-200 p-2 flex justify-between items-center">
        <Button 
          variant="outline" 
          size="sm"
          disabled={currentPage <= 1}
          onClick={prevPage}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        
        <span className="text-sm">{currentPage} / {totalPages}</span>
        
        <Button 
          variant="outline" 
          size="sm"
          disabled={currentPage >= totalPages}
          onClick={nextPage}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};
