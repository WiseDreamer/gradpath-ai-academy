
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import MatchingDialog from './MatchingDialog';
import MatchingDrawer from './MatchingDrawer';

interface Helper {
  id: number;
  name: string;
  avatar: string | null;
  rating: number;
  expertise: string;
  status: string;
}

interface MatchingOverlayProps {
  showMatching: boolean;
  matchProgress: number;
  matchedHelper: Helper | null;
  onClose: () => void;
  onStartSession: () => void;
}

const MatchingOverlay: React.FC<MatchingOverlayProps> = ({
  showMatching,
  matchProgress,
  matchedHelper,
  onClose,
  onStartSession
}) => {
  const isMobile = useIsMobile();

  // Render the appropriate component based on device type
  if (isMobile) {
    return (
      <MatchingDrawer
        open={showMatching}
        onClose={onClose}
        matchProgress={matchProgress}
        matchedHelper={matchedHelper}
        onStartSession={onStartSession}
      />
    );
  }

  return (
    <MatchingDialog
      open={showMatching}
      onOpenChange={onClose}
      matchProgress={matchProgress}
      matchedHelper={matchedHelper}
      onStartSession={onStartSession}
    />
  );
};

export default MatchingOverlay;
