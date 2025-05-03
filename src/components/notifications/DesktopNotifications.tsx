
import React from 'react';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';
import NotificationBadge from './NotificationBadge';
import NotificationsList from './NotificationsList';
import { Notification } from '@/services/notificationService';

interface DesktopNotificationsProps {
  notifications: Notification[];
  unreadCount: number;
  onMarkAsRead: (id: string) => void;
  loadingNotifications: boolean;
}

const DesktopNotifications: React.FC<DesktopNotificationsProps> = ({
  notifications,
  unreadCount,
  onMarkAsRead,
  loadingNotifications
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative text-white hover:bg-white/20 h-12 w-12"
        >
          <Bell className="w-8 h-8" strokeWidth={2} />
          <NotificationBadge count={unreadCount} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 bg-white" align="end">
        <div className="flex items-center justify-between p-3 border-b">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <span className="text-xs text-blue-600 cursor-pointer hover:underline">
              Mark all as read
            </span>
          )}
        </div>
        {loadingNotifications ? (
          <div className="p-4 text-center">Loading notifications...</div>
        ) : (
          <NotificationsList 
            notifications={notifications} 
            onMarkAsRead={onMarkAsRead} 
            onClose={() => setOpen(false)} 
          />
        )}
      </PopoverContent>
    </Popover>
  );
};

export default DesktopNotifications;
