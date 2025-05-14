
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Home, Users, Mail, Bell, User, Menu, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Logo from '../Logo';
import { Notification } from '@/services/notificationService';

interface MobileSocialNavBarProps {
  openMobileMenu?: () => void;
  currentPage?: string;
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => Promise<void>;
  loadingNotifications: boolean;
  useMessagesStyle?: boolean;
}

const MobileSocialNavBar: React.FC<MobileSocialNavBarProps> = ({
  openMobileMenu,
  currentPage,
  notifications,
  unreadCount,
  markAsRead,
  loadingNotifications,
  useMessagesStyle = false
}) => {
  const navigate = useNavigate();
  const isActive = (path: string) => currentPage === path;

  const handleHomeClick = () => {
    navigate('/dashboard');
  };

  // Use Messages Page style header if requested
  if (useMessagesStyle) {
    const iconSize = 24;
    const iconStrokeWidth = 2;
    
    return (
      <div className="border-b bg-gradpath-purple text-white sticky top-0 z-50 w-full">
        <div className="w-full mx-0">
          <div className="flex items-center justify-between h-14">
            {/* Left side - Logo with no padding */}
            <div className="flex items-center pl-0">
              <Logo clickable={false} className="ml-0 pl-0" />
            </div>
            
            {/* Right side - Search and Menu buttons */}
            <div className="flex items-center gap-3 pr-0">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full text-white hover:bg-white/20"
                aria-label="Search"
              >
                <Search size={iconSize} strokeWidth={iconStrokeWidth} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full text-white hover:bg-white/20 mr-0"
                onClick={openMobileMenu}
                aria-label="Menu"
              >
                <Menu size={iconSize} strokeWidth={iconStrokeWidth} />
              </Button>
            </div>
          </div>
          
          {/* Mobile navigation buttons at bottom */}
          <div className="h-14 flex items-center justify-between border-t border-white/20">
            <Button 
              variant="ghost" 
              size="sm"
              className="rounded-full text-white hover:bg-white/20 ml-0"
              onClick={handleHomeClick}
            >
              <Home size={iconSize} strokeWidth={iconStrokeWidth} />
            </Button>
            <Link to="/messages" replace>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full text-white hover:bg-white/20"
                aria-label="Inbox"
              >
                <Mail size={iconSize} strokeWidth={iconStrokeWidth} />
              </Button>
            </Link>
            <Link to="/friends" replace>
              <Button 
                variant="ghost" 
                size="sm"
                className="rounded-full text-white hover:bg-white/20" 
                aria-label="Friends"
              >
                <Users size={iconSize} strokeWidth={iconStrokeWidth} />
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="sm"
              className="rounded-full text-white hover:bg-white/20"
            >
              <Bell size={iconSize} strokeWidth={iconStrokeWidth} />
            </Button>
            <Link to="/profile" replace>
              <Button 
                variant="ghost" 
                size="sm"
                className="rounded-full text-white hover:bg-white/20 mr-0"
              >
                <User size={iconSize} strokeWidth={iconStrokeWidth} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  // Default MobileSocialNavBar style
  return (
    <div className="border-b bg-gradpath-purple text-white sticky top-0 z-50 w-full">
      <div className="w-full">
        {/* Top Section with Logo and Icons */}
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 p-1" onClick={openMobileMenu}>
              <Menu size={24} strokeWidth={1.5} />
            </Button>
            <Logo clickable={false} />
          </div>
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 p-1">
              <Search size={24} strokeWidth={1.5} />
            </Button>
          </div>
        </div>
        
        {/* Bottom Navigation Icons */}
        <div className="h-14 flex items-center justify-between border-t border-white/20 px-6">
          <Button variant="ghost" onClick={handleHomeClick} className={cn("flex flex-col items-center justify-center text-white hover:bg-white/20 pl-0 ml-0", isActive('/dashboard') && "bg-white/20")}>
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
    </div>
  );
};

export default MobileSocialNavBar;
