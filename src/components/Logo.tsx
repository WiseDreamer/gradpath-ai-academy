
import React from 'react';
import { BookOpen } from 'lucide-react';

const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <BookOpen className="h-7 w-7 text-white" />
      <span className="font-bold text-xl tracking-tight text-white">GradPath</span>
    </div>
  );
};

export default Logo;
