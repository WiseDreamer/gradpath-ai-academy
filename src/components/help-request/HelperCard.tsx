
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';

interface Helper {
  id: number;
  name: string;
  avatar: string | null;
  rating: number;
  expertise: string;
  status: string;
}

interface HelperCardProps {
  helper: Helper;
  className?: string;
}

const HelperCard: React.FC<HelperCardProps> = ({ helper, className = '' }) => {
  return (
    <Card key={helper.id} className={`bg-green-50 border-green-200 ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <div className="bg-gradpath-purple text-white flex items-center justify-center w-full h-full rounded-full">
              {helper.name.charAt(0)}
            </div>
          </Avatar>
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold">{helper.name}</h4>
              <div className="flex items-center">
                <span className="text-yellow-500 mr-1">★</span>
                <span className="text-sm">{helper.rating}</span>
              </div>
            </div>
            <p className="text-xs text-gray-600">Expert in {helper.expertise}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HelperCard;
