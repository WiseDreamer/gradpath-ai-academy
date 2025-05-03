
import React from 'react';
import { 
  Drawer, 
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';
import NotificationBadge from './NotificationBadge';
import NotificationsList from './NotificationsList';
import { Notification } from '@/services/notificationService';

interface MobileNotificationsProps {
  notifications: Notification[];
  unreadCount: number;
  onMarkAsRead: (id: string) => void;
  loadingNotifications: boolean;
}

const MobileNotifications: React.FC<MobileNotificationsProps> = ({
  notifications,
  unreadCount,
  onMarkAsRead,
  loadingNotifications
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative text-white hover:bg-white/20 h-12 w-12"
        >
          <Bell className="w-8 h-8" strokeWidth={2} />
          <NotificationBadge count={unreadCount} />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[85vh]">
        <DrawerHeader className="border-b">
          <DrawerTitle>Notifications</DrawerTitle>
        </DrawerHeader>
        {loadingNotifications ? (
          <div className="p-4 text-center">Loading notifications...</div>
        ) : (
          <NotificationsList 
            notifications={notifications} 
            onMarkAsRead={onMarkAsRead}
            onClose={() => setOpen(false)}
            maxHeight="70vh"
          />
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default MobileNotifications;
