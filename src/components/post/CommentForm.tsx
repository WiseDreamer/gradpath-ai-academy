
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface CommentFormProps {
  postId: string;
  onCommentSubmit: (content: string) => Promise<void>;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId, onCommentSubmit }) => {
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!newComment.trim()) return;
    
    setIsSubmitting(true);
    try {
      await onCommentSubmit(newComment);
      setNewComment('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-start gap-3 mt-4">
      <Avatar className="h-8 w-8">
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      <div className="flex-1 flex">
        <Input 
          placeholder="Write a comment..." 
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-1 bg-gray-100 border-0 focus-visible:ring-1 focus-visible:ring-gradpath-purple"
          disabled={isSubmitting}
        />
        <Button 
          variant="ghost" 
          size="icon" 
          className="ml-2"
          onClick={handleSubmit}
          disabled={!newComment.trim() || isSubmitting}
        >
          <Send className="h-4 w-4 text-gradpath-purple" />
        </Button>
      </div>
    </div>
  );
};

export default CommentForm;
