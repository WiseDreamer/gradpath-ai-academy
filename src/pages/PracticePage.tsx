
import React, { useState } from 'react';
import NavBar from '@/components/navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ArrowRight, Check, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const practiceTopics = [
  { 
    id: 'limits',
    topic: 'Limits and Continuity', 
    description: 'Practice calculating limits and understanding continuity', 
    questions: 15,
    progress: 100
  },
  { 
    id: 'derivatives',
    topic: 'Derivatives', 
    description: 'Apply different derivative rules and techniques', 
    questions: 20,
    progress: 75
  },
  { 
    id: 'applications',
    topic: 'Applications of Derivatives', 
    description: 'Practice using derivatives to solve optimization problems', 
    questions: 12,
    progress: 50
  },
  { 
    id: 'integration',
    topic: 'Integration', 
    description: 'Calculate antiderivatives and definite integrals', 
    questions: 18,
    progress: 0
  },
  { 
    id: 'applications-int',
    topic: 'Applications of Integration', 
    description: 'Use integration to find areas and volumes', 
    questions: 15,
    progress: 0
  }
];

const sampleQuestions = [
  {
    id: 1,
    question: 'If f(x) = 3x² - 2x + 1, what is f\'(x)?',
    options: ['6x - 2', '6x + 2', '3x - 2', '6x² - 2'],
    correctAnswer: '6x - 2',
    type: 'multiple-choice'
  },
  {
    id: 2,
    question: 'Evaluate the limit: lim (x→0) (sin x)/x',
    options: ['0', '1', 'Does not exist', 'Infinity'],
    correctAnswer: '1',
    type: 'multiple-choice'
  },
  {
    id: 3,
    question: 'The derivative of ln(x) is _____.',
    answer: '1/x',
    type: 'fill-blank'
  },
  {
    id: 4,
    question: 'True or False: The derivative of a constant function is always zero.',
    options: ['True', 'False'],
    correctAnswer: 'True',
    type: 'true-false'
  },
  {
    id: 5,
    question: 'Find the derivative of f(x) = e^(3x).',
    options: ['e^(3x)', '3e^(3x)', 'e^x', '3e^x'],
    correctAnswer: '3e^(3x)',
    type: 'multiple-choice'
  }
];

const PracticePage: React.FC = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState('topics');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  
  const handleStartPractice = (topicId: string) => {
    setSelectedTopic(topicId);
    setActiveTab('practice');
    setCurrentQuestion(0);
    setAnsweredQuestions([]);
  };
  
  const handleSubmitAnswer = () => {
    const question = sampleQuestions[currentQuestion];
    if (
      (question.type === 'multiple-choice' || question.type === 'true-false') && 
      selectedAnswer === question.correctAnswer
    ) {
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }
    
    setAnsweredQuestions([...answeredQuestions, currentQuestion]);
  };
  
  const handleNextQuestion = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
      setFeedback(null);
    }
  };
  
  const renderQuestionContent = () => {
    const question = sampleQuestions[currentQuestion];
    
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-medium">{question.question}</h3>
        
        {question.type === 'fill-blank' ? (
          <div>
            <input 
              type="text"
              className="w-full p-2 border rounded-md"
              placeholder="Your answer"
              value={selectedAnswer}
              onChange={(e) => setSelectedAnswer(e.target.value)}
            />
          </div>
        ) : (
          <div className="space-y-3">
            {question.options?.map((option) => (
              <div 
                key={option}
                className={`p-3 border rounded-md cursor-pointer ${
                  selectedAnswer === option ? 'border-gradpath-purple bg-gradpath-purple/10' : ''
                }`}
                onClick={() => setSelectedAnswer(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
        
        {feedback === 'correct' && (
          <div className="p-4 bg-green-100 border border-green-300 rounded-md flex items-center">
            <Check className="h-5 w-5 text-green-600 mr-2" />
            <span>Correct! Well done.</span>
          </div>
        )}
        
        {feedback === 'incorrect' && (
          <div className="p-4 bg-red-100 border border-red-300 rounded-md flex items-center">
            <X className="h-5 w-5 text-red-600 mr-2" />
            <span>Incorrect. The right answer is {
              question.type === 'fill-blank' ? question.answer : question.correctAnswer
            }.</span>
          </div>
        )}
        
        <div className="flex justify-between">
          {feedback === null ? (
            <Button onClick={handleSubmitAnswer}>Submit Answer</Button>
          ) : (
            <Button onClick={handleNextQuestion} disabled={currentQuestion === sampleQuestions.length - 1}>
              Next Question <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Practice Questions</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="topics">Topics</TabsTrigger>
            {selectedTopic && <TabsTrigger value="practice">Practice</TabsTrigger>}
          </TabsList>
          
          <TabsContent value="topics">
            <div className="space-y-6">
              {practiceTopics.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-lg">{item.topic}</h4>
                        <p className="text-gray-500 mt-1">{item.description}</p>
                        <p className="text-sm mt-2">{item.questions} questions</p>
                      </div>
                      <Button onClick={() => handleStartPractice(item.id)}>
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
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="practice">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {!isMobile && (
                <div className="col-span-1">
                  <Card>
                    <CardContent className="p-5">
                      <h3 className="font-medium text-lg mb-4">Questions</h3>
                      <div className="flex flex-wrap gap-2">
                        {sampleQuestions.map((_, index) => (
                          <div 
                            key={index}
                            className={`h-8 w-8 rounded-full flex items-center justify-center cursor-pointer border ${
                              answeredQuestions.includes(index)
                                ? 'bg-gradpath-purple text-white border-gradpath-purple'
                                : currentQuestion === index
                                ? 'border-gradpath-purple bg-gradpath-purple/10'
                                : 'border-gray-300'
                            }`}
                            onClick={() => {
                              setCurrentQuestion(index);
                              setSelectedAnswer('');
                              setFeedback(null);
                            }}
                          >
                            {index + 1}
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-8">
                        <Button variant="outline" className="w-full" onClick={() => setActiveTab('topics')}>
                          Back to Topics
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
              
              <div className={`${isMobile ? 'col-span-1' : 'col-span-2'}`}>
                <Card>
                  <CardContent className="p-5">
                    {isMobile && (
                      <div className="mb-4 text-center">
                        <span className="text-sm text-gray-500">
                          Question {currentQuestion + 1} of {sampleQuestions.length}
                        </span>
                        <Progress 
                          value={(currentQuestion + 1) / sampleQuestions.length * 100} 
                          className="h-1 mt-2" 
                        />
                      </div>
                    )}
                    
                    {renderQuestionContent()}
                    
                    {isMobile && (
                      <Button 
                        variant="outline" 
                        className="w-full mt-6" 
                        onClick={() => setActiveTab('topics')}
                      >
                        Back to Topics
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PracticePage;
