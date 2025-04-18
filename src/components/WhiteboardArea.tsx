
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Pause, Play, Mic, MicOff, Hand } from 'lucide-react';

const WhiteboardArea: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMicOn, setIsMicOn] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  const toggleMic = () => {
    setIsMicOn(!isMicOn);
  };
  
  const raiseHand = () => {
    setIsHandRaised(!isHandRaised);
    setIsPlaying(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="whiteboard flex-1 rounded-lg p-6 flex flex-col justify-center items-center">
        {isPlaying ? (
          <div className="text-center">
            <div className="animate-fade-in mb-8">
              <h2 className="text-xl font-semibold mb-3">Today's Topic: Linear Algebra Fundamentals</h2>
              <p className="text-gray-600">The AI tutor is currently explaining vector spaces and linear transformations</p>
            </div>
            <div className="w-full max-w-2xl mx-auto">
              <div className="bg-white/80 p-4 rounded-lg border border-gradpath-purple/20 shadow-sm">
                <p className="text-gray-800">
                  A vector space is a collection of objects called vectors, which may be added together and 
                  multiplied by scalars. More formally, a vector space over a field F is a set V together 
                  with two operations...
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center p-8">
            {isHandRaised ? (
              <div className="animate-fade-in">
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
            ) : (
              <div className="animate-fade-in">
                <p className="text-xl mb-4">Teaching paused</p>
                <Button onClick={() => setIsPlaying(true)}>Resume Teaching</Button>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="flex justify-between items-center p-3 border-t">
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

export default WhiteboardArea;
