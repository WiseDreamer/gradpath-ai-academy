
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
    if (!canvasRef.current || !contextRef.current) return;
    
    const context = contextRef.current;
    
    // Set up the drawing context
    context.lineCap = 'round';
    context.lineJoin = 'round';
    
    if (activeTool === 'pen') {
      context.strokeStyle = penColor;
      context.lineWidth = penSize;
      context.globalAlpha = 1;
    } else if (activeTool === 'highlighter') {
      context.strokeStyle = highlighterColor;
      context.lineWidth = penSize * 3;
      context.globalAlpha = 0.5;
    } else if (activeTool === 'eraser') {
      context.strokeStyle = themeMode === 'light' ? '#ffffff' : '#2d2d2d';
      context.lineWidth = penSize * 2;
      context.globalAlpha = 1;
    }
  }, [activeTool, penColor, highlighterColor, penSize, themeMode]);
  
  // Theme change effect
  useEffect(() => {
    if (themeMode === 'dark') {
      setPenColor('#ffffff');
    } else {
      setPenColor('#000000');
    }
    
    // Don't try to access image data here as the canvas might not be ready
    // Canvas bg color is handled in CanvasElement
  }, [themeMode]);
  
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

  const clearCanvas = () => {
    if (!canvasRef.current || !contextRef.current) return;
    
    const canvas = canvasRef.current;
    const context = contextRef.current;
    
    // Clear with the appropriate background color
    context.fillStyle = themeMode === 'light' ? '#ffffff' : '#2d2d2d';
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  const handleToolChange = (tool: Tool) => {
    setActiveTool(tool === activeTool ? 'none' : tool);
  };
  
  const handleThemeChange = (theme: ThemeMode) => {
    setThemeMode(theme);
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
