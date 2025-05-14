
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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

interface MatchingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  matchProgress: number;
  matchedHelper: Helper | null;
  onStartSession: () => void;
}

const MatchingDialog: React.FC<MatchingDialogProps> = ({
  open,
  onOpenChange,
  matchProgress,
  matchedHelper,
  onStartSession
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Finding the perfect helper for you</DialogTitle>
          <DialogDescription className="text-center">
            {matchedHelper ? 'Match found!' : 'Searching for available helpers...'}
          </DialogDescription>
        </DialogHeader>
        {!matchedHelper ? (
          <div className="py-6">
            <Progress value={matchProgress} className="mb-4" />
            <div className="text-center text-sm text-gray-500">
              {matchProgress < 30 ? 'Analyzing your request...' : 
               matchProgress < 60 ? 'Finding qualified helpers...' : 
               matchProgress < 90 ? 'Checking availability...' : 
               'Almost there...'}
            </div>
          </div>
        ) : (
          <div className="py-6">
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
            <div className="flex justify-center">
              <Button onClick={onStartSession}>Start Session</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MatchingDialog;
