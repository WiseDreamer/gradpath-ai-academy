
import React from 'react';
import { Button } from '@/components/ui/button';

interface Module {
  id: number;
  name: string;
}

interface ModuleSelectorProps {
  modules: Module[];
  selectedModule: number | null;
  onSelect: (moduleId: number) => void;
  disabled?: boolean;
}

const ModuleSelector: React.FC<ModuleSelectorProps> = ({ 
  modules, 
  selectedModule, 
  onSelect,
  disabled = false 
}) => {
  return (
    <div className="space-y-2">
      {modules.map(module => (
        <Button
          key={module.id}
          variant={selectedModule === module.id ? "default" : "outline"}
          className="w-full justify-start"
          onClick={() => onSelect(module.id)}
          disabled={disabled}
        >
          {module.name}
        </Button>
      ))}
    </div>
  );
};

export default ModuleSelector;
