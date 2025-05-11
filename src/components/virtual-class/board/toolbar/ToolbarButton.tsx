
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipTrigger 
} from '@/components/ui/tooltip';

interface ToolbarButtonProps {
  icon: React.ReactNode;
  label: string;
  tooltipContent: string;
  active?: boolean;
  onClick: () => void;
}

export const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  icon,
  label,
  tooltipContent,
  active = false,
  onClick
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button 
          variant={active ? "secondary" : "outline"} 
          size="sm" 
          onClick={onClick}
        >
          {icon}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{tooltipContent}</TooltipContent>
    </Tooltip>
  );
};
