
import { useState, useEffect } from 'react';
import { UserProfile, fetchUserProfile } from '@/services/userProfileService';
import { useToast } from '@/hooks/use-toast';

export const useUserProfile = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        setLoading(true);
        const profile = await fetchUserProfile();
        setUserProfile(profile);
      } catch (error) {
        console.error('Error loading user profile:', error);
        toast({
          variant: 'destructive',
          title: 'Error loading profile',
          description: 'Please try again later.'
        });
      } finally {
        setLoading(false);
      }
    };

    loadUserProfile();
  }, [toast]);

  return {
    userProfile,
    loading
  };
};
