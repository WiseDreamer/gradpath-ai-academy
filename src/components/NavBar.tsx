import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Home, Mail, Search, HelpCircle, ChevronLeft } from 'lucide-react';
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
  const showBack = location.pathname !== "/dashboard";
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
  const iconProps = {
    size: 36,
    strokeWidth: 2.5
  };

  if (variant === 'ai-tutor') {
    return <div className="border-b bg-gradpath-purple text-white sticky top-0 z-50 w-full">
        <div className="w-full">
          {/* Top Section */}
          <div className="flex items-center justify-between h-20 px-0">
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="hover:bg-white/20 ml-0 px-0">
                <ChevronLeft {...iconProps} />
              </Button>
              <Logo clickable={false} />
              <span className="text-lg font-medium ml-2">AI Tutor</span>
            </div>
            <div className="flex items-center gap-2 mr-0">
              <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
                <Search className="w-8 h-8" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20 mr-0" onClick={openMobileMenu}>
                <Menu className="w-8 h-8" />
              </Button>
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
  
  return <div className="border-b bg-gradpath-purple text-white sticky top-0 z-50 w-full">
      <div className="w-full px-0">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-1">
            {showBack && <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="hover:bg-white/20 ml-0">
                <ChevronLeft {...iconProps} />
              </Button>}
            <Logo clickable={false} />
          </div>
          <div className="flex items-center gap-2">
            {variant === 'social' ? <>
                <Link to="/messages">
                  <Button variant="ghost" size="icon" className={cn("rounded-full text-white hover:bg-white/20", isActive('/messages') && "bg-white/20")}>
                    <Mail className="w-8 h-8" />
                  </Button>
                </Link>
                {isMobile ? <MobileNotifications notifications={notifications} unreadCount={unreadCount} onMarkAsRead={markAsRead} loadingNotifications={loadingNotifications} /> : <DesktopNotifications notifications={notifications} unreadCount={unreadCount} onMarkAsRead={markAsRead} loadingNotifications={loadingNotifications} />}
                <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
                  <HelpCircle className="w-8 h-8" />
                </Button>
                <ProfileMenu userProfile={userProfile} loading={loadingProfile} />
                <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20 mr-0" onClick={openMobileMenu}>
                  <Menu className="w-8 h-8" />
                </Button>
              </> : <>
                {isMobile ? <MobileNotifications notifications={notifications} unreadCount={unreadCount} onMarkAsRead={markAsRead} loadingNotifications={loadingNotifications} /> : <DesktopNotifications notifications={notifications} unreadCount={unreadCount} onMarkAsRead={markAsRead} loadingNotifications={loadingNotifications} />}
                <ProfileMenu userProfile={userProfile} loading={loadingProfile} />
                <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20 mr-0" onClick={openMobileMenu}>
                  <Menu className="w-8 h-8" />
                </Button>
              </>}
          </div>
        </div>
      </div>
    </div>;
};

export default NavBar;
