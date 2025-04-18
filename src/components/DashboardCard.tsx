
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
  gradient?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  icon: Icon,
  to,
  color = 'bg-gradpath-purple',
  gradient = 'from-gradpath-purple to-gradpath-dark-purple',
}) => {
  return (
    <Link to={to} className="dashboard-card">
      <div className={cn("p-3 rounded-full", color)}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-gray-500 text-center">{description}</p>
    </Link>
  );
};

export default DashboardCard;
