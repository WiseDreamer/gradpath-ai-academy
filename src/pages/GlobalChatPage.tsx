
import React, { useState } from 'react';
import { Menu, Home, MessageSquare, Users, Search, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ChatSidebar from '@/components/chat/ChatSidebar';
import ChatFeed from '@/components/chat/ChatFeed';
import OnlineSidebar from '@/components/chat/OnlineSidebar';
import ChatDrawer from '@/components/chat/ChatDrawer';
import Logo from '@/components/Logo';

const GlobalChatPage: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg shadow-sm border-b">
        {/* Top Section */}
        <div className="h-16 border-b flex items-center px-4">
          <div className="flex items-center gap-2">
            <Logo />
            <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gradpath-purple to-gradpath-bright-blue">
              GradPath
            </span>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="h-14 flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full"
              onClick={() => setIsDrawerOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Home className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <MessageSquare className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Users className="h-6 w-6" />
            </Button>
          </div>

          {/* Mobile Search Button */}
          <div className="lg:hidden">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Search className="h-6 w-6" />
            </Button>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-xl mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <input
                type="text"
                placeholder="Search discussions..."
                className="w-full pl-10 pr-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gradpath-purple"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-32 pb-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <ChatSidebar />
          <ChatFeed />
          <OnlineSidebar />
        </div>
      </div>

      {/* Mobile New Post Button */}
      <div className="lg:hidden fixed bottom-6 right-6">
        <Button size="lg" className="rounded-full shadow-lg bg-gradpath-purple hover:bg-gradpath-purple/90">
          <PlusCircle className="h-6 w-6" />
        </Button>
      </div>

      {/* Mobile Drawer */}
      <ChatDrawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />
    </div>
  );
};

export default GlobalChatPage;
