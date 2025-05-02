
import { useState, useEffect, useCallback } from 'react';
import { CanvasRefType, ContextRefType, DrawingStateRefType, Tool, ThemeMode } from '../types';

interface UseCanvasDrawingProps {
  canvasRef: CanvasRefType;
  contextRef: ContextRefType;
  isDrawing: DrawingStateRefType;
  activeTool: Tool;
  penColor: string;
  highlighterColor: string;
  penSize: number;
  themeMode: ThemeMode;
}

export const useCanvasDrawing = ({
  canvasRef,
  contextRef,
  isDrawing,
  activeTool,
  penColor,
  highlighterColor,
  penSize,
  themeMode,
}: UseCanvasDrawingProps) => {
  
  // Update drawing configuration when tool or colors change
  useEffect(() => {
    if (!contextRef.current) return;
    
    // Configure context based on active tool
    configureContext(contextRef.current, activeTool, penColor, highlighterColor, penSize, themeMode);
    
  }, [activeTool, penColor, highlighterColor, penSize, themeMode, contextRef]);

  // Helper function to configure context based on the selected tool
  const configureContext = (
    context: CanvasRenderingContext2D, 
    tool: Tool, 
    pen: string, 
    highlighter: string, 
    size: number, 
    theme: ThemeMode
  ) => {
    context.lineCap = 'round';
    context.lineJoin = 'round';
    
    if (tool === 'pen') {
      context.strokeStyle = pen;
      context.lineWidth = size;
      context.globalAlpha = 1;
    } else if (tool === 'highlighter') {
      context.strokeStyle = highlighter;
      context.lineWidth = size * 3;
      context.globalAlpha = 0.5;
    } else if (tool === 'eraser') {
      context.strokeStyle = theme === 'light' ? '#FFFFFF' : '#2d2d2d';
      context.lineWidth = size * 2;
      context.globalAlpha = 1;
    }
  };

  const startDrawing = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !contextRef.current || activeTool === 'none') return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Make sure to configure context right before drawing
    configureContext(contextRef.current, activeTool, penColor, highlighterColor, penSize, themeMode);
    
    contextRef.current.beginPath();
    contextRef.current.moveTo(x, y);
    isDrawing.current = true;
    
    // Prevent default behavior to avoid text selection while drawing
    e.preventDefault();
  }, [canvasRef, contextRef, isDrawing, activeTool, penColor, highlighterColor, penSize, themeMode]);

  const draw = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current || !canvasRef.current || !contextRef.current || activeTool === 'none') return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();
    e.preventDefault();
  }, [canvasRef, contextRef, isDrawing, activeTool]);

  const finishDrawing = useCallback(() => {
    if (!contextRef.current) return;
    
    contextRef.current.closePath();
    isDrawing.current = false;
  }, [contextRef, isDrawing]);

  return {
    startDrawing,
    draw,
    finishDrawing
  };
};
