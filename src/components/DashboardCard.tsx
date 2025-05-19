
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  to: string;
  color?: string;
  className?: string;
  badge?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  icon: Icon,
  to,
  color = 'bg-gradpath-navy',
  className,
  badge,
}) => {
  // Check if the className contains a background image
  const hasBgImage = className?.includes('bg-[url');
  
  return (
    <Link
      to={to}
      className={cn(
        'dashboard-card hover-lift group relative overflow-hidden',
        className
      )}
    >
      {/* If we have a background image, add an overlay */}
      {hasBgImage && (
        <div className="absolute inset-0 bg-black/40 z-0"></div>
      )}
      
      <div className="relative z-10">
        <div
          className={cn(
            'w-16 h-16 rounded-full flex items-center justify-center text-white mb-4',
            hasBgImage ? 'bg-white/20 backdrop-blur-sm' : color
          )}
        >
          <Icon size={28} strokeWidth={1.5} />
        </div>
        <div className={cn("text-center", hasBgImage ? 'text-white' : '')}>
          <h3 className={cn(
            "font-semibold text-lg transition-colors",
            hasBgImage 
              ? "text-white group-hover:text-white" 
              : "text-gradpath-charcoal group-hover:text-gradpath-teal"
          )}>
            {title}
          </h3>
          <p className={cn(
            "text-sm mt-1",
            hasBgImage ? "text-gray-100" : "text-gradpath-slate"
          )}>
            {description}
          </p>
        </div>
      </div>
      
      {badge && (
        <div className="absolute top-3 right-3 bg-gradpath-teal text-white text-xs font-medium px-2 py-1 rounded-full z-10">
          {badge}
        </div>
      )}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={cn("", hasBgImage ? "text-white" : "text-gradpath-slate")}
        >
          <path 
            d="M7 17L17 7M17 7H8M17 7V16" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </Link>
  );
};

export default DashboardCard;
