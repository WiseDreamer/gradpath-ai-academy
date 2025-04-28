
import React from 'react';
import { WhiteboardCanvasProps } from './types';
import { useCanvasInitialization } from './hooks/useCanvasInitialization';
import { useCanvasDrawing } from './hooks/useCanvasDrawing';
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
  useCanvasInitialization({ canvasRef, contextRef });

  const {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  } = useCanvasDrawing({
    canvasRef, 
    contextRef, 
    isDrawing, 
    activeTool,
    penColor,
    highlighterColor,
    penSize,
    themeMode
  });

  return (
    <div className="whiteboard flex-1 relative overflow-hidden h-full">
      <TeachingDisplay 
        isPlaying={isPlaying}
        isHandRaised={isHandRaised}
        toggleMic={toggleMic}
        isMicOn={isMicOn}
        setIsHandRaised={setIsHandRaised}
        setIsPlaying={setIsPlaying}
        themeMode={themeMode}
      />
      
      <CanvasElement
        canvasRef={canvasRef}
        themeMode={themeMode}
        startDrawing={startDrawing}
        draw={draw}
        finishDrawing={finishDrawing}
        handleTouchStart={handleTouchStart}
        handleTouchMove={handleTouchMove}
        handleTouchEnd={handleTouchEnd}
      />
    </div>
  );
};

export default WhiteboardCanvas;
