
import React from 'react';
import { Search, PlusCircle } from 'lucide-react';
import NavBar from '@/components/NavBar';
import ChatSidebar from '@/components/chat/ChatSidebar';
import ChatFeed from '@/components/chat/ChatFeed';
import OnlineSidebar from '@/components/chat/OnlineSidebar';
import { Button } from '@/components/ui/button';

const GlobalChatPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <NavBar />
      
      <div className="container mx-auto px-4 py-6">
        {/* Mobile Header - Visible on small screens */}
        <div className="lg:hidden flex items-center justify-between mb-4">
          <Button variant="outline" size="sm" className="w-full mr-2">
            <Search className="h-4 w-4 mr-2" />
            Search discussions...
          </Button>
          <Button size="icon" className="bg-gradpath-purple hover:bg-gradpath-purple/90">
            <PlusCircle className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar */}
          <ChatSidebar />

          {/* Main Chat Feed */}
          <ChatFeed />

          {/* Right Sidebar - Hidden on mobile */}
          <OnlineSidebar />
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden fixed bottom-6 right-6">
        <Button size="lg" className="rounded-full shadow-lg bg-gradpath-purple hover:bg-gradpath-purple/90">
          <PlusCircle className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default GlobalChatPage;
