
import React from 'react';

interface PageContentRendererProps {
  context: CanvasRenderingContext2D;
  currentPage: number;
  totalPages: number;
  canvasWidth: number;
  canvasHeight: number;
}

export const PageContentRenderer: React.FC<PageContentRendererProps> = ({
  context,
  currentPage,
  totalPages,
  canvasWidth,
  canvasHeight
}) => {
  // This function is extracted from the drawPageContent function in BoardCanvas.tsx
  const renderPageContent = () => {
    // Clear canvas
    context.fillStyle = '#FFFFFF';
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    
    // Draw page number
    context.font = '16px Arial';
    context.fillStyle = '#333333';
    context.textAlign = 'center';
    context.fillText(`Page ${currentPage} of ${totalPages}`, canvasWidth / 2, 30);
    
    // Draw different content based on page number
    switch(currentPage) {
      case 1:
        // Title page
        context.font = 'bold 24px Arial';
        context.fillText('Linear Algebra', canvasWidth / 2, canvasHeight / 3);
        
        context.font = '18px Arial';
        context.fillText('Introduction to Eigenvalues and Eigenvectors', canvasWidth / 2, canvasHeight / 3 + 40);
        
        context.font = '14px Arial';
        context.fillText('University of Oxford', canvasWidth / 2, canvasHeight / 3 + 80);
        break;
        
      case 2:
        // Definition page
        context.font = 'bold 20px Arial';
        context.fillText('Definitions', canvasWidth / 2, 70);
        
        context.font = '16px Arial';
        context.textAlign = 'left';
        context.fillText('• Eigenvalue: A scalar λ such that Av = λv for some non-zero vector v', 50, 120);
        context.fillText('• Eigenvector: A non-zero vector v such that Av = λv', 50, 160);
        context.fillText('• Characteristic Equation: det(A - λI) = 0', 50, 200);
        break;
        
      case 3:
        // Example page
        context.font = 'bold 20px Arial';
        context.textAlign = 'center';
        context.fillText('Example', canvasWidth / 2, 70);
        
        context.font = '16px Arial';
        context.textAlign = 'left';
        context.fillText('For matrix A = ', 50, 120);
        
        // Draw a 2x2 matrix
        context.beginPath();
        context.moveTo(150, 100);
        context.lineTo(150, 140);
        context.stroke();
        
        context.beginPath();
        context.moveTo(200, 100);
        context.lineTo(200, 140);
        context.stroke();
        
        context.fillText('2  1', 160, 120);
        context.fillText('1  2', 160, 140);
        
        context.fillText('Eigenvalues: λ₁ = 3, λ₂ = 1', 50, 180);
        context.fillText('Eigenvectors: v₁ = (1,1)ᵀ, v₂ = (1,-1)ᵀ', 50, 210);
        break;
        
      case 4:
        // Application page
        context.font = 'bold 20px Arial';
        context.textAlign = 'center';
        context.fillText('Applications', canvasWidth / 2, 70);
        
        context.font = '16px Arial';
        context.textAlign = 'left';
        context.fillText('• Principal Component Analysis', 50, 120);
        context.fillText('• Google PageRank Algorithm', 50, 160);
        context.fillText('• Quantum Mechanics', 50, 200);
        context.fillText('• Vibration Analysis', 50, 240);
        break;
        
      case 5:
        // Summary page
        context.font = 'bold 20px Arial';
        context.textAlign = 'center';
        context.fillText('Summary', canvasWidth / 2, 70);
        
        context.font = '16px Arial';
        context.textAlign = 'left';
        context.fillText('• Eigenvalues and eigenvectors reveal the fundamental structure of a matrix', 50, 120);
        context.fillText('• The characteristic equation det(A - λI) = 0 helps find eigenvalues', 50, 160);
        context.fillText('• Eigenvectors correspond to directions that are only scaled by the matrix', 50, 200);
        context.fillText('• Many practical applications across various fields', 50, 240);
        break;
    }
  };

  // Execute rendering
  renderPageContent();

  return null; // This is a render utility component, it doesn't return JSX
};
