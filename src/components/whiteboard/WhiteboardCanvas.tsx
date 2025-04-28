
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
    const handleResize = () => {
      if (!canvasRef.current || !canvasRef.current.getContext('2d')) return;
      
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (!context) return;
      
      // Save current drawings if needed
      const tempCanvas = document.createElement('canvas');
      const tempContext = tempCanvas.getContext('2d');
      if (tempContext) {
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        tempContext.drawImage(canvas, 0, 0);
      }
      
      // Resize canvas
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      canvas.style.width = `${canvas.offsetWidth}px`;
      canvas.style.height = `${canvas.offsetHeight}px`;
      
      // Restore context properties and drawings
      context.scale(2, 2);
      context.lineCap = 'round';
      
      if (tempContext) {
        context.drawImage(tempCanvas, 0, 0);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [canvasRef]);

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
        className="w-full h-full absolute top-0 left-0 cursor-crosshair z-0"
        style={{ backgroundColor: themeMode === 'light' ? '#ffffff' : '#2d2d2d' }}
      />
    </div>
  );
};

export default WhiteboardCanvas;
