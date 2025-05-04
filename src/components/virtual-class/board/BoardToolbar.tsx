
import React from 'react';
import { Eraser, Pen, Highlighter, Undo, Redo, Maximize, Minimize, Download, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import { AnnotationTool } from '@/types/virtualClass';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
  const { toast } = useToast();

  return (
    <div className="bg-white border-b border-gray-200 p-2 flex justify-between items-center">
      <div className="flex items-center space-x-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant={activeTool === 'pen' ? "secondary" : "outline"} 
              size="sm" 
              onClick={() => onToolChange('pen')}
            >
              <Pen className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Pen Tool</TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant={activeTool === 'highlighter' ? "secondary" : "outline"} 
              size="sm" 
              onClick={() => onToolChange('highlighter')}
            >
              <Highlighter className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Highlighter Tool</TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant={activeTool === 'eraser' ? "secondary" : "outline"} 
              size="sm" 
              onClick={() => onToolChange('eraser')}
            >
              <Eraser className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Eraser Tool</TooltipContent>
        </Tooltip>
        
        {!isMobile && (
          <>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => toast({ title: "Undo", description: "Undo functionality will be implemented soon." })}
                >
                  <Undo className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Undo</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => toast({ title: "Redo", description: "Redo functionality will be implemented soon." })}
                >
                  <Redo className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Redo</TooltipContent>
            </Tooltip>
            
            <input 
              type="color" 
              value={toolColor}
              onChange={(e) => onColorChange(e.target.value)}
              className="w-8 h-8 p-0 border border-gray-300 rounded-md"
            />
          </>
        )}
      </div>
      
      <ToolbarActions 
        onSave={onSave}
        onFullscreen={onFullscreen}
        isFullscreen={isFullscreen}
      />
    </div>
  );
};

interface ToolbarActionsProps {
  onSave: () => void;
  onFullscreen: () => void;
  isFullscreen: boolean;
}

const ToolbarActions: React.FC<ToolbarActionsProps> = ({ onSave, onFullscreen, isFullscreen }) => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  return (
    <div className="flex items-center space-x-2">
      <BoardFullscreenButton 
        onFullscreen={onFullscreen}
        isFullscreen={isFullscreen}
      />

      {!isMobile && (
        <>
          <Button 
            variant="outline" 
            size="sm"
            onClick={onSave}
          >
            <Download className="h-4 w-4 mr-2" />
            Save
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => toast({ title: "Settings", description: "Settings panel will be implemented soon." })}
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </>
      )}
    </div>
  );
};

interface BoardFullscreenButtonProps {
  onFullscreen: () => void;
  isFullscreen: boolean;
}

const BoardFullscreenButton: React.FC<BoardFullscreenButtonProps> = ({ onFullscreen, isFullscreen }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onFullscreen}
        >
          {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{isFullscreen ? "Exit Fullscreen" : "Fullscreen"}</TooltipContent>
    </Tooltip>
  );
};
