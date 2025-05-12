
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
    // Check for Puter.js script and load it if not already loaded
    if (!window.puter) {
      // Try to load Puter.js if not already available
      const checkPuterLoaded = setInterval(() => {
        if (window.puter) {
          setPuter(window.puter);
          setIsLoaded(true);
          
          // Check if DB is available
          setIsDbAvailable(!!window.puter.db);
          
          clearInterval(checkPuterLoaded);
          
          console.log("Puter.js loaded. DB available:", !!window.puter.db);
          
          // Try to initialize authentication if needed
          try {
            // You would typically do something like this if you had an API key:
            // window.puter.auth.login({ apiKey: 'YOUR_API_KEY' });
          } catch (error) {
            console.error("Failed to authenticate with Puter:", error);
          }
        }
      }, 100);

      // Clean up interval
      return () => clearInterval(checkPuterLoaded);
    } else {
      // Puter.js is already loaded
      setPuter(window.puter);
      setIsLoaded(true);
      setIsDbAvailable(!!window.puter.db);
      console.log("Puter.js was already loaded. DB available:", !!window.puter.db);
    }
  }, []);

  return (
    <PuterContext.Provider value={{ puter, isLoaded, isDbAvailable }}>
      {children}
    </PuterContext.Provider>
  );
};
