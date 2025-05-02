
import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface PostAuthorProps {
  author: string;
  timestamp: string;
}

const PostAuthor: React.FC<PostAuthorProps> = ({ author, timestamp }) => {
  return (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarFallback className="bg-gradpath-purple text-white">{author[0]}</AvatarFallback>
      </Avatar>
      <div>
        <h3 className="font-semibold">{author}</h3>
        <p className="text-sm text-gray-500">{timestamp}</p>
      </div>
    </div>
  );
};

export default PostAuthor;
