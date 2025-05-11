
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, Maximize } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarHeaderProps {
  title: string;
  institution: string;
  onChangeModule?: (moduleName: string) => void;
  onFullscreen?: () => void;
  onSetLessonScope?: () => void;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  title,
  institution,
  onChangeModule,
  onFullscreen,
  onSetLessonScope
}) => {
  const isMobile = useIsMobile();
  
  // Available modules list
  const availableModules = [
    "Linear Algebra - Virtual Class",
    "Calculus II - Virtual Class",
    "Discrete Mathematics - Virtual Class",
    "Statistics for Data Science - Virtual Class"
  ];
  
  if (isMobile) return null;
  
  return (
    <div className="p-3 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 hover:text-blue-600 transition-colors">
              <h2 className="font-medium">{title}</h2>
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {availableModules.map((module) => (
                <DropdownMenuItem 
                  key={module} 
                  onClick={() => onChangeModule && onChangeModule(module)}
                  className="cursor-pointer"
                >
                  {module}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <p className="text-sm text-gray-500">{institution}</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onSetLessonScope}
            className="text-xs"
          >
            Set Lesson Scope
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onFullscreen}
            className="p-1"
          >
            <Maximize className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
