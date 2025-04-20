
import React from 'react';
import { BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  color?: 'white' | 'purple';
}

const Logo: React.FC<LogoProps> = ({ className, color = 'white' }) => {
  const textColor = color === 'purple' ? 'text-gradpath-purple' : 'text-white';
  const iconColor = color === 'purple' ? 'text-gradpath-purple' : 'text-white';
  
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <BookOpen className={cn("h-7 w-7", iconColor)} />
      <span className={cn("font-bold text-xl tracking-tight", textColor)}>GradPath</span>
    </div>
  );
};

export default Logo;
