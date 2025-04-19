
import React, { useState } from 'react';
import { MessageSquare, Search, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ChatSidebar from '@/components/chat/ChatSidebar';
import ChatFeed from '@/components/chat/ChatFeed';
import OnlineSidebar from '@/components/chat/OnlineSidebar';
import ChatDrawer from '@/components/chat/ChatDrawer';
import NavBar from '@/components/NavBar';

const GlobalChatPage: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openMobileMenu = () => {
    setIsDrawerOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      {/* Header */}
      <NavBar openMobileMenu={openMobileMenu} />

      {/* Main Content */}
      <div className="container mx-auto pt-6 pb-16 flex gap-6">
        <ChatSidebar />
        <ChatFeed />
        <OnlineSidebar />
      </div>

      {/* Mobile New Post Button */}
      <div className="md:hidden fixed bottom-6 right-6">
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
