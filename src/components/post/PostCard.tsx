
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import PostAuthor from './PostAuthor';
import PostActions from './PostActions';
import PostReactions from './PostReactions';
import PostCommentSection from './PostCommentSection';
import { usePostActions } from '@/hooks/usePostActions';

interface ChatPostProps {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

const PostCard: React.FC<ChatPostProps> = ({
  id,
  author,
  content,
  timestamp,
}) => {
  const [showComments, setShowComments] = useState(false);
  const { 
    isHidden,
    commentCount, 
    reactions, 
    userReactions, 
    handleHidePost,
    handleReaction
  } = usePostActions(id);

  if (isHidden) {
    return null;
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-sm border w-full rounded-none md:rounded-md">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <PostAuthor author={author} timestamp={timestamp} />
        <PostActions handleHidePost={handleHidePost} />
      </CardHeader>
      
      <CardContent className="pb-3">
        <p className="text-gray-700 dark:text-gray-300">{content}</p>
      </CardContent>
      
      <CardFooter className="flex flex-col gap-4 pt-0">
        <PostReactions 
          reactions={reactions} 
          userReactions={userReactions} 
          handleReaction={handleReaction}
          commentCount={commentCount}
          showComments={showComments}
          setShowComments={setShowComments}
        />

        {showComments && (
          <PostCommentSection postId={id} />
        )}
      </CardFooter>
    </Card>
  );
};

export default PostCard;
