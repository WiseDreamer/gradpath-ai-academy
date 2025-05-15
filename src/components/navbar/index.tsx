
import React from 'react';
import DefaultNavBar from './DefaultNavBar';
import AiTutorNavBar from './AiTutorNavBar';
import { useAuth } from '@/components/AuthProvider';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLocation } from 'react-router-dom';
import { useNotifications } from '@/hooks/useNotifications';
import { useUserProfile } from '@/hooks/useUserProfile';
import MobileSocialNavBar from './MobileSocialNavBar';
import DesktopGlobalChatNavBar from './DesktopGlobalChatNavBar';

interface NavBarProps {
  variant?: 'default' | 'ai-tutor' | 'social' | 'learning';
  currentPage?: string;
  openMobileMenu?: () => void;
  useMessagesStyle?: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ 
  variant = 'default', 
  currentPage,
  openMobileMenu,
  useMessagesStyle 
}) => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const location = useLocation();
  const { notifications, unreadCount, markAsRead, loading: loadingNotifications } = useNotifications();
  const { userProfile, loading: loadingProfile } = useUserProfile();
  
  // Show global chat-specific navbar on desktop for global-chat
  if (!isMobile && location.pathname === '/global-chat') {
    return <DesktopGlobalChatNavBar 
      notifications={notifications}
      unreadCount={unreadCount}
      markAsRead={markAsRead}
      loadingNotifications={loadingNotifications}
      userProfile={userProfile}
      loadingProfile={loadingProfile}
    />;
  }
  
  // Show mobile-specific navbar for social pages on mobile
  if (isMobile && (variant === 'social' || useMessagesStyle)) {
    return <MobileSocialNavBar 
      currentPage={currentPage || location.pathname} 
      notifications={notifications}
      unreadCount={unreadCount}
      markAsRead={markAsRead}
      loadingNotifications={loadingNotifications}
    />;
  }
  
  // For AI Tutor
  if (variant === 'ai-tutor') {
    return (
      <AiTutorNavBar 
        openMobileMenu={openMobileMenu}
        notifications={notifications}
        unreadCount={unreadCount}
        markAsRead={markAsRead}
        loadingNotifications={loadingNotifications}
        userProfile={userProfile}
        loadingProfile={loadingProfile}
      />
    );
  }
  
  // Default navbar
  return (
    <DefaultNavBar
      variant={variant === 'social' ? 'social' : 'learning'}
      currentPage={currentPage}
      notifications={notifications}
      unreadCount={unreadCount}
      markAsRead={markAsRead}
      loadingNotifications={loadingNotifications}
      userProfile={userProfile}
      loadingProfile={loadingProfile}
    />
  );
};

export default NavBar;
