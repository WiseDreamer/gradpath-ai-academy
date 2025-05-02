
import React from 'react';
import { useComments } from '@/hooks/useComments';
import PostComment from './PostComment';
import CommentForm from './CommentForm';

interface PostCommentSectionProps {
  postId: string;
}

const PostCommentSection: React.FC<PostCommentSectionProps> = ({ postId }) => {
  const { comments, addComment } = useComments(postId);

  return (
    <div className="w-full space-y-3">
      {comments.map((comment) => (
        <PostComment
          key={comment.id}
          username={comment.profiles?.username ?? 'Anonymous'}
          content={comment.content}
          timestamp={new Date(comment.created_at).toLocaleString()}
        />
      ))}
      
      <CommentForm 
        postId={postId} 
        onCommentSubmit={addComment}
      />
    </div>
  );
};

export default PostCommentSection;
