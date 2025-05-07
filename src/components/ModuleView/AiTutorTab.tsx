
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Send, MessageSquare, BarChart2, ChevronRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Link, useNavigate } from 'react-router-dom';

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
  
  return <div className="space-y-4 w-full">
      <div className="grid grid-cols-1 gap-4 w-full">
        {recentModules.map(module => (
          <Link to={`/module/${module.name.toLowerCase().replace(/\s+/g, '-')}`} key={module.name} className="w-full">
            <Card className="hover:shadow-md transition-shadow duration-200 w-full">
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
