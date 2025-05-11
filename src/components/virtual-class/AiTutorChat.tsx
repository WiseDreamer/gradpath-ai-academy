
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mic, MicOff, Send } from 'lucide-react';
import { usePuterAiTutor } from '@/services/puterAiTutorService';
import { useToast } from '@/hooks/use-toast';

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
  const [isListening, setIsListening] = useState(false);
  const { askQuestion, speak, isProcessing, isSpeaking, isLoaded } = usePuterAiTutor();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Speech recognition setup
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  
  useEffect(() => {
    // Fixed: Use type assertions to properly access the SpeechRecognition API
    const SpeechRecognitionAPI = (window as any).SpeechRecognition || 
                                (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognitionAPI) {
      const recognitionInstance = new SpeechRecognitionAPI();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      
      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
      };
      
      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        
        toast({
          title: "Voice input error",
          description: `Couldn't recognize speech: ${event.error}`,
          variant: "destructive"
        });
      };
      
      recognitionInstance.onend = () => {
        setIsListening(false);
      };
      
      setRecognition(recognitionInstance);
    }
  }, [toast]);
  
  const toggleListening = () => {
    if (!recognition) {
      toast({
        title: "Speech Recognition Unavailable",
        description: "Your browser doesn't support speech recognition.",
        variant: "destructive"
      });
      return;
    }
    
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  };
  
  // Scroll to bottom of chat when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
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
        // Skip null or undefined parts
        if (part === null || part === undefined) continue;
        
        // Fixed: Add explicit null check before accessing properties
        // Extract text from streaming response with proper type checking
        const textPart = part !== null && typeof part === 'object' && 'text' in part 
          ? part.text 
          : '';
        
        // Fixed: Add another explicit null check
        // Make sure textPart is converted to string
        const text = textPart !== null && typeof textPart === 'string' ? textPart : '';
        
        fullResponse += text;
        
        // Update AI message with new content
        setMessages(prev => 
          prev.map(msg => 
            msg.id === aiMessageId 
              ? { ...msg, content: fullResponse } 
              : msg
          )
        );
        
        // Speak the response chunk if voice is enabled
        if (isVoiceEnabled && text.trim()) {
          await speak(text);
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
  
  return (
    <div className="flex flex-col h-full">
      {/* Chat messages */}
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
      
      {/* Suggested questions */}
      <div className="px-4 py-2 border-t border-gray-200">
        <p className="text-xs text-gray-500 mb-2">Suggested Questions:</p>
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((question, i) => (
            <Button
              key={i}
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => setInputValue(question)}
            >
              {question}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Input form */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            size="icon"
            variant={isListening ? "secondary" : "outline"}
            onClick={toggleListening}
            disabled={!recognition}
            className="flex-shrink-0"
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
          
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask the AI tutor..."
            disabled={isProcessing || isListening}
            className="flex-1"
          />
          
          <Button 
            type="submit" 
            size="icon" 
            disabled={!inputValue.trim() || isProcessing || !isLoaded}
            className="flex-shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

