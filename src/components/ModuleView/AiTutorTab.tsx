
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';

const AiTutorTab = () => {
  return (
    <Card className="h-full flex flex-col">
      <CardContent className="pt-6 flex-1 flex flex-col h-full">
        <h3 className="text-lg font-semibold mb-4">Ask AI Tutor</h3>
        
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            <div className="bg-gray-100 rounded-lg p-4 max-w-3xl">
              <p className="font-medium text-sm text-gray-500 mb-1">AI Tutor</p>
              <p>Hello! I'm your Calculus I AI tutor. How can I help you today? You can ask me about any concepts, problems, or topics in the course.</p>
            </div>
            
            <div className="bg-gradpath-soft-blue rounded-lg p-4 max-w-3xl ml-auto">
              <p className="font-medium text-sm text-gray-500 mb-1">You</p>
              <p>I'm having trouble understanding the concept of limits. Can you explain what a limit is and how to calculate it?</p>
            </div>
            
            <div className="bg-gray-100 rounded-lg p-4 max-w-3xl">
              <p className="font-medium text-sm text-gray-500 mb-1">AI Tutor</p>
              <p>
                A limit is a fundamental concept in calculus that describes the behavior of a function as its input approaches a particular value.
              </p>
              <p className="mt-2">
                Formally, we write: lim(x→a) f(x) = L
              </p>
              <p className="mt-2">
                This means "as x approaches the value a, the function f(x) approaches the value L."
              </p>
              <p className="mt-2">
                To calculate a limit, you can try:
              </p>
              <ol className="list-decimal pl-5 mt-1 space-y-1">
                <li>Direct substitution (if the function is continuous at that point)</li>
                <li>Factoring (for removable discontinuities)</li>
                <li>Rationalization (for certain limits involving square roots)</li>
                <li>Using special limit rules</li>
              </ol>
              <p className="mt-2">
                Would you like me to walk through some examples?
              </p>
            </div>
          </div>
        </ScrollArea>
        
        <div className="pt-4 mt-4 border-t">
          <div className="flex gap-3">
            <Textarea 
              placeholder="Ask your question here..."
              className="min-h-[80px]"
            />
            <Button className="self-end">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AiTutorTab;
