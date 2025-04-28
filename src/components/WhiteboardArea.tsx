
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Pause, Play, Mic, MicOff, Hand, Pen, Settings, Undo, Highlighter, Brush, Maximize, Minimize } from 'lucide-react';
import { 
  Tooltip, 
  TooltipTrigger, 
  TooltipContent, 
  TooltipProvider 
} from '@/components/ui/tooltip';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';

type Tool = 'pen' | 'highlighter' | 'eraser' | 'none';
type ThemeMode = 'light' | 'dark';
type Language = 'english' | 'spanish' | 'french' | 'german' | 'chinese';

const WhiteboardArea: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMicOn, setIsMicOn] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [activeTool, setActiveTool] = useState<Tool>('none');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [penColor, setPenColor] = useState('#000000');
  const [highlighterColor, setHighlighterColor] = useState('#ffeb3b');
  const [penSize, setPenSize] = useState(2);
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');
  const [language, setLanguage] = useState<Language>('english');
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const isDrawing = useRef(false);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    canvas.style.width = `${canvas.offsetWidth}px`;
    canvas.style.height = `${canvas.offsetHeight}px`;
    
    const context = canvas.getContext('2d');
    if (!context) return;
    
    context.scale(2, 2);
    context.lineCap = 'round';
    context.strokeStyle = penColor;
    context.lineWidth = penSize;
    contextRef.current = context;
  }, []);
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  const toggleMic = () => {
    setIsMicOn(!isMicOn);
  };
  
  const raiseHand = () => {
    setIsHandRaised(!isHandRaised);
    setIsPlaying(false);
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (activeTool === 'none') return;
    
    const canvas = canvasRef.current;
    if (!canvas || !contextRef.current) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    contextRef.current.beginPath();
    contextRef.current.moveTo(x, y);
    isDrawing.current = true;
    
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
        contextRef.current.strokeStyle = themeMode === 'light' ? '#FFFFFF' : '#000000';
        contextRef.current.lineWidth = penSize * 2;
        contextRef.current.globalAlpha = 1;
      }
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current || activeTool === 'none') return;
    
    const canvas = canvasRef.current;
    if (!canvas || !contextRef.current) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();
  };

  const finishDrawing = () => {
    if (contextRef.current) {
      contextRef.current.closePath();
    }
    isDrawing.current = false;
  };

  const clearCanvas = () => {
    if (!canvasRef.current || !contextRef.current) return;
    const canvas = canvasRef.current;
    contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleToolChange = (tool: Tool) => {
    setActiveTool(tool === activeTool ? 'none' : tool);
  };
  
  const handleThemeChange = (theme: ThemeMode) => {
    setThemeMode(theme);
    if (!canvasRef.current || !contextRef.current) return;
    
    const canvas = canvasRef.current;
    const context = contextRef.current;
    
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    
    if (theme === 'dark') {
      canvas.style.backgroundColor = '#2d2d2d';
      setPenColor('#ffffff');
    } else {
      canvas.style.backgroundColor = '#ffffff';
      setPenColor('#000000');
    }
    
    context.putImageData(imageData, 0, 0);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`flex flex-col h-full ${isFullscreen ? 'fixed inset-0 z-50 bg-white' : ''}`}>
      <div className="p-2 border-b flex justify-end space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant={activeTool === 'pen' ? "secondary" : "outline"} 
                size="sm"
                onClick={() => handleToolChange('pen')}
                className="flex items-center gap-1"
              >
                <Pen className="h-4 w-4" />
                <span className="hidden md:inline">Pen</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Draw on whiteboard</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant={activeTool === 'highlighter' ? "secondary" : "outline"} 
                size="sm"
                onClick={() => handleToolChange('highlighter')}
                className="flex items-center gap-1"
              >
                <Highlighter className="h-4 w-4" />
                <span className="hidden md:inline">Highlight</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Highlight content</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <DropdownMenu>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <Settings className="h-4 w-4" />
                    <span className="hidden md:inline">Settings</span>
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleThemeChange('light')}>
                  Light Theme
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleThemeChange('dark')}>
                  Dark Theme
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Spanish
                </DropdownMenuItem>
                <DropdownMenuItem>
                  French
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <TooltipContent>
              <p>Whiteboard settings</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                onClick={clearCanvas}
                className="flex items-center gap-1"
              >
                <Undo className="h-4 w-4" />
                <span className="hidden md:inline">Undo</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Undo last action</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                onClick={toggleFullscreen}
                className="flex items-center gap-1"
              >
                {isFullscreen ? (
                  <Minimize className="h-4 w-4" />
                ) : (
                  <Maximize className="h-4 w-4" />
                )}
                <span className="hidden md:inline">
                  {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                </span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isFullscreen ? 'Exit fullscreen mode' : 'Enter fullscreen mode'}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="whiteboard flex-1 relative overflow-hidden">
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
      
      <div className="w-full bg-white border-t z-10 py-3 px-3">
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={togglePlay}
            >
              {isPlaying ? (
                <>
                  <Pause className="mr-2 h-4 w-4" /> Pause
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" /> Play
                </>
              )}
            </Button>
          </div>
          
          <Button
            variant={isHandRaised ? "secondary" : "outline"}
            size="sm"
            onClick={raiseHand}
            className={isHandRaised ? "bg-gradpath-soft-green text-gradpath-dark-purple" : ""}
          >
            <Hand className="mr-2 h-4 w-4" />
            {isHandRaised ? "Hand Raised" : "Raise Hand"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WhiteboardArea;
