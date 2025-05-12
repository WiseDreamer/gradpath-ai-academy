
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { AnnotationTool } from '@/types/virtualClass';
import { BoardToolbar } from './BoardToolbar';
import { BoardCanvas } from './BoardCanvas';
import { BoardNavigation } from './BoardNavigation';
import { ExitFullscreenButton } from './ExitFullscreenButton';
import { usePuterWhiteboard } from '@/hooks/whiteboard';
import { usePuter } from '@/contexts/PuterContext';

interface VirtualBoardContainerProps {
  isPaused: boolean;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  annotations: any[];
  setAnnotations: (annotations: any[]) => void;
  getWhiteboardState: (state: string) => void;
}

export const VirtualBoardContainer: React.FC<VirtualBoardContainerProps> = ({
  isPaused,
  currentPage,
  setCurrentPage,
  annotations,
  setAnnotations,
  getWhiteboardState
}) => {
  const boardContainerRef = useRef<HTMLDivElement>(null);
  // Default to 'pen' tool instead of 'none' so users can draw immediately
  const [activeTool, setActiveTool] = useState<AnnotationTool>('pen');
  const [toolColor, setToolColor] = useState('#000000');
  const [toolSize, setToolSize] = useState(2);
  const [totalPages] = useState(5); // Mock total pages
  const [isBoardFullscreen, setIsBoardFullscreen] = useState(false);
  const { toast } = useToast();
  const { serializeForAI } = usePuterWhiteboard({ initialPage: currentPage });
  const { isLoaded, isDbAvailable } = usePuter();

  // Show loading toast if Puter is not available
  useEffect(() => {
    if (isLoaded && !isDbAvailable) {
      toast({
        title: "Using local whiteboard",
        description: "Your drawings will be saved locally only.",
        variant: "default"
      });
    }
  }, [isLoaded, isDbAvailable, toast]);

  const handleToolClick = (tool: AnnotationTool) => {
    console.log('Tool clicked:', tool, 'current tool:', activeTool);
    setActiveTool(prevTool => prevTool === tool ? 'pen' : tool);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSaveAnnotations = () => {
    toast({
      title: "Annotations Saved",
      description: "Your annotations have been saved successfully.",
    });
  };

  // Toggle board fullscreen 
  const toggleBoardFullscreen = () => {
    if (boardContainerRef.current) {
      setIsBoardFullscreen(!isBoardFullscreen);
    }
  };

  // Update whiteboard state for AI - wrapped in useCallback to avoid infinite loops
  const updateWhiteboardState = useCallback(() => {
    if (serializeForAI) {
      const boardState = serializeForAI();
      getWhiteboardState(boardState);
    }
  }, [serializeForAI, getWhiteboardState]);

  // Use effect with proper dependencies to avoid infinite rendering loops
  useEffect(() => {
    // Call once when loaded and when dependencies change
    updateWhiteboardState();
  }, [updateWhiteboardState]);

  return (
    <div 
      ref={boardContainerRef} 
      className={cn(
        "relative flex flex-col w-full bg-gray-50",
        isBoardFullscreen ? "fixed inset-0 z-50" : "h-full"
      )}
    >
      <BoardToolbar 
        activeTool={activeTool}
        toolColor={toolColor}
        onToolChange={handleToolClick}
        onColorChange={setToolColor}
        onSave={handleSaveAnnotations}
        onFullscreen={toggleBoardFullscreen}
        isFullscreen={isBoardFullscreen}
      />
      
      <BoardCanvas 
        isPaused={isPaused}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        activeTool={activeTool}
        toolColor={toolColor}
        toolSize={toolSize}
      />
      
      <BoardNavigation 
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevPage={prevPage}
        onNextPage={nextPage}
      />

      {/* Fullscreen exit button when in fullscreen mode */}
      {isBoardFullscreen && (
        <ExitFullscreenButton onClick={toggleBoardFullscreen} />
      )}
    </div>
  );
};
