
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import { useIsMobile } from '@/hooks/use-mobile';
import WhiteboardArea from '@/components/WhiteboardArea';
import MobileNavBar from '@/components/virtual-class/MobileNavBar';
import VirtualClassHeader from '@/components/virtual-class/VirtualClassHeader';
import VirtualClassSidebar from '@/components/virtual-class/VirtualClassSidebar';
import { Message } from '@/components/ChatMessage';

const VirtualClassPage: React.FC = () => {
  const isMobile = useIsMobile();
  
  // Initial messages for the chat
  const initialMessages: Message[] = [
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col overflow-x-hidden">
      {isMobile ? (
        <MobileNavBar />
      ) : (
        <NavBar variant="learning" />
      )}

      <div className="flex flex-col w-full">
        <div className="flex flex-col md:flex-row w-full">
          {isMobile && (
            <VirtualClassHeader 
              title="Linear Algebra - Virtual Class"
              institution="University of Oxford, Mathematics"
            />
          )}
          
          <div className="w-full">
            <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[500px] md:min-h-[600px]">
              <WhiteboardArea />
            </div>
          </div>

          <VirtualClassSidebar
            title="Linear Algebra - Virtual Class"
            institution="University of Oxford, Mathematics"
            initialMessages={initialMessages}
          />
        </div>
      </div>
    </div>
  );
};

export default VirtualClassPage;
