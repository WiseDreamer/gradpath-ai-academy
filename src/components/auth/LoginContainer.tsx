
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';
import LoginForm from './LoginForm';
import SocialLogin from './SocialLogin';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

interface LoginContainerProps {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error?: string | null;
}

const LoginContainer: React.FC<LoginContainerProps> = ({ 
  isLoading, 
  setIsLoading, 
  error 
}) => {
  return (
    <div className="w-full max-w-md animate-fade-in">
      <div className="rounded-xl shadow-card p-8 border border-gray-200 bg-white/95 backdrop-blur-sm">
        <div className="text-center mb-6">
          <Logo color="navy" className="justify-center" size="lg" />
          <h1 className="text-2xl font-bold mt-4 text-gradpath-navy">Welcome back</h1>
          <p className="text-gradpath-slate mt-1">Sign in to your academic journey</p>
        </div>
        
        {error && (
          <Alert variant="destructive" className="mb-6 bg-red-50">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <LoginForm isLoading={isLoading} setIsLoading={setIsLoading} />
        
        <SocialLogin isLoading={isLoading} setIsLoading={setIsLoading} />
        
        <div className="text-center mt-6">
          <p className="text-gradpath-slate">
            Don't have an account?{' '}
            <Link to="/register" className="text-gradpath-teal hover:underline font-medium">
              Register
            </Link>
          </p>
          
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center">
              Student community with over 10,000 members
            </p>
            <div className="flex justify-center mt-3 space-x-2">
              <img src="/images/university-logos/oxford.png" alt="University" className="h-6 w-auto opacity-50 hover:opacity-100 transition-opacity" />
              <img src="/images/university-logos/harvard.png" alt="University" className="h-6 w-auto opacity-50 hover:opacity-100 transition-opacity" />
              <img src="/images/university-logos/mit.png" alt="University" className="h-6 w-auto opacity-50 hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginContainer;
