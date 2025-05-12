// src/services/puterAiTutorService.ts
import { usePuter } from '@/contexts/PuterContext';
import { useState, useCallback } from 'react';

export const usePuterAiTutor = () => {
  const { puter, isLoaded } = usePuter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const askQuestion = useCallback(
    async (question: string, boardState: string) => {
      if (!isLoaded || !puter) {
        throw new Error('Puter.js is not loaded yet');
      }
      setIsProcessing(true);
      try {
        // Prompt tailored for brief, stepwise teaching
        const prompt = `
You are an AI tutor. Explain in short, 1–2 sentence teaching points, pausing between each. The student can see the whiteboard snapshot below:

${boardState}

Student asks: ${question}

After each point, wait for the student to draw or ask another question.
`;
        return puter.ai.chat(prompt, { stream: true });
      } finally {
        setIsProcessing(false);
      }
    },
    [puter, isLoaded]
  );

  const speak = useCallback(
    async (text: string) => {
      if (!isLoaded || !puter) {
        throw new Error('Puter.js is not loaded yet');
      }
      setIsSpeaking(true);
      try {
        await puter.tts.speak(text);
      } finally {
        setIsSpeaking(false);
      }
    },
    [puter, isLoaded]
  );

  return {
    askQuestion,
    speak,
    isProcessing,
    isSpeaking,
    isLoaded: Boolean(isLoaded && puter),
  };
};
