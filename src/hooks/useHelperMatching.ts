
import { useState, useEffect } from 'react';

interface Helper {
  id: number;
  name: string;
  avatar: string | null;
  rating: number;
  expertise: string;
  status: string;
}

interface UseHelperMatchingResult {
  showMatching: boolean;
  matchedHelper: Helper | null;
  matchProgress: number;
  startMatching: () => void;
  handleStartSession: () => void;
  closeMatching: () => void;
}

export const useHelperMatching = (): UseHelperMatchingResult => {
  const [showMatching, setShowMatching] = useState<boolean>(false);
  const [matchedHelper, setMatchedHelper] = useState<Helper | null>(null);
  const [matchProgress, setMatchProgress] = useState<number>(0);

  const startMatching = () => {
    setShowMatching(true);
    setMatchProgress(0);
    
    // Simulate matching progress
    const interval = setInterval(() => {
      setMatchProgress(prev => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          // After 100%, simulate finding a match
          setTimeout(() => {
            // Mock helper data - in a real app, this would come from an API
            setMatchedHelper({
              id: 1, 
              name: 'Emma Watson', 
              avatar: null, 
              rating: 4.9, 
              expertise: 'Machine Learning',
              status: 'available'
            });
          }, 500);
        }
        return newProgress;
      });
    }, 300);
  };

  const handleStartSession = () => {
    // In a real app, this would start the session with the matched helper
    closeMatching();
    // Would navigate to a chat/voice session page
  };

  const closeMatching = () => {
    setShowMatching(false);
    setMatchedHelper(null);
    setMatchProgress(0);
  };

  return {
    showMatching,
    matchedHelper,
    matchProgress,
    startMatching,
    handleStartSession,
    closeMatching
  };
};
