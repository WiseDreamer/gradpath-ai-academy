
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/AuthProvider';
import { useToast } from '@/hooks/use-toast';

export function usePostActions(postId: string) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [reactions, setReactions] = useState<{ [key: string]: number }>({
    '👍': 0,
    '❤️': 0,
  });
  const [userReactions, setUserReactions] = useState<string[]>([]);
  const [commentCount, setCommentCount] = useState(0);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    async function fetchPostData() {
      if (!postId || isHidden) return;

      try {
        // Fetch comments count
        const { data: commentsData, error: commentsError } = await supabase
          .from('comments')
          .select('id')
          .eq('post_id', postId);

        if (commentsError) throw commentsError;
        
        setCommentCount(commentsData?.length || 0);

        // Fetch reactions
        const { data: reactionsData, error: reactionsError } = await supabase
          .from('reactions')
          .select('*')
          .eq('post_id', postId);

        if (reactionsError) throw reactionsError;
        
        // Count reactions
        const reactionCounts = {
          '👍': 0,
          '❤️': 0,
        };
        const userReacts: string[] = [];
        
        reactionsData?.forEach((reaction) => {
          if (reaction.type in reactionCounts) {
            reactionCounts[reaction.type as keyof typeof reactionCounts]++;
          }
          if (reaction.user_id === user?.id) {
            userReacts.push(reaction.type);
          }
        });

        setReactions(reactionCounts);
        setUserReactions(userReacts);
      } catch (error: any) {
        console.error('Error fetching post data:', error);
      }
    }

    fetchPostData();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('post_updates')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'comments', filter: `post_id=eq.${postId}` },
        () => {
          fetchPostData();
        }
      )
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'reactions', filter: `post_id=eq.${postId}` },
        () => {
          fetchPostData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [postId, user?.id, isHidden]);

  const handleReaction = async (type: '👍' | '❤️') => {
    if (!user) return;

    try {
      const hasReacted = userReactions.includes(type);

      if (hasReacted) {
        // Remove reaction
        const { error } = await supabase
          .from('reactions')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', user.id)
          .eq('type', type);

        if (error) throw error;
      } else {
        // Add reaction
        const { error } = await supabase
          .from('reactions')
          .insert({
            post_id: postId,
            user_id: user.id,
            type,
          });

        if (error) throw error;
      }
    } catch (error: any) {
      console.error('Error handling reaction:', error);
      toast({
        title: "Error",
        description: "Failed to update reaction. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleHidePost = () => {
    setIsHidden(true);
    toast({
      title: "Post hidden",
      description: "This post will no longer appear in your feed",
    });
  };

  return {
    reactions,
    userReactions,
    commentCount,
    isHidden,
    handleReaction,
    handleHidePost
  };
}
