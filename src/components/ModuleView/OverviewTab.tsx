
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Clock, MessageSquare } from 'lucide-react';

const OverviewTab = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-2">
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">Module Progress</h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Overall Completion</span>
                <span>65%</span>
              </div>
              <Progress value={65} className="h-2" />
            </div>
            
            {[
              { topic: 'Limits and Continuity', progress: 100 },
              { topic: 'Derivatives', progress: 80 },
              { topic: 'Applications of Derivatives', progress: 50 },
              { topic: 'Integration', progress: 30 },
              { topic: 'Applications of Integration', progress: 0 }
            ].map((item) => (
              <div key={item.topic}>
                <div className="flex justify-between mb-2">
                  <span>{item.topic}</span>
                  <span>{item.progress}%</span>
                </div>
                <Progress value={item.progress} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">Module Statistics</h3>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-full">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Completed Topics</p>
                <p className="font-medium">2 of 5</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Study Time</p>
                <p className="font-medium">12 hours</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-full">
                <MessageSquare className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Questions Asked</p>
                <p className="font-medium">24</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t">
            <h4 className="font-medium mb-3">Next Suggested Topic</h4>
            <div className="bg-gradpath-soft-blue p-3 rounded-lg">
              <p className="font-medium">Applications of Derivatives</p>
              <p className="text-sm text-gray-600 mt-1">Continue where you left off</p>
              <Button variant="outline" className="mt-3 w-full">
                Resume Learning
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="md:col-span-3">
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">Module Objectives</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <h4 className="font-medium mb-2">By the end of this module, you will be able to:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Understand the concept of limits and continuity</li>
                <li>Calculate derivatives using various techniques</li>
                <li>Apply derivatives to solve real-world problems</li>
                <li>Understand the concept of integration</li>
                <li>Apply integration to calculate areas and volumes</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Required knowledge:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Basic algebraic operations</li>
                <li>Trigonometric functions</li>
                <li>Exponential and logarithmic functions</li>
                <li>Analytical geometry</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewTab;
