
import React, { useState, useEffect } from 'react';
import { ChatMessages } from './chat/ChatMessages';
import { MessageInput } from './chat/MessageInput';
import { SuggestedQuestions } from './chat/SuggestedQuestions';
import { Button } from '@/components/ui/button';
import { Volume, VolumeX } from 'lucide-react';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { usePuter } from '@/contexts/PuterContext';

interface AiTutorChatProps {
  getWhiteboardState: () => string;
  isVoiceEnabled?: boolean;
  onToggleVoice?: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export const AiTutorChat: React.FC<AiTutorChatProps> = ({ 
  getWhiteboardState,
  isVoiceEnabled = true,
  onToggleVoice
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Get Puter.js context for AI capabilities
  const { puter, isLoaded } = usePuter();
  
  // Speech recognition setup with proper property destructuring
  const { 
    isListening,
    toggleListening,
    isSupported: isRecognitionSupported
  } = useSpeechRecognition({
    onResult: (transcript) => {
      setInputValue(transcript);
    }
  });
  
  // Suggested questions based on current context
  const suggestedQuestions = [
    "Can you explain eigenvalues in more detail?",
    "What's the relationship between eigenvalues and eigenvectors?",
    "How are these concepts applied in machine learning?",
    "Can you give me a practical example?"
  ];
  
  // Function to speak text aloud using Puter TTS or browser TTS as fallback
  const speak = async (text: string) => {
    if (!isVoiceEnabled) return;
    
    try {
      // Use Puter TTS if available
      if (puter?.tts && isLoaded) {
        await puter.tts.speak(text);
      } else {
        // Fallback to browser TTS
        const synth = window.speechSynthesis;
        if (synth) {
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.rate = 1.0;
          utterance.pitch = 1.0;
          synth.speak(utterance);
        }
      }
    } catch (error) {
      console.error('TTS error:', error);
    }
  };
  
  // Handle submitting a message to the AI tutor
  const handleSubmitMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim() || isProcessing) return;
    
    // Add user message to chat
    const userMessageId = `user-${Date.now()}`;
    const userMessage: Message = {
      id: userMessageId,
      sender: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsProcessing(true);
    
    // Get whiteboard context to inform AI response
    const whiteboardState = getWhiteboardState();
    
    try {
      // Create AI message with placeholder content
      const aiMessageId = `ai-${Date.now()}`;
      const initialAiMessage: Message = {
        id: aiMessageId,
        sender: 'ai',
        content: '',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, initialAiMessage]);
      
      let fullResponse = '';
      
      if (puter?.ai && isLoaded) {
        // Use Puter.js AI for real responses
        try {
          const prompt = `You are a helpful AI tutor explaining concepts. 
          The student has drawn this on the whiteboard: ${whiteboardState}
          
          Student question: ${inputValue.trim()}`;
          
          const stream = await puter.ai.chat(prompt, { stream: true });
          
          // Process streaming response
          for await (const chunk of stream) {
            if (chunk && typeof chunk === 'string') {
              fullResponse += chunk;
              
              // Update message with streaming content
              setMessages(prev =>
                prev.map(msg =>
                  msg.id === aiMessageId ? { ...msg, content: fullResponse } : msg
                )
              );
              
              // Speak the chunk if voice is enabled
              if (isVoiceEnabled && chunk.trim()) {
                await speak(chunk);
              }
            }
          }
        } catch (error) {
          console.error('Puter AI error:', error);
          
          // Fallback to mock response if Puter AI fails
          const mockResponse = "I'm sorry, I couldn't process that request. Please try again.";
          fullResponse = mockResponse;
          
          setMessages(prev =>
            prev.map(msg =>
              msg.id === aiMessageId ? { ...msg, content: mockResponse } : msg
            )
          );
        }
      } else {
        // Simulate streaming response if Puter.js is not available
        const mockResponse = [
          { text: 'Based on ' },
          { text: 'what you\'ve drawn on the whiteboard' },
          { text: ' and your question about ' },
          { text: inputValue.substring(0, 10) },
          { text: '..., ' },
          { text: 'I can explain this concept in detail.\n\n' },
          { text: 'The key insight is to understand how these mathematical principles connect to real-world applications.' }
        ];
        
        for (const part of mockResponse) {
          // Guard against null part
          if (part == null) continue;
          
          // Type guard for text property
          const text = typeof part === 'object' && 'text' in part 
            ? String(part.text) 
            : '';
          
          fullResponse += text;
          
          // Update message with streaming content
          setMessages(prev =>
            prev.map(msg =>
              msg.id === aiMessageId ? { ...msg, content: fullResponse } : msg
            )
          );
          
          // Speak the part if voice is enabled
          if (isVoiceEnabled && text.trim()) {
            await speak(text);
          }
          
          // Simulate streaming delay
          await new Promise(resolve => setTimeout(resolve, 200));
        }
      }
    } catch (error) {
      console.error('Error processing message:', error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Handle selecting a suggested question
  const handleSelectQuestion = (question: string) => {
    setInputValue(question);
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center p-2 border-b">
        <h3 className="font-medium">AI Tutor Chat</h3>
        {onToggleVoice && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleVoice}
            className="p-1"
          >
            {isVoiceEnabled ? (
              <Volume className="h-4 w-4" />
            ) : (
              <VolumeX className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>
      
      <ChatMessages 
        messages={messages}
        isProcessing={isProcessing}
      />
      
      <SuggestedQuestions
        questions={suggestedQuestions}
        onSelectQuestion={handleSelectQuestion}
      />
      
      <MessageInput
        inputValue={inputValue}
        onInputChange={setInputValue}
        onSubmit={handleSubmitMessage}
        isProcessing={isProcessing}
        isListening={isListening}
        onToggleListening={toggleListening}
        isRecognitionSupported={isRecognitionSupported}
        isLoaded={isLoaded}
      />
    </div>
  );
};
