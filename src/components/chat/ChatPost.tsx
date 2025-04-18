
import React from 'react';
import { MessageCircle, ThumbsUp, Heart } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

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
  comments
}) => {
  return (
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarFallback>{author[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">{author}</h3>
          <p className="text-sm text-gray-500">{timestamp}</p>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-gray-700 dark:text-gray-300">{content}</p>
      </CardContent>
      
      <CardFooter className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="flex -space-x-1">
            {Object.entries(reactions).map(([emoji, count], index) => (
              <button
                key={index}
                className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {emoji} {count}
              </button>
            ))}
          </div>
          <Button variant="ghost" size="sm" className="ml-auto">
            <MessageCircle className="h-4 w-4 mr-2" />
            {comments.length} Comments
          </Button>
        </div>

        {comments.length > 0 && (
          <div className="w-full space-y-3 pt-3 border-t">
            {comments.map((comment, index) => (
              <div key={index} className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{comment.author[0]}</AvatarFallback>
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
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ChatPost;
