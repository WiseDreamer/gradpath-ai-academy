
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { format, formatDistanceToNow } from 'date-fns';
import { Bell, CalendarClock, Award, BookOpen } from 'lucide-react';
import { Notification } from '@/services/notificationService';
import { cn } from '@/lib/utils';

interface NotificationItemProps {
  notification: Notification;
  onRead: (id: string) => void;
  onClick?: () => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ 
  notification, 
  onRead,
  onClick
}) => {
  const navigate = useNavigate();
  const { id, title, message, type, isRead, createdAt, linkTo } = notification;

  const handleClick = () => {
    if (!isRead) {
      onRead(id);
    }
    
    if (linkTo) {
      if (onClick) onClick();
      navigate(linkTo);
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'practice_question':
        return <BookOpen className="h-5 w-5 text-blue-500" />;
      case 'reminder':
        return <CalendarClock className="h-5 w-5 text-amber-500" />;
      case 'badge':
        return <Award className="h-5 w-5 text-purple-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const formattedDate = formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  const exactTime = format(new Date(createdAt), 'h:mm a');

  return (
    <div 
      className={cn(
        "flex gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b transition-colors",
        !isRead && "bg-blue-50"
      )}
      onClick={handleClick}
    >
      <div className="mt-1">
        {getIcon()}
      </div>
      <div className="flex-1">
        <h4 className={cn("text-sm font-medium", !isRead && "font-semibold")}>
          {title}
        </h4>
        <p className="text-sm text-gray-600 line-clamp-2">
          {message}
        </p>
        <p className="text-xs text-gray-500 mt-1" title={exactTime}>
          {formattedDate}
        </p>
      </div>
    </div>
  );
};

export default NotificationItem;
