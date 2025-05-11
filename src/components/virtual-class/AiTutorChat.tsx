
import React, { useState } from 'react';
import { usePuterAiTutor } from '@/services/puterAiTutorService';
import { useToast } from '@/hooks/use-toast';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { SuggestedQuestions } from './chat/SuggestedQuestions';
import { ChatMessages } from './chat/ChatMessages';
import { MessageInput } from './chat/MessageInput';

interface AiTutorChatProps {
  getWhiteboardState: () => string;
  isVoiceEnabled: boolean;
  onToggleVoice: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export const AiTutorChat: React.FC<AiTutorChatProps> = ({
  getWhiteboardState,
  isVoiceEnabled,
  onToggleVoice
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const { askQuestion, speak, isProcessing, isSpeaking, isLoaded } = usePuterAiTutor();
  const { toast } = useToast();
  
  // Use the speech recognition hook
  const { isListening, toggleListening, isSupported: isRecognitionSupported } = 
    useSpeechRecognition({
      onResult: (transcript) => {
        setInputValue(transcript);
      }
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim() || !isLoaded) return;
    
    // Add user message to chat
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: inputValue,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    try {
      // Get current whiteboard state
      const boardState = getWhiteboardState();
      
      // Send message to AI and get streaming response
      const response = await askQuestion(userMessage.content, boardState);
      
      let fullResponse = '';
      let aiMessageId = `ai-${Date.now()}`;
      
      // Add initial AI message with empty content
      setMessages(prev => [
        ...prev, 
        {
          id: aiMessageId,
          sender: 'ai',
          content: '',
          timestamp: new Date()
        }
      ]);
      
      // Process streaming response with proper null checks
      for await (const part of response) {
        // Early return with robust null/undefined check
        if (part == null) continue;
        
        // Safely extract text with type guards
        let textPart = '';
        if (typeof part === 'object' && 'text' in part) {
          const extractedText = part.text;
          textPart = extractedText != null ? String(extractedText) : '';
        }
        
        fullResponse += textPart;
        
        // Update AI message with new content
        setMessages(prev => 
          prev.map(msg => 
            msg.id === aiMessageId 
              ? { ...msg, content: fullResponse } 
              : msg
          )
        );
        
        // Speak the response chunk if voice is enabled
        if (isVoiceEnabled && textPart.trim()) {
          await speak(textPart);
        }
      }
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Add error message
      setMessages(prev => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          sender: 'ai',
          content: 'Sorry, I had trouble processing your request. Please try again.',
          timestamp: new Date()
        }
      ]);
      
      toast({
        title: "AI Error",
        description: "Failed to get a response from the AI tutor.",
        variant: "destructive"
      });
    }
  };
  
  const suggestedQuestions = [
    "Can you explain eigenvalues?",
    "How to find eigenvectors?",
    "What's the characteristic equation?",
    "Show a 3x3 matrix example"
  ];
  
  const handleSelectQuestion = (question: string) => {
    setInputValue(question);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat messages */}
      <ChatMessages 
        messages={messages} 
        isProcessing={isProcessing} 
      />
      
      {/* Suggested questions */}
      <SuggestedQuestions 
        questions={suggestedQuestions} 
        onSelectQuestion={handleSelectQuestion} 
      />
      
      {/* Input form */}
      <MessageInput 
        inputValue={inputValue}
        onInputChange={setInputValue}
        onSubmit={handleSubmit}
        isProcessing={isProcessing}
        isListening={isListening}
        onToggleListening={toggleListening}
        isRecognitionSupported={isRecognitionSupported}
        isLoaded={isLoaded}
      />
    </div>
  );
};
