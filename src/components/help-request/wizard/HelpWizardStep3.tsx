
import React from 'react';
import { Button } from '@/components/ui/button';
import HelpersList from '../HelpersList';

interface Helper {
  id: number;
  name: string;
  avatar: string | null;
  rating: number;
  expertise: string;
  status: string;
}

interface HelpWizardStep3Props {
  helpers: Helper[];
  onBack: () => void;
  onRequestHelp: () => void;
}

const HelpWizardStep3: React.FC<HelpWizardStep3Props> = ({
  helpers,
  onBack,
  onRequestHelp
}) => {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Step 3: Available Helpers</h2>
      <HelpersList helpers={helpers} />
      <div className="mt-6 flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onRequestHelp}>
          Request Help Now
        </Button>
      </div>
    </div>
  );
};

export default HelpWizardStep3;
