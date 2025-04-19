
import React from 'react';
import { UserPlus, MessageSquare } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const onlineUsers = [
  { 
    name: 'Alex Johnson',
    status: 'Studying Calculus',
    university: 'Oxford University',
    added: false
  },
  { 
    name: 'Maria Garcia',
    status: 'Working on AI Project',
    university: 'MIT',
    added: true
  },
  { 
    name: 'James Smith',
    status: 'Available for Physics help',
    university: 'Stanford University',
    added: false
  },
  { 
    name: 'Emma Wilson',
    status: 'Research Assistant',
    university: 'Cambridge University',
    added: true
  },
];

const trendingTopics = [
  { topic: 'Linear Algebra Final', posts: 156 },
  { topic: 'Machine Learning Project', posts: 89 },
  { topic: 'Chemistry Lab Report', posts: 45 },
];

const OnlineSidebar: React.FC = () => {
  return (
    <aside className="hidden lg:block w-64 space-y-6">
      {/* Online Users Section */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-sm border p-4">
        <h3 className="font-semibold mb-4">Online Now</h3>
        <div className="space-y-4">
          {onlineUsers.map((user) => (
            <div key={user.name} className="group flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
              <div className="relative">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-gradpath-purple/10 text-gradpath-purple">
                    {user.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.university}</p>
                <p className="text-xs text-gray-400 truncate">{user.status}</p>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MessageSquare className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`h-8 w-8 ${user.added ? 'text-green-500' : ''}`}
                >
                  <UserPlus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Topics Section */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-sm border p-4">
        <h3 className="font-semibold mb-4">Trending Topics</h3>
        <div className="space-y-3">
          {trendingTopics.map((topic) => (
            <button
              key={topic.topic}
              className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <p className="text-sm font-medium truncate flex-1">{topic.topic}</p>
              <span className="text-xs text-gray-500">{topic.posts} posts</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default OnlineSidebar;
