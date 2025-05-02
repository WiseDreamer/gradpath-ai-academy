
import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface PostCommentProps {
  username: string;
  content: string;
  timestamp: string;
}

const PostComment: React.FC<PostCommentProps> = ({ username, content, timestamp }) => {
  return (
    <div className="flex items-start gap-3">
      <Avatar className="h-8 w-8">
        <AvatarFallback className="bg-gradpath-purple/10 text-gradpath-purple">
          {username[0] ?? 'A'}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
          <p className="font-medium text-sm">{username}</p>
          <p className="text-sm text-gray-700 dark:text-gray-300">{content}</p>
        </div>
        <p className="text-xs text-gray-500 mt-1">{timestamp}</p>
      </div>
    </div>
  );
};

export default PostComment;
