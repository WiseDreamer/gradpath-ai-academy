
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, BookOpen, FileText } from 'lucide-react';
import { TutorMessageType } from '@/types/virtualClass';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { AiTutorChat } from './AiTutorChat';

// Import new components
import { SidebarHeader } from './sidebar/SidebarHeader';
import { ClassroomControls } from './sidebar/ClassroomControls';

// Nested components
import NotesTab from './NotesTab';
import ResourcesTab from './ResourcesTab';

interface VirtualClassSidebarProps {
  title: string;
  institution: string;
  initialMessages: TutorMessageType[];
  isHandRaised: boolean;
  setIsHandRaised: (value: boolean) => void;
  isMicOn: boolean;
  setIsMicOn: (value: boolean) => void;
  isSpeakerOn: boolean;
  setIsSpeakerOn: (value: boolean) => void;
  isPaused: boolean;
  setIsPaused: (value: boolean) => void;
  onChangeModule?: (moduleName: string) => void;
  onFullscreen?: () => void;
  onSetLessonScope?: () => void;
  getWhiteboardState: () => string;
}

export const VirtualClassSidebar: React.FC<VirtualClassSidebarProps> = ({ 
  title, 
  institution,
  initialMessages,
  isHandRaised,
  setIsHandRaised,
  isMicOn,
  setIsMicOn,
  isSpeakerOn,
  setIsSpeakerOn,
  isPaused,
  setIsPaused,
  onChangeModule,
  onFullscreen,
  onSetLessonScope,
  getWhiteboardState
}) => {
  const [activeTab, setActiveTab] = useState<string>('questions');
  const isMobile = useIsMobile();
  
  return (
    <div className={cn(
      "w-full md:w-96 flex flex-col bg-white border-l border-gray-200",
      isMobile && "h-full order-2"
    )}>
      {/* Sidebar Header */}
      <SidebarHeader
        title={title}
        institution={institution}
        onChangeModule={onChangeModule}
        onFullscreen={onFullscreen}
        onSetLessonScope={onSetLessonScope}
      />
      
      <Tabs defaultValue="questions" className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="questions" onClick={() => setActiveTab('questions')}>
            <MessageSquare className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Q&amp;A</span>
          </TabsTrigger>
          <TabsTrigger value="notes" onClick={() => setActiveTab('notes')}>
            <FileText className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Notes</span>
          </TabsTrigger>
          <TabsTrigger value="resources" onClick={() => setActiveTab('resources')}>
            <BookOpen className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Resources</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="questions" className="flex-1 flex flex-col h-0">
          {/* AI Tutor Chat */}
          <AiTutorChat
            getWhiteboardState={getWhiteboardState}
            isVoiceEnabled={isSpeakerOn}
            onToggleVoice={() => setIsSpeakerOn(!isSpeakerOn)}
          />
        </TabsContent>
        
        <TabsContent value="notes" className="flex-1 h-0">
          <NotesTab />
        </TabsContent>
        
        <TabsContent value="resources" className="flex-1 h-0">
          <ResourcesTab />
        </TabsContent>
      </Tabs>
      
      {/* Classroom Controls */}
      <ClassroomControls
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
  );
};
