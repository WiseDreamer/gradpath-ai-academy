
import { usePosts, Post } from '@/hooks/usePosts';
import { useCreatePost } from '@/hooks/useCreatePost';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import PostCard from './post/PostCard';
import { useIsMobile } from '@/hooks/use-mobile';

export default function PostsSection() {
  const isMobile = useIsMobile();
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
      <Card className={`bg-white shadow-sm border w-full mt-0 ${isMobile ? 'rounded-none' : 'rounded-none'}`}>
        <CardHeader className="pb-2">
          <CardTitle>Create a Post</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Textarea placeholder="What's on your mind?" className="min-h-24 resize-none" value={newPostContent} onChange={e => setNewPostContent(e.target.value)} disabled={isSubmitting} />
            <Button className="w-full bg-gradpath-purple hover:bg-gradpath-dark-purple" onClick={handleCreatePost} disabled={!newPostContent.trim() || isSubmitting}>
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
