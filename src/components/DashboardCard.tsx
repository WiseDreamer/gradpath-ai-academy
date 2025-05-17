
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
  return (
    <Link
      to={to}
      className={cn(
        'dashboard-card hover-lift group',
        className
      )}
    >
      <div
        className={cn(
          'w-16 h-16 rounded-full flex items-center justify-center text-white',
          color
        )}
      >
        <Icon size={28} strokeWidth={1.5} />
      </div>
      <div className="text-center">
        <h3 className="font-semibold text-lg text-gradpath-charcoal group-hover:text-gradpath-teal transition-colors">{title}</h3>
        <p className="text-sm text-gradpath-slate mt-1">{description}</p>
      </div>
      {badge && (
        <div className="absolute top-3 right-3 bg-gradpath-teal text-white text-xs font-medium px-2 py-1 rounded-full">
          {badge}
        </div>
      )}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="text-gradpath-slate"
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
