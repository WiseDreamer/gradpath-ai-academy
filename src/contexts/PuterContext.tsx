
import React, { createContext, useContext, useEffect, useState } from 'react';

// Define the type for the Puter global object
interface PuterAI {
  chat: (prompt: string, options?: any) => Promise<string>;
  txt2img: (prompt: string, testMode?: boolean) => Promise<HTMLImageElement>;
}

interface PuterDB {
  table: (name: string) => any;
}

interface PuterTTS {
  speak: (text: string, options?: any) => void;
}

interface Puter {
  ai: PuterAI;
  db: PuterDB;
  tts: PuterTTS;
  print: (text: string) => void;
}

declare global {
  interface Window {
    puter?: Puter;
  }
}

interface PuterContextType {
  puter: Puter | null;
  isLoaded: boolean;
}

const PuterContext = createContext<PuterContextType>({
  puter: null,
  isLoaded: false,
});

export const usePuter = () => useContext(PuterContext);

export const PuterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [puter, setPuter] = useState<Puter | null>(null);

  useEffect(() => {
    const checkPuterLoaded = setInterval(() => {
      if (window.puter) {
        setPuter(window.puter);
        setIsLoaded(true);
        clearInterval(checkPuterLoaded);
      }
    }, 100);

    return () => clearInterval(checkPuterLoaded);
  }, []);

  return (
    <PuterContext.Provider value={{ puter, isLoaded }}>
      {children}
    </PuterContext.Provider>
  );
};
