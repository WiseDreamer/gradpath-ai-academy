
import React from 'react';

export const PauseOverlay: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-gray-100/40 flex items-center justify-center">
      <div className="bg-white/90 p-6 rounded-lg shadow-lg text-center">
        <h3 className="text-xl font-semibold">Class Paused</h3>
        <p className="text-gray-600 mt-2">Click Resume to continue learning</p>
      </div>
    </div>
  );
};
