
import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import BottomNav from '@/components/BottomNav';
import DesktopHelpInterface from '@/components/help-request/DesktopHelpInterface';
import MobileHelpWizard from '@/components/help-request/MobileHelpWizard';
import MatchingOverlay from '@/components/help-request/MatchingOverlay';
import { MOCK_HELPERS, MOCK_MODULES, MODULE_CHAPTERS } from '@/components/help-request/data';
import { useHelperMatching } from '@/hooks/useHelperMatching';
import NavBar from '@/components/navbar';

const HelpRequestPage: React.FC = () => {
  const isMobile = useIsMobile();
  const [step, setStep] = useState<number>(1);
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  
  // Use our custom hook for matching logic
  const { 
    showMatching, 
    matchedHelper, 
    matchProgress, 
    startMatching, 
    handleStartSession, 
    closeMatching 
  } = useHelperMatching();

  // Reset the wizard step when session starts
  const onSessionStart = () => {
    handleStartSession();
    setStep(1);
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
            onRequestHelp={startMatching}
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
            onRequestHelp={startMatching}
          />
        )}
      </div>
      
      {/* Matching Overlay - handles both mobile and desktop */}
      <MatchingOverlay 
        showMatching={showMatching}
        matchProgress={matchProgress}
        matchedHelper={matchedHelper}
        onClose={closeMatching}
        onStartSession={onSessionStart}
      />
      
      {isMobile && <BottomNav />}
    </div>
  );
};

export default HelpRequestPage;
