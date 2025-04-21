
import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  to: string;
  color?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  icon: Icon,
  to,
  color = 'bg-gradpath-purple',
}) => {
  return (
    <Link 
      to={to} 
      className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center border border-gray-100 dark:border-gray-700 hover:scale-[1.02]"
    >
      <div className={cn("p-4 rounded-full transition-transform group-hover:scale-110", color)}>
        <Icon className="h-10 w-10 text-white" strokeWidth={3.8} />
      </div>
      <h3 className="font-semibold text-lg mt-4 text-gray-800 dark:text-gray-200">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">{description}</p>
    </Link>
  );
};

export default DashboardCard;
