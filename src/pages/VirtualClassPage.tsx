
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import WhiteboardArea from '@/components/WhiteboardArea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send, MessageSquare, BookOpen, FileText } from 'lucide-react';
import ChatMessage, { Message } from '@/components/ChatMessage';
import { ScrollArea } from '@/components/ui/scroll-area';
import Logo from '@/components/Logo'; // Fix for Logo not defined

// Helper function for mobile detection
const useIsMobile = () => {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768;
};

const VirtualClassPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('questions');
  const [question, setQuestion] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([
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
  ]);
  
  const handleQuestionSubmit = () => {
    if (!question.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: question,
      timestamp: new Date(),
    };
    
    setMessages([...messages, newMessage]);
    setQuestion('');
    
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        content: `I'll help you understand ${question.substring(0, 30)}... Let me explain this concept in detail.`,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  // On mobile, do not show extraneous icons in header; just render logo and nothing after it
  // We assume NavBar uses 'variant="learning"' here, but on mobile we want a stripped-down top bar
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col overflow-x-hidden">
      {/* Mobile simple header if isMobile, else NavBar */}
      {isMobile ? (
        <div className="border-b bg-gradpath-purple text-white sticky top-0 z-50 w-full flex items-center h-16 px-4">
          <div className="flex items-center gap-2">
            <Logo clickable={false} />
          </div>
          {/* Removed icons Home, Bell, User per user request */}
        </div>
      ) : (
        <NavBar variant="learning" />
      )}

      <div className="w-full px-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Linear Algebra - Virtual Class</h1>
          <p className="text-gray-600">University of Oxford, Mathematics</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 flex-1">
          <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[400px]">
            <WhiteboardArea />
          </div>
          
          <div className="w-full md:w-96 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
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
                <ScrollArea className="flex-1 p-4" aria-describedby="questions-tab-desc">
                  {messages.map((msg) => (
                    <ChatMessage key={msg.id} message={msg} />
                  ))}
                </ScrollArea>
                <span id="questions-tab-desc" className="sr-only">
                  Chat messages between user and AI tutor.
                </span>
                
                <div className="p-3 border-t mt-auto">
                  <div className="flex gap-2">
                    <Textarea 
                      placeholder="Ask a question..."
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      className="min-h-[60px] resize-none"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleQuestionSubmit();
                        }
                      }}
                    />
                    <Button 
                      className="self-end"
                      size="icon"
                      onClick={handleQuestionSubmit}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="notes" className="flex-1 flex flex-col h-full">
                <div className="p-4 flex-1">
                  <h3 className="font-medium mb-2">Class Notes</h3>
                  <Textarea 
                    placeholder="Take notes here..."
                    className="min-h-[400px]"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="resources" className="flex-1 h-full">
                <ScrollArea className="h-full">
                  <div className="p-4">
                    <h3 className="font-medium mb-4">Class Resources</h3>
                    
                    <div className="space-y-3">
                      {['Linear Algebra Basics.pdf', 'Matrix Operations.pdf', 'Vector Spaces.pdf'].map((file) => (
                        <div 
                          key={file}
                          className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition cursor-pointer"
                        >
                          <FileText className="h-5 w-5 text-gradpath-purple" />
                          <span>{file}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualClassPage;
