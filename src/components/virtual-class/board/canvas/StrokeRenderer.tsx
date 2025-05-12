
import { Stroke } from '@/types/whiteboard';

interface StrokeRendererProps {
  context: CanvasRenderingContext2D | null;
  strokes: Stroke[];
  currentStroke: Stroke | null;
}

export const StrokeRenderer = ({
  context,
  strokes,
  currentStroke
}: StrokeRendererProps) => {
  // If context is null, don't attempt to render
  if (!context) return null;

  // Configure context for drawing tools
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

  // Render all saved strokes
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

  // Render the current stroke
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

  return null; // This utility doesn't render any React elements
};
