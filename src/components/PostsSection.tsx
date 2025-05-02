
import { usePosts, Post } from '@/hooks/usePosts';
import { useCreatePost } from '@/hooks/useCreatePost';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import PostCard from './post/PostCard';

export default function PostsSection() {
  const {
    posts,
    isLoading
  } = usePosts();
  const {
    newPostContent,
    setNewPostContent,
    isSubmitting,
    handleCreatePost
  } = useCreatePost();
  
  return (
    <div className="space-y-2">
      <Card className="bg-white/80 backdrop-blur-sm shadow-sm border w-full rounded-none md:rounded-md -mx-4 md:mx-0">
        <CardHeader>
          <CardTitle>Create a Post</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Textarea placeholder="What's on your mind?" className="min-h-24" value={newPostContent} onChange={e => setNewPostContent(e.target.value)} disabled={isSubmitting} />
            <Button className="w-full" onClick={handleCreatePost} disabled={!newPostContent.trim() || isSubmitting}>
              {isSubmitting ? 'Posting...' : 'Post'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-2">
        {isLoading ? (
          <div className="text-center py-8">Loading posts...</div>
        ) : posts.length > 0 ? (
          <div className="space-y-2">
            {posts.map((post: Post) => (
              <PostCard 
                key={post.id} 
                id={post.id} 
                author={post.profiles?.username ?? 'Anonymous'} 
                content={post.content} 
                timestamp={new Date(post.created_at).toLocaleString()} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">No posts yet. Be the first to post!</div>
        )}
      </div>
    </div>
  );
}
