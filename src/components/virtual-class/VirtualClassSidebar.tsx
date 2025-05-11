
import React, { useState, useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, BookOpen, FileText, Hand, Play, Pause, Mic, MicOff, Volume, VolumeX, ChevronDown, Maximize } from 'lucide-react';
import { TutorMessageType } from '@/types/virtualClass';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { AiTutorChat } from './AiTutorChat';

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
  const [messages, setMessages] = useState<TutorMessageType[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  // Available modules list
  const availableModules = [
    "Linear Algebra - Virtual Class",
    "Calculus II - Virtual Class",
    "Discrete Mathematics - Virtual Class",
    "Statistics for Data Science - Virtual Class"
  ];
  
  const handleSubmitMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const newUserMessage: TutorMessageType = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: inputValue,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponse: TutorMessageType = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        content: `I'm analyzing your question about "${inputValue}". Let me explain...`,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
      
      // Scroll to the bottom after new message
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 1000);
  };
  
  const handleRaiseHand = () => {
    setIsHandRaised(!isHandRaised);
    
    if (!isHandRaised) {
      // If raising hand, add AI acknowledgment message after a delay
      setTimeout(() => {
        const aiResponse: TutorMessageType = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          content: "Yes, I see you have a question. Please go ahead.",
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, aiResponse]);
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 1500);
      
      toast({
        title: "Hand Raised",
        description: "The AI tutor will respond to your hand raise shortly.",
      });
    }
  };
  
  const handlePauseResume = () => {
    setIsPaused(!isPaused);
    
    if (isPaused) {
      toast({
        title: "Class Resumed",
        description: "The virtual class has been resumed."
      });
    } else {
      toast({
        title: "Class Paused",
        description: "The virtual class has been paused. You can resume at any time."
      });
    }
  };
  
  const suggestedQuestions = [
    "Can you explain how to find eigenvalues?",
    "What's the relationship between eigenvectors and eigenvalues?",
    "How are eigenvalues used in machine learning?",
    "Please show a 3x3 matrix example with eigenvalues"
  ];

  return (
    <div className={cn(
      "w-full md:w-96 flex flex-col bg-white border-l border-gray-200",
      isMobile && "h-full order-2"
    )}>
      {!isMobile && (
        <div className="p-3 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                  <h2 className="font-medium">{title}</h2>
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {availableModules.map((module) => (
                    <DropdownMenuItem 
                      key={module} 
                      onClick={() => onChangeModule && onChangeModule(module)}
                      className="cursor-pointer"
                    >
                      {module}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <p className="text-sm text-gray-500">{institution}</p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onSetLessonScope}
                className="text-xs"
              >
                Set Lesson Scope
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={onFullscreen}
                className="p-1"
              >
                <Maximize className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
      
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
    </div>
  );
};
