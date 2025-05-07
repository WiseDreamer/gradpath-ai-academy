import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Home, Mail, Search, HelpCircle, MessageSquare, Bell, User, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Logo from './Logo';
import { useNotifications } from '@/hooks/useNotifications';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useIsMobile } from '@/hooks/use-mobile';
import DesktopNotifications from './notifications/DesktopNotifications';
import MobileNotifications from './notifications/MobileNotifications';
import ProfileMenu from './profile/ProfileMenu';
interface NavBarProps {
  openMobileMenu?: () => void;
  currentPage?: string;
  variant?: 'learning' | 'social' | 'ai-tutor';
}
const NavBar: React.FC<NavBarProps> = ({
  openMobileMenu,
  currentPage,
  variant = 'learning'
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const {
    notifications,
    unreadCount,
    loading: loadingNotifications,
    markAsRead
  } = useNotifications();
  const {
    userProfile,
    loading: loadingProfile
  } = useUserProfile();
  const isActive = (path: string) => location.pathname === path || currentPage === path;
  const handleHomeClick = () => {
    if (location.pathname === '/global-chat') {
      navigate('/dashboard');
    } else {
      navigate('/global-chat');
    }
  };
  if (variant === 'ai-tutor') {
    return <div className="border-b bg-gradpath-purple text-white sticky top-0 z-50 w-full">
        <div className="w-full">
          {/* Top Section */}
          <div className="flex items-center justify-between h-20 px-0">
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="hover:bg-white/20 ml-0 px-0">
                <Home size={36} strokeWidth={1.5} />
              </Button>
              <Logo clickable={false} />
              <span className="text-lg font-medium ml-2">AI Tutor</span>
            </div>
            <div className="flex items-center gap-2 mr-0">
              <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
                <Search size={36} strokeWidth={1.5} />
              </Button>
              {!isMobile && <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20 mr-0" onClick={openMobileMenu}>
                  <Menu size={36} strokeWidth={1.5} />
                </Button>}
            </div>
          </div>
          {/* Bottom Section */}
          <div className="h-16 flex items-center justify-between border-t border-white/20 px-0">
            {isMobile ? <MobileNotifications notifications={notifications} unreadCount={unreadCount} onMarkAsRead={markAsRead} loadingNotifications={loadingNotifications} /> : <DesktopNotifications notifications={notifications} unreadCount={unreadCount} onMarkAsRead={markAsRead} loadingNotifications={loadingNotifications} />}
            <ProfileMenu userProfile={userProfile} loading={loadingProfile} />
          </div>
        </div>
      </div>;
  }
  if (variant === 'social' && isMobile) {
    return <div className="border-b bg-gradpath-purple text-white sticky top-0 z-50 w-full">
        <div className="w-full">
          {/* Top Section with Logo and Icons */}
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center">
              <Logo clickable={false} />
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 p-1">
                <Search size={24} strokeWidth={1.5} />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 p-1" onClick={openMobileMenu}>
                <Menu size={24} strokeWidth={1.5} />
              </Button>
            </div>
          </div>
          
          {/* Bottom Navigation Icons */}
          <div className="h-14 flex items-center justify-between border-t border-white/20 px-6">
            <Button variant="ghost" onClick={handleHomeClick} className={cn("flex flex-col items-center justify-center text-white hover:bg-white/20", isActive('/dashboard') && "bg-white/20")}>
              <Home size={24} strokeWidth={1.5} />
            </Button>
            
            <Button variant="ghost" onClick={() => navigate('/friends')} className={cn("flex flex-col items-center justify-center text-white hover:bg-white/20", isActive('/friends') && "bg-white/20")}>
              <Users size={24} strokeWidth={1.5} />
            </Button>
            
            <Button variant="ghost" onClick={() => navigate('/messages')} className={cn("flex flex-col items-center justify-center text-white hover:bg-white/20", isActive('/messages') && "bg-white/20")}>
              <Mail size={24} strokeWidth={1.5} />
            </Button>
            
            <Button variant="ghost" onClick={() => navigate('/notifications')} className={cn("flex flex-col items-center justify-center text-white hover:bg-white/20", isActive('/notifications') && "bg-white/20")}>
              <Bell size={24} strokeWidth={1.5} />
            </Button>
            
            <Button variant="ghost" onClick={() => navigate('/profile')} className={cn("flex flex-col items-center justify-center text-white hover:bg-white/20", isActive('/profile') && "bg-white/20")}>
              <User size={24} strokeWidth={1.5} />
            </Button>
          </div>
        </div>
      </div>;
  }
  return <div className="border-b bg-gradpath-purple text-white sticky top-0 z-50 w-full">
      <div className="w-full px-0">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-1">
            
            <Logo clickable={false} />
          </div>
          <div className="flex items-center gap-2">
            {variant === 'social' ? <>
                <Link to="/messages">
                  <Button variant="ghost" size="icon" className={cn("rounded-full text-white hover:bg-white/20", isActive('/messages') && "bg-white/20")}>
                    <Mail size={36} strokeWidth={1.5} />
                  </Button>
                </Link>
                <Link to="/global-chat">
                  <Button variant="ghost" size="icon" className={cn("rounded-full text-white hover:bg-white/20", isActive('/global-chat') && "bg-white/20")}>
                    <MessageSquare size={36} strokeWidth={1.5} />
                  </Button>
                </Link>
                {isMobile ? <MobileNotifications notifications={notifications} unreadCount={unreadCount} onMarkAsRead={markAsRead} loadingNotifications={loadingNotifications} /> : <DesktopNotifications notifications={notifications} unreadCount={unreadCount} onMarkAsRead={markAsRead} loadingNotifications={loadingNotifications} />}
                <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
                  <HelpCircle size={36} strokeWidth={1.5} />
                </Button>
                <ProfileMenu userProfile={userProfile} loading={loadingProfile} />
              </> : <>
                <Link to="/global-chat">
                  <Button variant="ghost" size="icon" className={cn("rounded-full text-white hover:bg-white/20", isActive('/global-chat') && "bg-white/20")}>
                    <MessageSquare size={36} strokeWidth={1.5} />
                  </Button>
                </Link>
                {isMobile ? <MobileNotifications notifications={notifications} unreadCount={unreadCount} onMarkAsRead={markAsRead} loadingNotifications={loadingNotifications} /> : <DesktopNotifications notifications={notifications} unreadCount={unreadCount} onMarkAsRead={markAsRead} loadingNotifications={loadingNotifications} />}
                <ProfileMenu userProfile={userProfile} loading={loadingProfile} />
              </>}
          </div>
        </div>
      </div>
    </div>;
};
export default NavBar;