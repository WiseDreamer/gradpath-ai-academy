import React, { useState } from 'react';
import { Search, Menu, Mail, Bell, HelpCircle, Home, User, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ChatSidebar from '@/components/chat/ChatSidebar';
import ChatFeed from '@/components/chat/ChatFeed';
import OnlineSidebar from '@/components/chat/OnlineSidebar';
import ChatDrawer from '@/components/chat/ChatDrawer';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import Logo from '@/components/Logo';
import { useIsMobile } from '@/hooks/use-mobile';
import BackIcon from '@/components/BackIcon';
import { useNavigate } from "react-router-dom";

const GlobalChatPage: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showInbox, setShowInbox] = useState(false);

  const toggleInbox = () => {
    setShowInbox((prev) => !prev);
    setIsDrawerOpen(false);
  };

  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const iconProps = { size: 32, strokeWidth: 3 };

  return (
    <div className="min-h-screen bg-[#F5F5F7] overflow-x-hidden">
      <div className="border-b bg-gradpath-purple text-white sticky top-0 z-50 w-full">
        <div className="w-full px-0 mx-0">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center gap-4">
              <BackIcon className="hidden md:inline-block" />
              <Logo clickable={false} />

              {!isMobile && (
                <div className="hidden md:flex w-64 lg:w-80">
                  <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-7 w-7" {...iconProps} />
                    <Input
                      type="text"
                      placeholder="Search GradPath..."
                      className="w-full pl-12 pr-4 py-2 bg-white text-black rounded-full border-none"
                    />
                  </div>
                </div>
              )}
            </div>

            {!isMobile && (
              <div className="flex-1 flex items-center justify-center gap-6">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-14 w-14 rounded-full text-white hover:bg-white/20"
                  aria-label="Inbox"
                  onClick={toggleInbox}
                >
                  <Inbox {...iconProps} />
                </Button>
                <Button variant="ghost" size="icon" className="h-14 w-14 rounded-full text-white hover:bg-white/20" aria-label="Notifications">
                  <Bell {...iconProps} />
                </Button>
                <Button variant="ghost" size="icon" className="h-14 w-14 rounded-full text-white hover:bg-white/20" aria-label="Help">
                  <HelpCircle {...iconProps} />
                </Button>
              </div>
            )}

            {!isMobile && (
              <div className="flex items-center gap-4 ml-auto">
                <Link to="/dashboard">
                  <Button variant="ghost" size="icon" className="h-14 w-14 rounded-full text-white hover:bg-white/20 ml-auto">
                    <Home {...iconProps} />
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button variant="ghost" size="icon" className="h-14 w-14 rounded-full text-white hover:bg-white/20">
                    <User {...iconProps} />
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-14 w-14 rounded-full text-white hover:bg-white/20"
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
                  className="h-14 w-14 rounded-full text-white hover:bg-white/20"
                  aria-label="Search"
                >
                  <Search {...iconProps} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-14 w-14 rounded-full text-white hover:bg-white/20"
                  onClick={() => setIsDrawerOpen(true)}
                  aria-label="Menu"
                >
                  <Menu {...iconProps} />
                </Button>
              </div>
            )}
          </div>

          {isMobile && (
            <div className="h-16 flex items-center justify-between border-t border-white/20 px-0">
              <Link to="/dashboard">
                <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
                  <Home {...iconProps} />
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-full text-white hover:bg-white/20`}
                onClick={toggleInbox}
                aria-label="Inbox"
              >
                <Inbox {...iconProps} />
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
          <ChatFeed showInbox={showInbox} />
        </div>
        <OnlineSidebar />
      </div>
      <ChatDrawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />
    </div>
  );
};

export default GlobalChatPage;
