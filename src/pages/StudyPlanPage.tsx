
import React, { useState } from 'react';
import NavBar from '@/components/navbar/index';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const subjects = [
  { id: 'calculus', name: 'Calculus', progress: 65, color: 'bg-blue-500' },
  { id: 'linear-algebra', name: 'Linear Algebra', progress: 40, color: 'bg-green-500' },
  { id: 'statistics', name: 'Statistics', progress: 25, color: 'bg-amber-500' },
  { id: 'physics', name: 'Physics', progress: 80, color: 'bg-purple-500' },
];

const StudyPlanPage: React.FC = () => {
  const isMobile = useIsMobile();
  const [currentWeek, setCurrentWeek] = useState(1);
  const [showAIModal, setShowAIModal] = useState(false);
  
  const handlePrevWeek = () => setCurrentWeek(prev => Math.max(prev - 1, 1));
  const handleNextWeek = () => setCurrentWeek(prev => Math.min(prev + 1, 4));

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Study Plan</h1>
          <Button onClick={() => setShowAIModal(true)}>
            <MessageSquare className="mr-2 h-4 w-4" />
            Ask AI to Plan
          </Button>
        </div>
        
        {isMobile ? (
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <Button variant="outline" size="sm" onClick={handlePrevWeek} disabled={currentWeek === 1}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <h2 className="text-lg font-semibold">Week {currentWeek}</h2>
                  <Button variant="outline" size="sm" onClick={handleNextWeek} disabled={currentWeek === 4}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                    <Card key={day}>
                      <CardContent className="p-4">
                        <h3 className="font-medium mb-2">{day}</h3>
                        <div className="space-y-2">
                          {Math.random() > 0.3 ? (
                            <>
                              <div className="p-2 bg-blue-100 rounded text-sm">
                                <span className="font-medium">Calculus</span>: Derivatives (2 hours)
                              </div>
                              {Math.random() > 0.5 && (
                                <div className="p-2 bg-green-100 rounded text-sm">
                                  <span className="font-medium">Linear Algebra</span>: Matrices (1 hour)
                                </div>
                              )}
                            </>
                          ) : (
                            <div className="text-sm text-gray-500">No sessions planned</div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Subject Progress</h2>
                <div className="space-y-4">
                  {subjects.map((subject) => (
                    <div key={subject.id} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{subject.name}</span>
                        <span>{subject.progress}%</span>
                      </div>
                      <Progress value={subject.progress} className={`h-2 ${subject.color}`} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-1">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Subjects</h2>
                  <div className="space-y-4">
                    {subjects.map((subject) => (
                      <div key={subject.id} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{subject.name}</span>
                          <span>{subject.progress}%</span>
                        </div>
                        <Progress value={subject.progress} className={`h-2 ${subject.color}`} />
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-6 border-t">
                    <h3 className="text-sm font-medium mb-2">Weekly Goals</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                        Complete Calculus Chapter 3
                      </li>
                      <li className="flex items-center">
                        <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                        Finish Linear Algebra Homework
                      </li>
                      <li className="flex items-center">
                        <span className="h-2 w-2 rounded-full bg-amber-500 mr-2"></span>
                        Start Statistics Project
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="col-span-2">
              <Tabs defaultValue="calendar">
                <TabsList className="mb-4">
                  <TabsTrigger value="calendar">Calendar View</TabsTrigger>
                  <TabsTrigger value="list">List View</TabsTrigger>
                </TabsList>
                
                <TabsContent value="calendar">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <Button variant="outline" size="sm" onClick={handlePrevWeek} disabled={currentWeek === 1}>
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <h2 className="text-lg font-semibold">Week {currentWeek}</h2>
                        <Button variant="outline" size="sm" onClick={handleNextWeek} disabled={currentWeek === 4}>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-7 gap-2">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                          <div key={day} className="text-center font-medium">{day}</div>
                        ))}
                        
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                          <Card key={index} className="min-h-[180px]">
                            <CardContent className="p-2 text-sm">
                              {Math.random() > 0.3 ? (
                                <>
                                  <div className="p-2 bg-blue-100 rounded mb-2">
                                    <span className="font-medium">Calculus</span>
                                    <br />Derivatives (2h)
                                  </div>
                                  {Math.random() > 0.5 && (
                                    <div className="p-2 bg-green-100 rounded">
                                      <span className="font-medium">Linear Algebra</span>
                                      <br />Matrices (1h)
                                    </div>
                                  )}
                                </>
                              ) : (
                                <div className="h-full flex items-center justify-center text-gray-400">
                                  Free day
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="list">
                  <Card>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                          <div key={day} className="border-b pb-4 last:border-0">
                            <h3 className="font-medium mb-2">{day}</h3>
                            <div className="space-y-2">
                              {Math.random() > 0.3 ? (
                                <>
                                  <div className="p-3 bg-blue-100 rounded">
                                    <div className="flex justify-between">
                                      <span className="font-medium">Calculus</span>
                                      <span>2 hours</span>
                                    </div>
                                    <p className="text-sm mt-1">Derivatives: Complete exercises 1-15</p>
                                  </div>
                                  {Math.random() > 0.5 && (
                                    <div className="p-3 bg-green-100 rounded">
                                      <div className="flex justify-between">
                                        <span className="font-medium">Linear Algebra</span>
                                        <span>1 hour</span>
                                      </div>
                                      <p className="text-sm mt-1">Matrix operations: Review chapter 3</p>
                                    </div>
                                  )}
                                </>
                              ) : (
                                <div className="text-gray-500">No sessions planned</div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )}
        
        {showAIModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Generate AI Study Plan</h2>
                <p className="mb-4">Tell the AI about your goals and available time:</p>
                <textarea 
                  className="w-full border rounded-md p-3 mb-4 h-32" 
                  placeholder="Example: I have 3 weeks to prepare for my calculus and physics exams. I can study about 2 hours on weekdays and 4 hours on weekends."
                />
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowAIModal(false)}>Cancel</Button>
                  <Button onClick={() => setShowAIModal(false)}>Generate Plan</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyPlanPage;
