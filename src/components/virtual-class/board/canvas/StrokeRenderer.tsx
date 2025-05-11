
import React from 'react';
import { Stroke } from '@/types/whiteboard';

interface StrokeRendererProps {
  context: CanvasRenderingContext2D;
  strokes: Stroke[];
  currentStroke: Stroke | null;
}

export const StrokeRenderer: React.FC<StrokeRendererProps> = ({
  context,
  strokes,
  currentStroke
}) => {
  // This function handles rendering all saved strokes
  const renderAllStrokes = () => {
    strokes.forEach(stroke => {
      if (stroke.points.length < 2) return;
      
      context.beginPath();
      context.moveTo(stroke.points[0].x, stroke.points[0].y);
      
      // Set drawing style based on tool
      configureContextForTool(context, stroke);
      
      // Draw the line
      for (let i = 1; i < stroke.points.length; i++) {
        context.lineTo(stroke.points[i].x, stroke.points[i].y);
      }
      
      context.stroke();
    });
  };

  // This function handles rendering the current stroke
  const renderCurrentStroke = () => {
    if (currentStroke && currentStroke.points.length >= 2) {
      context.beginPath();
      context.moveTo(currentStroke.points[0].x, currentStroke.points[0].y);
      
      // Set drawing style based on tool
      configureContextForTool(context, currentStroke);
      
      for (let i = 1; i < currentStroke.points.length; i++) {
        context.lineTo(currentStroke.points[i].x, currentStroke.points[i].y);
      }
      
      context.stroke();
    }
  };

  // Helper function to configure context for different tools
  const configureContextForTool = (ctx: CanvasRenderingContext2D, stroke: Stroke) => {
    if (stroke.tool === 'pen') {
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.size;
      ctx.globalAlpha = 1;
    } else if (stroke.tool === 'highlighter') {
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.size * 3;
      ctx.globalAlpha = 0.3;
    } else if (stroke.tool === 'eraser') {
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = stroke.size * 2;
      ctx.globalAlpha = 1;
    }
    
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  };

  // Execute rendering
  renderAllStrokes();
  renderCurrentStroke();

  return null; // This is a render utility component, it doesn't return JSX
};
