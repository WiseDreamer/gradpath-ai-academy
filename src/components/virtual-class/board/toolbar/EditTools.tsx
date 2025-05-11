
import React from 'react';
import { Undo, Redo } from 'lucide-react';
import { ToolbarButton } from './ToolbarButton';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

export const EditTools: React.FC = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  // If mobile, don't render these tools
  if (isMobile) return null;
  
  const showToast = (action: string) => {
    toast({ 
      title: action, 
      description: `${action} functionality will be implemented soon.` 
    });
  };
  
  return (
    <>
      <ToolbarButton 
        icon={<Undo className="h-4 w-4" />}
        label="Undo"
        tooltipContent="Undo"
        onClick={() => showToast("Undo")}
      />
      
      <ToolbarButton 
        icon={<Redo className="h-4 w-4" />}
        label="Redo" 
        tooltipContent="Redo"
        onClick={() => showToast("Redo")}
      />
    </>
  );
};
