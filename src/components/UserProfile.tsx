
import { useEffect, useState } from 'react';
import { useAuth } from './AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface Profile {
  id: string;
  username: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
}

interface UserRole {
  role: string;
}

export default function UserProfile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        setLoading(true);
        
        if (!user) return;
        
        // Fetch profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (profileError) throw profileError;
        setProfile(profileData);
        
        // Fetch role
        const { data: roleData, error: roleError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .single();
        
        if (roleError) throw roleError;
        setUserRole(roleData.role);
      } catch (error: any) {
        console.error('Error loading profile:', error);
        toast({
          title: 'Error loading profile',
          description: error.message,
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [user, toast]);

  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-sm border">
      <CardHeader>
        <CardTitle>Your Profile</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center p-4">
            <p>Loading profile...</p>
          </div>
        ) : profile ? (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                {profile.avatar_url ? (
                  <AvatarImage src={profile.avatar_url} alt={profile.username} />
                ) : (
                  <AvatarFallback className="bg-gradpath-purple text-white text-lg">
                    {profile.username?.[0]?.toUpperCase() || 'U'}
                  </AvatarFallback>
                )}
              </Avatar>
              <div>
                <h3 className="font-semibold text-lg">{profile.full_name || profile.username}</h3>
                <p className="text-sm text-gray-500">@{profile.username}</p>
                <div className="mt-1">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradpath-purple/10 text-gradpath-purple">
                    {userRole === 'admin' ? 'Admin' : userRole === 'moderator' ? 'Moderator' : 'User'}
                  </span>
                </div>
              </div>
            </div>
            {profile.bio && (
              <p className="text-sm text-gray-700">{profile.bio}</p>
            )}
            <Button 
              variant="outline" 
              className="mt-2"
              onClick={() => toast({
                title: "Coming soon",
                description: "Profile editing will be available soon!",
              })}
            >
              Edit Profile
            </Button>
          </div>
        ) : (
          <p>No profile found. Please contact support.</p>
        )}
      </CardContent>
    </Card>
  );
}
