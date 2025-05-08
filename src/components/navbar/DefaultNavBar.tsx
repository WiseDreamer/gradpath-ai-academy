
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, MessageSquare, Grid3X3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Logo from '../Logo';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileNotifications from '../notifications/MobileNotifications';
import DesktopNotifications from '../notifications/DesktopNotifications';
import ProfileMenu from '../profile/ProfileMenu';

interface DefaultNavBarProps {
  variant?: 'learning' | 'social';
  currentPage?: string;
  notifications: any[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  loadingNotifications: boolean;
  userProfile: any;
  loadingProfile: boolean;
}

const DefaultNavBar: React.FC<DefaultNavBarProps> = ({
  variant = 'learning',
  currentPage,
  notifications,
  unreadCount,
  markAsRead,
  loadingNotifications,
  userProfile,
  loadingProfile
}) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const isActive = (path: string) => location.pathname === path || currentPage === path;
  const isDashboardPage = location.pathname === '/dashboard';

  return (
    <div className="border-b bg-gradpath-purple text-white sticky top-0 z-50 w-full">
      <div className="w-full px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-1">
            <Logo clickable={false} />
          </div>
          <div className="flex items-center gap-2">
            {variant === 'social' ? (
              <>
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
                {isMobile ? (
                  <MobileNotifications 
                    notifications={notifications} 
                    unreadCount={unreadCount} 
                    onMarkAsRead={markAsRead} 
                    loadingNotifications={loadingNotifications} 
                  />
                ) : (
                  <DesktopNotifications 
                    notifications={notifications} 
                    unreadCount={unreadCount} 
                    onMarkAsRead={markAsRead} 
                    loadingNotifications={loadingNotifications} 
                  />
                )}
                <ProfileMenu userProfile={userProfile} loading={loadingProfile} />
                {!isMobile && (
                  <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
                    <Grid3X3 size={36} strokeWidth={1.5} />
                  </Button>
                )}
              </>
            ) : (
              <>
                {isMobile ? (
                  <MobileNotifications 
                    notifications={notifications} 
                    unreadCount={unreadCount} 
                    onMarkAsRead={markAsRead} 
                    loadingNotifications={loadingNotifications} 
                  />
                ) : (
                  <>
                    {isDashboardPage && !isMobile && (
                      <Link to="/global-chat">
                        <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
                          <MessageSquare size={24} strokeWidth={1.5} />
                        </Button>
                      </Link>
                    )}
                    <DesktopNotifications 
                      notifications={notifications} 
                      unreadCount={unreadCount} 
                      onMarkAsRead={markAsRead} 
                      loadingNotifications={loadingNotifications} 
                    />
                  </>
                )}
                <ProfileMenu userProfile={userProfile} loading={loadingProfile} />
                {!isMobile && (
                  <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
                    <Grid3X3 size={36} strokeWidth={1.5} />
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultNavBar;
