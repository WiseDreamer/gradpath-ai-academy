
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/components/AuthProvider';

export function useCreatePost() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [newPostContent, setNewPostContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreatePost = async () => {
    if (!newPostContent.trim() || !user) return;
    
    try {
      setIsSubmitting(true);
      
      const { error } = await supabase
        .from('posts')
        .insert({
          content: newPostContent,
          user_id: user.id
        });
      
      if (error) throw error;
      
      setNewPostContent('');
      toast({
        title: 'Post created',
        description: 'Your post has been published successfully!',
      });
    } catch (error: any) {
      console.error('Error creating post:', error);
      toast({
        title: 'Error creating post',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    newPostContent,
    setNewPostContent,
    isSubmitting,
    handleCreatePost
  };
}
