
import { useRef } from 'react';
import { generateUserId } from '@/utils/whiteboard-utils';

export const useWhiteboardUser = () => {
  const userId = useRef(generateUserId());
  
  return {
    userId: userId.current
  };
};
