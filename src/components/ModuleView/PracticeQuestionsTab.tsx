
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const PracticeQuestionsTab = () => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-lg font-semibold mb-6">Practice Questions</h3>
        
        <div className="space-y-6">
          {[
            { 
              topic: 'Limits and Continuity', 
              description: 'Practice calculating limits and understanding continuity', 
              questions: 15,
              progress: 100
            },
            { 
              topic: 'Derivatives', 
              description: 'Apply different derivative rules and techniques', 
              questions: 20,
              progress: 75
            },
            { 
              topic: 'Applications of Derivatives', 
              description: 'Practice using derivatives to solve optimization problems', 
              questions: 12,
              progress: 50
            },
            { 
              topic: 'Integration', 
              description: 'Calculate antiderivatives and definite integrals', 
              questions: 18,
              progress: 0
            },
            { 
              topic: 'Applications of Integration', 
              description: 'Use integration to find areas and volumes', 
              questions: 15,
              progress: 0
            },
          ].map((item) => (
            <div 
              key={item.topic}
              className="bg-white border rounded-lg p-5 hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-lg">{item.topic}</h4>
                  <p className="text-gray-500 mt-1">{item.description}</p>
                  <p className="text-sm mt-2">{item.questions} questions</p>
                </div>
                <Button>
                  {item.progress === 0 ? 'Start' : 'Continue'}
                </Button>
              </div>
              {item.progress > 0 && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{item.progress}%</span>
                  </div>
                  <Progress value={item.progress} className="h-2" />
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PracticeQuestionsTab;
