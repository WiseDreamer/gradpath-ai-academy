import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '@/components/Logo';
import NavBar from '@/components/NavBar';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Search, Home, Bell, Mail, User, Menu, HelpCircle } from 'lucide-react';
import ChatDrawer from '@/components/chat/ChatDrawer';

// Mock contacts data
const contacts = [
  { 
    id: '1',
    name: 'Maria Garcia', 
    university: 'MIT', 
    status: 'online',
    lastMessage: 'Hey, do you have notes from yesterday?',
    time: '10:45 AM'
  },
  { 
    id: '2',
    name: 'James Smith', 
    university: 'Stanford University', 
    status: 'online',
    lastMessage: 'I finished the physics assignment',
    time: 'Yesterday'
  },
  { 
    id: '3',
    name: 'Emma Wilson', 
    university: 'Cambridge University', 
    status: 'offline',
    lastMessage: 'Let me know when you want to meet',
    time: '2 days ago'
  },
  { 
    id: '4',
    name: 'Michael Chen', 
    university: 'Yale University', 
    status: 'online',
    lastMessage: 'Thanks for your help with calculus',
    time: '3 days ago'
  },
];

// Mock messages for a selected contact
const mockMessages = [
  {
    id: 'm1',
    senderId: '1',
    text: 'Hey, do you have notes from yesterday?',
    time: '10:45 AM',
    isRead: true
  },
  {
    id: 'm2',
    senderId: 'me',
    text: 'Yes, I have them. Let me send you the PDF.',
    time: '10:47 AM',
    isRead: true
  },
  {
    id: 'm3',
    senderId: '1',
    text: 'That would be great! I missed the lecture because I had a doctor\'s appointment.',
    time: '10:48 AM',
    isRead: true
  },
  {
    id: 'm4',
    senderId: 'me',
    text: 'No problem. How are you feeling now?',
    time: '10:50 AM',
    isRead: true
  },
  {
    id: 'm5',
    senderId: '1',
    text: 'Much better, thanks for asking. Will you be at the study group tonight?',
    time: '10:51 AM',
    isRead: true
  }
];

const MessagesPage: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const location = useLocation();

  const openMobileMenu = () => {
    setIsDrawerOpen(true);
  };

  const handleContactSelect = (contactId: string) => {
    setSelectedContact(contactId);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const newMsg = {
      id: `m${messages.length + 1}`,
      senderId: 'me',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: false
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
    
    // Simulate reply after 1 second
    setTimeout(() => {
      const replyMsg = {
        id: `m${messages.length + 2}`,
        senderId: selectedContact || '1',
        text: 'Thanks for your message! I\'ll get back to you soon.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isRead: false
      };
      
      setMessages(prev => [...prev, replyMsg]);
    }, 1000);
  };

  const selectedContactData = contacts.find(c => c.id === selectedContact);

  return (
    <div className="min-h-screen bg-[#F5F5F7] overflow-x-hidden">
      {/* Custom header instead of using NavBar component */}
      <div className="border-b bg-gradpath-purple text-white sticky top-0 z-50 w-full">
        <div className="w-full px-4">
          {/* Top section */}
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Logo clickable={false} />
            </div>

            <div className="hidden md:flex items-center gap-2">
              <Link to="/messages">
                <Button variant="ghost" size="icon" className={`rounded-full text-white hover:bg-white/20 ${
                  location.pathname === '/messages' ? 'bg-white/20' : ''
                }`}>
                  <Mail className="h-8 w-8" />
                </Button>
              </Link>
              <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
                <Bell className="h-8 w-8" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
                <HelpCircle className="h-8 w-8" />
              </Button>
              <Link to="/dashboard">
                <Button variant="ghost" size="icon" className={`rounded-full text-white hover:bg-white/20 ${
                  location.pathname === '/dashboard' ? 'bg-white/20' : ''
                }`}>
                  <Home className="h-8 w-8" />
                </Button>
              </Link>
              <Link to="/profile">
                <Button variant="ghost" size="icon" className={`rounded-full text-white hover:bg-white/20 ${
                  location.pathname === '/profile' ? 'bg-white/20' : ''
                }`}>
                  <User className="h-8 w-8" />
                </Button>
              </Link>
            </div>
            
            <div className="md:hidden flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
                <Search className="h-8 w-8" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20" onClick={openMobileMenu}>
                <Menu className="h-8 w-8" />
              </Button>
            </div>
          </div>

          {/* Bottom section for mobile */}
          <div className="md:hidden h-14 flex items-center justify-between border-t border-white/20 px-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="icon" className={`rounded-full text-white hover:bg-white/20 ${
                location.pathname === '/dashboard' ? 'bg-white/20' : ''
              }`}>
                <Home className="h-8 w-8" />
              </Button>
            </Link>
            <Link to="/messages">
              <Button variant="ghost" size="icon" className={`rounded-full text-white hover:bg-white/20 ${
                location.pathname === '/messages' ? 'bg-white/20' : ''
              }`}>
                <Mail className="h-8 w-8" />
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
              <Bell className="h-8 w-8" />
            </Button>
            <Link to="/profile">
              <Button variant="ghost" size="icon" className={`rounded-full text-white hover:bg-white/20 ${
                location.pathname === '/profile' ? 'bg-white/20' : ''
              }`}>
                <User className="h-8 w-8" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-0 px-0 pt-6 pb-16 flex flex-col md:flex-row gap-6 h-[calc(100vh-64px)]">
        {/* Contact List - Hide on mobile when a chat is selected */}
        <div className={`w-full md:w-80 px-0 ${selectedContact ? 'hidden md:block' : ''}`}>
          <Card className="h-full overflow-hidden rounded-none md:rounded-lg">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Messages</h2>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                <Input placeholder="Search contacts..." className="pl-9" />
              </div>
            </div>
            
            <ScrollArea className="h-[calc(100vh-200px)]">
              <div className="p-2">
                {contacts.map((contact) => (
                  <button
                    key={contact.id}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors text-left ${
                      selectedContact === contact.id ? 'bg-gray-100' : ''
                    }`}
                    onClick={() => handleContactSelect(contact.id)}
                  >
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-gradpath-purple text-white">
                          {contact.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                        contact.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <p className="font-medium truncate">{contact.name}</p>
                        <p className="text-xs text-gray-500">{contact.time}</p>
                      </div>
                      <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
                      <p className="text-xs text-gray-400 truncate">{contact.university}</p>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </div>

        {/* Chat Area - Show on mobile only when a chat is selected */}
        <div className={`flex-1 px-0 ${!selectedContact ? 'hidden md:block' : ''}`}>
          <Card className="h-full flex flex-col overflow-hidden rounded-none md:rounded-lg">
            {!selectedContact && (
              <div className="flex-1 flex items-center justify-center p-6 text-center">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Select a conversation</h3>
                  <p className="text-gray-500">Choose a contact to start chatting</p>
                </div>
              </div>
            )}
            
            {selectedContact && (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="md:hidden"
                      onClick={() => setSelectedContact(null)}
                    >
                      Back
                    </Button>
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gradpath-purple text-white">
                        {selectedContactData?.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{selectedContactData?.name}</p>
                      <p className="text-xs text-gray-500">{selectedContactData?.university}</p>
                    </div>
                  </div>
                </div>
                
                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <div 
                        key={msg.id} 
                        className={`flex ${msg.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className="max-w-[75%]">
                          <div 
                            className={`p-3 rounded-lg ${
                              msg.senderId === 'me' 
                                ? 'bg-gradpath-purple text-white rounded-br-none' 
                                : 'bg-gray-100 rounded-bl-none'
                            }`}
                          >
                            <p>{msg.text}</p>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{msg.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                
                {/* Input Area */}
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Type a message..." 
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </Card>
        </div>
      </div>

      {/* Mobile Drawer - update to make it smaller */}
      <ChatDrawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />
    </div>
  );
};

export default MessagesPage;
