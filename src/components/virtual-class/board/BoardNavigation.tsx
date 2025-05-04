
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BoardNavigationProps {
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
}

export const BoardNavigation: React.FC<BoardNavigationProps> = ({
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage
}) => {
  return (
    <div className="bg-white border-t border-gray-200 p-2 flex justify-between items-center">
      <Button 
        variant="outline" 
        size="sm"
        disabled={currentPage <= 1}
        onClick={onPrevPage}
      >
        <ChevronLeft className="h-4 w-4 mr-2" />
        Previous
      </Button>
      
      <span className="text-sm">{currentPage} / {totalPages}</span>
      
      <Button 
        variant="outline" 
        size="sm"
        disabled={currentPage >= totalPages}
        onClick={onNextPage}
      >
        Next
        <ChevronRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
};
