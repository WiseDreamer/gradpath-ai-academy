
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import ChatMessage, { Message } from '@/components/ChatMessage';

interface QuestionsTabProps {
  initialMessages?: Message[];
}

const QuestionsTab: React.FC<QuestionsTabProps> = ({ initialMessages = [] }) => {
  const [question, setQuestion] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>(initialMessages);

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

  return (
    <>
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
    </>
  );
};

export default QuestionsTab;
