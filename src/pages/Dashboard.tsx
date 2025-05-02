
import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, User, MessageCircle, ChevronLeft, Menu, Calendar, FileText, LogOut, Video, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DashboardCard from '@/components/DashboardCard';
import Logo from '@/components/Logo';
import { useAuth } from '@/components/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import AiTutorTab from '@/components/ModuleView/AiTutorTab';
import { useIsMobile } from '@/hooks/use-mobile';

const Dashboard: React.FC = () => {
  const {
    signOut,
    user
  } = useAuth();
  const {
    toast
  } = useToast();
  const iconSize = 36;
  const iconStrokeWidth = 2;
  const [isSigningOut, setIsSigningOut] = React.useState(false);
  const isMobile = useIsMobile();

  const handleSignOut = async () => {
    try {
      if (isSigningOut) {
        console.log("Dashboard: Sign out already in progress");
        return;
      }
      setIsSigningOut(true);
      console.log("Dashboard: Sign out button clicked");
      toast({
        title: "Signing out...",
        description: "Please wait while we sign you out."
      });
      await signOut();
      // The AuthProvider will handle navigation and toasts
    } catch (error) {
      console.error("Dashboard: Error during sign out:", error);
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again or refresh the page.",
        variant: "destructive"
      });
    } finally {
      // Reset state after a short delay
      setTimeout(() => {
        setIsSigningOut(false);
      }, 1000);
    }
  };

  console.log("Dashboard rendering, user:", user?.email);
  return <div className="min-h-screen bg-[#F5F5F7]">
      <div className="border-b bg-gradpath-purple text-white sticky top-0 z-50 w-full">
        <div className="w-full px-0 mx-0">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" onClick={handleSignOut} disabled={isSigningOut} className="text-white hover:bg-white/20 disabled:opacity-50" aria-label="Sign Out">
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
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" aria-label="Menu">
                <Menu size={iconSize} strokeWidth={iconStrokeWidth} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-3">
        <div className="max-w-7xl mx-auto">
          <div className="mb-4 mt-1">
            <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl py-2 shadow-sm text-center border border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800">Learning Resources</h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <DashboardCard title="Join Virtual Class" description="Jump into an interactive AI-powered virtual classroom" icon={Video} to="/virtual-class" color="bg-gradpath-purple" />
            
            <DashboardCard title="Upload Module Resources" description="Upload lecture slides, notes, and study material" icon={Upload} to="/upload" color="bg-gradpath-bright-blue" />
            
            <DashboardCard title="Study Plan" description="View and manage your personalized study schedule" icon={Calendar} to="/study-plan" color="bg-green-500" />
            
            <DashboardCard title="Practice Questions" description="Test your knowledge with AI-generated practice questions" icon={FileText} to="/practice" color="bg-amber-500" />
          </div>
          
          <div className="mb-4 mt-6">
            <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl py-2 shadow-sm text-center border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-800">Recent Modules</h3>
            </div>
          </div>
          
          <div className="mt-2">
            <AiTutorTab />
          </div>

          {isMobile && <div className="flex justify-center mt-4 mb-6">
              <Button className="w-full max-w-xs bg-gradpath-purple hover:bg-gradpath-dark-purple">
                View All Modules
              </Button>
            </div>}
        </div>
      </div>
    </div>;
};
export default Dashboard;
