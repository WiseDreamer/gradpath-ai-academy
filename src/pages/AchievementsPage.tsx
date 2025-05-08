
import React from 'react';
import NavBar from '@/components/NavBar';
import { useIsMobile } from '@/hooks/use-mobile';
import BottomNav from '@/components/BottomNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Award, CheckCircle, Circle, ChevronRight } from 'lucide-react';

// Mock achievement data
const ACHIEVEMENTS = [
  { 
    id: 1, 
    title: 'First Session',
    description: 'Complete your first help session',
    icon: '🏅',
    unlocked: true,
    category: 'helper'
  },
  { 
    id: 2, 
    title: 'Rising Star',
    description: 'Help 5 students with their questions',
    icon: '⭐',
    unlocked: true,
    category: 'helper'
  },
  { 
    id: 3, 
    title: 'Super Helper',
    description: 'Reach a 4.5 star rating after 10 sessions',
    icon: '🌟',
    unlocked: false,
    progress: 60,
    category: 'helper'
  },
  { 
    id: 4, 
    title: 'Knowledge Seeker',
    description: 'Complete 5 modules in the library',
    icon: '📚',
    unlocked: true,
    category: 'learner'
  },
  { 
    id: 5, 
    title: 'Quiz Master',
    description: 'Score 90%+ on 10 practice quizzes',
    icon: '🧠',
    unlocked: false,
    progress: 40,
    category: 'learner'
  },
  { 
    id: 6, 
    title: 'Social Butterfly',
    description: 'Post 10 messages in the global chat',
    icon: '🦋',
    unlocked: true,
    category: 'social'
  },
];

// Mock user stats
const USER_STATS = {
  totalHelpSessions: 12,
  rating: 4.8,
  totalPoints: 450,
  level: 3,
  nextLevelPoints: 500,
  badges: 8,
  rank: 24,
};

const AchievementsPage: React.FC = () => {
  const isMobile = useIsMobile();
  
  const levelProgress = (USER_STATS.totalPoints / USER_STATS.nextLevelPoints) * 100;
  
  const renderBadge = (achievement: typeof ACHIEVEMENTS[0], size: 'sm' | 'lg' = 'lg') => (
    <div 
      className={`
        ${size === 'lg' ? 'h-24 w-24' : 'h-16 w-16'} 
        rounded-full flex items-center justify-center 
        ${achievement.unlocked ? 'bg-gradpath-purple' : 'bg-gray-200'} 
        ${size === 'lg' ? 'text-4xl' : 'text-2xl'} 
        shadow-md
      `}
    >
      {achievement.icon}
    </div>
  );

  const MobileAchievementList = () => (
    <>
      <h2 className="text-xl font-bold mb-4">My Badges</h2>
      <div className="flex overflow-x-auto pb-4 space-x-4 mb-6">
        {ACHIEVEMENTS.filter(a => a.unlocked).map(achievement => (
          <div key={achievement.id} className="flex flex-col items-center min-w-[80px]">
            {renderBadge(achievement, 'sm')}
            <span className="text-xs mt-2 text-center">{achievement.title}</span>
          </div>
        ))}
      </div>
      
      <h2 className="text-xl font-bold mb-4">Badges to Unlock</h2>
      <div className="space-y-4">
        {ACHIEVEMENTS.filter(a => !a.unlocked).map(achievement => (
          <Card key={achievement.id}>
            <CardContent className="p-4 flex items-center">
              <div className="mr-4">
                {renderBadge(achievement, 'sm')}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{achievement.title}</h3>
                <p className="text-sm text-gray-500">{achievement.description}</p>
                <Progress value={achievement.progress} className="h-2 mt-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="py-6 flex justify-center">
        <Button className="bg-gradpath-purple">Earn More Points</Button>
      </div>
    </>
  );

  const DesktopAchievementList = () => (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-4">
        <Card>
          <CardHeader>
            <CardTitle>Level Progress</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="relative flex items-center justify-center">
              <div className="h-48 w-48 rounded-full border-8 border-gradpath-purple flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold">Lv. {USER_STATS.level}</div>
                  <div className="text-sm">{USER_STATS.totalPoints} / {USER_STATS.nextLevelPoints} pts</div>
                </div>
              </div>
              <div className="absolute top-0 left-0 right-0 bottom-0">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="45" 
                    fill="none" 
                    stroke="#F3F4F6" 
                    strokeWidth="8"
                  />
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="45" 
                    fill="none" 
                    stroke="#9b87f5" 
                    strokeWidth="8"
                    strokeDasharray="282.7"
                    strokeDashoffset={282.7 - (282.7 * levelProgress / 100)}
                    transform="rotate(-90, 50, 50)"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-6 text-center">
              <p className="text-gray-500 mb-2">You're ranked #{USER_STATS.rank} in your class</p>
              <Button className="bg-gradpath-purple mt-2">View Leaderboard</Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="col-span-8">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Achievement Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gradpath-purple">{USER_STATS.totalHelpSessions}</div>
                <div className="text-gray-500">Help Sessions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gradpath-purple">{USER_STATS.rating} ★</div>
                <div className="text-gray-500">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gradpath-purple">{USER_STATS.badges}</div>
                <div className="text-gray-500">Badges Earned</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>My Badges</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="font-semibold mb-4">Helper Badges</h3>
            <div className="grid grid-cols-3 gap-6 mb-8">
              {ACHIEVEMENTS.filter(a => a.category === 'helper').map(achievement => (
                <div key={achievement.id} className="flex flex-col items-center">
                  {renderBadge(achievement)}
                  <span className="text-sm mt-2 text-center font-semibold">{achievement.title}</span>
                  <span className="text-xs text-center text-gray-500">{achievement.description}</span>
                  {!achievement.unlocked && achievement.progress && (
                    <Progress value={achievement.progress} className="h-2 w-full mt-2" />
                  )}
                </div>
              ))}
            </div>
            
            <h3 className="font-semibold mb-4">Learner Badges</h3>
            <div className="grid grid-cols-3 gap-6 mb-8">
              {ACHIEVEMENTS.filter(a => a.category === 'learner').map(achievement => (
                <div key={achievement.id} className="flex flex-col items-center">
                  {renderBadge(achievement)}
                  <span className="text-sm mt-2 text-center font-semibold">{achievement.title}</span>
                  <span className="text-xs text-center text-gray-500">{achievement.description}</span>
                  {!achievement.unlocked && achievement.progress && (
                    <Progress value={achievement.progress} className="h-2 w-full mt-2" />
                  )}
                </div>
              ))}
            </div>
            
            <h3 className="font-semibold mb-4">Social Badges</h3>
            <div className="grid grid-cols-3 gap-6">
              {ACHIEVEMENTS.filter(a => a.category === 'social').map(achievement => (
                <div key={achievement.id} className="flex flex-col items-center">
                  {renderBadge(achievement)}
                  <span className="text-sm mt-2 text-center font-semibold">{achievement.title}</span>
                  <span className="text-xs text-center text-gray-500">{achievement.description}</span>
                  {!achievement.unlocked && achievement.progress && (
                    <Progress value={achievement.progress} className="h-2 w-full mt-2" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const MobileProgressView = () => (
    <div className="mb-6">
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col items-center">
            <div className="relative flex items-center justify-center mb-4">
              <div className="h-28 w-28 rounded-full border-4 border-gradpath-purple flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold">Lv. {USER_STATS.level}</div>
                  <div className="text-xs">{USER_STATS.totalPoints}pts</div>
                </div>
              </div>
              <div className="absolute top-0 left-0 right-0 bottom-0">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="45" 
                    fill="none" 
                    stroke="#F3F4F6" 
                    strokeWidth="4"
                  />
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="45" 
                    fill="none" 
                    stroke="#9b87f5" 
                    strokeWidth="4"
                    strokeDasharray="282.7"
                    strokeDashoffset={282.7 - (282.7 * levelProgress / 100)}
                    transform="rotate(-90, 50, 50)"
                  />
                </svg>
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">
                Next level: {USER_STATS.nextLevelPoints - USER_STATS.totalPoints} points to go
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-6">
            <div className="text-center">
              <div className="text-xl font-bold">{USER_STATS.totalHelpSessions}</div>
              <div className="text-xs text-gray-500">Sessions</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">{USER_STATS.rating} ★</div>
              <div className="text-xs text-gray-500">Rating</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">#{USER_STATS.rank}</div>
              <div className="text-xs text-gray-500">Rank</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <div className="flex justify-between">
          <h2 className="text-lg font-bold">Level Progress</h2>
          <span className="text-sm text-gray-500">{levelProgress.toFixed(0)}%</span>
        </div>
        <Progress value={levelProgress} className="h-3" />
        <div className="flex justify-between text-xs text-gray-500">
          <span>Level {USER_STATS.level}</span>
          <span>Level {USER_STATS.level + 1}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <NavBar />
      <div className="container mx-auto px-4 pb-20">
        <h1 className="text-2xl font-bold mt-6">My Achievements</h1>
        <p className="text-gray-500 mb-6">Track your progress and earn rewards</p>

        {isMobile ? (
          <>
            <MobileProgressView />
            <MobileAchievementList />
          </>
        ) : (
          <DesktopAchievementList />
        )}
      </div>
      {isMobile && <BottomNav />}
    </div>
  );
};

export default AchievementsPage;
