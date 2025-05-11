
import React, { useState, useEffect } from 'react';
import { ChatMessages } from './chat/ChatMessages';
import { MessageInput } from './chat/MessageInput';
import { SuggestedQuestions } from './chat/SuggestedQuestions';
import { Button } from '@/components/ui/button';
import { Volume, VolumeX } from 'lucide-react';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { usePuter } from '@/contexts/PuterContext';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();
  
  // Get Puter.js context for AI capabilities
  const { puter, isLoaded, isDbAvailable } = usePuter();
  
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
  
  // Add welcome message on first load
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        content: 'Welcome to your AI tutor! I can help explain concepts and answer your questions. What would you like to learn today?',
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [messages.length]);
  
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
      
      // Check if Puter AI is available
      if (puter?.ai && isLoaded) {
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
          const mockResponse = "I'm sorry, I couldn't process that request with Puter AI. I'll respond with a simulated answer instead.";
          fullResponse = mockResponse;
          
          setMessages(prev =>
            prev.map(msg =>
              msg.id === aiMessageId ? { ...msg, content: mockResponse } : msg
            )
          );
          
          // Show toast notification
          toast({
            title: "Limited AI Functionality",
            description: "The AI service is currently unavailable. Using simulated responses instead.",
            variant: "default"
          });
          
          // Simulate a better response after the error message
          setTimeout(() => {
            const simulatedResponse = generateSimulatedResponse(inputValue.trim());
            setMessages(prev =>
              prev.map(msg =>
                msg.id === aiMessageId ? { 
                  ...msg, 
                  content: mockResponse + "\n\n" + simulatedResponse 
                } : msg
              )
            );
          }, 1000);
        }
      } else {
        // Provide a more informative message when Puter.js is not available
        const serviceInfo = !isLoaded ? 
          "The AI service is still initializing." : 
          "The AI service is currently unavailable.";
          
        toast({
          title: "Using simulated AI",
          description: serviceInfo + " Using simulated responses instead.",
          variant: "default"
        });
        
        // Simulate streaming response if Puter.js is not available
        const simulatedResponse = generateSimulatedResponse(inputValue.trim());
        
        // Split the response into chunks to simulate streaming
        const chunks = simulatedResponse.split(' ');
        
        for (let i = 0; i < chunks.length; i++) {
          const word = chunks[i] + ' ';
          fullResponse += word;
          
          // Update message with streaming content
          setMessages(prev =>
            prev.map(msg =>
              msg.id === aiMessageId ? { ...msg, content: fullResponse } : msg
            )
          );
          
          // Speak the word if voice is enabled
          if (isVoiceEnabled && word.trim()) {
            await speak(word);
          }
          
          // Simulate streaming delay
          await new Promise(resolve => setTimeout(resolve, 50));
        }
      }
    } catch (error) {
      console.error('Error processing message:', error);
      
      // Add an error message
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        sender: 'ai',
        content: "I'm sorry, I encountered an error while processing your message. Please try again later.",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Generate a simulated response based on the input
  const generateSimulatedResponse = (input: string) => {
    // Simplified local keyword matching for simulated responses
    if (input.toLowerCase().includes('eigenvalue')) {
      return "Eigenvalues are special scalars associated with linear systems of equations. When we have a matrix A and a vector v, if Av = λv for some scalar λ, then λ is an eigenvalue and v is an eigenvector. This means the vector v is only scaled by λ when multiplied by A, not changing its direction. Eigenvalues are crucial in many applications including principal component analysis, quantum mechanics, and stability analysis.";
    } else if (input.toLowerCase().includes('linear algebra')) {
      return "Linear algebra is a branch of mathematics that deals with vector spaces, linear mappings between those spaces, and systems of linear equations. It's fundamental to many fields including computer graphics, machine learning, quantum mechanics, and engineering. Key concepts include matrices, determinants, eigenvalues, and vector spaces.";
    } else if (input.toLowerCase().includes('calculus')) {
      return "Calculus is the mathematical study of continuous change. The two major branches are differential calculus (concerning rates of change and slopes of curves) and integral calculus (concerning accumulation of quantities and the areas under curves). These concepts are related by the fundamental theorem of calculus. Calculus has widespread applications in science, economics, and engineering.";
    } else if (input.toLowerCase().includes('matrix')) {
      return "A matrix is a rectangular array of numbers, symbols, or expressions arranged in rows and columns. Matrices are used to represent linear transformations, solve systems of linear equations, and work with graph data structures. Matrix operations include addition, multiplication, finding determinants, inverses, and eigenvalues. They're essential tools in linear algebra with applications across many fields.";
    } else {
      return "That's an interesting question! In an educational setting, I would normally provide a detailed explanation based on mathematical principles and connect it to practical applications. I encourage you to be specific with your questions so I can give you the most helpful response. What particular concept or problem would you like me to help you understand?";
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
      
      {/* Status indicator for Puter services */}
      {!isLoaded && (
        <div className="text-xs text-center py-1 bg-amber-50 text-amber-700 border-t border-amber-200">
          AI services are initializing...
        </div>
      )}
    </div>
  );
};
