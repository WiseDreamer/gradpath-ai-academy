
import React, { useState } from 'react';
import { MessageCircle, ThumbsUp, Heart, Send } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/AuthProvider';
import { useToast } from '@/hooks/use-toast';

interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
  profiles: {
    username: string;
    avatar_url: string | null;
  } | null;
}

interface Reaction {
  id: string;
  post_id: string;
  user_id: string;
  type: '👍' | '❤️';
}

interface ChatPostProps {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  reactions: Record<string, number>;
  comments: Comment[];
  onReactionUpdate?: () => void;
}

const ChatPost: React.FC<ChatPostProps> = ({
  id,
  author,
  content,
  timestamp,
  reactions,
  comments: initialComments,
  onReactionUpdate
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [showComments, setShowComments] = useState(initialComments.length > 0);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddComment = async () => {
    if (!newComment.trim() || !user) return;
    
    try {
      setIsSubmitting(true);
      const { error } = await supabase
        .from('comments')
        .insert({
          post_id: id,
          user_id: user.id,
          content: newComment,
        });

      if (error) throw error;
      
      setNewComment('');
      toast({
        title: "Comment added",
        description: "Your comment has been posted successfully!",
      });
    } catch (error: any) {
      console.error('Error adding comment:', error);
      toast({
        title: "Error",
        description: "Failed to add comment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReaction = async (type: '👍' | '❤️') => {
    if (!user) return;

    try {
      const { data: existingReaction, error: fetchError } = await supabase
        .from('reactions')
        .select()
        .eq('post_id', id)
        .eq('user_id', user.id)
        .eq('type', type)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') throw fetchError;

      if (existingReaction) {
        const { error } = await supabase
          .from('reactions')
          .delete()
          .eq('id', existingReaction.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('reactions')
          .insert({
            post_id: id,
            user_id: user.id,
            type,
          });

        if (error) throw error;
      }

      if (onReactionUpdate) {
        onReactionUpdate();
      }
    } catch (error) {
      console.error('Error handling reaction:', error);
      toast({
        title: "Error",
        description: "Failed to update reaction. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Subscribe to new comments
  React.useEffect(() => {
    const channel = supabase
      .channel(`post_${id}_comments`)
      .on('postgres_changes', 
        {
          event: '*',
          schema: 'public',
          table: 'comments',
          filter: `post_id=eq.${id}`
        },
        async () => {
          const { data, error } = await supabase
            .from('comments')
            .select(`
              *,
              profiles (username, avatar_url)
            `)
            .eq('post_id', id)
            .order('created_at', { ascending: true });

          if (!error && data) {
            setComments(data);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id]);

  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-sm border">
      <CardHeader className="flex flex-row items-center gap-4 pb-3">
        <Avatar>
          <AvatarFallback className="bg-gradpath-purple text-white">{author[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">{author}</h3>
          <p className="text-sm text-gray-500">{timestamp}</p>
        </div>
      </CardHeader>
      
      <CardContent className="pb-3">
        <p className="text-gray-700 dark:text-gray-300">{content}</p>
      </CardContent>
      
      <CardFooter className="flex flex-col gap-4 pt-0">
        <div className="flex items-center justify-between w-full border-t border-b py-2">
          <div className="flex -space-x-1">
            <button
              className="px-3 py-1 text-sm rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => handleReaction('👍')}
            >
              👍 {reactions['👍'] || 0}
            </button>
            <button
              className="px-3 py-1 text-sm rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => handleReaction('❤️')}
            >
              ❤️ {reactions['❤️'] || 0}
            </button>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="ml-auto"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            {comments.length} Comments
          </Button>
        </div>

        {showComments && (
          <div className="w-full space-y-3">
            {comments.map((comment) => (
              <div key={comment.id} className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-gradpath-purple/10 text-gradpath-purple">
                    {comment.profiles?.username?.[0] ?? 'A'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                    <p className="font-medium text-sm">{comment.profiles?.username ?? 'Anonymous'}</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{comment.content}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(comment.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
            
            <div className="flex items-start gap-3 mt-4">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-gradpath-purple/10 text-gradpath-purple">A</AvatarFallback>
              </Avatar>
              <div className="flex-1 flex">
                <Input 
                  placeholder="Write a comment..." 
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1 bg-gray-100 border-0 focus-visible:ring-1 focus-visible:ring-gradpath-purple"
                  disabled={isSubmitting}
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="ml-2"
                  onClick={handleAddComment}
                  disabled={!newComment.trim() || isSubmitting}
                >
                  <Send className="h-4 w-4 text-gradpath-purple" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ChatPost;
