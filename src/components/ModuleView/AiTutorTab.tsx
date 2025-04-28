import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Send, MessageSquare, BookOpen } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const recentModules = [
  { name: 'Calculus I', progress: 65, lastAccessed: '2 days ago' },
  { name: 'Linear Algebra', progress: 45, lastAccessed: '1 week ago' },
  { name: 'Statistics', progress: 30, lastAccessed: '3 days ago' },
];

const AiTutorTab = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="space-y-8">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center border border-gray-100 dark:border-gray-700 hover:scale-[1.02] cursor-pointer">
            <div className="p-3 rounded-full bg-gradpath-purple transition-transform group-hover:scale-110">
              <MessageSquare className="h-10 w-10 text-white" strokeWidth={2.5} />
            </div>
            <h3 className="font-semibold text-lg mt-4 text-gray-800 dark:text-gray-200">Ask AI Tutor</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">Get instant help with your questions</p>
          </div>
        </DialogTrigger>

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
              <Textarea 
                placeholder="Type your question here..."
                className="min-h-[80px]"
              />
              <Button className="self-end">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-gradpath-purple" />
          <h3 className="text-lg font-semibold">Recent Modules</h3>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {recentModules.map((module) => (
            <Card key={module.name} className="hover:shadow-md transition-shadow duration-200">
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
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AiTutorTab;
