
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Send, MessageSquare, BarChart2, ChevronRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Link, useNavigate } from 'react-router-dom';
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
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  
  const handleOpenFullTutor = () => {
    navigate('/ai-tutor');
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, this would send to the backend
      // For now, just redirect to full AI tutor
      navigate('/ai-tutor', { state: { initialMessage: message } });
    }
  };
  
  return <div className="space-y-4">
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg flex items-center">
              <MessageSquare className="mr-2 h-5 w-5" /> 
              AI Tutor
            </h3>
            <Button onClick={handleOpenFullTutor}>Open Full Tutor</Button>
          </div>
          
          <p className="text-gray-600 mb-4">
            Ask a question about this module or get personalized help with concepts you're struggling with.
          </p>
          
          <div className="flex gap-3 mb-6">
            <Textarea 
              placeholder="What would you like to learn about today?"
              className="min-h-[80px] resize-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button className="self-end" onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Suggested questions:</h4>
            <div className="flex flex-wrap gap-2">
              {[
                "What are derivatives?",
                "Explain integration",
                "Help with vectors",
                "Mean vs median"
              ].map((question, idx) => (
                <Button 
                  key={idx} 
                  variant="outline" 
                  size="sm"
                  className="text-sm"
                  onClick={() => {
                    setMessage(question);
                  }}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <h3 className="font-semibold text-lg flex items-center mt-6">
        <BarChart2 className="mr-2 h-5 w-5" /> 
        Recent Modules
      </h3>
      <div className="grid grid-cols-1 gap-4">
        {recentModules.map(module => (
          <Link to={`/module/${module.name.toLowerCase().replace(/\s+/g, '-')}`} key={module.name}>
            <Card className="hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">{module.name}</h4>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">{module.progress}%</span>
                  </div>
                  <Progress value={module.progress} className="h-2" />
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  Last accessed: {module.lastAccessed}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>;
};

export default AiTutorTab;
