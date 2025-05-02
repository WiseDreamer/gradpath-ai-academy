
import React from 'react';

interface VirtualClassHeaderProps {
  title: string;
  institution: string;
}

const VirtualClassHeader: React.FC<VirtualClassHeaderProps> = ({ title, institution }) => {
  return (
    <div className="w-full bg-white rounded-t-xl shadow-sm border border-gray-100 p-4">
      <h1 className="text-2xl font-bold text-center">{title}</h1>
      <p className="text-gray-600 text-center">{institution}</p>
    </div>
  );
};

export default VirtualClassHeader;
