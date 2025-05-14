
import React, { useState, useRef, useEffect } from 'react';
import NavBar from '@/components/navbar/index';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Mic, MicOff, Upload } from 'lucide-react';
import ChatMessage, { Message } from '@/components/ChatMessage';

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      content: 'Hello! I\'m your AI tutor. How can I help you with your studies today?',
      timestamp: new Date(),
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };
  
  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: newMessage,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        content: getAIResponse(newMessage),
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };
  
  const getAIResponse = (userMessage: string): string => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    if (lowerCaseMessage.includes('calculus')) {
      return "Calculus is a branch of mathematics that deals with rates of change and accumulation. The two main branches are differential calculus (concerning rates of change and slopes of curves) and integral calculus (concerning accumulation of quantities and the areas under curves). What specific topic in calculus would you like to learn about?";
    } else if (lowerCaseMessage.includes('derivative')) {
      return "A derivative measures the rate at which a function changes as its input changes. Geometrically, it represents the slope of the tangent line to the function at a specific point. The process of finding a derivative is called differentiation. Would you like to see some examples of how to calculate derivatives?";
    } else if (lowerCaseMessage.includes('integral')) {
      return "Integration is the process of finding a function whose derivative equals the given function. It's the reverse of differentiation. There are two types: indefinite integrals (which give a family of functions) and definite integrals (which give a specific value, often representing area under a curve). Would you like to learn about integration techniques?";
    } else {
      return "That's an interesting question! I'd be happy to help you understand this topic better. Could you provide more details about what you're trying to learn, or maybe share a specific problem you're working on?";
    }
  };
  
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);
  
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      <NavBar variant="ai-tutor" />
      
      <div className="container mx-auto px-4 py-6 flex-1 flex flex-col">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">AI Tutor Chat</h1>
          <p className="text-gray-600">Ask any academic question and get instant help</p>
        </div>
        
        <Card className="flex-1 flex flex-col overflow-hidden border-none shadow-lg">
          <div className="flex-1 flex flex-col min-h-[70vh]">
            <ScrollArea className="flex-1 p-4 bg-white" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
              </div>
            </ScrollArea>
            
            <div className="p-4 border-t bg-white">
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="text-gray-500 hover:text-gradpath-purple hover:border-gradpath-purple">
                  <Upload className="h-4 w-4" />
                </Button>
                
                <Input
                  placeholder="Type your question here..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 focus-visible:ring-gradpath-purple"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      sendMessage();
                    }
                  }}
                />
                
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={toggleRecording}
                  className={isRecording ? "bg-red-100 text-red-600 border-red-300" : "text-gray-500 hover:text-gradpath-purple hover:border-gradpath-purple"}
                >
                  {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
                
                <Button size="icon" className="bg-gradpath-purple hover:bg-gradpath-dark-purple">
                  <Send className="h-4 w-4" onClick={sendMessage} />
                </Button>
              </div>
              
              {isRecording && (
                <div className="mt-2 p-2 bg-red-50 rounded-md text-sm text-center animate-pulse-slow">
                  Recording... Speak your question
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ChatPage;
