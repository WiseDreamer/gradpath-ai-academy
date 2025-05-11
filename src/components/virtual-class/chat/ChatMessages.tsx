
import React from 'react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface ChatMessagesProps {
  messages: ChatMessage[];
  isProcessing: boolean;
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({ 
  messages, 
  isProcessing 
}) => {
  // Reference to automatically scroll to bottom of messages
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  
  // Scroll to bottom of chat when messages change
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          <p className="mb-2">Ask the AI tutor a question about what's on the whiteboard.</p>
          <p>Your conversation will be connected to what you've drawn.</p>
        </div>
      )}
      
      {messages.map(message => (
        <div 
          key={message.id} 
          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div 
            className={`max-w-xs sm:max-w-sm rounded-lg p-3 ${
              message.sender === 'user' 
                ? 'bg-blue-100 text-blue-800 rounded-tr-none' 
                : 'bg-gray-100 text-gray-800 rounded-tl-none'
            }`}
          >
            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            <div className="text-xs text-gray-500 mt-1">
              {message.timestamp.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
      
      {/* Loading indicator */}
      {isProcessing && (
        <div className="flex justify-center">
          <div className="animate-pulse flex space-x-2">
            <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
            <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
            <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
          </div>
        </div>
      )}
    </div>
  );
};
