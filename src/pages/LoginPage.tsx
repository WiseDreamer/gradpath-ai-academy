import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Chrome, Mail } from 'lucide-react';
import FormInput from '@/components/FormInput';
import SocialButton from '@/components/SocialButton';
import Logo from '@/components/Logo';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const newErrors: {
      email?: string;
      password?: string;
    } = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }
    try {
      const {
        error
      } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  return <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gradient-to-b from-white to-gray-100">
      <div className="w-full max-w-md">
        <div className="rounded-lg shadow-lg p-8 border border-gray-100 bg-purple-200">
          <div className="text-center mb-6">
            <Logo color="purple" className="justify-center" />
            <h1 className="text-2xl font-bold mt-4">Welcome back</h1>
            <p className="text-sm text-gray-500 mt-1">Login to your account to continue learning</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4 bg-[gradpath-bright-blue] bg-rose-300">
            <FormInput label="Email" id="email" type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} error={errors.email} disabled={isLoading} />
            
            <FormInput label="Password" id="password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} error={errors.password} disabled={isLoading} />
            
            <div className="flex justify-between items-center text-sm">
              <Link to="/forgot-password" className="text-gradpath-purple hover:underline">
                Forgot password?
              </Link>
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
            </div>
            
            <div className="mt-4 space-y-2">
              <SocialButton icon={Chrome} provider="Google" />
              <SocialButton icon={Mail} provider="Microsoft" />
            </div>
          </div>
          
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
    </div>;
};
export default LoginPage;