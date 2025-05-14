
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNotifications } from '@/hooks/useNotifications';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useIsMobile } from '@/hooks/use-mobile';

const NavBar: React.FC = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const { notifications, unreadCount, markAsRead, loading: loadingNotifications } = useNotifications();
  const { userProfile, loading: loadingProfile } = useUserProfile();
  
  // Import the real navbar component dynamically to avoid import issues with the renamed file
  const NavBarComponent = React.lazy(() => import('./navbar'));
  
  return (
    <React.Suspense fallback={<div className="h-20 bg-gradpath-purple"></div>}>
      <NavBarComponent 
        notifications={notifications}
        unreadCount={unreadCount}
        markAsRead={markAsRead}
        loadingNotifications={loadingNotifications}
        userProfile={userProfile}
        loadingProfile={loadingProfile}
      />
    </React.Suspense>
  );
};

export default NavBar;
