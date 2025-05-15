
import React from 'react';
import { BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  color?: 'white' | 'purple' | 'navy' | 'teal';
  clickable?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className, color = 'white', clickable = true }) => {
  const textColor = 
    color === 'purple' ? 'text-gradpath-purple' : 
    color === 'navy' ? 'text-gradpath-navy' :
    color === 'teal' ? 'text-gradpath-teal' :
    'text-white';
  
  const iconColor = 
    color === 'purple' ? 'text-gradpath-purple' : 
    color === 'navy' ? 'text-gradpath-navy' :
    color === 'teal' ? 'text-gradpath-teal' :
    'text-white';
  
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <BookOpen className={cn("h-8 w-8", iconColor)} />
      <span className={cn("font-bold text-xl tracking-tight", textColor)}>GradPath</span>
    </div>
  );
};

export default Logo;
