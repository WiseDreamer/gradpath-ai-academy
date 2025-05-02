
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Chrome, Mail } from 'lucide-react';
import SocialButton from '@/components/SocialButton';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Updated type definition to match Supabase's supported providers
type SupportedProvider = 'google' | 'azure';

interface SocialLoginProps {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const SocialLogin: React.FC<SocialLoginProps> = ({ isLoading, setIsLoading }) => {
  const { toast } = useToast();

  const handleSocialLogin = async (provider: SupportedProvider) => {
    try {
      setIsLoading(true);
      console.log(`Attempting to log in with ${provider}`);
      
      // For preview environments, we need to ensure the redirect URL is valid
      const baseUrl = window.location.origin;
      const redirectTo = `${baseUrl}/dashboard`;
      
      console.log("Using redirect URL:", redirectTo);
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo
        }
      });
      
      if (error) throw error;
      
      // The OAuth flow will redirect the user
    } catch (error: any) {
      console.error(`${provider} login error:`, error);
      toast({
        title: "Error",
        description: `Failed to login with ${provider}. Please try again.`,
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  return (
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
        <SocialButton 
          icon={Chrome} 
          provider="Google" 
          onClick={() => handleSocialLogin('google')} 
        />
        <SocialButton 
          icon={Mail} 
          provider="Microsoft" 
          onClick={() => handleSocialLogin('azure')} 
        />
      </div>
    </div>
  );
};

export default SocialLogin;
