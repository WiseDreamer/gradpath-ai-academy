
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, UploadCloud, CalendarDays, FileText, BookCopy, MessageSquare, PlusCircle, Image, Video, Smile } from 'lucide-react';
import NavBar from '@/components/NavBar';
import DashboardCard from '@/components/DashboardCard';
import ChatDrawer from '@/components/chat/ChatDrawer';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import ChatPost from '@/components/chat/ChatPost';

const Dashboard: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openMobileMenu = () => {
    setIsDrawerOpen(true);
  };

  // Simulated online friends for the sidebar
  const onlineFriends = [
    { name: 'Maria Garcia', status: 'Working on AI Project', university: 'MIT' },
    { name: 'James Smith', status: 'Available for Physics help', university: 'Stanford University' },
    { name: 'Emma Wilson', status: 'Research Assistant', university: 'Cambridge University' },
  ];

  // Simulated shortcuts
  const shortcuts = [
    'Calculus Study Group',
    'Physics Lab Reports',
    'Computer Science Projects',
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      {/* Header */}
      <NavBar openMobileMenu={openMobileMenu} />

      {/* Main Content */}
      <div className="container mx-auto pt-6 pb-16 flex gap-6">
        {/* Left Sidebar */}
        <aside className="hidden md:block w-64 space-y-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border p-4">
            <Link to="/profile" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-gradpath-purple text-white">A</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Alex Johnson</p>
                <p className="text-xs text-gray-500">Oxford University</p>
              </div>
            </Link>
            
            <div className="space-y-1 mt-2">
              {['Friends', 'Saved', 'Groups'].map((item) => (
                <button
                  key={item}
                  className="flex items-center w-full px-3 py-2 text-sm rounded-lg hover:bg-gray-100"
                >
                  <span className="font-medium">{item}</span>
                </button>
              ))}
              
              <button className="flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg hover:bg-gray-100">
                <span className="font-medium">See more</span>
              </button>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border p-4">
            <h3 className="px-3 text-sm font-semibold text-gray-500 mb-2">Your Shortcuts</h3>
            <div className="space-y-1">
              {shortcuts.map((shortcut) => (
                <button
                  key={shortcut}
                  className="flex items-center w-full px-3 py-2 text-sm rounded-lg hover:bg-gray-100"
                >
                  <span>{shortcut}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="px-4 py-2 text-xs text-gray-500">
            Privacy · Terms · Cookies · More · © 2025
          </div>
        </aside>

        {/* Middle Section */}
        <main className="flex-1 space-y-6 max-w-3xl">
          {/* Create Post Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border p-4">
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

          {/* Main Dashboard Cards */}
          <h2 className="text-xl font-semibold text-gray-800">Learning Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <DashboardCard
              title="Join Virtual Class"
              description="Jump into an interactive AI-powered virtual classroom"
              icon={BookOpen}
              to="/virtual-class"
              color="bg-gradpath-purple"
            />
            
            <DashboardCard
              title="Upload Module Resources"
              description="Upload lecture slides, notes, and study material"
              icon={UploadCloud}
              to="/upload"
              color="bg-gradpath-bright-blue"
            />
            
            <DashboardCard
              title="Study Plan"
              description="View and manage your personalized study schedule"
              icon={CalendarDays}
              to="/study-plan"
              color="bg-green-500"
            />
            
            <DashboardCard
              title="Practice Questions"
              description="Test your knowledge with AI-generated practice questions"
              icon={FileText}
              to="/practice"
              color="bg-amber-500"
            />
            
            <DashboardCard
              title="Past Papers"
              description="Access and review previous examination papers"
              icon={BookCopy}
              to="/past-papers"
              color="bg-red-500"
            />
            
            <DashboardCard
              title="Ask AI Tutor"
              description="Get instant answers to your academic questions"
              icon={MessageSquare}
              to="/chat"
              color="bg-indigo-600"
            />
          </div>

          {/* Recent Academic Posts */}
          <h2 className="text-xl font-semibold text-gray-800 mt-8">Recent Academic Posts</h2>
          <div className="space-y-4">
            <ChatPost
              author="Alex Johnson"
              content="Just completed my AI project on reinforcement learning. Happy to share insights with anyone interested!"
              timestamp="1 hour ago"
              reactions={{
                "👍": 12,
                "🎉": 5,
                "🧠": 3
              }}
              comments={[
                {
                  author: "Maria Garcia",
                  content: "Would love to see it! I'm working on something similar for my thesis.",
                  timestamp: "45 minutes ago"
                }
              ]}
            />
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="hidden lg:block w-64 space-y-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border p-4">
            <h3 className="font-semibold mb-3">Online Friends</h3>
            <div className="space-y-3">
              {onlineFriends.map((friend) => (
                <div key={friend.name} className="flex items-center gap-2">
                  <div className="relative">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-gradpath-purple/10 text-gradpath-purple">
                        {friend.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 border-2 border-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{friend.name}</p>
                    <p className="text-xs text-gray-500">{friend.university}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border p-4">
            <h3 className="font-semibold mb-3">Upcoming Deadlines</h3>
            <div className="space-y-2">
              {['Calculus Assignment - Tomorrow', 'Physics Lab Report - 3 days', 'Literature Review - 1 week'].map((deadline) => (
                <div key={deadline} className="text-sm p-2 bg-gray-50 rounded-lg">
                  {deadline}
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border p-4">
            <h3 className="font-semibold mb-3">Recent Modules</h3>
            <div className="space-y-2">
              {['Calculus I', 'Linear Algebra', 'Quantum Mechanics'].map((module) => (
                <div key={module} className="p-2 hover:bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium">{module}</p>
                  <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-gradpath-purple h-1.5 rounded-full"
                      style={{ width: `${Math.floor(Math.random() * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Mobile New Post Button */}
      <div className="md:hidden fixed bottom-6 right-6">
        <Button size="lg" className="rounded-full shadow-lg bg-gradpath-purple hover:bg-gradpath-purple/90">
          <PlusCircle className="h-6 w-6" />
        </Button>
      </div>

      {/* Mobile Drawer */}
      <ChatDrawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />
    </div>
  );
};

export default Dashboard;
