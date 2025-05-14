import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ChevronLeft, Menu, Calendar, FileText, LogOut, Video, Upload, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DashboardCard from '@/components/DashboardCard';
import Logo from '@/components/Logo';
import { useAuth } from '@/components/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import AiTutorTab from '@/components/ModuleView/AiTutorTab';
import { useIsMobile } from '@/hooks/use-mobile';
import { Skeleton } from '@/components/ui/skeleton';
import { useNotifications } from '@/hooks/useNotifications';
import { useUserProfile } from '@/hooks/useUserProfile';
import NavBar from '@/components/navbar';
import BottomNav from '@/components/BottomNav';

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
    <div className="min-h-screen bg-[#F5F5F7]">
      <NavBar />
      
      {/* Removed all horizontal padding and margins to allow full-width */}
      <div className="container mx-0 px-0 py-0 w-full max-w-none pb-16">
        <div className="w-full">
          {/* Learning Resources Section */}
          <div className="mt-0 mb-2 w-full">
            <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl py-2 shadow-sm text-center border border-gray-100 dark:border-gray-700 w-full">
              <h2 className="text-xl font-semibold text-gray-800">Learning Resources</h2>
            </div>
          </div>
          
          {/* Resource Cards - First Row - with full width */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 w-full px-0 mx-0">
            {isLoading ? (
              <>
                <CardSkeleton />
                <CardSkeleton />
              </>
            ) : (
              <>
                <DashboardCard title="Join Virtual Class" description="Jump into an interactive AI-powered virtual classroom" icon={Video} to="/virtual-class" color="bg-gradpath-purple" />
                <DashboardCard title="Upload Module Resources" description="Upload lecture slides, notes, and study material" icon={Upload} to="#" color="bg-gradpath-bright-blue" />
              </>
            )}
          </div>
          
          {/* Resource Cards - Second Row - with full width */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 w-full px-0 mx-0">
            {isLoading ? (
              <>
                <CardSkeleton />
                <CardSkeleton />
              </>
            ) : (
              <>
                <DashboardCard title="Study Plan" description="View and manage your personalized study schedule" icon={Calendar} to="/study-plan" color="bg-green-500" />
                <DashboardCard title="Practice Questions" description="Test your knowledge with AI-generated practice questions" icon={FileText} to="/practice" color="bg-amber-500" />
              </>
            )}
          </div>
          
          {/* AI Tutor and Performance Cards - with full width */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 w-full px-0 mx-0">
            {isLoading ? (
              <>
                <CardSkeleton />
                <CardSkeleton />
              </>
            ) : (
              <>
                <DashboardCard title="Ask AI Tutor" description="Get instant help with your questions" icon={MessageCircle} to="#" color="bg-gradpath-purple" />
                <DashboardCard title="Track My Performance" description="View your learning progress and analytics" icon={BarChart} to="#" color="bg-green-500" />
              </>
            )}
          </div>

          {/* Recent Modules Content - with full width */}
          <div className="mt-2 w-full px-0 mx-0">
            {isLoading ? (
              <div className="space-y-4 w-full">
                <Skeleton className="h-24 w-full rounded-lg" />
                <Skeleton className="h-24 w-full rounded-lg" />
                <Skeleton className="h-24 w-full rounded-lg" />
              </div>
            ) : (
              <AiTutorTab />
            )}
          </div>

          {/* Removed the "View All Modules" button */}
        </div>
      </div>

      {/* Add the bottom navigation for mobile */}
      {isMobile && <BottomNav />}
    </div>
  );
};

export default Dashboard;
