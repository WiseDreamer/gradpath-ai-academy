
import React from 'react';
import { FileText } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ResourcesTabProps {
  resources?: string[];
}

const ResourcesTab: React.FC<ResourcesTabProps> = ({ 
  resources = ['Linear Algebra Basics.pdf', 'Matrix Operations.pdf', 'Vector Spaces.pdf'] 
}) => {
  return (
    <ScrollArea className="h-full">
      <div className="p-4">
        <h3 className="font-medium mb-4">Class Resources</h3>
        <div className="space-y-3">
          {resources.map((file) => (
            <div 
              key={file}
              className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition cursor-pointer"
            >
              <FileText className="h-5 w-5 text-gradpath-purple" />
              <span>{file}</span>
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
};

export default ResourcesTab;
