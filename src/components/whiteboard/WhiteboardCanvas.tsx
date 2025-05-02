
import React from 'react';
import { WhiteboardCanvasProps } from './types';
import { useCanvasInitialization } from './hooks/useCanvasInitialization';
import { TeachingDisplay } from './canvas/TeachingDisplay';
import { CanvasElement } from './canvas/CanvasElement';

const WhiteboardCanvas: React.FC<WhiteboardCanvasProps> = ({
  activeTool,
  penColor,
  highlighterColor,
  penSize,
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
  // Initialize the canvas
  useCanvasInitialization({ canvasRef, contextRef });

  return (
    <div className="whiteboard flex-1 relative overflow-hidden h-full">
      <CanvasElement
        canvasRef={canvasRef}
        themeMode={themeMode}
        startDrawing={startDrawing}
        draw={draw}
        finishDrawing={finishDrawing}
      />
      
      <TeachingDisplay 
        isPlaying={isPlaying}
        isHandRaised={isHandRaised}
        toggleMic={toggleMic}
        isMicOn={isMicOn}
        setIsHandRaised={setIsHandRaised}
        setIsPlaying={setIsPlaying}
        themeMode={themeMode}
      />
    </div>
  );
};

export default WhiteboardCanvas;
