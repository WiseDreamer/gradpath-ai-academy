
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Bell, User, MessageCircle, 
  BookOpen, Upload, Calendar, FileText, Book, MessageSquare 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import DashboardCard from '@/components/DashboardCard';
import Logo from '@/components/Logo';
import { useAuth } from '@/components/AuthProvider';
import UserProfile from '@/components/UserProfile';
import PostsSection from '@/components/PostsSection';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();
  const iconSize = 28;
  const iconStrokeWidth = 2.5;

  return (
    <div className="min-h-screen bg-[#F5F5F7] overflow-x-hidden">
      <div className="border-b bg-gradpath-purple text-white sticky top-0 z-50 w-full">
        <div className="w-full px-0 mx-0">
          <div className="flex items-center justify-between h-20 px-4">
            <div className="flex items-center gap-2">
              <Logo clickable={false} />
            </div>
            <div className="flex items-center gap-2">
              <Link to="/global-chat">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" aria-label="Global Chat">
                  <MessageCircle size={iconSize} strokeWidth={iconStrokeWidth} />
                </Button>
              </Link>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" aria-label="Notifications">
                <Bell size={iconSize} strokeWidth={iconStrokeWidth} />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" aria-label="User Profile">
                <User size={iconSize} strokeWidth={iconStrokeWidth} />
              </Button>
              <Button 
                variant="outline" 
                className="ml-2 text-white border-white hover:bg-white/20 hover:text-white"
                onClick={signOut}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-4 mx-0 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Learning Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
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
                icon={Upload}
                to="/upload"
                color="bg-gradpath-bright-blue"
              />
              
              <DashboardCard
                title="Study Plan"
                description="View and manage your personalized study schedule"
                icon={Calendar}
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
            </div>
            
            <div className="mt-8">
              <PostsSection />
            </div>
          </div>
          
          <div className="space-y-6">
            <UserProfile />
            
            <div>
              <h3 className="font-semibold mb-4">Recent Modules</h3>
              <div className="grid grid-cols-1 gap-3 mb-4">
                {['Calculus I', 'Linear Algebra', 'Quantum Mechanics'].map((module) => (
                  <div key={module} className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border p-4">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
