
import React from 'react';
import { Button } from '@/components/ui/button';

interface SuggestedQuestionsProps {
  questions: string[];
  onSelectQuestion: (question: string) => void;
}

export const SuggestedQuestions: React.FC<SuggestedQuestionsProps> = ({ 
  questions, 
  onSelectQuestion 
}) => {
  if (questions.length === 0) return null;
  
  return (
    <div className="px-4 py-2 border-t border-gray-200">
      <p className="text-xs text-gray-500 mb-2">Suggested Questions:</p>
      <div className="flex flex-wrap gap-2">
        {questions.map((question, i) => (
          <Button
            key={i}
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={() => onSelectQuestion(question)}
          >
            {question}
          </Button>
        ))}
      </div>
    </div>
  );
};
