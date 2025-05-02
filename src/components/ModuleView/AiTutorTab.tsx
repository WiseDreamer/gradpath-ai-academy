
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Send, MessageSquare, BarChart2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import DashboardCard from '@/components/DashboardCard';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const recentModules = [{
  name: 'Calculus I',
  progress: 65,
  lastAccessed: '2 days ago'
}, {
  name: 'Linear Algebra',
  progress: 45,
  lastAccessed: '1 week ago'
}, {
  name: 'Statistics',
  progress: 30,
  lastAccessed: '3 days ago'
}];

const AiTutorTab = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  return <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        {recentModules.map(module => <Card key={module.name} className="hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">{module.name}</h4>
                <span className="text-sm text-gray-500">{module.lastAccessed}</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium">{module.progress}%</span>
                </div>
                <Progress value={module.progress} className="h-2" />
              </div>
            </CardContent>
          </Card>)}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px] h-[600px] flex flex-col">
          <DialogHeader>
            <DialogTitle>AI Tutor Chat</DialogTitle>
          </DialogHeader>
          
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4">
              <div className="bg-gray-100 rounded-lg p-4 max-w-3xl">
                <p className="font-medium text-sm text-gray-500 mb-1">AI Tutor</p>
                <p>Hello! I'm your AI tutor. How can I help you today?</p>
              </div>
            </div>
          </ScrollArea>
          
          <div className="pt-4 mt-4 border-t">
            <div className="flex gap-3">
              <Textarea placeholder="Type your question here..." className="min-h-[80px]" />
              <Button className="self-end">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>;
};

export default AiTutorTab;
