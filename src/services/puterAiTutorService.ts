
import { usePuter } from '@/contexts/PuterContext';
import { useState, useCallback } from 'react';

export const usePuterAiTutor = () => {
  const { puter, isLoaded } = usePuter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  // Ask a question with board state
  const askQuestion = useCallback(async (question: string, boardState: string) => {
    if (!isLoaded || !puter) {
      throw new Error('Puter.js is not loaded yet');
    }
    
    setIsProcessing(true);
    
    try {
      const prompt = `You are a helpful AI tutor assisting with mathematics problems. Here is a snapshot of the current whiteboard: ${boardState}

Student question: ${question}

Please provide a clear, step-by-step explanation. Keep in mind that I can see what's on the whiteboard.`;

      // Use streaming for more interactive responses
      return await puter.ai.chat(prompt, { stream: true });
    } finally {
      setIsProcessing(false);
    }
  }, [puter, isLoaded]);
  
  // Text-to-speech function
  const speak = useCallback(async (text: string) => {
    if (!isLoaded || !puter) {
      throw new Error('Puter.js is not loaded yet');
    }
    
    setIsSpeaking(true);
    try {
      await puter.tts.speak(text);
    } finally {
      setIsSpeaking(false);
    }
  }, [puter, isLoaded]);

  return {
    askQuestion,
    speak,
    isProcessing,
    isSpeaking,
    isLoaded: isLoaded && !!puter
  };
};
