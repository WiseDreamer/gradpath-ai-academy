
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, BookOpen, FileText } from 'lucide-react';
import QuestionsTab from './QuestionsTab';
import NotesTab from './NotesTab';
import ResourcesTab from './ResourcesTab';
import VirtualClassHeader from './VirtualClassHeader';
import { Message } from '@/components/ChatMessage';
import { useIsMobile } from '@/hooks/use-mobile';

interface VirtualClassSidebarProps {
  title: string;
  institution: string;
  initialMessages: Message[];
}

const VirtualClassSidebar: React.FC<VirtualClassSidebarProps> = ({ 
  title, 
  institution, 
  initialMessages 
}) => {
  const [activeTab, setActiveTab] = useState<string>('questions');
  const isMobile = useIsMobile();

  return (
    <div className="w-full md:w-96">
      {!isMobile && (
        <VirtualClassHeader title={title} institution={institution} />
      )}
      
      <div className="w-full bg-white rounded-b-xl shadow-sm border border-t-0 border-gray-100 overflow-hidden flex flex-col">
        <Tabs defaultValue="questions" className="w-full h-full flex flex-col">
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
          
          <TabsContent value="questions" className="flex-1 flex flex-col h-full">
            <QuestionsTab initialMessages={initialMessages} />
          </TabsContent>
          
          <TabsContent value="notes" className="flex-1 flex flex-col h-full">
            <NotesTab />
          </TabsContent>
          
          <TabsContent value="resources" className="flex-1 h-full">
            <ResourcesTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default VirtualClassSidebar;
