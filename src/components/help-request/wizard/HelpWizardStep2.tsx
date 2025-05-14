
import React from 'react';
import { Button } from '@/components/ui/button';
import ChapterSelector from '../ChapterSelector';

interface HelpWizardStep2Props {
  chapters: string[];
  selectedChapter: string | null;
  setSelectedChapter: (chapter: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const HelpWizardStep2: React.FC<HelpWizardStep2Props> = ({
  chapters,
  selectedChapter,
  setSelectedChapter,
  onNext,
  onBack
}) => {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Step 2: Select a Chapter</h2>
      <div className="grid gap-2">
        <ChapterSelector
          chapters={chapters}
          selectedChapter={selectedChapter}
          onSelect={setSelectedChapter}
        />
      </div>
      <div className="mt-6 flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button
          disabled={!selectedChapter}
          onClick={onNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default HelpWizardStep2;
