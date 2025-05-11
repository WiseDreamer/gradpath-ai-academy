
import React from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AnnotationTool } from '@/types/virtualClass';
import { DrawingTools } from './toolbar/DrawingTools';
import { EditTools } from './toolbar/EditTools';
import { ColorPicker } from './toolbar/ColorPicker';
import { BoardToolbarActions } from './toolbar/BoardToolbarActions';

interface BoardToolbarProps {
  activeTool: AnnotationTool;
  toolColor: string;
  onToolChange: (tool: AnnotationTool) => void;
  onColorChange: (color: string) => void;
  onSave: () => void;
  onFullscreen: () => void;
  isFullscreen: boolean;
}

export const BoardToolbar: React.FC<BoardToolbarProps> = ({
  activeTool,
  toolColor,
  onToolChange,
  onColorChange,
  onSave,
  onFullscreen,
  isFullscreen
}) => {
  return (
    <div className="bg-white border-b border-gray-200 p-2 flex justify-between items-center">
      <TooltipProvider>
        <div className="flex items-center space-x-1">
          <DrawingTools 
            activeTool={activeTool}
            onToolChange={onToolChange}
          />
          
          <EditTools />
          
          <ColorPicker 
            toolColor={toolColor}
            onColorChange={onColorChange}
          />
        </div>
        
        <BoardToolbarActions 
          onSave={onSave}
          onFullscreen={onFullscreen}
          isFullscreen={isFullscreen}
        />
      </TooltipProvider>
    </div>
  );
};
