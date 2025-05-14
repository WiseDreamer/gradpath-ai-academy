
import React from 'react';
import HelperCard from './HelperCard';

interface Helper {
  id: number;
  name: string;
  avatar: string | null;
  rating: number;
  expertise: string;
  status: string;
}

interface HelpersListProps {
  helpers: Helper[];
  layout?: 'grid' | 'list';
}

const HelpersList: React.FC<HelpersListProps> = ({ helpers, layout = 'list' }) => {
  const availableHelpers = helpers.filter(helper => helper.status === 'available');
  
  return (
    <div className={layout === 'grid' ? "grid grid-cols-2 gap-4" : "space-y-3"}>
      {availableHelpers.map(helper => (
        <HelperCard 
          key={helper.id} 
          helper={helper}
        />
      ))}
    </div>
  );
};

export default HelpersList;
