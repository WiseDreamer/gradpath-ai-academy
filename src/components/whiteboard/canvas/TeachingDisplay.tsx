
import React from 'react';
import { TeachingStatusProps } from '../types';

export const TeachingDisplay: React.FC<TeachingStatusProps> = ({
  isPlaying,
  isHandRaised,
  toggleMic,
  isMicOn,
  setIsHandRaised,
  setIsPlaying
}) => {
  if (isPlaying) {
    return (
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="animate-fade-in mb-8 text-center pt-10">
          <h2 className="text-xl font-semibold mb-3">Today's Topic: Linear Algebra Fundamentals</h2>
          <p className="text-gray-600">The AI tutor is currently explaining vector spaces and linear transformations</p>
        </div>
      </div>
    );
  }
  
  if (isHandRaised) {
    return (
      <RaiseHandView
        toggleMic={toggleMic}
        isMicOn={isMicOn}
        setIsHandRaised={setIsHandRaised}
      />
    );
  }
  
  return (
    <PausedView setIsPlaying={setIsPlaying} />
  );
};

const RaiseHandView: React.FC<{
  toggleMic: () => void,
  isMicOn: boolean,
  setIsHandRaised: (value: boolean) => void
}> = ({ toggleMic, isMicOn, setIsHandRaised }) => {
  return (
    <div className="absolute inset-0 z-10 bg-white/90 flex items-center justify-center">
      <div className="animate-fade-in text-center">
        <h3 className="text-lg font-medium mb-4">Ask your question</h3>
        <div className="flex flex-col items-center gap-4">
          <div className="w-full max-w-lg">
            <textarea 
              className="w-full h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gradpath-purple"
              placeholder="Type your question here..."
            />
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={toggleMic}>
              {isMicOn ? <MicOff className="mr-2 h-4 w-4" /> : <Mic className="mr-2 h-4 w-4" />}
              {isMicOn ? 'Turn Off Mic' : 'Use Voice'}
            </Button>
            <Button onClick={() => setIsHandRaised(false)}>
              Submit Question
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PausedView: React.FC<{
  setIsPlaying: (value: boolean) => void
}> = ({ setIsPlaying }) => {
  return (
    <div className="absolute inset-0 z-10 bg-white/90 flex items-center justify-center">
      <div className="animate-fade-in text-center">
        <p className="text-xl mb-4">Teaching paused</p>
        <Button onClick={() => setIsPlaying(true)}>Resume Teaching</Button>
      </div>
    </div>
  );
};

import { Button } from '@/components/ui/button';
import { Mic, MicOff } from 'lucide-react';
