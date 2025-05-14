
import React from 'react';
import { Button } from '@/components/ui/button';

interface ChapterSelectorProps {
  chapters: string[];
  selectedChapter: string | null;
  onSelect: (chapter: string) => void;
  disabled?: boolean;
}

const ChapterSelector: React.FC<ChapterSelectorProps> = ({ 
  chapters, 
  selectedChapter, 
  onSelect,
  disabled = false 
}) => {
  return (
    <div className="space-y-2">
      {chapters.map((chapter, index) => (
        <Button
          key={index}
          variant={selectedChapter === chapter ? "default" : "outline"}
          className="w-full justify-start"
          onClick={() => onSelect(chapter)}
          disabled={disabled}
        >
          {chapter}
        </Button>
      ))}
    </div>
  );
};

export default ChapterSelector;
