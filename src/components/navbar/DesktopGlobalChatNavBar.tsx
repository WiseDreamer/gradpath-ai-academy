
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Home, Mail, Users, Grid3x3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Logo from '../Logo';
import DesktopNotifications from '../notifications/DesktopNotifications';
import ProfileMenu from '../profile/ProfileMenu';

interface DesktopGlobalChatNavBarProps {
  openMobileMenu?: () => void;
  currentPage?: string;
  notifications: any[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  loadingNotifications: boolean;
  userProfile: any;
  loadingProfile: boolean;
}

const DesktopGlobalChatNavBar: React.FC<DesktopGlobalChatNavBarProps> = ({
  openMobileMenu,
  currentPage,
  notifications,
  unreadCount,
  markAsRead,
  loadingNotifications,
  userProfile,
  loadingProfile
}) => {
  const navigate = useNavigate();
  const isActive = (path: string) => currentPage === path;

  const handleHomeClick = () => {
    if (currentPage === '/dashboard') {
      navigate('/global-chat');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="border-b bg-gradpath-purple text-white sticky top-0 z-50 w-full">
      <div className="w-full px-4">
        <div className="flex items-center justify-between h-20">
          {/* Left - Logo */}
          <div className="flex items-center">
            <Logo clickable={false} />
          </div>
          
          {/* Center - Main navigation */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={handleHomeClick} className={cn("rounded-full text-white hover:bg-white/20", isActive('/dashboard') && "bg-white/20")}>
              <Home size={24} strokeWidth={1.5} />
            </Button>
            
            <Link to="/messages">
              <Button variant="ghost" size="icon" className={cn("rounded-full text-white hover:bg-white/20", isActive('/messages') && "bg-white/20")}>
                <Mail size={24} strokeWidth={1.5} />
              </Button>
            </Link>
            
            <Link to="/friends">
              <Button variant="ghost" size="icon" className={cn("rounded-full text-white hover:bg-white/20", isActive('/friends') && "bg-white/20")}>
                <Users size={24} strokeWidth={1.5} />
              </Button>
            </Link>
          </div>
          
          {/* Right - User actions */}
          <div className="flex items-center gap-2">
            <DesktopNotifications 
              notifications={notifications} 
              unreadCount={unreadCount} 
              onMarkAsRead={markAsRead} 
              loadingNotifications={loadingNotifications} 
            />
            
            <ProfileMenu userProfile={userProfile} loading={loadingProfile} />
            
            <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20" onClick={openMobileMenu}>
              <Grid3x3 size={24} strokeWidth={1.5} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopGlobalChatNavBar;
