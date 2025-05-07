
import React from 'react';
import NavBar from '@/components/navbar';
import ChatFeed from '@/components/chat/ChatFeed';
import ChatSidebar from '@/components/chat/ChatSidebar';
import OnlineSidebar from '@/components/chat/OnlineSidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import PostsSection from '@/components/PostsSection';

const GlobalChatPage: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <NavBar variant="social" currentPage="/global-chat" />
      {isMobile ? (
        <div className="w-full">
          <PostsSection />
        </div>
      ) : (
        <div className="flex w-full">
          <ChatSidebar />
          <div className="flex-grow">
            <PostsSection />
          </div>
          <OnlineSidebar />
        </div>
      )}
    </div>
  );
};

export default GlobalChatPage;
