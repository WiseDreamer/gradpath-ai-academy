
import React from 'react';
import { Button } from '@/components/ui/button';
import { Hand, Play, Pause, Mic, MicOff, Volume, VolumeX } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ClassroomControlsProps {
  isHandRaised: boolean;
  setIsHandRaised: (value: boolean) => void;
  isMicOn: boolean;
  setIsMicOn: (value: boolean) => void;
  isSpeakerOn: boolean;
  setIsSpeakerOn: (value: boolean) => void;
  isPaused: boolean;
  setIsPaused: (value: boolean) => void;
}

export const ClassroomControls: React.FC<ClassroomControlsProps> = ({
  isHandRaised,
  setIsHandRaised,
  isMicOn,
  setIsMicOn,
  isSpeakerOn,
  setIsSpeakerOn,
  isPaused,
  setIsPaused
}) => {
  const { toast } = useToast();
  
  const handleRaiseHand = () => {
    setIsHandRaised(!isHandRaised);
    
    if (!isHandRaised) {
      toast({
        title: "Hand Raised",
        description: "The AI tutor will respond to your hand raise shortly.",
      });
    }
  };
  
  const handlePauseResume = () => {
    setIsPaused(!isPaused);
    
    if (isPaused) {
      toast({
        title: "Class Resumed",
        description: "The virtual class has been resumed."
      });
    } else {
      toast({
        title: "Class Paused",
        description: "The virtual class has been paused. You can resume at any time."
      });
    }
  };
  
  return (
    <div className="flex gap-2 p-3 border-t border-gray-200">
      <Button
        variant={isHandRaised ? "secondary" : "outline"}
        size="sm"
        onClick={handleRaiseHand}
        className="flex-1"
      >
        <Hand className="h-4 w-4 mr-2" />
        {isHandRaised ? "Hand Raised" : "Raise Hand"}
      </Button>
      
      <Button
        variant={isPaused ? "secondary" : "outline"}
        size="sm"
        onClick={handlePauseResume}
        className="flex-1"
      >
        {isPaused ? <Play className="h-4 w-4 mr-2" /> : <Pause className="h-4 w-4 mr-2" />}
        {isPaused ? "Resume" : "Pause"}
      </Button>
      
      <Button
        variant={isMicOn ? "secondary" : "outline"}
        size="sm"
        onClick={() => setIsMicOn(!isMicOn)}
        className="flex-shrink-0"
      >
        {isMicOn ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
      </Button>
      
      <Button
        variant={isSpeakerOn ? "secondary" : "outline"}
        size="sm"
        onClick={() => setIsSpeakerOn(!isSpeakerOn)}
        className="flex-shrink-0"
      >
        {isSpeakerOn ? <Volume className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
      </Button>
    </div>
  );
};
