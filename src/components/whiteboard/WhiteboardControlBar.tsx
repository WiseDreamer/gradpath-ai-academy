
import React from 'react';
import { Button } from '@/components/ui/button';
import { Pause, Play, Hand, Mic, MicOff } from 'lucide-react';

interface WhiteboardControlBarProps {
  isPlaying: boolean;
  isHandRaised: boolean;
  isMicOn: boolean;
  togglePlay: () => void;
  raiseHand: () => void;
  toggleMic: () => void;
}

const WhiteboardControlBar: React.FC<WhiteboardControlBarProps> = ({
  isPlaying,
  isHandRaised,
  isMicOn,
  togglePlay,
  raiseHand,
  toggleMic
}) => {
  return (
    <div className="w-full bg-white border-t z-10 py-3 px-3 absolute bottom-0 left-0">
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
          
          <Button
            variant={isMicOn ? "secondary" : "outline"}
            size="sm"
            onClick={toggleMic}
            className={isMicOn ? "bg-gradpath-soft-green text-gradpath-dark-purple" : ""}
          >
            {isMicOn ? (
              <Mic className="mr-2 h-4 w-4" />
            ) : (
              <MicOff className="mr-2 h-4 w-4" />
            )}
            {isMicOn ? "Mic On" : "Mic Off"}
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
