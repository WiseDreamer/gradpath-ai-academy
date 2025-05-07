
import React from 'react';
import { Hash, Users, TrendingUp, MessageSquare, User, Bookmark, ChevronDown, Compass } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ChatSidebar: React.FC = () => {
  const menuItems = [
    { icon: User, name: 'Alex Johnson', university: 'Oxford University' },
    { icon: Users, name: 'Friends' },
    { icon: Bookmark, name: 'Saved' },
    { icon: Compass, name: 'Groups' },
  ];

  const shortcuts = [
    'Calculus Study Group',
    'Physics Lab Reports',
    'Computer Science Projects',
    'Biology Research Team',
    'Statistics Workshop'
  ];

  const tags = ['Math', 'AI', 'Physics', 'Chemistry', 'Programming'];

  return (
    <aside className="hidden md:block w-64 overflow-y-auto px-0">
      <div className="space-y-4">
        {/* Profile and Menu */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm border p-4 rounded-none">
          <nav className="space-y-2">
            <Link to="/profile" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-gradpath-purple text-white">
                  A
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Alex Johnson</p>
                <p className="text-xs text-gray-500">Oxford University</p>
              </div>
            </Link>
            
            {menuItems.slice(1).map((item) => (
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
            
            <button
              className={cn(
                "flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg",
                "hover:bg-gray-100 dark:hover:bg-gray-700",
                "transition-colors duration-200"
              )}
            >
              <div className="flex items-center">
                <ChevronDown className="h-5 w-5 mr-3 text-gray-500" />
                <span className="font-medium">See more</span>
              </div>
            </button>
          </nav>
        </div>

        {/* Shortcuts */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm border p-4 rounded-none">
          <h3 className="px-3 text-sm font-semibold text-gray-500 mb-2">Your Shortcuts</h3>
          <div className="space-y-1">
            {shortcuts.map((shortcut) => (
              <button
                key={shortcut}
                className="flex items-center w-full px-3 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span>{shortcut}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Topics */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm border p-4 rounded-none">
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

        {/* Footer */}
        <div className="px-4 py-2 text-xs text-gray-500">
          Privacy · Terms · Cookies · More · © 2025
        </div>
      </div>
    </aside>
  );
};

export default ChatSidebar;
