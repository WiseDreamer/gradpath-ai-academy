
import React from 'react';
import NavBar from '@/components/NavBar';
import { useIsMobile } from '@/hooks/use-mobile';
import BottomNav from '@/components/BottomNav';

const AchievementsPage: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <NavBar />
      <div className="container mx-0 px-0 py-0 w-full max-w-none pb-16">
        <div className="flex flex-col items-center justify-center h-[80vh]">
          <h1 className="text-2xl font-bold text-center">Achievements</h1>
          <p className="text-center text-gray-500 mt-4">
            View your achievements and progress
          </p>
        </div>
      </div>
      {isMobile && <BottomNav />}
    </div>
  );
};

export default AchievementsPage;
