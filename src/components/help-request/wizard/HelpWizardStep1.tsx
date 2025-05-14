
import React from 'react';
import { Button } from '@/components/ui/button';
import ModuleSelector from '../ModuleSelector';

interface Module {
  id: number;
  name: string;
}

interface HelpWizardStep1Props {
  modules: Module[];
  selectedModule: number | null;
  setSelectedModule: (moduleId: number) => void;
  onNext: () => void;
}

const HelpWizardStep1: React.FC<HelpWizardStep1Props> = ({
  modules,
  selectedModule,
  setSelectedModule,
  onNext
}) => {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Step 1: Select a Module</h2>
      <div className="grid gap-2">
        <ModuleSelector
          modules={modules}
          selectedModule={selectedModule}
          onSelect={setSelectedModule}
        />
      </div>
      <div className="mt-6 flex justify-end">
        <Button
          disabled={!selectedModule}
          onClick={onNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default HelpWizardStep1;
