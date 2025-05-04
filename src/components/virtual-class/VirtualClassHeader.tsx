
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

// Available modules list for mobile view
const availableModules = [
  "Linear Algebra - Virtual Class",
  "Calculus II",
  "Introduction to Statistics",
  "Discrete Mathematics",
  "Number Theory"
];

interface VirtualClassHeaderProps {
  title: string;
  institution: string;
  onChangeModule?: (module: string) => void;
}

const VirtualClassHeader: React.FC<VirtualClassHeaderProps> = ({ 
  title, 
  institution,
  onChangeModule 
}) => {
  return (
    <div className="w-full bg-white rounded-t-xl shadow-sm border border-gray-100 p-4">
      {onChangeModule ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full text-center">
            <h1 className="text-2xl font-bold flex items-center justify-center gap-2">
              {title}
              <ChevronDown className="h-4 w-4" />
            </h1>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64">
            {availableModules.map((module) => (
              <DropdownMenuItem 
                key={module}
                onClick={() => onChangeModule(module)}
                className={`${title === module ? 'bg-gray-100 font-medium' : ''}`}
              >
                {module}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <h1 className="text-2xl font-bold text-center">{title}</h1>
      )}
      <p className="text-gray-600 text-center">{institution}</p>
    </div>
  );
};

export default VirtualClassHeader;
