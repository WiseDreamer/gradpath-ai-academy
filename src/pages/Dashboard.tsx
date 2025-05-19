
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
  Video, Upload, Calendar, FileText, MessageCircle, BarChart, GraduationCap, BookOpen
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
      if (isSigningOut) return;
      setIsSigningOut(true);
      toast({
        title: "Signing out...",
        description: "Please wait while we sign you out."
      });
      await signOut();
    } catch (error) {
      console.error("Dashboard: Error during sign out:", error);
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again or refresh the page.",
        variant: "destructive"
      });
    } finally {
      setTimeout(() => {
        setIsSigningOut(false);
      }, 1000);
    }
  };
  
  // Loading skeleton components
  const CardSkeleton = () => (
    <div className="bg-white/80 rounded-xl p-6 shadow-subtle border border-gray-100">
      <div className="flex flex-col items-center space-y-4">
        <Skeleton className="h-16 w-16 rounded-full" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pattern-bg">
      <NavBar />
      
      <div className="container mx-auto px-4 py-6 pb-24 md:pb-16">
        <div className="mb-8 bg-gradient-to-r from-gradpath-navy to-gradpath-dark-navy p-6 sm:p-8 rounded-xl text-white shadow-card relative overflow-hidden">
          <div className="absolute inset-0 opacity-20" 
               style={{
                 backgroundImage: `url('/images/campus-library.jpg')`,
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',
                 mixBlendMode: 'overlay'
               }}>
          </div>
          <div className="relative z-10">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold">Welcome, {userProfile?.firstName || 'Student'}</h1>
            <p className="text-gray-200 mt-1 font-sans">Access your academic resources and learning tools</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Learning Resources Section */}
          <div className="md:col-span-2">
            <div className="academic-card-header mb-4">
              <h2 className="text-xl font-serif font-semibold text-gradpath-navy">Learning Resources</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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
                    className="bg-[url('/images/virtual-class.jpg')] bg-cover bg-center text-white"
                  />
                  <DashboardCard 
                    title="My Materials" 
                    description="Upload lecture slides and study material" 
                    icon={Upload} 
                    to="#" 
                    color="bg-gradpath-slate" 
                  />
                  <DashboardCard 
                    title="Study Plan" 
                    description="View your personalized study schedule" 
                    icon={Calendar} 
                    to="/study-plan" 
                    color="bg-gradpath-teal" 
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
            <div className="academic-card-header mb-4">
              <h2 className="text-xl font-serif font-semibold text-gradpath-navy">Quick Access</h2>
            </div>
            
            <div className="space-y-4 sm:space-y-6">
              {isLoading ? (
                <>
                  <CardSkeleton />
                  <CardSkeleton />
                </>
              ) : (
                <>
                  <DashboardCard 
                    title="AI Study Assistant" 
                    description="Get instant help with questions" 
                    icon={MessageCircle} 
                    to="#" 
                    color="bg-gradpath-dark-teal" 
                    className="bg-[url('/images/study-group.jpg')] bg-cover bg-center text-white"
                  />
                  <DashboardCard 
                    title="Review Progress" 
                    description="View your learning analytics" 
                    icon={BarChart} 
                    to="#" 
                    color="bg-gradpath-dark-navy" 
                  />
                </>
              )}
            </div>
          </div>
        </div>

        {/* Recent Modules Content */}
        <div className="academic-card mb-24 md:mb-8">
          <div className="academic-card-header">
            <h2 className="text-xl font-serif font-semibold text-gradpath-navy">Recent Modules</h2>
            <Link to="/module/all" className="text-sm font-medium text-gradpath-teal hover:underline">
              View All
            </Link>
          </div>
          
          <div className="academic-card-body">
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-24 w-full rounded-lg" />
                <Skeleton className="h-24 w-full rounded-lg" />
                <Skeleton className="h-24 w-full rounded-lg" />
              </div>
            ) : (
              <AiTutorTab />
            )}
          </div>
        </div>
      </div>

      {/* Add the bottom navigation for mobile */}
      {isMobile && <BottomNav />}
    </div>
  );
};

export default Dashboard;
