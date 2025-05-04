
import React, { useRef, useState } from 'react';
import { Minimize } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { AnnotationTool } from '@/types/virtualClass';
import { BoardToolbar } from './board/BoardToolbar';
import { BoardCanvas } from './board/BoardCanvas';
import { BoardNavigation } from './board/BoardNavigation';

interface VirtualBoardProps {
  isPaused: boolean;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  annotations: any[];
  setAnnotations: (annotations: any[]) => void;
}

export const VirtualBoard: React.FC<VirtualBoardProps> = ({
  isPaused,
  currentPage,
  setCurrentPage,
  annotations,
  setAnnotations
}) => {
  const boardContainerRef = useRef<HTMLDivElement>(null);
  const [activeTool, setActiveTool] = useState<AnnotationTool>('none');
  const [toolColor, setToolColor] = useState('#000000');
  const [toolSize, setToolSize] = useState(2);
  const [totalPages] = useState(5); // Mock total pages
  const [isBoardFullscreen, setIsBoardFullscreen] = useState(false);
  const { toast } = useToast();

  const handleToolClick = (tool: AnnotationTool) => {
    setActiveTool(prevTool => prevTool === tool ? 'none' : tool);
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
        annotations={annotations}
        setAnnotations={setAnnotations}
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
        <Button 
          variant="outline" 
          size="sm"
          onClick={toggleBoardFullscreen}
          className="absolute top-4 right-4 bg-white shadow-md z-10"
        >
          <Minimize className="h-4 w-4 mr-2" />
          Exit Fullscreen
        </Button>
      )}
    </div>
  );
};
