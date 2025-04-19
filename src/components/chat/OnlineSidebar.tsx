
import React from 'react';
import { UserPlus, MessageSquare, Award, TrendingUp, Users, Hash } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

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

const topics = ['Accounting', 'Mathematics', 'Chemistry', 'Physics', 'Economics', 'ComputerScience'];

const OnlineSidebar: React.FC = () => {
  return (
    <aside className="hidden lg:block w-64 space-y-6">
      {/* Leaderboards Section */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-sm border p-4">
        <div className="flex items-center mb-4">
          <Award className="h-5 w-5 mr-2 text-gradpath-purple" />
          <h3 className="font-semibold">Leaderboards</h3>
        </div>
        <div className="space-y-2">
          {['Weekly Top Contributors', 'Most Helpful Students'].map((board) => (
            <button
              key={board}
              className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <p className="text-sm font-medium">{board}</p>
              <span className="text-xs text-gradpath-purple">View</span>
            </button>
          ))}
        </div>
      </div>

      {/* Trending Section */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-sm border p-4">
        <div className="flex items-center mb-4">
          <TrendingUp className="h-5 w-5 mr-2 text-gradpath-purple" />
          <h3 className="font-semibold">Trending</h3>
        </div>
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-2">Topics</h4>
          <div className="space-y-2">
            {topics.map((topic) => (
              <button 
                key={topic}
                className="flex items-center w-full px-3 py-2 text-sm rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Hash className="h-4 w-4 mr-2 text-gray-500" />
                <span>{topic}</span>
              </button>
            ))}
          </div>
        </div>
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

      {/* My University Section */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-sm border p-4">
        <div className="flex items-center mb-4">
          <Users className="h-5 w-5 mr-2 text-gradpath-purple" />
          <h3 className="font-semibold">My University</h3>
        </div>
        <div className="space-y-2">
          <button className="w-full text-left text-sm font-medium text-gradpath-purple">
            Oxford University Events
          </button>
          <button className="w-full text-left text-sm font-medium text-gradpath-purple">
            Department Announcements
          </button>
        </div>
      </div>

      {/* Online Users Section */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-sm border p-4">
        <h3 className="font-semibold mb-4">Online Friends</h3>
        <div className="space-y-4">
          {onlineUsers.map((user) => (
            <div key={user.name} className="group flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-gradpath-purple/10 text-gradpath-purple">
                    {user.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{user.name}</p>
                <p className="text-xs text-gray-400 truncate">{user.status}</p>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link to="/messages">
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`h-8 w-8 rounded-full ${user.added ? 'text-green-500' : ''}`}
                >
                  <UserPlus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default OnlineSidebar;
