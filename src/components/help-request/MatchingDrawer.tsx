
import React from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from '@/components/ui/drawer';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';

interface Helper {
  id: number;
  name: string;
  avatar: string | null;
  rating: number;
  expertise: string;
  status: string;
}

interface MatchingDrawerProps {
  open: boolean;
  onClose: () => void;
  matchProgress: number;
  matchedHelper: Helper | null;
  onStartSession: () => void;
}

const MatchingDrawer: React.FC<MatchingDrawerProps> = ({
  open,
  onClose,
  matchProgress,
  matchedHelper,
  onStartSession
}) => {
  return (
    <Drawer open={open} onClose={onClose}>
      <DrawerContent>
        <DrawerHeader className="text-center">
          <DrawerTitle>{matchedHelper ? 'Match found!' : 'Finding the perfect helper'}</DrawerTitle>
          <DrawerDescription>
            {!matchedHelper && 'This might take a moment'}
          </DrawerDescription>
        </DrawerHeader>
        {!matchedHelper ? (
          <div className="px-4 py-6">
            <Progress value={matchProgress} className="mb-4" />
            <div className="text-center text-sm text-gray-500">
              {matchProgress < 30 ? 'Analyzing your request...' : 
               matchProgress < 60 ? 'Finding qualified helpers...' : 
               matchProgress < 90 ? 'Checking availability...' : 
               'Almost there...'}
            </div>
          </div>
        ) : (
          <div className="px-4 py-6">
            <div className="flex flex-col items-center mb-4">
              <Avatar className="h-20 w-20 mb-2">
                <div className="bg-gradpath-purple text-white flex items-center justify-center w-full h-full rounded-full text-2xl">
                  {matchedHelper.name.charAt(0)}
                </div>
              </Avatar>
              <h3 className="text-lg font-bold">{matchedHelper.name}</h3>
              <div className="flex items-center">
                <span className="text-yellow-500 mr-1">★</span>
                <span>{matchedHelper.rating}</span>
              </div>
              <p className="text-sm text-gray-600">Expert in {matchedHelper.expertise}</p>
            </div>
            <DrawerFooter>
              <Button onClick={onStartSession}>Start Session Now</Button>
            </DrawerFooter>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default MatchingDrawer;
