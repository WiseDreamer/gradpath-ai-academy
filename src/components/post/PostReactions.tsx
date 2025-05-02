
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PostReactionsProps {
  reactions: { [key: string]: number };
  userReactions: string[];
  handleReaction: (type: '👍' | '❤️') => void;
  commentCount: number;
  showComments: boolean;
  setShowComments: (show: boolean) => void;
}

const PostReactions: React.FC<PostReactionsProps> = ({
  reactions,
  userReactions,
  handleReaction,
  commentCount,
  showComments,
  setShowComments,
}) => {
  return (
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
  );
};

export default PostReactions;
