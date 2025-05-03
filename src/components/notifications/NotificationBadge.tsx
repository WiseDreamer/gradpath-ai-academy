
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface NotificationBadgeProps {
  count: number;
}

const NotificationBadge: React.FC<NotificationBadgeProps> = ({ count }) => {
  if (count < 1) return null;
  
  return (
    <Badge 
      variant="destructive" 
      className="absolute top-0 right-0 h-6 w-6 flex items-center justify-center p-0 text-xs"
    >
      {count > 9 ? '9+' : count}
    </Badge>
  );
};

export default NotificationBadge;
