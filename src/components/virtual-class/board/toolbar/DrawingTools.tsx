
import React from 'react';
import { Pen, Highlighter, Eraser } from 'lucide-react';
import { ToolbarButton } from './ToolbarButton';
import { AnnotationTool } from '@/types/virtualClass';

interface DrawingToolsProps {
  activeTool: AnnotationTool;
  onToolChange: (tool: AnnotationTool) => void;
}

export const DrawingTools: React.FC<DrawingToolsProps> = ({
  activeTool,
  onToolChange
}) => {
  return (
    <div className="flex items-center space-x-1">
      <ToolbarButton 
        icon={<Pen className="h-4 w-4" />}
        label="Pen"
        tooltipContent="Pen Tool"
        active={activeTool === 'pen'}
        onClick={() => onToolChange('pen')}
      />
      
      <ToolbarButton 
        icon={<Highlighter className="h-4 w-4" />}
        label="Highlighter"
        tooltipContent="Highlighter Tool"
        active={activeTool === 'highlighter'}
        onClick={() => onToolChange('highlighter')}
      />
      
      <ToolbarButton 
        icon={<Eraser className="h-4 w-4" />}
        label="Eraser"
        tooltipContent="Eraser Tool"
        active={activeTool === 'eraser'}
        onClick={() => onToolChange('eraser')}
      />
    </div>
  );
};
