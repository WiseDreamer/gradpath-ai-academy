
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
    <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-2 flex justify-center gap-2 z-20">
      <Button
        variant="outline"
        size="sm"
        onClick={togglePlay}
        className="flex items-center gap-1"
      >
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        <span className="hidden sm:inline">{isPlaying ? 'Pause' : 'Play'}</span>
      </Button>
      
      <Button
        variant={isHandRaised ? "secondary" : "outline"}
        size="sm"
        onClick={raiseHand}
        className="flex items-center gap-1"
      >
        <Hand className="h-4 w-4" />
        <span className="hidden sm:inline">Raise Hand</span>
      </Button>
      
      <Button
        variant={isMicOn ? "secondary" : "outline"}
        size="sm"
        onClick={toggleMic}
        className="flex items-center gap-1"
      >
        {isMicOn ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
        <span className="hidden sm:inline">{isMicOn ? 'Mute' : 'Unmute'}</span>
      </Button>
    </div>
  );
};

export default WhiteboardControlBar;
