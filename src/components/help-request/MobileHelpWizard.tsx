
import React from 'react';
import HelpWizardStep1 from './wizard/HelpWizardStep1';
import HelpWizardStep2 from './wizard/HelpWizardStep2';
import HelpWizardStep3 from './wizard/HelpWizardStep3';

interface Module {
  id: number;
  name: string;
}

interface Helper {
  id: number;
  name: string;
  avatar: string | null;
  rating: number;
  expertise: string;
  status: string;
}

interface MobileHelpWizardProps {
  step: number;
  modules: Module[];
  chapters: string[];
  helpers: Helper[];
  selectedModule: number | null;
  selectedChapter: string | null;
  setSelectedModule: (moduleId: number) => void;
  setSelectedChapter: (chapter: string) => void;
  onNextStep: () => void;
  onPrevStep: () => void;
  onRequestHelp: () => void;
}

const MobileHelpWizard: React.FC<MobileHelpWizardProps> = ({
  step,
  modules,
  chapters,
  helpers,
  selectedModule,
  selectedChapter,
  setSelectedModule,
  setSelectedChapter,
  onNextStep,
  onPrevStep,
  onRequestHelp
}) => {
  if (step === 1) {
    return (
      <HelpWizardStep1
        modules={modules}
        selectedModule={selectedModule}
        setSelectedModule={setSelectedModule}
        onNext={onNextStep}
      />
    );
  } else if (step === 2) {
    return (
      <HelpWizardStep2
        chapters={chapters}
        selectedChapter={selectedChapter}
        setSelectedChapter={setSelectedChapter}
        onNext={onNextStep}
        onBack={onPrevStep}
      />
    );
  } else {
    return (
      <HelpWizardStep3
        helpers={helpers}
        onBack={onPrevStep}
        onRequestHelp={onRequestHelp}
      />
    );
  }
};

export default MobileHelpWizard;
