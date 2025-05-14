
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/components/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { Skeleton } from '@/components/ui/skeleton';
import { useNotifications } from '@/hooks/useNotifications';
import { useUserProfile } from '@/hooks/useUserProfile';
import NavBar from '@/components/navbar/index';
import BottomNav from '@/components/BottomNav';
import DashboardCard from '@/components/DashboardCard';
import AiTutorTab from '@/components/ModuleView/AiTutorTab';
import { 
  Video, Upload, Calendar, FileText, MessageCircle, BarChart, Graduation
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(true);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const { notifications, unreadCount } = useNotifications();
  const { userProfile } = useUserProfile();

  // Add loading effect to simulate content load and prevent flash
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [isMobile]);

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
  
  // Loading skeleton components
  const CardSkeleton = () => (
    <div className="bg-white/80 rounded-xl p-6 shadow-lg border border-gray-100">
      <div className="flex flex-col items-center space-y-4">
        <Skeleton className="h-16 w-16 rounded-full" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  );

  const HeaderSkeleton = () => (
    <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl py-2 shadow-sm border border-gray-100 dark:border-gray-700">
      <Skeleton className="h-6 w-40 mx-auto" />
    </div>
  );

  return (
    <div className="min-h-screen dashboard-bg">
      <NavBar />
      
      <div className="container mx-auto px-4 py-6 pb-16">
        <div className="mb-8 bg-gradient-to-r from-gradpath-navy to-gradpath-slate p-6 rounded-xl text-white shadow-lg">
          <h1 className="text-3xl font-bold">Welcome, {userProfile?.firstName || 'Student'}</h1>
          <p className="text-gray-200 mt-1">Access your academic resources and tools</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Learning Resources Section */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4">
              <h2 className="text-xl font-semibold text-gradpath-navy">Learning Resources</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {isLoading ? (
                <>
                  <CardSkeleton />
                  <CardSkeleton />
                  <CardSkeleton />
                  <CardSkeleton />
                </>
              ) : (
                <>
                  <DashboardCard 
                    title="Join Virtual Class" 
                    description="Interactive AI-powered virtual classroom" 
                    icon={Video} 
                    to="/virtual-class" 
                    color="bg-gradpath-navy" 
                  />
                  <DashboardCard 
                    title="Upload Resources" 
                    description="Upload lecture slides and study material" 
                    icon={Upload} 
                    to="#" 
                    color="bg-gradpath-teal" 
                  />
                  <DashboardCard 
                    title="Study Plan" 
                    description="View your personalized study schedule" 
                    icon={Calendar} 
                    to="/study-plan" 
                    color="bg-gradpath-emerald" 
                  />
                  <DashboardCard 
                    title="Practice Questions" 
                    description="Test with AI-generated practice questions" 
                    icon={FileText} 
                    to="/practice" 
                    color="bg-gradpath-amber" 
                  />
                </>
              )}
            </div>
          </div>
          
          {/* Quick Access Section */}
          <div className="col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4">
              <h2 className="text-xl font-semibold text-gradpath-navy">Quick Access</h2>
            </div>
            
            <div className="space-y-4">
              {isLoading ? (
                <>
                  <CardSkeleton />
                  <CardSkeleton />
                </>
              ) : (
                <>
                  <DashboardCard 
                    title="Ask AI Tutor" 
                    description="Get instant help with questions" 
                    icon={MessageCircle} 
                    to="#" 
                    color="bg-gradpath-slate" 
                  />
                  <DashboardCard 
                    title="Track Performance" 
                    description="View your learning analytics" 
                    icon={BarChart} 
                    to="#" 
                    color="bg-gradpath-coral" 
                  />
                </>
              )}
            </div>
          </div>
        </div>

        {/* Recent Modules Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gradpath-navy">Recent Modules</h2>
          <Link to="/module/all" className="text-sm font-medium text-gradpath-navy hover:underline">
            View All
          </Link>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {isLoading ? (
            <div className="space-y-4 p-4">
              <Skeleton className="h-24 w-full rounded-lg" />
              <Skeleton className="h-24 w-full rounded-lg" />
              <Skeleton className="h-24 w-full rounded-lg" />
            </div>
          ) : (
            <AiTutorTab />
          )}
        </div>
      </div>

      {/* Add the bottom navigation for mobile */}
      {isMobile && <BottomNav />}
    </div>
  );
};

export default Dashboard;
