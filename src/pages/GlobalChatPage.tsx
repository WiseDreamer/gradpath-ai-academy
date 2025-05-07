import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import BottomNav from '@/components/BottomNav';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Smile, PaperclipIcon, Image as ImageIcon, Mic } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import { useToast } from '@/hooks/use-toast';

const GlobalChatPage: React.FC = () => {
  const isMobile = useIsMobile();
  const { user } = useAuth();
  const { toast } = useToast();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'John Doe',
      avatar: '/avatars/john.jpg',
      message: 'Hey everyone! Has anyone completed the Linear Algebra assignment yet?',
      time: '10:30 AM',
      isCurrentUser: false
    },
    {
      id: 2,
      sender: 'Sarah Kim',
      avatar: '/avatars/sarah.jpg',
      message: 'I\'m working on it now. The eigenvalue problems are challenging!',
      time: '10:32 AM',
      isCurrentUser: false
    },
    {
      id: 3,
      sender: 'Current User',
      avatar: '/avatars/user.jpg',
      message: 'I found a great tutorial on eigenvalues, let me share the link...',
      time: '10:35 AM',
      isCurrentUser: true
    },
    {
      id: 4,
      sender: 'Alex Johnson',
      avatar: '/avatars/alex.jpg',
      message: 'Thanks! That would be really helpful. I\'m stuck on problem 3.',
      time: '10:36 AM',
      isCurrentUser: false
    },
    {
      id: 5,
      sender: 'Current User',
      avatar: '/avatars/user.jpg',
      message: 'Here it is: https://example.com/eigenvalues-tutorial',
      time: '10:37 AM',
      isCurrentUser: true
    },
    {
      id: 6,
      sender: 'Maria Garcia',
      avatar: '/avatars/maria.jpg',
      message: 'Has anyone started studying for the midterm yet? It\'s in two weeks!',
      time: '10:40 AM',
      isCurrentUser: false
    }
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'Current User',
        avatar: '/avatars/user.jpg',
        message: message.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isCurrentUser: true
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F7]">
      <NavBar variant="social" currentPage="/global-chat" />
      
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar - Only visible on desktop */}
        {!isMobile && (
          <div className="w-64 bg-white border-r border-gray-200 p-4 hidden md:block">
            <h2 className="font-semibold text-lg mb-4">Chat Channels</h2>
            <div className="space-y-2">
              <div className="bg-gradpath-purple/10 p-2 rounded-md font-medium text-gradpath-purple">
                # General
              </div>
              <div className="p-2 rounded-md hover:bg-gray-100 cursor-pointer">
                # Linear Algebra
              </div>
              <div className="p-2 rounded-md hover:bg-gray-100 cursor-pointer">
                # Calculus
              </div>
              <div className="p-2 rounded-md hover:bg-gray-100 cursor-pointer">
                # Statistics
              </div>
              <div className="p-2 rounded-md hover:bg-gray-100 cursor-pointer">
                # Study Group
              </div>
            </div>
            
            <h2 className="font-semibold text-lg mt-6 mb-4">Direct Messages</h2>
            <div className="space-y-2">
              <div className="flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="/avatars/john.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <span>John Doe</span>
              </div>
              <div className="flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="/avatars/sarah.jpg" />
                  <AvatarFallback>SK</AvatarFallback>
                </Avatar>
                <span>Sarah Kim</span>
              </div>
              <div className="flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="/avatars/alex.jpg" />
                  <AvatarFallback>AJ</AvatarFallback>
                </Avatar>
                <span>Alex Johnson</span>
              </div>
            </div>
          </div>
        )}
        
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="bg-white p-4 border-b border-gray-200 flex items-center">
            <div>
              <h2 className="font-semibold text-lg"># General</h2>
              <p className="text-sm text-gray-500">Community chat for all students</p>
            </div>
          </div>
          
          {/* Messages */}
          <ScrollArea className="flex-1 p-4 bg-gray-50">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.isCurrentUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex max-w-[80%] ${msg.isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}>
                    <Avatar className={`h-8 w-8 ${msg.isCurrentUser ? 'ml-2' : 'mr-2'}`}>
                      <AvatarImage src={msg.avatar} />
                      <AvatarFallback>{msg.sender.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className={`flex items-center ${msg.isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                        <span className={`text-xs text-gray-500 ${msg.isCurrentUser ? 'mr-2' : 'ml-0 mr-2'}`}>
                          {msg.isCurrentUser ? '' : msg.sender}
                        </span>
                        <span className="text-xs text-gray-400">{msg.time}</span>
                      </div>
                      <div 
                        className={`rounded-lg p-3 mt-1 ${
                          msg.isCurrentUser 
                            ? 'bg-gradpath-purple text-white' 
                            : 'bg-white border border-gray-200'
                        }`}
                      >
                        {msg.message}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          {/* Message Input */}
          <div className="bg-white p-4 border-t border-gray-200">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="text-gray-500">
                <PaperclipIcon className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-500">
                <ImageIcon className="h-5 w-5" />
              </Button>
              <div className="flex-1 mx-2">
                <Input
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="border-gray-300"
                />
              </div>
              <Button variant="ghost" size="icon" className="text-gray-500">
                <Smile className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-500">
                <Mic className="h-5 w-5" />
              </Button>
              <Button 
                onClick={handleSendMessage} 
                disabled={!message.trim()}
                className="bg-gradpath-purple hover:bg-gradpath-dark-purple ml-2"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {isMobile && <BottomNav />}
    </div>
  );
};

export default GlobalChatPage;
