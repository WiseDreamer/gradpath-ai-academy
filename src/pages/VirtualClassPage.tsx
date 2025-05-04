
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileNavBar from '@/components/virtual-class/MobileNavBar';
import VirtualClassHeader from '@/components/virtual-class/VirtualClassHeader';
import { VirtualClassSidebar } from '@/components/virtual-class/VirtualClassSidebar';
import { VirtualBoard } from '@/components/virtual-class/VirtualBoard';
import { TutorMessageType } from '@/types/virtualClass';

const VirtualClassPage: React.FC = () => {
  const isMobile = useIsMobile();
  
  // Initial messages for the chat
  const initialMessages: TutorMessageType[] = [
    {
      id: '1',
      sender: 'ai',
      content: 'Welcome to the virtual class on Linear Algebra. How can I help you today?',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
    },
    {
      id: '2',
      sender: 'user',
      content: 'Can you explain eigenvalues and eigenvectors?',
      timestamp: new Date(Date.now() - 1000 * 60 * 4),
    },
    {
      id: '3',
      sender: 'ai',
      content: 'Eigenvalues and eigenvectors are special numbers and vectors associated with a square matrix. When we multiply a matrix by an eigenvector, the result is a scaled version of the same vector, and the scaling factor is the eigenvalue.',
      timestamp: new Date(Date.now() - 1000 * 60 * 3),
    },
  ];

  // State for the virtual class settings
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [annotations, setAnnotations] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handleRaiseHand = () => {
    setIsHandRaised(prev => !prev);
  };

  const handlePauseClass = () => {
    setIsPaused(prev => !prev);
  };

  const handleToggleMic = () => {
    setIsMicOn(prev => !prev);
  };

  const handleToggleSpeaker = () => {
    setIsSpeakerOn(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col overflow-x-hidden">
      {isMobile ? (
        <MobileNavBar />
      ) : (
        <NavBar variant="learning" />
      )}

      <div className="flex flex-col md:flex-row w-full h-[calc(100vh-64px)] overflow-hidden">
        {/* Mobile Header */}
        {isMobile && (
          <VirtualClassHeader 
            title="Linear Algebra - Virtual Class"
            institution="University of Oxford, Mathematics"
          />
        )}
        
        {/* Main Content Area */}
        <div className="w-full md:flex-1 flex flex-col overflow-hidden">
          {/* Control Bar for Desktop */}
          {!isMobile && (
            <div className="bg-white border-b border-gray-200 py-2 px-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="font-medium">Linear Algebra - Virtual Class</span>
                <span className="text-xs text-gray-500">University of Oxford</span>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={handlePauseClass}
                  className={`px-3 py-1 rounded-md text-sm ${isPaused ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}
                >
                  {isPaused ? 'Resume Class' : 'Pause Class'}
                </button>
                <button 
                  onClick={handleRaiseHand}
                  className={`px-3 py-1 rounded-md text-sm ${isHandRaised ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-700'}`}
                >
                  {isHandRaised ? 'Hand Raised' : 'Raise Hand'}
                </button>
              </div>
            </div>
          )}

          {/* Virtual Board Area */}
          <div className="flex-1 overflow-hidden">
            <VirtualBoard 
              isPaused={isPaused}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              annotations={annotations}
              setAnnotations={setAnnotations}
            />
          </div>
        </div>

        {/* Sidebar for chat, notes, etc */}
        <VirtualClassSidebar
          title="Linear Algebra - Virtual Class"
          institution="University of Oxford, Mathematics"
          initialMessages={initialMessages}
          isHandRaised={isHandRaised}
          setIsHandRaised={setIsHandRaised}
          isMicOn={isMicOn}
          setIsMicOn={setIsMicOn}
          isSpeakerOn={isSpeakerOn}
          setIsSpeakerOn={setIsSpeakerOn}
          isPaused={isPaused}
          setIsPaused={setIsPaused}
        />
      </div>

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2">
          <button 
            onClick={handlePauseClass}
            className="p-2 flex flex-col items-center text-xs"
          >
            <span className="material-icons-outlined">{isPaused ? 'play_arrow' : 'pause'}</span>
            <span>{isPaused ? 'Resume' : 'Pause'}</span>
          </button>
          <button 
            onClick={handleRaiseHand}
            className="p-2 flex flex-col items-center text-xs"
          >
            <span className="material-icons-outlined">pan_tool</span>
            <span>Hand</span>
          </button>
          <button 
            onClick={handleToggleMic}
            className="p-2 flex flex-col items-center text-xs"
          >
            <span className="material-icons-outlined">{isMicOn ? 'mic' : 'mic_off'}</span>
            <span>Mic</span>
          </button>
          <button 
            onClick={handleToggleSpeaker}
            className="p-2 flex flex-col items-center text-xs"
          >
            <span className="material-icons-outlined">{isSpeakerOn ? 'volume_up' : 'volume_off'}</span>
            <span>Audio</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default VirtualClassPage;
