
import React, { useState } from 'react';
import { 
  Search, Menu, Mail, Bell, HelpCircle, Home, User, Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ChatSidebar from '@/components/chat/ChatSidebar';
import ChatFeed from '@/components/chat/ChatFeed';
import OnlineSidebar from '@/components/chat/OnlineSidebar';
import ChatDrawer from '@/components/chat/ChatDrawer';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import { useIsMobile } from '@/hooks/use-mobile';

const GlobalChatPage: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const isMobile = useIsMobile();
  const navigate = useNavigate();

  // Consistent icon size and stroke width
  const iconSize = 28;
  const iconStrokeWidth = 2.5;

  // Show inbox: navigate to /messages when clicked
  const handleInbox = () => {
    navigate("/messages");
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] overflow-x-hidden">
      <div className="border-b bg-gradpath-purple text-white sticky top-0 z-50 w-full">
        <div className="w-full mx-0">
          <div className="flex items-center justify-between h-20">
            {/* Left side - Logo with no padding */}
            <div className="flex items-center pl-0">
              <Logo clickable={false} className="ml-0 pl-0" />
            </div>
            
            {/* Center section for desktop */}
            {!isMobile && (
              <div className="flex-1 flex items-center justify-center gap-8 px-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-white hover:bg-white/20"
                  aria-label="Inbox"
                  onClick={handleInbox}
                >
                  <Mail size={iconSize} strokeWidth={iconStrokeWidth} />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20" aria-label="Notifications">
                  <Bell size={iconSize} strokeWidth={iconStrokeWidth} />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20" aria-label="Help">
                  <HelpCircle size={iconSize} strokeWidth={iconStrokeWidth} />
                </Button>
              </div>
            )}
            
            {/* Right side - Menu and profile buttons aligned to the right edge */}
            {!isMobile && (
              <div className="flex items-center gap-4 pr-0">
                <Link to="/dashboard">
                  <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
                    <Home size={iconSize} strokeWidth={iconStrokeWidth} />
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
                    <User size={iconSize} strokeWidth={iconStrokeWidth} />
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-white hover:bg-white/20 mr-0"
                  aria-label="Menu"
                  onClick={() => setIsDrawerOpen(true)}
                >
                  <Menu size={iconSize} strokeWidth={iconStrokeWidth} />
                </Button>
              </div>
            )}
            
            {/* Mobile-specific right side */}
            {isMobile && (
              <div className="flex items-center gap-3 pr-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-white hover:bg-white/20"
                  aria-label="Search"
                >
                  <Search size={iconSize} strokeWidth={iconStrokeWidth} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-white hover:bg-white/20 mr-0"
                  onClick={() => setIsDrawerOpen(true)}
                  aria-label="Menu"
                >
                  <Menu size={iconSize} strokeWidth={iconStrokeWidth} />
                </Button>
              </div>
            )}
          </div>
          
          {/* Mobile navigation buttons at bottom */}
          {isMobile && (
            <div className="h-20 flex items-center justify-between border-t border-white/20">
              <Link to="/dashboard">
                <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20 ml-0">
                  <Home size={iconSize} strokeWidth={iconStrokeWidth} />
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-white hover:bg-white/20"
                onClick={handleInbox}
                aria-label="Inbox"
              >
                <Mail size={iconSize} strokeWidth={iconStrokeWidth} />
              </Button>
              <Link to="/friends">
                <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20" aria-label="Friends">
                  <Users size={iconSize} strokeWidth={iconStrokeWidth} />
                </Button>
              </Link>
              <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
                <Bell size={iconSize} strokeWidth={iconStrokeWidth} />
              </Button>
              <Link to="/profile">
                <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20 mr-0">
                  <User size={iconSize} strokeWidth={iconStrokeWidth} />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex pt-0">
        <ChatSidebar />
        <div className="flex-1 px-0 md:px-6">
          <ChatFeed />
        </div>
        <OnlineSidebar />
      </div>
      <ChatDrawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />
    </div>
  );
};

export default GlobalChatPage;
