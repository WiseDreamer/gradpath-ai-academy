
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNotifications } from '@/hooks/useNotifications';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useIsMobile } from '@/hooks/use-mobile';
import AiTutorNavBar from './AiTutorNavBar';
import MobileSocialNavBar from './MobileSocialNavBar';
import DesktopGlobalChatNavBar from './DesktopGlobalChatNavBar';
import DefaultNavBar from './DefaultNavBar';

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

  // AI Tutor variant
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

  // Mobile Social variant
  if (variant === 'social' && isMobile) {
    return (
      <MobileSocialNavBar
        openMobileMenu={openMobileMenu}
        currentPage={currentPage}
        notifications={notifications}
        unreadCount={unreadCount}
        markAsRead={markAsRead}
        loadingNotifications={loadingNotifications}
      />
    );
  }

  // Desktop Global Chat variant
  if (variant === 'social' && !isMobile && location.pathname === '/global-chat') {
    return (
      <DesktopGlobalChatNavBar
        openMobileMenu={openMobileMenu}
        currentPage={currentPage}
        notifications={notifications}
        unreadCount={unreadCount}
        markAsRead={markAsRead}
        loadingNotifications={loadingNotifications}
        userProfile={userProfile}
        loadingProfile={loadingProfile}
      />
    );
  }

  // Default variant
  return (
    <DefaultNavBar
      variant={variant}
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
