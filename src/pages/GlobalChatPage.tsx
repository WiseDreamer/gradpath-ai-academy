
import React, { useState } from 'react';
import { Search, Menu, Mail, Bell, HelpCircle, Home, User, Users, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ChatSidebar from '@/components/chat/ChatSidebar';
import ChatFeed from '@/components/chat/ChatFeed';
import OnlineSidebar from '@/components/chat/OnlineSidebar';
import ChatDrawer from '@/components/chat/ChatDrawer';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import Logo from '@/components/Logo';
import { useIsMobile } from '@/hooks/use-mobile';

const GlobalChatPage: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showInbox, setShowInbox] = useState(false);

  const toggleInbox = () => {
    setShowInbox((prev) => !prev);
    setIsDrawerOpen(false);
  };

  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();

  const iconProps = { size: 40, strokeWidth: 3.2 };

  // Show back unless on dashboard
  const showBack = location.pathname !== "/dashboard";

  // Show inbox: navigate to /messages when clicked
  const handleInbox = () => {
    navigate("/messages");
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] overflow-x-hidden">
      <div className="border-b bg-gradpath-purple text-white sticky top-0 z-50 w-full">
        <div className="w-full px-0 mx-0">
          <div className="flex items-center justify-between h-20 px-4">
            <div className="flex items-center gap-4">
              {showBack && (
                <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="mr-2 rounded-full hover:bg-white/20">
                  <ArrowLeft {...iconProps} />
                </Button>
              )}
              <Logo clickable={false} />
              {/* Remove: chat icon between logo and search */}
            </div>
            {!isMobile && (
              <div className="flex-1 flex items-center justify-center gap-8">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-20 w-20 rounded-full text-white hover:bg-white/20"
                  aria-label="Inbox"
                  onClick={handleInbox}
                >
                  <Mail {...iconProps} />
                </Button>
                <Button variant="ghost" size="icon" className="h-20 w-20 rounded-full text-white hover:bg-white/20" aria-label="Notifications">
                  <Bell {...iconProps} />
                </Button>
                <Button variant="ghost" size="icon" className="h-20 w-20 rounded-full text-white hover:bg-white/20" aria-label="Help">
                  <HelpCircle {...iconProps} />
                </Button>
              </div>
            )}
            {!isMobile && (
              <div className="flex items-center gap-4 ml-auto">
                <Link to="/dashboard">
                  <Button variant="ghost" size="icon" className="h-20 w-20 rounded-full text-white hover:bg-white/20 ml-auto">
                    <Home {...iconProps} />
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button variant="ghost" size="icon" className="h-20 w-20 rounded-full text-white hover:bg-white/20">
                    <User {...iconProps} />
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-20 w-20 rounded-full text-white hover:bg-white/20"
                  aria-label="Menu"
                  onClick={() => setIsDrawerOpen(true)}
                >
                  <Menu {...iconProps} />
                </Button>
              </div>
            )}
            {isMobile && (
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-20 w-20 rounded-full text-white hover:bg-white/20"
                  aria-label="Search"
                >
                  <Search {...iconProps} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-20 w-20 rounded-full text-white hover:bg-white/20"
                  onClick={() => setIsDrawerOpen(true)}
                  aria-label="Menu"
                >
                  <Menu {...iconProps} />
                </Button>
              </div>
            )}
          </div>
          {isMobile && (
            <div className="h-20 flex items-center justify-between border-t border-white/20 px-0">
              <Link to="/dashboard">
                <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
                  <Home {...iconProps} />
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-white hover:bg-white/20"
                onClick={handleInbox}
                aria-label="Inbox"
              >
                <Mail {...iconProps} />
              </Button>
              <Link to="/friends">
                <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20" aria-label="Friends">
                  <Users {...iconProps} />
                </Button>
              </Link>
              <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
                <Bell {...iconProps} />
              </Button>
              <Link to="/profile">
                <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
                  <User {...iconProps} />
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
