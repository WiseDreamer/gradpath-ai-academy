
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
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  icon: Icon,
  to,
  color = 'bg-gradpath-purple',
  className,
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
        <Icon size={28} />
      </div>
      <div className="text-center">
        <h3 className="font-semibold text-lg group-hover:text-gradpath-purple transition-colors">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="text-gray-400"
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
