
import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const onlineUsers = [
  { name: 'Alex Johnson', status: 'Studying Calculus' },
  { name: 'Maria Garcia', status: 'Working on AI Project' },
  { name: 'James Smith', status: 'Available for Physics help' },
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
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg p-4">
        <h3 className="font-semibold mb-4">Online Now</h3>
        <div className="space-y-3">
          {onlineUsers.map((user) => (
            <div key={user.name} className="flex items-center gap-3">
              <div className="relative">
                <Avatar>
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Topics Section */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg p-4">
        <h3 className="font-semibold mb-4">Trending Topics</h3>
        <div className="space-y-3">
          {trendingTopics.map((topic) => (
            <div key={topic.topic} className="flex items-center justify-between">
              <p className="text-sm font-medium truncate flex-1">{topic.topic}</p>
              <span className="text-xs text-gray-500">{topic.posts} posts</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default OnlineSidebar;
