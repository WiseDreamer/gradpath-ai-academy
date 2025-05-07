
import React from 'react';
import NavBar from '@/components/NavBar';
import ChatFeed from '@/components/chat/ChatFeed';

const GlobalChatPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <NavBar variant="social" currentPage="/global-chat" />
      <div className="container mx-0 px-0 py-0 w-full max-w-none">
        <ChatFeed />
      </div>
    </div>
  );
};

export default GlobalChatPage;
