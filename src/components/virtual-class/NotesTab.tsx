
import React from 'react';
import { Textarea } from '@/components/ui/textarea';

const NotesTab: React.FC = () => {
  return (
    <div className="p-4 flex-1">
      <h3 className="font-medium mb-2">Class Notes</h3>
      <Textarea 
        placeholder="Take notes here..."
        className="min-h-[400px]"
      />
    </div>
  );
};

export default NotesTab;
