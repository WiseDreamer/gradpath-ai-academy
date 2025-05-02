
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
      const container = canvas.parentElement;
      if (!container) return;
      
      // Set canvas display size
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      
      // Get the computed size
      const rect = canvas.getBoundingClientRect();
      
      // Ensure we have non-zero dimensions before proceeding
      if (rect.width <= 0 || rect.height <= 0) {
        console.log('Canvas has zero dimensions, retrying...');
        // Try again later when the component is fully rendered
        requestAnimationFrame(resizeCanvas);
        return;
      }
      
      console.log(`Canvas dimensions: ${rect.width}x${rect.height}`);
      
      // Store existing canvas content if any
      let tempCanvas = null;
      let tempContext = null;
      let hasStoredImage = false;
      
      if (canvas.width > 0 && canvas.height > 0) {
        try {
          tempCanvas = document.createElement('canvas');
          tempContext = tempCanvas.getContext('2d');
          
          if (tempContext) {
            tempCanvas.width = canvas.width;
            tempCanvas.height = canvas.height;
            tempContext.drawImage(canvas, 0, 0);
            hasStoredImage = true;
          }
        } catch (e) {
          console.error("Failed to store canvas image: ", e);
          hasStoredImage = false;
        }
      }
      
      // Set canvas resolution (accounting for high-DPI displays)
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, rect.width * dpr);
      canvas.height = Math.max(1, rect.height * dpr);
      
      // Scale the context for high-DPI display
      context.scale(dpr, dpr);
      
      // Set drawing properties
      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.imageSmoothingEnabled = true;
      
      // Store context in the ref
      contextRef.current = context;
      
      // Restore any previous canvas content if it existed
      if (hasStoredImage && tempCanvas && tempContext && tempCanvas.width > 0 && tempCanvas.height > 0) {
        try {
          context.drawImage(tempCanvas, 0, 0, tempCanvas.width, tempCanvas.height, 0, 0, rect.width, rect.height);
        } catch (e) {
          console.error("Failed to restore canvas image: ", e);
          
          // If restoration fails, just clear the canvas with the appropriate background color
          context.fillStyle = '#ffffff'; // Default to white
          context.fillRect(0, 0, canvas.width, canvas.height);
        }
      } else {
        // Initial fill (white background)
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      console.log(`Canvas initialized with dimensions: ${canvas.width}x${canvas.height}`);
    };

    // Initial setup
    resizeCanvas();
    
    // Set up resize observer for more reliable resize detection
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    
    resizeObserver.observe(canvas.parentElement || canvas);
    
    // Backup with window resize event
    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [canvasRef, contextRef]);
};
