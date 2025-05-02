
import React from 'react';
import { MoreHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface PostActionsProps {
  handleHidePost: () => void;
}

const PostActions: React.FC<PostActionsProps> = ({ handleHidePost }) => {
  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
            <MoreHorizontal className="h-5 w-5" />
            <span className="sr-only">More options</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem>
            Interested in this topic
          </DropdownMenuItem>
          <DropdownMenuItem>
            Not interested in this topic
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            Save post
          </DropdownMenuItem>
          <DropdownMenuItem>
            Show more from this author
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            Report post
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        onClick={handleHidePost}
      >
        <X className="h-5 w-5" />
        <span className="sr-only">Hide post</span>
      </Button>
    </div>
  );
};

export default PostActions;
