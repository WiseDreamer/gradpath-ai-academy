
// Remove showInbox and onClose props from ChatSidebar usage because they're not in its IntrinsicAttributes
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

const GlobalChatPage: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showInbox, setShowInbox] = useState(false);

  const toggleInbox = () => {
    setShowInbox((prev) => !prev);
    setIsDrawerOpen(false);
  };

  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-[#F5F5F7] overflow-x-hidden">
      {/* Header */}
      <div className="border-b bg-gradpath-purple text-white sticky top-0 z-50 w-full">
        <div className="w-full px-0 mx-0">
          {/* Top section */}
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center gap-4">
              <Logo clickable={false} />

              {/* Remove messaging/chat icon from header */}
              {!isMobile && (
                <div className="hidden md:flex w-64 lg:w-80">
                  <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                    <Input
                      type="text"
                      placeholder="Search GradPath..."
                      className="w-full pl-10 pr-4 py-2 bg-white text-black rounded-full border-none"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Desktop: Centered icons */}
            {!isMobile && (
              <div className="flex-1 flex items-center justify-center gap-6">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12 rounded-full text-white hover:bg-white/20"
                  aria-label="Messages"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleInbox();
                  }}
                >
                  <Mail className="h-8 w-8" />
                </Button>
                <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full text-white hover:bg-white/20" aria-label="Notifications">
                  <Bell className="h-8 w-8" />
                </Button>
                <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full text-white hover:bg-white/20" aria-label="Help">
                  <HelpCircle className="h-8 w-8" />
                </Button>
              </div>
            )}

            {/* Desktop: Home/Profile/Menu right-aligned */}
            {!isMobile && (
              <div className="flex items-center gap-4 ml-auto">
                <Link to="/dashboard">
                  <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full text-white hover:bg-white/20 ml-auto">
                    <Home className="h-8 w-8" />
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full text-white hover:bg-white/20">
                    <User className="h-8 w-8" />
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12 rounded-full text-white hover:bg-white/20"
                  aria-label="Menu"
                  onClick={() => setIsDrawerOpen(true)}
                >
                  <Menu className="h-8 w-8" />
                </Button>
              </div>
            )}

            {/* Mobile Header - right side SEARCH and MENU */}
            {isMobile && (
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12 rounded-full text-white hover:bg-white/20"
                  aria-label="Search"
                >
                  <Search className="h-8 w-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12 rounded-full text-white hover:bg-white/20"
                  onClick={() => setIsDrawerOpen(true)}
                  aria-label="Menu"
                >
                  <Menu className="h-8 w-8" />
                </Button>
              </div>
            )}
          </div>

          {/* Mobile bottom nav (always show friends, home, etc) */}
          {isMobile && (
            <div className="h-12 flex items-center justify-between border-t border-white/20 px-0">
              <Link to="/dashboard">
                <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
                  <Home className="h-8 w-8" />
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-white hover:bg-white/20"
                onClick={() => setShowInbox(false)}
              >
                <Mail className="h-8 w-8" />
              </Button>
              <Link to="/friends">
                <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20" aria-label="Friends">
                  <Users className="h-8 w-8" />
                </Button>
              </Link>
              <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
                <Bell className="h-8 w-8" />
              </Button>
              <Link to="/profile">
                <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
                  <User className="h-8 w-8" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
      {/* Main Content */}
      <div className="flex pt-0">
        <ChatSidebar />
        <div className="flex-1 px-0 md:px-6">
          <ChatFeed />
        </div>
        <OnlineSidebar />
      </div>
      {/* Mobile Drawer */}
      <ChatDrawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />
    </div>
  );
};

export default GlobalChatPage;

