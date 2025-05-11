
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
  db?: PuterDB; // Make db optional to handle when it's not available
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
  isDbAvailable: boolean; // Add flag to check if DB is available
}

const PuterContext = createContext<PuterContextType>({
  puter: null,
  isLoaded: false,
  isDbAvailable: false,
});

export const usePuter = () => useContext(PuterContext);

export const PuterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [puter, setPuter] = useState<Puter | null>(null);
  const [isDbAvailable, setIsDbAvailable] = useState(false);

  useEffect(() => {
    const checkPuterLoaded = setInterval(() => {
      if (window.puter) {
        setPuter(window.puter);
        setIsLoaded(true);
        
        // Check if DB is available
        setIsDbAvailable(!!window.puter.db);
        
        clearInterval(checkPuterLoaded);
        
        console.log("Puter.js loaded. DB available:", !!window.puter.db);
      }
    }, 100);

    // Clean up interval
    return () => clearInterval(checkPuterLoaded);
  }, []);

  return (
    <PuterContext.Provider value={{ puter, isLoaded, isDbAvailable }}>
      {children}
    </PuterContext.Provider>
  );
};
