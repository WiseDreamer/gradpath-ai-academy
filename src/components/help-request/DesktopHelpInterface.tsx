
import React from 'react';
import { Button } from '@/components/ui/button';
import ModuleSelector from './ModuleSelector';
import ChapterSelector from './ChapterSelector';
import HelpersList from './HelpersList';

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

interface DesktopHelpInterfaceProps {
  modules: Module[];
  chapters: string[];
  helpers: Helper[];
  selectedModule: number | null;
  selectedChapter: string | null;
  setSelectedModule: (moduleId: number) => void;
  setSelectedChapter: (chapter: string) => void;
  onRequestHelp: () => void;
}

const DesktopHelpInterface: React.FC<DesktopHelpInterfaceProps> = ({
  modules,
  chapters,
  helpers,
  selectedModule,
  selectedChapter,
  setSelectedModule,
  setSelectedChapter,
  onRequestHelp
}) => {
  return (
    <div className="grid grid-cols-12 gap-6 mt-6">
      <div className="col-span-4 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-6">Define Your Request</h2>
        
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Select Module</h3>
          <ModuleSelector 
            modules={modules}
            selectedModule={selectedModule}
            onSelect={setSelectedModule}
          />
        </div>
        
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Select Chapter</h3>
          <ChapterSelector
            chapters={chapters}
            selectedChapter={selectedChapter}
            onSelect={setSelectedChapter}
            disabled={!selectedModule}
          />
        </div>
      </div>
      
      <div className="col-span-8 bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Available Helpers</h2>
          <Button 
            disabled={!selectedModule || !selectedChapter} 
            onClick={onRequestHelp}
            className="bg-gradpath-purple hover:bg-gradpath-purple/90"
          >
            Request Help Now
          </Button>
        </div>
        
        <HelpersList helpers={helpers} layout="grid" />
      </div>
    </div>
  );
};

export default DesktopHelpInterface;
