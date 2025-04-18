import React from 'react';
import NavBar from '@/components/NavBar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Upload, 
  MessageSquare,
  Send
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';

const ModuleViewPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar />
      
      <div className="container mx-auto px-4 py-6 flex-1">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Calculus I</h1>
              <p className="text-gray-600">University of Oxford, Mathematics</p>
            </div>
            <Button>
              <BookOpen className="mr-2 h-4 w-4" />
              Enter Virtual Class
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6 w-full sm:w-auto flex flex-wrap">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="materials">Uploaded Materials</TabsTrigger>
            <TabsTrigger value="practice">Practice Questions</TabsTrigger>
            <TabsTrigger value="past-papers">Past Papers</TabsTrigger>
            <TabsTrigger value="ai-tutor">Ask AI Tutor</TabsTrigger>
            <TabsTrigger value="mock-test">Create Mock Test</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
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
          </TabsContent>
          
          <TabsContent value="materials">
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold">Module Materials</h3>
                  <Button>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload New Material
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: 'Introduction to Calculus.pdf', type: 'Slide', date: '2023-10-15' },
                    { name: 'Limits and Continuity.pdf', type: 'Note', date: '2023-10-18' },
                    { name: 'Derivative Rules.pdf', type: 'Slide', date: '2023-10-22' },
                    { name: 'Applications of Derivatives.pdf', type: 'Note', date: '2023-10-29' },
                    { name: 'Integration Techniques.pdf', type: 'Slide', date: '2023-11-05' },
                    { name: 'Applications of Integration.pdf', type: 'Note', date: '2023-11-12' },
                  ].map((item) => (
                    <div 
                      key={item.name}
                      className="bg-white border rounded-lg p-4 hover:shadow-md transition cursor-pointer"
                    >
                      <div className="flex gap-3 items-start">
                        <FileText className="h-8 w-8 text-gradpath-purple shrink-0" />
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <div className="flex items-center mt-2 text-sm text-gray-500 gap-3">
                            <span className="px-2 py-0.5 bg-gray-100 rounded">
                              {item.type}
                            </span>
                            <span>
                              {new Date(item.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="practice">
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
          </TabsContent>
          
          <TabsContent value="past-papers">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-6">Past Papers</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { year: '2023', term: 'Spring', solved: true },
                    { year: '2022', term: 'Fall', solved: true },
                    { year: '2022', term: 'Spring', solved: false },
                    { year: '2021', term: 'Fall', solved: false },
                  ].map((item) => (
                    <div 
                      key={`${item.year}-${item.term}`}
                      className="bg-white border rounded-lg p-5 hover:shadow-md transition"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-lg">Calculus I - {item.term} {item.year}</h4>
                          <p className="text-gray-500 mt-1">University of Oxford</p>
                          {item.solved && (
                            <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded text-xs mt-2">
                              Solutions Available
                            </span>
                          )}
                        </div>
                        <Button variant="outline">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="ai-tutor" className="h-[70vh]">
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
          </TabsContent>
          
          <TabsContent value="mock-test">
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ModuleViewPage;
