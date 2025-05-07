
import React from 'react';
import NavBar from '@/components/NavBar';
import ChatFeed from '@/components/chat/ChatFeed';
import ChatSidebar from '@/components/chat/ChatSidebar';
import OnlineSidebar from '@/components/chat/OnlineSidebar';
import { useIsMobile } from '@/hooks/use-mobile';

const GlobalChatPage: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <NavBar variant="social" currentPage="/global-chat" />
      {isMobile ? (
        <div className="w-full">
          <ChatFeed />
        </div>
      ) : (
        <div className="container mx-auto max-w-7xl p-0">
          <div className="flex">
            <ChatSidebar />
            <div className="flex-grow px-4 py-4">
              <ChatFeed />
            </div>
            <OnlineSidebar />
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalChatPage;
