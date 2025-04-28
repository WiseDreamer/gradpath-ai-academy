
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Bell, User, MessageCircle, 
  ChevronLeft, Menu, Calendar, 
  FileText, LogOut, BookOpen,
  Upload 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import DashboardCard from '@/components/DashboardCard';
import Logo from '@/components/Logo';
import { useAuth } from '@/components/AuthProvider';
import AiTutorTab from '@/components/ModuleView/AiTutorTab';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();
  const iconSize = 28;
  const iconStrokeWidth = 2.5;

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <div className="border-b bg-gradpath-purple text-white sticky top-0 z-50 w-full">
        <div className="w-full px-0 mx-0">
          <div className="flex items-center justify-between h-20 px-4">
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={signOut}
                className="text-white hover:bg-white/20"
                aria-label="Sign Out"
              >
                <LogOut size={iconSize} strokeWidth={iconStrokeWidth} className="transform scale-x-[-1]" />
              </Button>
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
              <Link to="/profile">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" aria-label="User Profile">
                  <User size={iconSize} strokeWidth={iconStrokeWidth} />
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/20"
                aria-label="Menu"
              >
                <Menu size={iconSize} strokeWidth={iconStrokeWidth} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-7xl mx-auto">
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
            <AiTutorTab />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
