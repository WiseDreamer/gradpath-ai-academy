
import React, { useState, useRef } from 'react';
import NavBar from '@/components/NavBar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { 
  Send, 
  PaperclipIcon, 
  X, 
  FileText, 
  FilePlus, 
  ArrowLeft,
  ArrowRight,
  MessageSquare
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';

type Message = {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  attachments?: { name: string; url: string; type: string }[];
};

const AiTutorPage = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI tutor. How can I help you today?",
      role: 'assistant',
      timestamp: new Date(),
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showSidebar, setShowSidebar] = useState(!isMobile);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() && attachments.length === 0) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      role: 'user',
      timestamp: new Date(),
      attachments: attachments.map(file => ({
        name: file.name,
        url: URL.createObjectURL(file),
        type: file.type
      }))
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setAttachments([]);
    setIsLoading(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(newMessage),
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
      setTimeout(scrollToBottom, 100);
    }, 1500);

    setTimeout(scrollToBottom, 100);
  };

  const generateAIResponse = (query: string) => {
    const responses = [
      "That's a great question! Let me explain this concept in more detail...",
      "This is an important topic. The key points you need to understand are...",
      "I can help you solve this. First, let's break down the problem step by step...",
      "Based on what you've shared, I'd recommend focusing on these areas...",
      "Let me provide an example that might make this clearer for you..."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)] + 
      " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Phasellus tempor nec justo sit amet tincidunt. Mauris sed justo vel nulla facilisis finibus.";
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      if (attachments.length + newFiles.length > 3) {
        toast({
          title: "Too many files",
          description: "You can only upload up to 3 files at once",
          variant: "destructive"
        });
        return;
      }
      setAttachments(prev => [...prev, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const suggestedQuestions = [
    "Can you explain derivatives in calculus?",
    "I'm struggling with linear algebra matrices",
    "How do I solve quadratic equations?",
    "What's the difference between mean and median?",
    "Help me understand Newton's laws of motion",
    "What are the key concepts in organic chemistry?",
    "How do I calculate probability?",
    "Explain the central limit theorem"
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar variant="ai-tutor" />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar with suggested questions - hidden on mobile by default */}
        {showSidebar && (
          <div className={`w-80 bg-white border-r overflow-y-auto ${isMobile ? 'absolute z-10 h-full' : ''}`}>
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-lg">Suggested Questions</h2>
                {isMobile && (
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setShowSidebar(false)}
                  >
                    <X size={18} />
                  </Button>
                )}
              </div>
            </div>
            <div className="p-4 space-y-3">
              {suggestedQuestions.map((question, index) => (
                <Button 
                  key={index}
                  variant="outline" 
                  className="w-full justify-start text-left h-auto py-3 px-4"
                  onClick={() => {
                    setNewMessage(question);
                    if (isMobile) setShowSidebar(false);
                  }}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        )}
        
        {/* Main chat area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Chat messages area */}
          <ScrollArea className="flex-1 p-4">
            <div className="max-w-4xl mx-auto space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id}
                  className={`${message.role === 'user' ? 'ml-auto' : 'mr-auto'} max-w-[85%]`}
                >
                  <Card className={`${
                    message.role === 'user' 
                      ? 'bg-gradpath-purple text-white' 
                      : 'bg-white'
                  }`}>
                    <CardContent className="p-4">
                      {message.attachments && message.attachments.length > 0 && (
                        <div className="mb-3 space-y-2">
                          {message.attachments.map((file, index) => (
                            <div 
                              key={index} 
                              className="flex items-center bg-black/10 p-2 rounded"
                            >
                              <FileText size={16} className="mr-2" />
                              <span className="text-sm truncate">{file.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      <div className={`text-xs mt-2 ${message.role === 'user' ? 'text-gray-200' : 'text-gray-500'}`}>
                        {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
              
              {isLoading && (
                <div className="mr-auto max-w-[85%]">
                  <Card className="bg-white">
                    <CardContent className="p-4">
                      <div className="flex space-x-2">
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          {/* Attachments preview */}
          {attachments.length > 0 && (
            <div className="mx-4 mb-2 p-2 bg-gray-100 rounded-md">
              <div className="flex flex-wrap gap-2">
                {attachments.map((file, index) => (
                  <div 
                    key={index}
                    className="flex items-center bg-white p-1 px-2 rounded border text-sm"
                  >
                    <FileText size={14} className="mr-1 text-gray-500" />
                    <span className="max-w-[100px] truncate">{file.name}</span>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="w-4 h-4 ml-1"
                      onClick={() => handleRemoveFile(index)}
                    >
                      <X size={14} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Input area */}
          <div className="border-t p-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex gap-2">
                {/* Mobile sidebar toggle */}
                {isMobile && !showSidebar && (
                  <Button 
                    variant="outline" 
                    className="shrink-0"
                    onClick={() => setShowSidebar(true)}
                  >
                    {showSidebar ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}
                  </Button>
                )}
                
                <div className="relative flex-1">
                  <Textarea 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Ask your question here..."
                    className="min-h-[80px] pr-12 resize-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  {/* File attachment button positioned inside the textarea */}
                  <Button 
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute bottom-2 right-12"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <PaperclipIcon size={20} />
                    <Input 
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleFileSelect}
                      multiple
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png"
                    />
                  </Button>
                </div>
                
                <Button 
                  type="button"
                  className="shrink-0"
                  onClick={handleSendMessage}
                  disabled={isLoading}
                >
                  <Send size={18} />
                </Button>
              </div>
              
              <div className="text-xs text-gray-500 mt-2">
                Press <kbd className="border rounded px-1 py-0.5 mx-1">Enter</kbd> to send. Use <kbd className="border rounded px-1 py-0.5 mx-1">Shift+Enter</kbd> for a new line.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiTutorPage;
