
import React, { useState } from 'react';
import NavBar from '@/components/navbar';
import { useIsMobile } from '@/hooks/use-mobile';
import BottomNav from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Avatar } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from '@/components/ui/drawer';

// Mock data for available helpers
const MOCK_HELPERS = [
  { id: 1, name: 'Emma Watson', avatar: null, rating: 4.9, expertise: 'Machine Learning', status: 'available' },
  { id: 2, name: 'John Doe', avatar: null, rating: 4.7, expertise: 'Data Structures', status: 'available' },
  { id: 3, name: 'Sarah Johnson', avatar: null, rating: 4.8, expertise: 'Algorithms', status: 'available' },
  { id: 4, name: 'Michael Brown', avatar: null, rating: 4.5, expertise: 'Database Systems', status: 'busy' },
  { id: 5, name: 'Alex Chen', avatar: null, rating: 4.6, expertise: 'Web Development', status: 'available' },
];

// Mock modules data
const MOCK_MODULES = [
  { id: 1, name: 'Introduction to Computer Science' },
  { id: 2, name: 'Data Structures and Algorithms' },
  { id: 3, name: 'Machine Learning Fundamentals' },
  { id: 4, name: 'Database Systems' },
  { id: 5, name: 'Web Development' },
];

const HelpRequestPage: React.FC = () => {
  const isMobile = useIsMobile();
  const [step, setStep] = useState<number>(1);
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const [showMatching, setShowMatching] = useState<boolean>(false);
  const [matchedHelper, setMatchedHelper] = useState<typeof MOCK_HELPERS[0] | null>(null);
  const [matchProgress, setMatchProgress] = useState<number>(0);

  // Mock chapters for the selected module
  const moduleChapters = [
    'Introduction to the Topic',
    'Basic Concepts',
    'Advanced Techniques',
    'Practical Applications',
    'Case Studies'
  ];

  const handleRequestHelp = () => {
    setShowMatching(true);
    
    // Simulate matching progress
    const interval = setInterval(() => {
      setMatchProgress(prev => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          // After 100%, simulate finding a match
          setTimeout(() => {
            setMatchedHelper(MOCK_HELPERS[0]);
          }, 500);
        }
        return newProgress;
      });
    }, 300);
  };

  const handleStartSession = () => {
    // In a real app, this would start the session with the matched helper
    setShowMatching(false);
    setMatchedHelper(null);
    setStep(1);
    // Would navigate to a chat/voice session page
  };

  const renderHelpRequestWizard = () => {
    if (step === 1) {
      return (
        <div>
          <h2 className="text-lg font-bold mb-4">Step 1: Select a Module</h2>
          <div className="grid gap-2">
            {MOCK_MODULES.map(module => (
              <Button
                key={module.id}
                variant={selectedModule === module.id ? "default" : "outline"}
                className="justify-start h-auto py-3"
                onClick={() => setSelectedModule(module.id)}
              >
                {module.name}
              </Button>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <Button
              disabled={!selectedModule}
              onClick={() => setStep(2)}
            >
              Next
            </Button>
          </div>
        </div>
      );
    } else if (step === 2) {
      return (
        <div>
          <h2 className="text-lg font-bold mb-4">Step 2: Select a Chapter</h2>
          <div className="grid gap-2">
            {moduleChapters.map((chapter, index) => (
              <Button
                key={index}
                variant={selectedChapter === chapter ? "default" : "outline"}
                className="justify-start h-auto py-3"
                onClick={() => setSelectedChapter(chapter)}
              >
                {chapter}
              </Button>
            ))}
          </div>
          <div className="mt-6 flex justify-between">
            <Button variant="outline" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button
              disabled={!selectedChapter}
              onClick={() => setStep(3)}
            >
              Next
            </Button>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h2 className="text-lg font-bold mb-4">Step 3: Available Helpers</h2>
          <div className="space-y-3">
            {MOCK_HELPERS.filter(helper => helper.status === 'available').map(helper => (
              <Card key={helper.id} className="bg-green-50 border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <div className="bg-gradpath-purple text-white flex items-center justify-center w-full h-full rounded-full">
                        {helper.name.charAt(0)}
                      </div>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold">{helper.name}</h4>
                        <div className="flex items-center">
                          <span className="text-yellow-500 mr-1">★</span>
                          <span className="text-sm">{helper.rating}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600">Expert in {helper.expertise}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-6 flex justify-between">
            <Button variant="outline" onClick={() => setStep(2)}>
              Back
            </Button>
            <Button onClick={handleRequestHelp}>
              Request Help Now
            </Button>
          </div>
        </div>
      );
    }
  };

  const renderDesktopView = () => (
    <div className="grid grid-cols-12 gap-6 mt-6">
      <div className="col-span-4 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-6">Define Your Request</h2>
        
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Select Module</h3>
          <div className="space-y-2">
            {MOCK_MODULES.map(module => (
              <Button
                key={module.id}
                variant={selectedModule === module.id ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => setSelectedModule(module.id)}
              >
                {module.name}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Select Chapter</h3>
          <div className="space-y-2">
            {moduleChapters.map((chapter, index) => (
              <Button
                key={index}
                variant={selectedChapter === chapter ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => setSelectedChapter(chapter)}
                disabled={!selectedModule}
              >
                {chapter}
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="col-span-8 bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Available Helpers</h2>
          <Button 
            disabled={!selectedModule || !selectedChapter} 
            onClick={handleRequestHelp}
            className="bg-gradpath-purple hover:bg-gradpath-purple/90"
          >
            Request Help Now
          </Button>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {MOCK_HELPERS.filter(helper => helper.status === 'available').map(helper => (
            <Card key={helper.id} className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <div className="bg-gradpath-purple text-white flex items-center justify-center w-full h-full rounded-full">
                      {helper.name.charAt(0)}
                    </div>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold">{helper.name}</h4>
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span className="text-sm">{helper.rating}</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600">Expert in {helper.expertise}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <NavBar />
      <div className="container mx-auto px-4 pb-20">
        <h1 className="text-2xl font-bold mt-6">Request Help</h1>
        <p className="text-gray-500 mb-6">Get one-on-one assistance from top achievers</p>
        
        {isMobile ? (
          <div>{renderHelpRequestWizard()}</div>
        ) : (
          renderDesktopView()
        )}
      </div>
      
      {/* Matching Overlay - Desktop */}
      {!isMobile && (
        <Dialog open={showMatching} onOpenChange={setShowMatching}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center">Finding the perfect helper for you</DialogTitle>
              <DialogDescription className="text-center">
                {matchedHelper ? 'Match found!' : 'Searching for available helpers...'}
              </DialogDescription>
            </DialogHeader>
            {!matchedHelper ? (
              <div className="py-6">
                <Progress value={matchProgress} className="mb-4" />
                <div className="text-center text-sm text-gray-500">
                  {matchProgress < 30 ? 'Analyzing your request...' : 
                   matchProgress < 60 ? 'Finding qualified helpers...' : 
                   matchProgress < 90 ? 'Checking availability...' : 
                   'Almost there...'}
                </div>
              </div>
            ) : (
              <div className="py-6">
                <div className="flex flex-col items-center mb-4">
                  <Avatar className="h-20 w-20 mb-2">
                    <div className="bg-gradpath-purple text-white flex items-center justify-center w-full h-full rounded-full text-2xl">
                      {matchedHelper.name.charAt(0)}
                    </div>
                  </Avatar>
                  <h3 className="text-lg font-bold">{matchedHelper.name}</h3>
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span>{matchedHelper.rating}</span>
                  </div>
                  <p className="text-sm text-gray-600">Expert in {matchedHelper.expertise}</p>
                </div>
                <div className="flex justify-center">
                  <Button onClick={handleStartSession}>Start Session</Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}

      {/* Matching Overlay - Mobile */}
      {isMobile && (
        <Drawer open={showMatching} onClose={() => {}}>
          <DrawerContent>
            <DrawerHeader className="text-center">
              <DrawerTitle>{matchedHelper ? 'Match found!' : 'Finding the perfect helper'}</DrawerTitle>
              <DrawerDescription>
                {!matchedHelper && 'This might take a moment'}
              </DrawerDescription>
            </DrawerHeader>
            {!matchedHelper ? (
              <div className="px-4 py-6">
                <Progress value={matchProgress} className="mb-4" />
                <div className="text-center text-sm text-gray-500">
                  {matchProgress < 30 ? 'Analyzing your request...' : 
                   matchProgress < 60 ? 'Finding qualified helpers...' : 
                   matchProgress < 90 ? 'Checking availability...' : 
                   'Almost there...'}
                </div>
              </div>
            ) : (
              <div className="px-4 py-6">
                <div className="flex flex-col items-center mb-4">
                  <Avatar className="h-20 w-20 mb-2">
                    <div className="bg-gradpath-purple text-white flex items-center justify-center w-full h-full rounded-full text-2xl">
                      {matchedHelper.name.charAt(0)}
                    </div>
                  </Avatar>
                  <h3 className="text-lg font-bold">{matchedHelper.name}</h3>
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span>{matchedHelper.rating}</span>
                  </div>
                  <p className="text-sm text-gray-600">Expert in {matchedHelper.expertise}</p>
                </div>
                <DrawerFooter>
                  <Button onClick={handleStartSession}>Start Session Now</Button>
                </DrawerFooter>
              </div>
            )}
          </DrawerContent>
        </Drawer>
      )}
      
      {isMobile && <BottomNav />}
    </div>
  );
};

export default HelpRequestPage;
