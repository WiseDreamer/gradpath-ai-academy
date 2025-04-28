
import React from 'react';
import { Button } from '@/components/ui/button';
import { Pause, Play, Hand } from 'lucide-react';

interface WhiteboardControlBarProps {
  isPlaying: boolean;
  isHandRaised: boolean;
  togglePlay: () => void;
  raiseHand: () => void;
}

const WhiteboardControlBar: React.FC<WhiteboardControlBarProps> = ({
  isPlaying,
  isHandRaised,
  togglePlay,
  raiseHand
}) => {
  return (
    <div className="w-full bg-white border-t z-10 py-3 px-3">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={togglePlay}
          >
            {isPlaying ? (
              <>
                <Pause className="mr-2 h-4 w-4" /> Pause
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" /> Play
              </>
            )}
          </Button>
        </div>
        
        <Button
          variant={isHandRaised ? "secondary" : "outline"}
          size="sm"
          onClick={raiseHand}
          className={isHandRaised ? "bg-gradpath-soft-green text-gradpath-dark-purple" : ""}
        >
          <Hand className="mr-2 h-4 w-4" />
          {isHandRaised ? "Hand Raised" : "Raise Hand"}
        </Button>
      </div>
    </div>
  );
};

export default WhiteboardControlBar;
