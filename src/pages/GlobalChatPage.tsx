import React, { useState } from 'react';
import { PlusCircle, Search, Home, Mail, Bell, User, Menu, Users, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ChatSidebar from '@/components/chat/ChatSidebar';
import ChatFeed from '@/components/chat/ChatFeed';
import OnlineSidebar from '@/components/chat/OnlineSidebar';
import ChatDrawer from '@/components/chat/ChatDrawer';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';

const GlobalChatPage: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openMobileMenu = () => {
    setIsDrawerOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      {/* Header - Fixed at top */}
      <div className="border-b bg-gradpath-purple text-white sticky top-0 z-50 w-full">
        <div className="container mx-auto flex flex-col">
          {/* Top section */}
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="flex items-center">
                <BookOpen className="h-10 w-10 text-white" />
                <span className="text-xl font-semibold ml-2 hidden sm:inline-block">GradPath</span>
              </Link>
              
              <div className="hidden md:flex w-64 lg:w-80">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search GradPath..."
                    className="w-full pl-10 pr-4 py-2 bg-white text-black rounded-full border-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 md:gap-2">
              {/* Center icons on desktop */}
              <div className="hidden md:flex items-center">
                <Link to="/dashboard">
                  <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
                    <Home className="h-6 w-6" />
                  </Button>
                </Link>
                <Link to="/messages">
                  <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
                    <Mail className="h-6 w-6" />
                  </Button>
                </Link>
                <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
                  <Bell className="h-6 w-6" />
                </Button>
              </div>
              
              <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20 md:hidden">
                <Search className="h-6 w-6" />
              </Button>
              
              <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20" onClick={openMobileMenu}>
                <Menu className="h-6 w-6" />
              </Button>
              
              <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
                <User className="h-6 w-6" />
              </Button>
            </div>
          </div>
          
          {/* Bottom section - Mobile navigation */}
          <div className="md:hidden h-12 flex items-center justify-between px-4 border-t border-white/20">
            <Link to="/dashboard">
              <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
                <Home className="h-6 w-6" />
              </Button>
            </Link>
            <Link to="/friends">
              <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
                <Users className="h-6 w-6" />
              </Button>
            </Link>
            <Link to="/messages">
              <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
                <Mail className="h-6 w-6" />
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
              <Bell className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto pt-6 pb-16 flex gap-0 md:gap-6">
        <ChatSidebar />
        <ChatFeed />
        <OnlineSidebar />
      </div>

      {/* Mobile Drawer */}
      <ChatDrawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />
    </div>
  );
};

export default GlobalChatPage;
