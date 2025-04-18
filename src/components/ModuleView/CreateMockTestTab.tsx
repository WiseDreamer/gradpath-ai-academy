
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const CreateMockTestTab = () => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-lg font-semibold mb-6">Create Mock Test</h3>
        
        <div className="max-w-3xl">
          <div className="bg-gradpath-soft-green p-6 rounded-lg mb-6">
            <h4 className="font-medium text-lg mb-2">Generate a Personalized Mock Test</h4>
            <p className="text-gray-600">
              Our AI will create a customized test based on your progress, focusing on areas 
              where you need more practice. You can specify the topics, difficulty level, and time limit.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group">
              <label className="text-sm font-medium">Select Topics</label>
              <div className="space-y-2 mt-2">
                {['Limits and Continuity', 'Derivatives', 'Applications of Derivatives', 'Integration', 'Applications of Integration'].map((topic) => (
                  <div key={topic} className="flex items-center">
                    <input 
                      type="checkbox" 
                      id={topic} 
                      className="rounded text-gradpath-purple mr-2"
                    />
                    <label htmlFor={topic}>{topic}</label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="form-group">
                <label className="text-sm font-medium">Difficulty Level</label>
                <select className="w-full p-2 border rounded-md">
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                  <option>Mixed</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="text-sm font-medium">Number of Questions</label>
                <select className="w-full p-2 border rounded-md">
                  <option>5</option>
                  <option>10</option>
                  <option>15</option>
                  <option>20</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="text-sm font-medium">Time Limit</label>
                <select className="w-full p-2 border rounded-md">
                  <option>30 minutes</option>
                  <option>1 hour</option>
                  <option>1.5 hours</option>
                  <option>No limit</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button className="px-6">
              Generate Mock Test
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreateMockTestTab;
