
import React from 'react';
import { Download, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { BoardFullscreenButton } from './BoardFullscreenButton';

interface BoardToolbarActionsProps {
  onSave: () => void;
  onFullscreen: () => void;
  isFullscreen: boolean;
}

export const BoardToolbarActions: React.FC<BoardToolbarActionsProps> = ({
  onSave,
  onFullscreen,
  isFullscreen
}) => {
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
