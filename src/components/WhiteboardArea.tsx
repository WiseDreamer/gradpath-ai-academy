
import React, { useState, useRef, useEffect } from 'react';
import { WhiteboardToolbar, WhiteboardCanvas, WhiteboardControlBar } from '@/components/whiteboard';

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
  const whiteboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    if (!context) return;
    
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
    if (!isHandRaised) {
      setIsPlaying(false);
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (activeTool === 'none' || !contextRef.current || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    contextRef.current.beginPath();
    contextRef.current.moveTo(x, y);
    isDrawing.current = true;
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current || activeTool === 'none' || !contextRef.current || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
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
    
    // Update pen color based on theme
    if (theme === 'dark') {
      setPenColor('#ffffff');
    } else {
      setPenColor('#000000');
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div 
      ref={whiteboardRef}
      className={`${isFullscreen ? 'fixed inset-0 z-50 bg-white dark:bg-gray-900' : 'flex flex-col h-full relative'}`}
    >
      <WhiteboardToolbar
        activeTool={activeTool}
        handleToolChange={handleToolChange}
        handleThemeChange={handleThemeChange}
        clearCanvas={clearCanvas}
        isFullscreen={isFullscreen}
        toggleFullscreen={toggleFullscreen}
      />
      
      <div className="flex-1 relative overflow-hidden">
        <WhiteboardCanvas
          activeTool={activeTool}
          penColor={penColor}
          highlighterColor={highlighterColor}
          penSize={penSize}
          themeMode={themeMode}
          canvasRef={canvasRef}
          contextRef={contextRef}
          isDrawing={isDrawing}
          startDrawing={startDrawing}
          draw={draw}
          finishDrawing={finishDrawing}
          isPlaying={isPlaying}
          isHandRaised={isHandRaised}
          toggleMic={toggleMic}
          isMicOn={isMicOn}
          setIsHandRaised={setIsHandRaised}
          setIsPlaying={setIsPlaying}
        />
        
        {!isFullscreen && (
          <WhiteboardControlBar
            isPlaying={isPlaying}
            isHandRaised={isHandRaised}
            isMicOn={isMicOn}
            togglePlay={togglePlay}
            raiseHand={raiseHand}
            toggleMic={toggleMic}
          />
        )}
      </div>
    </div>
  );
};

export default WhiteboardArea;
