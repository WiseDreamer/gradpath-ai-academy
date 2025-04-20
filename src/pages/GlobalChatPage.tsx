
import React, { useState } from 'react';
import { Search, Menu, Mail, Bell, HelpCircle, Home, User, MessageCircle } from 'lucide-react';
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
            
            {/* Center - messaging icon replaces text */}
            <div className="flex md:hidden items-center">
              <MessageCircle className="h-8 w-8 text-white" />
            </div>
            
            {/* Center icons */}
            <div className="hidden md:flex items-center gap-4">
              <Link to="/messages">
                <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full text-white hover:bg-white/20">
                  <Mail className="h-8 w-8" />
                </Button>
              </Link>
              <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full text-white hover:bg-white/20">
                <Bell className="h-8 w-8" />
              </Button>
              <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full text-white hover:bg-white/20">
                <HelpCircle className="h-8 w-8" />
              </Button>
              <Link to="/dashboard">
                <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full text-white hover:bg-white/20">
                  <Home className="h-8 w-8" />
                </Button>
              </Link>
              <Link to="/profile">
                <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full text-white hover:bg-white/20">
                  <User className="h-8 w-8" />
                </Button>
              </Link>
            </div>

            {/* Right icons - mobile shows only search and menu */}
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="md:hidden h-12 w-12 rounded-full text-white hover:bg-white/20">
                <Search className="h-8 w-8" />
              </Button>
              <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full text-white hover:bg-white/20" onClick={() => setIsDrawerOpen(true)}>
                <Menu className="h-8 w-8" />
              </Button>
            </div>
          </div>
          
          {/* Mobile bottom section - consistent icons */}
          <div className="md:hidden h-12 flex items-center justify-between px-4 border-t border-white/20">
            <Link to="/dashboard">
              <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
                <Home className="h-8 w-8" />
              </Button>
            </Link>
            <Link to="/messages">
              <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
                <Mail className="h-8 w-8" />
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
