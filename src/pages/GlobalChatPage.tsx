
import React from 'react';
import NavBar from '@/components/navbar/index';
import ChatFeed from '@/components/chat/ChatFeed';
import ChatSidebar from '@/components/chat/ChatSidebar';
import OnlineSidebar from '@/components/chat/OnlineSidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import PostsSection from '@/components/PostsSection';

const GlobalChatPage: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <NavBar variant="social" currentPage="/global-chat" useMessagesStyle={isMobile} />
      {isMobile ? (
        <div className="w-full">
          <PostsSection />
        </div>
      ) : (
        <div className="flex w-full max-w-7xl mx-auto gap-4 px-4 py-4">
          <div className="w-64 flex-shrink-0">
            <ChatSidebar />
          </div>
          <div className="flex-grow">
            <PostsSection />
          </div>
          <div className="w-64 flex-shrink-0">
            <OnlineSidebar />
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalChatPage;
