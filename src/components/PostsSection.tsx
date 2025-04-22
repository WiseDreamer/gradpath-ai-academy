
import { useEffect, useState } from 'react';
import { useAuth } from './AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import ChatPost from './chat/ChatPost';

// Update the Post interface to match the actual query result
interface Post {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  profiles: {
    username: string;
    avatar_url: string | null;
  } | null;
}

export default function PostsSection() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setIsLoading(true);
        
        // Updated query to handle potential null profiles
        const { data, error } = await supabase
          .from('posts')
          .select(`
            *,
            profiles (username, avatar_url)
          `)
          .order('created_at', { ascending: false })
          .limit(10);
        
        if (error) throw error;

        // Safely type the data
        const typedPosts = (data as Post[]).map(post => ({
          ...post,
          profiles: post.profiles ?? null
        }));

        setPosts(typedPosts);
      } catch (error: any) {
        console.error('Error fetching posts:', error);
        toast({
          title: 'Error fetching posts',
          description: error.message,
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchPosts();

    // Set up real-time subscription
    const channel = supabase
      .channel('public:posts')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'posts'
        }, 
        () => {
          fetchPosts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

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

  return (
    <div className="space-y-4">
      <Card className="bg-white/80 backdrop-blur-sm shadow-sm border">
        <CardHeader>
          <CardTitle>Create a Post</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Textarea
              placeholder="What's on your mind?"
              className="min-h-24"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              disabled={isSubmitting}
            />
            <Button 
              className="w-full"
              onClick={handleCreatePost}
              disabled={!newPostContent.trim() || isSubmitting}
            >
              {isSubmitting ? 'Posting...' : 'Post'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="font-semibold text-xl text-center">Recent Posts</h3>
        
        {isLoading ? (
          <div className="text-center py-8">Loading posts...</div>
        ) : posts.length > 0 ? (
          posts.map(post => (
            <ChatPost
              key={post.id}
              author={post.profiles?.username ?? 'Anonymous'}
              content={post.content}
              timestamp={new Date(post.created_at).toLocaleString()}
              reactions={{ '👍': 0, '❤️': 0 }}
              comments={[]}
            />
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">No posts yet. Be the first to post!</div>
        )}
      </div>
    </div>
  );
}
