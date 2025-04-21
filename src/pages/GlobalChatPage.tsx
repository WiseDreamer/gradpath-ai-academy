
import React, { useState } from 'react';
import { Search, Menu, Mail, Bell, HelpCircle, Home, User, MessageCircle, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ChatSidebar from '@/components/chat/ChatSidebar';
import ChatFeed from '@/components/chat/ChatFeed';
import OnlineSidebar from '@/components/chat/OnlineSidebar';
import ChatDrawer from '@/components/chat/ChatDrawer';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import Logo from '@/components/Logo';

const GlobalChatPage: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showInbox, setShowInbox] = useState(false);

  const toggleInbox = () => {
    setShowInbox((prev) => !prev);
    // When inbox toggled, close drawer to avoid duplication
    setIsDrawerOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] overflow-x-hidden">
      {/* Header */}
      <div className="border-b bg-gradpath-purple text-white sticky top-0 z-50 w-full">
        <div className="w-full px-0 mx-0">
          {/* Top section */}
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center gap-4">
              <Logo clickable={false} />

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
            </div>

            {/* On desktop: Move Home and Profile closer to Menu icon */}
            <div className="hidden md:flex items-center gap-4 ml-auto">
              <Link to="/messages">
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
              </Link>

              <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full text-white hover:bg-white/20" aria-label="Notifications">
                <Bell className="h-8 w-8" />
              </Button>

              <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full text-white hover:bg-white/20" aria-label="Help">
                <HelpCircle className="h-8 w-8" />
              </Button>

              {/* Move Home and Profile towards right near menu button */}
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

            {/* Center - messaging icon replaces text (retain for mobile only, no change) */}
            <div className="flex md:hidden items-center">
              <MessageCircle className="h-8 w-8 text-white" />
            </div>

            {/* Mobile right icons: always show menu */}
            <div className="flex items-center gap-3 md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden h-12 w-12 rounded-full text-white hover:bg-white/20"
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
          </div>

          {/* Mobile bottom section - consistent icons, add Friends, remove spacing */}
          <div className="md:hidden h-12 flex items-center justify-between px-0 border-t border-white/20">
            <Link to="/dashboard">
              <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
                <Home className="h-8 w-8" />
              </Button>
            </Link>
            <Link to="/messages">
              <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20" onClick={() => setShowInbox(false)}>
                <Mail className="h-8 w-8" />
              </Button>
            </Link>
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
        </div>
      </div>

      {/* Main Content */}
      <div className="flex pt-0">
        {/* Remove side padding on mobile, and inside feed, remove spacing as well */}
        <ChatSidebar showInbox={showInbox} onClose={() => setShowInbox(false)} />
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
