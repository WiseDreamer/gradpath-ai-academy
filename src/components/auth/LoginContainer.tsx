
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
    <div className="w-full max-w-md">
      <div className="rounded-lg shadow-lg p-8 border border-gray-100 bg-purple-200">
        <div className="text-center mb-6">
          <Logo color="purple" className="justify-center" />
          <h1 className="text-2xl font-bold mt-4">Welcome back</h1>
          <p className="text-sm text-gray-500 mt-1">Login to your account to continue learning</p>
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
          <p className="text-sm text-gray-500">
            Don't have an account?{' '}
            <Link to="/register" className="text-gradpath-purple hover:underline font-medium">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginContainer;
