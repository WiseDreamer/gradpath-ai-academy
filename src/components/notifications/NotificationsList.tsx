
import React from 'react';
import NotificationItem from './NotificationItem';
import { Notification } from '@/services/notificationService';
import { ScrollArea } from '@/components/ui/scroll-area';

interface NotificationsListProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onClose?: () => void;
  maxHeight?: string;
}

const NotificationsList: React.FC<NotificationsListProps> = ({ 
  notifications, 
  onMarkAsRead,
  onClose,
  maxHeight = '400px'
}) => {
  if (notifications.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No notifications
      </div>
    );
  }

  return (
    <ScrollArea className={`max-h-[${maxHeight}]`}>
      <div className="flex flex-col divide-y">
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onRead={onMarkAsRead}
            onClick={onClose}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

export default NotificationsList;
