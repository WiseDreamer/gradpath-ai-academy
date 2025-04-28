
import { useEffect } from 'react';
import { CanvasRefType, ContextRefType } from '../types';

interface UseCanvasInitializationProps {
  canvasRef: CanvasRefType;
  contextRef: ContextRefType;
}

export const useCanvasInitialization = ({
  canvasRef,
  contextRef,
}: UseCanvasInitializationProps) => {
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    if (!context) return;
    
    const resizeCanvas = () => {
      const tempCanvas = document.createElement('canvas');
      const tempContext = tempCanvas.getContext('2d');
      
      if (canvas.width > 0 && canvas.height > 0) {
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        if (tempContext) {
          tempContext.drawImage(canvas, 0, 0);
        }
      }
      
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * 2;
      canvas.height = rect.height * 2;
      
      context.scale(2, 2);
      context.lineCap = 'round';
      context.lineJoin = 'round';
      
      contextRef.current = context;
      
      if (tempCanvas.width > 0 && tempCanvas.height > 0 && tempContext) {
        context.drawImage(tempCanvas, 0, 0);
      }
    };

    resizeCanvas();
    
    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [canvasRef, contextRef]);
};
