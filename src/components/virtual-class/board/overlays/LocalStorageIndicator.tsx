
import React from 'react';

export const LocalStorageIndicator: React.FC = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-amber-50 text-amber-800 text-xs px-2 py-1 text-center">
      Using local storage mode - drawings are not synchronized
    </div>
  );
};
