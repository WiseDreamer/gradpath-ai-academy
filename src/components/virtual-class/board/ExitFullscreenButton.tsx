
import React from 'react';
import { Minimize } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ExitFullscreenButtonProps {
  onClick: () => void;
}

export const ExitFullscreenButton: React.FC<ExitFullscreenButtonProps> = ({ onClick }) => {
  return (
    <Button 
      variant="outline" 
      size="sm"
      onClick={onClick}
      className="absolute top-4 right-4 bg-white shadow-md z-10"
    >
      <Minimize className="h-4 w-4 mr-2" />
      Exit Fullscreen
    </Button>
  );
};
