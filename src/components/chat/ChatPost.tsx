
import React, { useState } from 'react';
import { MessageCircle, ThumbsUp, Heart, Send } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface Comment {
  author: string;
  content: string;
  timestamp: string;
}

interface ChatPostProps {
  author: string;
  content: string;
  timestamp: string;
  reactions: Record<string, number>;
  comments: Comment[];
}

const ChatPost: React.FC<ChatPostProps> = ({
  author,
  content,
  timestamp,
  reactions,
  comments: initialComments
}) => {
  const [showComments, setShowComments] = useState(initialComments.length > 0);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        author: 'Alex Johnson',
        content: newComment,
        timestamp: 'Just now'
      };
      setComments([...comments, comment]);
      setNewComment('');
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
            {Object.entries(reactions).map(([emoji, count], index) => (
              <button
                key={index}
                className="px-3 py-1 text-sm rounded-full hover:bg-gray-100 transition-colors"
              >
                {emoji} {count}
              </button>
            ))}
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
            {comments.map((comment, index) => (
              <div key={index} className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-gradpath-purple/10 text-gradpath-purple">
                    {comment.author[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                    <p className="font-medium text-sm">{comment.author}</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{comment.content}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{comment.timestamp}</p>
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
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="ml-2"
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
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
