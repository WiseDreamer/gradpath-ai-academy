
import React from 'react';
import { BookOpen } from 'lucide-react';

const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <BookOpen className="h-6 w-6 text-gradpath-purple" />
      <span className="font-bold text-xl tracking-tight">GradPath</span>
    </div>
  );
};

export default Logo;
