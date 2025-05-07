
import React from 'react';
import NavBar from '@/components/NavBar';
import ChatFeed from '@/components/chat/ChatFeed';
import ChatSidebar from '@/components/chat/ChatSidebar';
import OnlineSidebar from '@/components/chat/OnlineSidebar';

const GlobalChatPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <NavBar variant="social" currentPage="/global-chat" />
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex gap-4">
          <ChatSidebar />
          <div className="flex-grow">
            <ChatFeed />
          </div>
          <OnlineSidebar />
        </div>
      </div>
    </div>
  );
};

export default GlobalChatPage;
