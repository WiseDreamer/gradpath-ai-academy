
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import FormInput from '@/components/FormInput';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

interface LoginFormProps {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ isLoading, setIsLoading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    
    // Validate inputs
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
      console.log("Attempting to log in with email/password");
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      // Show success message
      toast({
        title: "Success",
        description: "You have been successfully logged in.",
      });
      
      // Auth state change will trigger redirection to dashboard
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to login. Please check your credentials.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-purple-200">
      <FormInput 
        label="Email" 
        id="email" 
        type="email" 
        placeholder="your@email.com" 
        value={email} 
        onChange={e => setEmail(e.target.value)} 
        error={errors.email} 
        disabled={isLoading} 
      />
      
      <FormInput 
        label="Password" 
        id="password" 
        type="password" 
        placeholder="••••••••" 
        value={password} 
        onChange={e => setPassword(e.target.value)} 
        error={errors.password} 
        disabled={isLoading} 
      />
      
      <div className="flex justify-between items-center text-sm">
        <Link to="/forgot-password" className="text-gradpath-purple hover:underline">
          Forgot password?
        </Link>
      </div>
      
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;
