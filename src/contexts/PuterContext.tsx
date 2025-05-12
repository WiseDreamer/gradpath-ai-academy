
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
      console.log("Initializing Puter.js...");
      
      // Try to load Puter.js if not already available
      const checkPuterLoaded = setInterval(() => {
        if (window.puter) {
          console.log("Puter.js detected in window object");
          
          try {
            // Initialize authentication if needed
            // This would be the place to add API key authentication
            // if you have environment variables set:
            // if (import.meta.env.VITE_PUTER_API_KEY) {
            //   window.puter.auth.login({ apiKey: import.meta.env.VITE_PUTER_API_KEY });
            // }
            
            // For now, just use the global instance
            setPuter(window.puter);
            setIsLoaded(true);
            
            // Check if DB is available
            const dbAvailable = !!window.puter.db;
            setIsDbAvailable(dbAvailable);
            
            clearInterval(checkPuterLoaded);
            
            console.log("Puter.js loaded successfully. DB available:", dbAvailable);
          } catch (error) {
            console.error("Failed to initialize Puter:", error);
          }
        }
      }, 100);

      // Clean up interval
      return () => clearInterval(checkPuterLoaded);
    } else {
      // Puter.js is already loaded
      console.log("Puter.js was already in window object");
      
      try {
        // Initialize authentication if needed
        // if (import.meta.env.VITE_PUTER_API_KEY) {
        //   window.puter.auth.login({ apiKey: import.meta.env.VITE_PUTER_API_KEY });
        // }
        
        setPuter(window.puter);
        setIsLoaded(true);
        setIsDbAvailable(!!window.puter.db);
        console.log("Using existing Puter.js. DB available:", !!window.puter.db);
      } catch (error) {
        console.error("Failed to initialize existing Puter:", error);
      }
    }
  }, []);

  return (
    <PuterContext.Provider value={{ puter, isLoaded, isDbAvailable }}>
      {children}
    </PuterContext.Provider>
  );
};
