
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
      <WhiteboardToolbar
        activeTool={activeTool}
        handleToolChange={handleToolChange}
        handleThemeChange={handleThemeChange}
        clearCanvas={clearCanvas}
        isFullscreen={isFullscreen}
        toggleFullscreen={toggleFullscreen}
      />
      
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
      
      <WhiteboardControlBar
        isPlaying={isPlaying}
        isHandRaised={isHandRaised}
        togglePlay={togglePlay}
        raiseHand={raiseHand}
      />
    </div>
  );
};

export default WhiteboardArea;
