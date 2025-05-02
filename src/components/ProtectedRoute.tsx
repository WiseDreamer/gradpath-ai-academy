
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';

export default function ProtectedRoute() {
  const { session, loading } = useAuth();
  const { toast } = useToast();
  const location = useLocation();
  const [redirected, setRedirected] = useState(false);
  
  useEffect(() => {
    console.log("ProtectedRoute state:", { hasSession: !!session, loading });
  }, [session, loading]);
  
  // When auth loading is finished, check if user is authenticated
  useEffect(() => {
    if (!loading && !session && !redirected) {
      console.log("No session found in protected route, will redirect");
      setRedirected(true);
      toast({
        title: "Authentication required",
        description: "Please log in to access this page",
        variant: "destructive",
      });
    }
  }, [loading, session, redirected, toast]);
  
  // If still loading auth state, show loading indicator
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-gradpath-purple rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying authentication...</p>
        </div>
      </div>
    );
  }
  
  // Once loading is complete, if no session, redirect to login
  if (!session) {
    console.log("No auth session, redirecting to login page");
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  console.log("Session verified, rendering protected content");
  return <Outlet />;
}
