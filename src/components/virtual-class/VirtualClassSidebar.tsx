
import React, { useState, useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, BookOpen, FileText, Hand, Play, Pause, Mic, MicOff, Volume, VolumeX } from 'lucide-react';
import { TutorMessageType } from '@/types/virtualClass';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

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
  setIsPaused
}) => {
  const [activeTab, setActiveTab] = useState<string>('questions');
  const [messages, setMessages] = useState<TutorMessageType[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
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
    setIsHandRaised(prev => !prev);
    
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
    setIsPaused(prev => !prev);
    
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
          <h2 className="font-medium">{title}</h2>
          <p className="text-sm text-gray-500">{institution}</p>
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
          {/* Chat messages area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(message => (
              <div 
                key={message.id} 
                className={cn(
                  "flex flex-col",
                  message.sender === 'user' ? "items-end" : "items-start"
                )}
              >
                <div 
                  className={cn(
                    "max-w-xs sm:max-w-sm rounded-lg p-3",
                    message.sender === 'user' 
                      ? "bg-blue-100 rounded-tr-none" 
                      : "bg-gray-100 rounded-tl-none"
                  )}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
                <span className="text-xs text-gray-500 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Suggested questions */}
          <div className="p-2 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-2">Suggested Questions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => {
                    setInputValue(question);
                    const inputElement = document.getElementById('message-input');
                    if (inputElement) {
                      inputElement.focus();
                    }
                  }}
                >
                  {question.length > 20 ? `${question.substring(0, 20)}...` : question}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Message input */}
          <form onSubmit={handleSubmitMessage} className="p-3 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <Input
                id="message-input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your question..."
                className="flex-1"
              />
              <Button type="submit" size="sm">Send</Button>
            </div>
            
            {/* Control buttons */}
            <div className="flex justify-between mt-3">
              <Button
                type="button"
                variant={isHandRaised ? "secondary" : "outline"}
                size="sm"
                onClick={handleRaiseHand}
                className="flex items-center gap-1"
              >
                <Hand className="h-4 w-4" />
                <span>Raise Hand</span>
              </Button>
              
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={isMicOn ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => setIsMicOn(!isMicOn)}
                  className="flex items-center gap-1"
                >
                  {isMicOn ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
                
                <Button
                  type="button"
                  variant={isSpeakerOn ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                  className="flex items-center gap-1"
                >
                  {isSpeakerOn ? <Volume className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                </Button>
                
                <Button
                  type="button"
                  variant={isPaused ? "secondary" : "outline"}
                  size="sm"
                  onClick={handlePauseResume}
                  className="flex items-center gap-1"
                >
                  {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </form>
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
