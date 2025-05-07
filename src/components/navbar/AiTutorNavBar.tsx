
import React from 'react';
import { Home, Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Logo from '../Logo';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileNotifications from '../notifications/MobileNotifications';
import DesktopNotifications from '../notifications/DesktopNotifications';
import ProfileMenu from '../profile/ProfileMenu';

interface AiTutorNavBarProps {
  openMobileMenu?: () => void;
  notifications: any[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  loadingNotifications: boolean;
  userProfile: any;
  loadingProfile: boolean;
}

const AiTutorNavBar: React.FC<AiTutorNavBarProps> = ({
  openMobileMenu,
  notifications,
  unreadCount,
  markAsRead,
  loadingNotifications,
  userProfile,
  loadingProfile
}) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <div className="border-b bg-gradpath-purple text-white sticky top-0 z-50 w-full">
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
          {isMobile ? 
            <MobileNotifications 
              notifications={notifications} 
              unreadCount={unreadCount} 
              onMarkAsRead={markAsRead} 
              loadingNotifications={loadingNotifications} 
            /> : 
            <DesktopNotifications 
              notifications={notifications} 
              unreadCount={unreadCount} 
              onMarkAsRead={markAsRead} 
              loadingNotifications={loadingNotifications} 
            />
          }
          <ProfileMenu userProfile={userProfile} loading={loadingProfile} />
        </div>
      </div>
    </div>
  );
};

export default AiTutorNavBar;
