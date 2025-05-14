import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useIsMobile } from '@/hooks/use-mobile';
import NavBar from '@/components/navbar';

// Mock data for performance charts
const performanceData = [
  { module: 'Calculus', score: 85, average: 70, month: 'Jan' },
  { module: 'Linear Algebra', score: 72, average: 68, month: 'Feb' },
  { module: 'Statistics', score: 60, average: 65, month: 'Mar' },
  { module: 'Physics', score: 78, average: 75, month: 'Apr' },
  { module: 'Chemistry', score: 92, average: 80, month: 'May' },
];

const timeData = [
  { name: 'Week 1', hours: 12 },
  { name: 'Week 2', hours: 15 },
  { name: 'Week 3', hours: 10 },
  { name: 'Week 4', hours: 18 },
  { name: 'Week 5', hours: 14 },
  { name: 'Week 6', hours: 20 },
];

const weakModules = [
  { name: 'Statistics', score: 60, percentile: 45, recommendations: ['Review probability concepts', 'Practice hypothesis testing'] },
  { name: 'Linear Algebra', score: 72, percentile: 60, recommendations: ['Focus on matrix operations', 'Review eigenvalues'] },
];

const strengths = [
  { name: 'Chemistry', score: 92, percentile: 90, feedback: 'Excellent understanding of core concepts' },
  { name: 'Calculus', score: 85, percentile: 80, feedback: 'Strong grasp of derivatives and integrals' },
];

const PerformancePage: React.FC = () => {
  const [timeRange, setTimeRange] = useState('semester');
  const [moduleFilter, setModuleFilter] = useState('all');
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <NavBar />
      
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Performance Dashboard</h1>
          
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <Label htmlFor="time-range">Time Range</Label>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger id="time-range" className="w-full">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Past Week</SelectItem>
                  <SelectItem value="month">Past Month</SelectItem>
                  <SelectItem value="semester">Current Semester</SelectItem>
                  <SelectItem value="year">Past Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="module-filter">Module</Label>
              <Select value={moduleFilter} onValueChange={setModuleFilter}>
                <SelectTrigger id="module-filter" className="w-full">
                  <SelectValue placeholder="Select module" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Modules</SelectItem>
                  <SelectItem value="calculus">Calculus</SelectItem>
                  <SelectItem value="linear-algebra">Linear Algebra</SelectItem>
                  <SelectItem value="statistics">Statistics</SelectItem>
                  <SelectItem value="physics">Physics</SelectItem>
                  <SelectItem value="chemistry">Chemistry</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Tabs for different chart views */}
          <Tabs defaultValue="scores" className="mb-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="scores">Module Scores</TabsTrigger>
              <TabsTrigger value="time">Study Time</TabsTrigger>
            </TabsList>
            
            <TabsContent value="scores">
              <Card>
                <CardHeader>
                  <CardTitle>Module Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`w-full ${isMobile ? 'h-[300px]' : 'h-[400px]'}`}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={performanceData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="module" angle={-45} textAnchor="end" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="score" name="Your Score" fill="#4f46e5" />
                        <Bar dataKey="average" name="Class Average" fill="#94a3b8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="time">
              <Card>
                <CardHeader>
                  <CardTitle>Study Time Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`w-full ${isMobile ? 'h-[300px]' : 'h-[400px]'}`}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={timeData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="hours" name="Study Hours" stroke="#4f46e5" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          {/* Areas for Improvement Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Areas for Improvement</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[250px]">
                  {weakModules.map((module, i) => (
                    <div key={i} className="mb-6 border-b pb-4 last:border-0">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-semibold text-lg">{module.name}</h3>
                        <span className="text-amber-600 font-medium">
                          Score: {module.score}/100
                        </span>
                      </div>
                      
                      <div className="space-y-3">
                        <p className="text-sm text-gray-500">
                          You're in the {module.percentile}th percentile for this module.
                        </p>
                        
                        <div>
                          <p className="text-sm font-medium mb-1">Recommendations:</p>
                          <ul className="list-disc pl-5 space-y-1">
                            {module.recommendations.map((rec, j) => (
                              <li key={j} className="text-sm text-gray-600">{rec}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <Button variant="outline" size="sm" className="w-full mt-2">
                          Start Focused Practice
                        </Button>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Your Strengths</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[250px]">
                  {strengths.map((module, i) => (
                    <div key={i} className="mb-6 border-b pb-4 last:border-0">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-semibold text-lg">{module.name}</h3>
                        <span className="text-green-600 font-medium">
                          Score: {module.score}/100
                        </span>
                      </div>
                      
                      <div className="space-y-3">
                        <p className="text-sm text-gray-500">
                          You're in the {module.percentile}th percentile for this module.
                        </p>
                        
                        <div>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Feedback: </span>
                            {module.feedback}
                          </p>
                        </div>
                        
                        <Button variant="outline" size="sm" className="w-full mt-2">
                          Help Others in This Subject
                        </Button>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
          
          {/* Recent Performance Table */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Recent Assessments</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Module</TableHead>
                    <TableHead>Assessment</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Percentile</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Calculus</TableCell>
                    <TableCell>Integration Quiz</TableCell>
                    <TableCell>May 1, 2025</TableCell>
                    <TableCell>85/100</TableCell>
                    <TableCell>80%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Linear Algebra</TableCell>
                    <TableCell>Midterm Exam</TableCell>
                    <TableCell>Apr 25, 2025</TableCell>
                    <TableCell>72/100</TableCell>
                    <TableCell>60%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Statistics</TableCell>
                    <TableCell>Probability Test</TableCell>
                    <TableCell>Apr 18, 2025</TableCell>
                    <TableCell>60/100</TableCell>
                    <TableCell>45%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Chemistry</TableCell>
                    <TableCell>Organic Chemistry Quiz</TableCell>
                    <TableCell>Apr 10, 2025</TableCell>
                    <TableCell>92/100</TableCell>
                    <TableCell>90%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PerformancePage;
