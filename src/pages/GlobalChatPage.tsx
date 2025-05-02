
import React, { useState } from 'react';
import { 
  Search, Menu, Mail, Bell, HelpCircle, Home, User, Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ChatSidebar from '@/components/chat/ChatSidebar';
import ChatFeed from '@/components/chat/ChatFeed';
import OnlineSidebar from '@/components/chat/OnlineSidebar';
import ChatDrawer from '@/components/chat/ChatDrawer';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import { useIsMobile } from '@/hooks/use-mobile';
import NavBar from '@/components/NavBar';

const GlobalChatPage: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F5F5F7] overflow-x-hidden">
      {/* Using the NavBar component for consistent header across pages */}
      <NavBar 
        openMobileMenu={() => setIsDrawerOpen(true)} 
        variant="social"
        currentPage="/global-chat"
      />
      
      <div className="flex pt-0">
        <ChatSidebar />
        <div className="flex-1 px-0 md:px-6">
          <ChatFeed />
        </div>
        <OnlineSidebar />
      </div>
      <ChatDrawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />
    </div>
  );
};

export default GlobalChatPage;
