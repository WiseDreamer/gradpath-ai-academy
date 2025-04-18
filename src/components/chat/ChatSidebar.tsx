
import React from 'react';
import { Hash, Users, TrendingUp, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Global Chat', icon: MessageSquare },
  { name: 'My University', icon: Users },
  { name: 'Trending', icon: TrendingUp },
];

const tags = ['Math', 'AI', 'Physics', 'Chemistry', 'Programming'];

const ChatSidebar: React.FC = () => {
  return (
    <aside className="w-full lg:w-64 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg p-4">
      <nav className="space-y-6">
        <div className="space-y-2">
          {navItems.map((item) => (
            <button
              key={item.name}
              className={cn(
                "flex items-center w-full px-3 py-2 text-sm rounded-lg",
                "hover:bg-gray-100 dark:hover:bg-gray-700",
                "transition-colors duration-200"
              )}
            >
              <item.icon className="h-5 w-5 mr-3 text-gray-500" />
              <span className="font-medium">{item.name}</span>
            </button>
          ))}
        </div>

        <div>
          <h3 className="px-3 text-sm font-semibold text-gray-500 mb-2">Topics</h3>
          <div className="space-y-1">
            {tags.map((tag) => (
              <button
                key={tag}
                className="flex items-center w-full px-3 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Hash className="h-4 w-4 mr-3 text-gray-500" />
                <span>{tag}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default ChatSidebar;
