
import React, { useState, useEffect } from 'react';
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
  type: string;
  user_id: string;
}

interface ChatPostProps {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

const ChatPost: React.FC<ChatPostProps> = ({
  id,
  author,
  content,
  timestamp,
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [reactions, setReactions] = useState<{ [key: string]: number }>({
    '👍': 0,
    '❤️': 0,
  });
  const [userReactions, setUserReactions] = useState<string[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [commentCount, setCommentCount] = useState(0);

  // Fetch initial data
  useEffect(() => {
    async function fetchPostData() {
      if (!id) return;

      try {
        // Fetch comments
        const { data: commentsData, error: commentsError } = await supabase
          .from('comments')
          .select(`
            *,
            profiles (username, avatar_url)
          `)
          .eq('post_id', id)
          .order('created_at', { ascending: true });

        if (commentsError) throw commentsError;
        setComments(commentsData || []);
        setCommentCount(commentsData?.length || 0);

        // Fetch reactions
        const { data: reactionsData, error: reactionsError } = await supabase
          .from('reactions')
          .select('*')
          .eq('post_id', id);

        if (reactionsError) throw reactionsError;
        
        // Count reactions
        const reactionCounts = {
          '👍': 0,
          '❤️': 0,
        };
        const userReacts: string[] = [];
        
        reactionsData?.forEach((reaction) => {
          reactionCounts[reaction.type as keyof typeof reactionCounts]++;
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
        { event: '*', schema: 'public', table: 'comments', filter: `post_id=eq.${id}` },
        () => {
          fetchPostData();
        }
      )
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'reactions', filter: `post_id=eq.${id}` },
        () => {
          fetchPostData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id, user?.id]);

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
      const hasReacted = userReactions.includes(type);

      if (hasReacted) {
        // Remove reaction
        const { error } = await supabase
          .from('reactions')
          .delete()
          .eq('post_id', id)
          .eq('user_id', user.id)
          .eq('type', type);

        if (error) throw error;
      } else {
        // Add reaction
        const { error } = await supabase
          .from('reactions')
          .insert({
            post_id: id,
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
            <Button
              variant="ghost"
              size="sm"
              className={`px-3 py-1 text-sm rounded-full ${userReactions.includes('👍') ? 'bg-gray-100' : ''}`}
              onClick={() => handleReaction('👍')}
            >
              👍 {reactions['👍']}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`px-3 py-1 text-sm rounded-full ${userReactions.includes('❤️') ? 'bg-gray-100' : ''}`}
              onClick={() => handleReaction('❤️')}
            >
              ❤️ {reactions['❤️']}
            </Button>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            {commentCount} Comments
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
                <AvatarFallback>U</AvatarFallback>
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
