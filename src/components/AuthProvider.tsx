
import { useEffect, createContext, useContext, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  signOut: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    console.log("AuthProvider initializing...");
    
    let mounted = true;
    
    // First set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state change event:", event);
        
        if (!mounted) return;
        
        if (currentSession) {
          console.log("Session updated via auth state change");
          setSession(currentSession);
          setUser(currentSession.user);
        } else if (event === 'SIGNED_OUT') {
          console.log("User signed out via auth state change");
          setSession(null);
          setUser(null);
          navigate('/', { replace: true });
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log("Current session check:", currentSession ? "Found session" : "No session");
      
      if (!mounted) return;
      
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
    });

    return () => {
      console.log("Cleaning up auth subscription");
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  const signOut = async () => {
    console.log("Attempting to sign out...");
    
    try {
      // Clear application state first for better UX
      setSession(null);
      setUser(null);
      
      // Inform user sign out is in progress
      toast({
        title: "Signing out...",
        description: "Please wait a moment.",
      });
      
      // Then attempt Supabase signout - wrap in a timeout to prevent race conditions
      setTimeout(async () => {
        try {
          const { error } = await supabase.auth.signOut();
          
          if (error) {
            console.error("Error in signOut API call:", error);
            throw error;
          }
          
          console.log("Sign out successful");
          toast({
            title: "Signed out",
            description: "You have been successfully signed out.",
          });
          
          // Navigate to login page
          navigate('/', { replace: true });
        } catch (error) {
          console.error("Failed to sign out:", error);
          
          // If the error is about missing session, it means the user is already signed out
          // so we can just navigate to the login page
          if (error instanceof Error && error.message.includes('session')) {
            console.log("Session already expired, navigating to login");
            navigate('/', { replace: true });
          } else {
            // Show error message
            toast({
              title: "Sign out failed",
              description: "Please try again or refresh your browser.",
              variant: "destructive",
            });
          }
          
          // Force navigation to login page anyway for better UX
          navigate('/', { replace: true });
        }
      }, 100);
    } catch (error) {
      console.error("Failed during sign out preparation:", error);
      
      // Show error message
      toast({
        title: "Sign out failed",
        description: "Please try again or refresh your browser.",
        variant: "destructive",
      });
      
      // Force navigation to login page anyway for better UX
      navigate('/', { replace: true });
    }
  };

  return (
    <AuthContext.Provider value={{ session, user, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
