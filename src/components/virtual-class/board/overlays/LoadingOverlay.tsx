
import React from 'react';

export const LoadingOverlay: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-700">Initializing whiteboard...</p>
      </div>
    </div>
  );
};
