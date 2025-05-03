
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { User, BarChart, Settings, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserProfile } from '@/services/userProfileService';
import { useAuth } from '@/components/AuthProvider';

interface ProfileMenuProps {
  userProfile: UserProfile | null;
  loading: boolean;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ 
  userProfile,
  loading
}) => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [open, setOpen] = React.useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
        <User size={36} strokeWidth={2} />
      </Button>
    );
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/20 rounded-full overflow-hidden">
          {userProfile?.avatarUrl ? (
            <Avatar className="h-10 w-10">
              <AvatarImage src={userProfile.avatarUrl} alt={userProfile.username} />
              <AvatarFallback>{userProfile.username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
          ) : (
            <User size={36} strokeWidth={2} />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 bg-white" align="end">
        {userProfile && (
          <>
            <div className="flex items-center p-3">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={userProfile.avatarUrl} alt={userProfile.username} />
                <AvatarFallback>{userProfile.username[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-medium">{userProfile.username}</h4>
                <p className="text-xs text-gray-500">{userProfile.email}</p>
              </div>
            </div>
            <DropdownMenuSeparator />
          </>
        )}

        <DropdownMenuItem 
          className="cursor-pointer flex items-center py-2" 
          onClick={() => {
            navigate('/profile');
            setOpen(false);
          }}
        >
          <User className="mr-2 h-4 w-4" />
          <span>View Profile</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          className="cursor-pointer flex items-center py-2" 
          onClick={() => {
            navigate('/performance');
            setOpen(false);
          }}
        >
          <BarChart className="mr-2 h-4 w-4" />
          <span>Track My Performance</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          className="cursor-pointer flex items-center py-2" 
          onClick={() => {
            // Add settings route later
            setOpen(false);
          }}
        >
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          className="cursor-pointer flex items-center py-2 text-red-600" 
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;
