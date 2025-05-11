
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ColorPickerProps {
  toolColor: string;
  onColorChange: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  toolColor,
  onColorChange
}) => {
  const isMobile = useIsMobile();
  
  // If mobile, don't render
  if (isMobile) return null;
  
  return (
    <input 
      type="color" 
      value={toolColor}
      onChange={(e) => onColorChange(e.target.value)}
      className="w-8 h-8 p-0 border border-gray-300 rounded-md"
      aria-label="Select color"
    />
  );
};
