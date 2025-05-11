
import React from 'react';
import { VirtualBoardContainer } from './board/VirtualBoardContainer';

interface VirtualBoardProps {
  isPaused: boolean;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  annotations: any[];
  setAnnotations: (annotations: any[]) => void;
  getWhiteboardState: (state: string) => void;
}

export const VirtualBoard: React.FC<VirtualBoardProps> = ({
  isPaused,
  currentPage,
  setCurrentPage,
  annotations,
  setAnnotations,
  getWhiteboardState
}) => {
  return (
    <VirtualBoardContainer
      isPaused={isPaused}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      annotations={annotations}
      setAnnotations={setAnnotations}
      getWhiteboardState={getWhiteboardState}
    />
  );
};
