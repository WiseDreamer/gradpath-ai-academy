
import React from 'react';
import { BookOpen, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  color?: 'white' | 'navy' | 'teal' | 'charcoal';
  clickable?: boolean;
  iconType?: 'book' | 'graduation';
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ 
  className, 
  color = 'white', 
  clickable = true,
  iconType = 'graduation',
  size = 'md'
}) => {
  const textColor = 
    color === 'navy' ? 'text-gradpath-navy' : 
    color === 'teal' ? 'text-gradpath-teal' :
    color === 'charcoal' ? 'text-gradpath-charcoal' :
    'text-white';
  
  const iconColor = 
    color === 'navy' ? 'text-gradpath-navy' : 
    color === 'teal' ? 'text-gradpath-teal' :
    color === 'charcoal' ? 'text-gradpath-charcoal' :
    'text-white';

  const IconComponent = iconType === 'graduation' ? GraduationCap : BookOpen;
  
  // Size variants
  const iconSize = size === 'sm' ? 'h-6 w-6' : size === 'lg' ? 'h-10 w-10' : 'h-8 w-8';
  const textSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl';
  
  return (
    <div 
      className={cn(
        "flex items-center gap-2", 
        clickable && "cursor-pointer hover:opacity-90 transition-opacity",
        className
      )}
    >
      <IconComponent className={cn(iconSize, iconColor)} strokeWidth={1.8} />
      <span className={cn("font-serif font-bold tracking-tight", textSize, textColor)}>
        GradPath
      </span>
    </div>
  );
};

export default Logo;
