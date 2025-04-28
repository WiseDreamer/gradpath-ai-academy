
import React from 'react';
import { Button } from '@/components/ui/button';
import { Pen, Highlighter, Settings, Undo, Maximize, Minimize } from 'lucide-react';
import { 
  Tooltip, 
  TooltipTrigger, 
  TooltipContent, 
  TooltipProvider 
} from '@/components/ui/tooltip';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';

type Tool = 'pen' | 'highlighter' | 'eraser' | 'none';
type ThemeMode = 'light' | 'dark';

interface WhiteboardToolbarProps {
  activeTool: Tool;
  handleToolChange: (tool: Tool) => void;
  handleThemeChange: (theme: ThemeMode) => void;
  clearCanvas: () => void;
  isFullscreen: boolean;
  toggleFullscreen: () => void;
}

const WhiteboardToolbar: React.FC<WhiteboardToolbarProps> = ({
  activeTool,
  handleToolChange,
  handleThemeChange,
  clearCanvas,
  isFullscreen,
  toggleFullscreen
}) => {
  return (
    <div className="p-2 border-b flex justify-end space-x-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant={activeTool === 'pen' ? "secondary" : "outline"} 
              size="sm"
              onClick={() => handleToolChange('pen')}
              className="flex items-center gap-1"
            >
              <Pen className="h-4 w-4" />
              <span className="hidden md:inline">Pen</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Draw on whiteboard</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant={activeTool === 'highlighter' ? "secondary" : "outline"} 
              size="sm"
              onClick={() => handleToolChange('highlighter')}
              className="flex items-center gap-1"
            >
              <Highlighter className="h-4 w-4" />
              <span className="hidden md:inline">Highlight</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Highlight content</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <DropdownMenu>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Settings className="h-4 w-4" />
                  <span className="hidden md:inline">Settings</span>
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleThemeChange('light')}>
                Light Theme
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleThemeChange('dark')}>
                Dark Theme
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                English
              </DropdownMenuItem>
              <DropdownMenuItem>
                Spanish
              </DropdownMenuItem>
              <DropdownMenuItem>
                French
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <TooltipContent>
            <p>Whiteboard settings</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              size="sm"
              onClick={clearCanvas}
              className="flex items-center gap-1"
            >
              <Undo className="h-4 w-4" />
              <span className="hidden md:inline">Undo</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Undo last action</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              size="sm"
              onClick={toggleFullscreen}
              className="flex items-center gap-1"
            >
              {isFullscreen ? (
                <Minimize className="h-4 w-4" />
              ) : (
                <Maximize className="h-4 w-4" />
              )}
              <span className="hidden md:inline">
                {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isFullscreen ? 'Exit fullscreen mode' : 'Enter fullscreen mode'}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default WhiteboardToolbar;
