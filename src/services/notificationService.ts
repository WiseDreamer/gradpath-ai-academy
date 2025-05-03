
import { supabase } from '@/integrations/supabase/client';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'practice_question' | 'reminder' | 'performance_update' | 'badge';
  isRead: boolean;
  createdAt: string;
  linkTo?: string;
}

export const fetchNotifications = async (): Promise<Notification[]> => {
  // In a real app, this would fetch from Supabase
  // const { data, error } = await supabase
  //   .from('notifications')
  //   .select('*')
  //   .order('created_at', { ascending: false })
  //   .limit(20);
  
  // if (error) throw error;
  // return data;

  // For now, return mock data
  return [
    {
      id: '1',
      title: 'New Practice Questions',
      message: 'AI-generated practice questions for Module 3 are ready',
      type: 'practice_question',
      isRead: false,
      createdAt: new Date(Date.now() - 5 * 60000).toISOString(), // 5 mins ago
      linkTo: '/module/3'
    },
    {
      id: '2',
      title: 'Tutor Session Reminder',
      message: 'Your AI tutor session for Calculus starts in 30 minutes',
      type: 'reminder',
      isRead: false,
      createdAt: new Date(Date.now() - 30 * 60000).toISOString(), // 30 mins ago
      linkTo: '/virtual-class'
    },
    {
      id: '3',
      title: 'Performance Update',
      message: 'Your performance report for this week is available',
      type: 'performance_update',
      isRead: true,
      createdAt: new Date(Date.now() - 2 * 3600000).toISOString(), // 2 hours ago
      linkTo: '/performance'
    },
    {
      id: '4',
      title: 'New Badge Earned',
      message: 'Congratulations! You\'ve earned the "Quick Learner" badge',
      type: 'badge',
      isRead: true,
      createdAt: new Date(Date.now() - 1 * 86400000).toISOString(), // 1 day ago
      linkTo: '/profile'
    },
    {
      id: '5',
      title: 'Study Plan Updated',
      message: 'Your study plan has been updated based on your recent progress',
      type: 'performance_update',
      isRead: true,
      createdAt: new Date(Date.now() - 2 * 86400000).toISOString(), // 2 days ago
      linkTo: '/study-plan'
    }
  ];
};

export const markNotificationAsRead = async (id: string): Promise<void> => {
  // In a real app, this would update Supabase
  // await supabase
  //   .from('notifications')
  //   .update({ is_read: true })
  //   .eq('id', id);
  
  console.log(`Marking notification ${id} as read`);
  // For now, we'll just log it
};

export const getUnreadCount = async (): Promise<number> => {
  // In a real app, this would be a count query to Supabase
  // const { count, error } = await supabase
  //   .from('notifications')
  //   .select('*', { count: 'exact', head: true })
  //   .eq('is_read', false);
  
  // if (error) throw error;
  // return count || 0;
  
  // For now, return a mock count from our mock data
  const notifications = await fetchNotifications();
  return notifications.filter(n => !n.isRead).length;
};
