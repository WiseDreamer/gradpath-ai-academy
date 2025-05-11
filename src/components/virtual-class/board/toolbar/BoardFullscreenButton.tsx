
import React from 'react';
import { Maximize, Minimize } from 'lucide-react';
import { ToolbarButton } from './ToolbarButton';

interface BoardFullscreenButtonProps {
  onFullscreen: () => void;
  isFullscreen: boolean;
}

export const BoardFullscreenButton: React.FC<BoardFullscreenButtonProps> = ({
  onFullscreen,
  isFullscreen
}) => {
  const icon = isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />;
  const tooltip = isFullscreen ? "Exit Fullscreen" : "Fullscreen";
  
  return (
    <ToolbarButton 
      icon={icon}
      label={tooltip}
      tooltipContent={tooltip}
      onClick={onFullscreen}
    />
  );
};
