
import React from 'react';
import NavBar from '@/components/NavBar';
import BottomNav from '@/components/BottomNav';
import { useIsMobile } from '@/hooks/use-mobile';
import ChatFeed from '@/components/chat/ChatFeed';

const GlobalChatPage: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <NavBar variant="social" currentPage="/global-chat" />
      <div className="container mx-0 px-0 py-0 w-full max-w-none pb-16">
        <ChatFeed />
      </div>
      {isMobile && <BottomNav />}
    </div>
  );
};

export default GlobalChatPage;
