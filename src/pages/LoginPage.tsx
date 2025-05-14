
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import { useAuth } from '@/components/AuthProvider';
import LoginContainer from '@/components/auth/LoginContainer';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { session, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [authCheckComplete, setAuthCheckComplete] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  console.log("Login page rendering, session:", !!session, "loading:", loading);

  // Handle URL error parameters (coming back from OAuth failures)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const error = params.get('error');
    const errorDescription = params.get('error_description');
    
    if (error) {
      console.log("Auth error from URL:", error, errorDescription);
      setAuthError(errorDescription || `Authentication error: ${error}`);
      
      // Clear the error parameters from the URL to prevent showing the error again on refresh
      if (window.history.replaceState) {
        const newURL = window.location.pathname;
        window.history.replaceState({}, document.title, newURL);
      }
    }
  }, []);

  // Only redirect after auth loading is complete
  useEffect(() => {
    if (!loading) {
      console.log("Auth loading complete on login page");
      setAuthCheckComplete(true);
      
      if (session) {
        console.log("Session found, redirecting to dashboard");
        navigate('/dashboard', { replace: true });
      } else {
        console.log("No session found, staying on login page");
      }
    }
  }, [session, navigate, loading]);
  
  // Display loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gradient-to-br from-gradpath-silver via-[#F5F7FA] to-[#E6EDF5]">
        <Logo color="navy" className="mb-4" />
        <div className="w-8 h-8 border-4 border-gradpath-navy border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600">Checking authentication...</p>
      </div>
    );
  }

  // If already authenticated and auth check is complete, don't render the login form
  if (session && authCheckComplete) {
    console.log("Session found in login page render, should redirect soon");
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gradient-to-br from-gradpath-silver via-[#F5F7FA] to-[#E6EDF5]">
        <Logo color="navy" className="mb-4" />
        <div className="w-8 h-8 border-4 border-gradpath-navy border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600">Redirecting to dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gradient-to-r from-gradpath-navy to-gradpath-slate">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="hidden md:flex flex-col items-start justify-center p-8 text-white">
          <h1 className="text-4xl font-bold mb-4">Academic Excellence Starts Here</h1>
          <p className="text-lg text-gray-200 mb-8">Access personalized learning resources, connect with peers, and achieve your academic goals with our comprehensive education platform.</p>
          <div className="flex gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white/20">
              <p className="text-sm font-medium">24/7 AI Tutoring</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white/20">
              <p className="text-sm font-medium">Peer Collaboration</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white/20">
              <p className="text-sm font-medium">Study Resources</p>
            </div>
          </div>
        </div>
        
        <LoginContainer 
          isLoading={isLoading} 
          setIsLoading={setIsLoading} 
          error={authError}
        />
      </div>
    </div>
  );
};

export default LoginPage;
