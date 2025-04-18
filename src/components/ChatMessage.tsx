
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Message {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isAi = message.sender === 'ai';
  
  return (
    <div className={cn(
      "flex w-full mb-4",
      isAi ? "justify-start" : "justify-end"
    )}>
      <div className={cn(
        "flex max-w-[80%]",
        isAi ? "flex-row" : "flex-row-reverse"
      )}>
        {isAi ? (
          <Avatar className="mr-2 h-8 w-8">
            <AvatarFallback className="bg-gradpath-light-purple text-white">
              <BookOpen className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        ) : (
          <Avatar className="ml-2 h-8 w-8">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback className="bg-gray-200">U</AvatarFallback>
          </Avatar>
        )}
        
        <div>
          <div className={cn(
            "rounded-xl py-2 px-3",
            isAi 
              ? "bg-white border border-gray-200 text-left rounded-tl-none" 
              : "bg-gradpath-purple text-white text-right rounded-tr-none"
          )}>
            <p className="text-sm">{message.content}</p>
          </div>
          <div className={cn("text-xs text-gray-500 mt-1", 
            isAi ? "text-left" : "text-right"
          )}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
