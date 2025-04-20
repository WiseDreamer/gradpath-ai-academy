
import React from 'react';
import { Search, Image, Video, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ChatPost from './ChatPost';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const ChatFeed: React.FC = () => {
  return (
    <main className="w-full flex flex-col space-y-6">
      {/* Create Post Card */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-sm border p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-gradpath-purple text-white">A</AvatarFallback>
          </Avatar>
          <div className="bg-gray-100 rounded-full flex-1 px-4 py-2.5 text-gray-500 cursor-pointer hover:bg-gray-200 transition-colors">
            Have something in mind, Alex?
          </div>
        </div>
        <div className="flex mt-3 pt-3 border-t">
          <Button variant="ghost" className="flex-1 rounded-lg justify-center">
            <Image className="h-5 w-5 mr-2 text-blue-500" />
            Photo
          </Button>
          <Button variant="ghost" className="flex-1 rounded-lg justify-center">
            <Video className="h-5 w-5 mr-2 text-green-500" />
            Video
          </Button>
          <Button variant="ghost" className="flex-1 rounded-lg justify-center">
            <Smile className="h-5 w-5 mr-2 text-yellow-500" />
            Feeling
          </Button>
        </div>
      </div>

      {/* Chat Posts */}
      <div className="w-full px-0 mx-0">
        <ChatPost
          author="Alex Johnson"
          content="Has anyone worked through the latest Calculus practice problems? I'm stuck on the third one related to implicit differentiation."
          timestamp="2 hours ago"
          reactions={{
            "👍": 5,
            "🤔": 2,
            "❤️": 1
          }}
          comments={[
            {
              author: "Sarah Lee",
              content: "I can help! The key is to use the chain rule here. You need to differentiate both sides with respect to x, being careful with the y terms.",
              timestamp: "1 hour ago"
            },
            {
              author: "Michael Chen",
              content: "I struggled with that one too. Make sure you're applying the product rule correctly when differentiating the xy term.",
              timestamp: "45 minutes ago"
            }
          ]}
        />
        <ChatPost
          author="Maria Garcia"
          content="Looking for study partners for the upcoming AI exam. Anyone interested in forming a virtual study group this weekend? I'm particularly focused on neural networks and deep learning applications."
          timestamp="3 hours ago"
          reactions={{
            "👋": 8,
            "👍": 3,
            "🔥": 2
          }}
          comments={[
            {
              author: "David Wong",
              content: "I'm interested! Been studying neural networks all week and could use some group discussion.",
              timestamp: "2 hours ago"
            }
          ]}
        />
        <ChatPost
          author="James Smith"
          content="Just finished my research paper on quantum computing applications in cryptography. Would anyone be interested in peer reviewing it before submission? It's about 15 pages with diagrams."
          timestamp="5 hours ago"
          reactions={{
            "🧠": 12,
            "🔬": 5,
            "🎉": 3
          }}
          comments={[]}
        />
      </div>
    </main>
  );
};

export default ChatFeed;
