
import { useState, useEffect, useCallback } from 'react';
import { 
  Notification, 
  fetchNotifications, 
  markNotificationAsRead, 
  getUnreadCount 
} from '@/services/notificationService';
import { useToast } from '@/hooks/use-toast';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const loadNotifications = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedNotifications = await fetchNotifications();
      setNotifications(fetchedNotifications);
      
      const count = await getUnreadCount();
      setUnreadCount(count);
    } catch (error) {
      console.error('Error loading notifications:', error);
      toast({
        variant: 'destructive',
        title: 'Error loading notifications',
        description: 'Please try again later.'
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const handleMarkAsRead = useCallback(async (id: string) => {
    try {
      await markNotificationAsRead(id);
      
      // Update local state
      setNotifications(prevNotifications => 
        prevNotifications.map(notification => 
          notification.id === id 
            ? { ...notification, isRead: true } 
            : notification
        )
      );
      
      // Update unread count
      setUnreadCount(prevCount => Math.max(0, prevCount - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  }, []);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  return {
    notifications,
    unreadCount,
    loading,
    markAsRead: handleMarkAsRead,
    refreshNotifications: loadNotifications
  };
};
