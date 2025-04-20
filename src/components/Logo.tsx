
import React from 'react';
import { BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  color?: 'white' | 'purple';
  clickable?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className, color = 'white', clickable = true }) => {
  const textColor = color === 'purple' ? 'text-gradpath-purple' : 'text-white';
  const iconColor = color === 'purple' ? 'text-gradpath-purple' : 'text-white';
  
  const LogoContent = (
    <div className={cn("flex items-center gap-2", className)}>
      <BookOpen className={cn("h-7 w-7", iconColor)} />
      <span className={cn("font-bold text-xl tracking-tight", textColor)}>GradPath</span>
    </div>
  );
  
  if (clickable) {
    return <Link to="/dashboard">{LogoContent}</Link>;
  }
  
  return LogoContent;
};

export default Logo;
