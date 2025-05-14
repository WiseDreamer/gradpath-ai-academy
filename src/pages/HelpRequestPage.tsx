
import React, { useState } from 'react';
import NavBar from '@/components/navbar';
import { useIsMobile } from '@/hooks/use-mobile';
import BottomNav from '@/components/BottomNav';
import DesktopHelpInterface from '@/components/help-request/DesktopHelpInterface';
import MobileHelpWizard from '@/components/help-request/MobileHelpWizard';
import MatchingDialog from '@/components/help-request/MatchingDialog';
import MatchingDrawer from '@/components/help-request/MatchingDrawer';
import { MOCK_HELPERS, MOCK_MODULES, MODULE_CHAPTERS } from '@/components/help-request/data';

const HelpRequestPage: React.FC = () => {
  const isMobile = useIsMobile();
  const [step, setStep] = useState<number>(1);
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const [showMatching, setShowMatching] = useState<boolean>(false);
  const [matchedHelper, setMatchedHelper] = useState<typeof MOCK_HELPERS[0] | null>(null);
  const [matchProgress, setMatchProgress] = useState<number>(0);

  const handleRequestHelp = () => {
    setShowMatching(true);
    
    // Simulate matching progress
    const interval = setInterval(() => {
      setMatchProgress(prev => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          // After 100%, simulate finding a match
          setTimeout(() => {
            setMatchedHelper(MOCK_HELPERS[0]);
          }, 500);
        }
        return newProgress;
      });
    }, 300);
  };

  const handleStartSession = () => {
    // In a real app, this would start the session with the matched helper
    setShowMatching(false);
    setMatchedHelper(null);
    setStep(1);
    // Would navigate to a chat/voice session page
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <NavBar />
      <div className="container mx-auto px-4 pb-20">
        <h1 className="text-2xl font-bold mt-6">Request Help</h1>
        <p className="text-gray-500 mb-6">Get one-on-one assistance from top achievers</p>
        
        {isMobile ? (
          <MobileHelpWizard 
            step={step}
            modules={MOCK_MODULES}
            chapters={MODULE_CHAPTERS}
            helpers={MOCK_HELPERS}
            selectedModule={selectedModule}
            selectedChapter={selectedChapter}
            setSelectedModule={setSelectedModule}
            setSelectedChapter={setSelectedChapter}
            onNextStep={() => setStep(prev => prev + 1)}
            onPrevStep={() => setStep(prev => prev - 1)}
            onRequestHelp={handleRequestHelp}
          />
        ) : (
          <DesktopHelpInterface
            modules={MOCK_MODULES}
            chapters={MODULE_CHAPTERS}
            helpers={MOCK_HELPERS}
            selectedModule={selectedModule}
            selectedChapter={selectedChapter}
            setSelectedModule={setSelectedModule}
            setSelectedChapter={setSelectedChapter}
            onRequestHelp={handleRequestHelp}
          />
        )}
      </div>
      
      {/* Matching Overlay - Desktop */}
      {!isMobile && (
        <MatchingDialog 
          open={showMatching} 
          onOpenChange={setShowMatching}
          matchProgress={matchProgress}
          matchedHelper={matchedHelper}
          onStartSession={handleStartSession}
        />
      )}

      {/* Matching Overlay - Mobile */}
      {isMobile && (
        <MatchingDrawer
          open={showMatching}
          onClose={() => {}}
          matchProgress={matchProgress}
          matchedHelper={matchedHelper}
          onStartSession={handleStartSession}
        />
      )}
      
      {isMobile && <BottomNav />}
    </div>
  );
};

export default HelpRequestPage;
