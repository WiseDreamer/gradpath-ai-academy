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
  return;
};
export default WhiteboardControlBar;