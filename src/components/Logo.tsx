
import React from 'react';
import { BookOpen, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  color?: 'white' | 'navy' | 'teal' | 'charcoal';
  clickable?: boolean;
  iconType?: 'book' | 'graduation';
}

const Logo: React.FC<LogoProps> = ({ 
  className, 
  color = 'white', 
  clickable = true,
  iconType = 'book'
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
  
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <IconComponent className={cn("h-8 w-8", iconColor)} strokeWidth={1.8} />
      <span className={cn("font-serif font-bold text-xl tracking-tight", textColor)}>GradPath</span>
    </div>
  );
};

export default Logo;
