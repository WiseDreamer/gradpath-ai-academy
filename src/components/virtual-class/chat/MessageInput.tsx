
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Mic, MicOff } from 'lucide-react';

interface MessageInputProps {
  inputValue: string;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isProcessing: boolean;
  isListening: boolean;
  onToggleListening: () => void;
  isRecognitionSupported: boolean;
  isLoaded: boolean;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  inputValue,
  onInputChange,
  onSubmit,
  isProcessing,
  isListening,
  onToggleListening,
  isRecognitionSupported,
  isLoaded
}) => {
  return (
    <form onSubmit={onSubmit} className="p-3 border-t border-gray-200">
      <div className="flex items-center gap-2">
        <Button
          type="button"
          size="icon"
          variant={isListening ? "secondary" : "outline"}
          onClick={onToggleListening}
          disabled={!isRecognitionSupported}
          className="flex-shrink-0"
        >
          {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
        </Button>
        
        <Input
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
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
  );
};
