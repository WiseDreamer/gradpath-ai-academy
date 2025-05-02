
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/AuthProvider';
import { useToast } from '@/hooks/use-toast';

interface Comment {
  id: string;
  post_id: string;
  content: string;
  created_at: string;
  profiles: {
    username: string;
    avatar_url: string | null;
  } | null;
}

export function useComments(postId: string) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    async function fetchComments() {
      try {
        const { data: commentsData, error: commentsError } = await supabase
          .from('comments')
          .select(`
            *,
            profiles (username, avatar_url)
          `)
          .eq('post_id', postId)
          .order('created_at', { ascending: true });

        if (commentsError) throw commentsError;
        
        // Handle the comments - ensure they match our interface
        const processedComments: Comment[] = commentsData?.map((comment: any) => ({
          id: comment.id,
          post_id: comment.post_id,
          content: comment.content,
          created_at: comment.created_at,
          profiles: comment.profiles || { 
            username: 'Anonymous', 
            avatar_url: null 
          }
        })) || [];
        
        setComments(processedComments);
      } catch (error: any) {
        console.error('Error fetching comments:', error);
      }
    }

    fetchComments();

    // Subscribe to real-time updates for comments
    const channel = supabase
      .channel(`comments_${postId}`)
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'comments', filter: `post_id=eq.${postId}` },
        () => {
          fetchComments();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [postId]);

  const addComment = async (content: string) => {
    if (!content.trim() || !user) return;
    
    try {
      const { error } = await supabase
        .from('comments')
        .insert({
          post_id: postId,
          user_id: user.id,
          content,
        });

      if (error) throw error;
    } catch (error: any) {
      console.error('Error adding comment:', error);
      toast({
        title: "Error",
        description: "Failed to add comment. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  return {
    comments,
    addComment
  };
}
