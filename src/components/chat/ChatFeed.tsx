
import React from 'react';
import { Search, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ChatPost from './ChatPost';

const ChatFeed: React.FC = () => {
  return (
    <main className="flex-1 space-y-6">
      {/* Desktop Header - Hidden on mobile */}
      <div className="hidden lg:flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <input
            type="text"
            placeholder="Search discussions..."
            className="w-full pl-10 pr-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-gradpath-purple"
          />
        </div>
        <Button className="bg-gradpath-purple hover:bg-gradpath-purple/90">
          <PlusCircle className="h-5 w-5 mr-2" />
          New Post
        </Button>
      </div>

      {/* Chat Posts */}
      <div className="space-y-4">
        <ChatPost
          author="Alex Johnson"
          content="Has anyone worked through the latest Calculus practice problems? I'm stuck on the third one."
          timestamp="2 hours ago"
          reactions={{
            "👍": 5,
            "🤔": 2,
            "❤️": 1
          }}
          comments={[
            {
              author: "Sarah Lee",
              content: "I can help! The key is to use the chain rule here.",
              timestamp: "1 hour ago"
            }
          ]}
        />
        <ChatPost
          author="Maria Garcia"
          content="Looking for study partners for the upcoming AI exam. Anyone interested?"
          timestamp="3 hours ago"
          reactions={{
            "👋": 8,
            "👍": 3
          }}
          comments={[]}
        />
      </div>
    </main>
  );
};

export default ChatFeed;
