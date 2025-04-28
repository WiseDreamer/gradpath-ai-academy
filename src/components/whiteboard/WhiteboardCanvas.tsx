
import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff } from 'lucide-react';

type Tool = 'pen' | 'highlighter' | 'eraser' | 'none';

interface WhiteboardCanvasProps {
  activeTool: Tool;
  penColor: string;
  highlighterColor: string;
  penSize: number;
  themeMode: 'light' | 'dark';
  canvasRef: React.RefObject<HTMLCanvasElement>;
  contextRef: React.MutableRefObject<CanvasRenderingContext2D | null>;
  isDrawing: React.MutableRefObject<boolean>;
  startDrawing: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  draw: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  finishDrawing: () => void;
  isPlaying: boolean;
  isHandRaised: boolean;
  toggleMic: () => void;
  isMicOn: boolean;
  setIsHandRaised: (value: boolean) => void;
  setIsPlaying: (value: boolean) => void;
}

const WhiteboardCanvas: React.FC<WhiteboardCanvasProps> = ({
  activeTool,
  themeMode,
  canvasRef,
  contextRef,
  isDrawing,
  startDrawing,
  draw,
  finishDrawing,
  isPlaying,
  isHandRaised,
  isMicOn,
  toggleMic,
  setIsHandRaised,
  setIsPlaying
}) => {
  // Ensure canvas is accessible and properly initialized
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    if (!context) return;
    
    const resizeCanvas = () => {
      // Store current drawing
      const tempCanvas = document.createElement('canvas');
      const tempContext = tempCanvas.getContext('2d');
      
      // Only copy the existing canvas if it has valid dimensions
      if (canvas.width > 0 && canvas.height > 0) {
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        if (tempContext) {
          tempContext.drawImage(canvas, 0, 0);
        }
      }
      
      // Set canvas display size
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      
      // Set actual size in memory (scaled for higher resolution)
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * 2;
      canvas.height = rect.height * 2;
      
      // Normalize coordinate system
      context.scale(2, 2);
      context.lineCap = 'round';
      context.lineJoin = 'round';
      
      // Update the contextRef for drawing operations
      contextRef.current = context;
      
      // Restore drawing but only if the temp canvas had valid dimensions
      if (tempCanvas.width > 0 && tempCanvas.height > 0 && tempContext) {
        context.drawImage(tempCanvas, 0, 0);
      }
    };

    // Initial resize
    resizeCanvas();
    
    // Add event listener
    window.addEventListener('resize', resizeCanvas);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [canvasRef, contextRef]);

  // Add touch support for mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !contextRef.current || activeTool === 'none') return;
    
    e.preventDefault(); // Prevent scrolling while drawing
    const touch = e.touches[0];
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    // Convert touch position to canvas coordinates
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    contextRef.current.beginPath();
    contextRef.current.moveTo(x, y);
    isDrawing.current = true;
    
    // Set drawing properties based on the active tool
    if (contextRef.current) {
      if (activeTool === 'pen') {
        contextRef.current.strokeStyle = penColor;
        contextRef.current.lineWidth = penSize;
        contextRef.current.globalAlpha = 1;
      } else if (activeTool === 'highlighter') {
        contextRef.current.strokeStyle = highlighterColor;
        contextRef.current.lineWidth = penSize * 3;
        contextRef.current.globalAlpha = 0.5;
      } else if (activeTool === 'eraser') {
        contextRef.current.strokeStyle = themeMode === 'light' ? '#FFFFFF' : '#2d2d2d';
        contextRef.current.lineWidth = penSize * 2;
        contextRef.current.globalAlpha = 1;
      }
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current || !canvasRef.current || !contextRef.current || activeTool === 'none') return;
    
    e.preventDefault();
    const touch = e.touches[0];
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();
  };

  const handleTouchEnd = () => {
    if (contextRef.current) {
      contextRef.current.closePath();
    }
    isDrawing.current = false;
  };

  return (
    <div className="whiteboard flex-1 relative overflow-hidden h-full">
      {isPlaying ? (
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="animate-fade-in mb-8 text-center pt-10">
            <h2 className="text-xl font-semibold mb-3">Today's Topic: Linear Algebra Fundamentals</h2>
            <p className="text-gray-600">The AI tutor is currently explaining vector spaces and linear transformations</p>
          </div>
        </div>
      ) : isHandRaised ? (
        <div className="absolute inset-0 z-10 bg-white/90 flex items-center justify-center">
          <div className="animate-fade-in text-center">
            <h3 className="text-lg font-medium mb-4">Ask your question</h3>
            <div className="flex flex-col items-center gap-4">
              <div className="w-full max-w-lg">
                <textarea 
                  className="w-full h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gradpath-purple"
                  placeholder="Type your question here..."
                />
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={toggleMic}>
                  {isMicOn ? <MicOff className="mr-2 h-4 w-4" /> : <Mic className="mr-2 h-4 w-4" />}
                  {isMicOn ? 'Turn Off Mic' : 'Use Voice'}
                </Button>
                <Button onClick={() => setIsHandRaised(false)}>
                  Submit Question
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 z-10 bg-white/90 flex items-center justify-center">
          <div className="animate-fade-in text-center">
            <p className="text-xl mb-4">Teaching paused</p>
            <Button onClick={() => setIsPlaying(true)}>Resume Teaching</Button>
          </div>
        </div>
      )}
      
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={finishDrawing}
        onMouseLeave={finishDrawing}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="w-full h-full absolute top-0 left-0 cursor-crosshair z-0"
        style={{ backgroundColor: themeMode === 'light' ? '#ffffff' : '#2d2d2d' }}
      />
    </div>
  );
};

export default WhiteboardCanvas;
