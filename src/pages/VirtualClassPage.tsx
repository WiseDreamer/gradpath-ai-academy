
import React, { useState, useCallback, useRef } from 'react';
import NavBar from '@/components/navbar/index';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileNavBar from '@/components/virtual-class/MobileNavBar';
import VirtualClassHeader from '@/components/virtual-class/VirtualClassHeader';
import { VirtualClassSidebar } from '@/components/virtual-class/VirtualClassSidebar';
import { VirtualBoard } from '@/components/virtual-class/VirtualBoard';
import { TutorMessageType } from '@/types/virtualClass';
import { useToast } from '@/hooks/use-toast';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Maximize, Minimize } from 'lucide-react';
import LessonScopeModal, { LessonScopeSettings } from '@/components/virtual-class/LessonScopeModal';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

// Available modules list
const availableModules = [
  "Linear Algebra - Virtual Class",
  "Calculus II",
  "Introduction to Statistics",
  "Discrete Mathematics",
  "Number Theory"
];

const VirtualClassPage: React.FC = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  // Initial messages for the chat
  const initialMessages: TutorMessageType[] = [
    {
      id: '1',
      sender: 'ai',
      content: 'Welcome to the virtual class on Linear Algebra. How can I help you today?',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
    },
    {
      id: '2',
      sender: 'user',
      content: 'Can you explain eigenvalues and eigenvectors?',
      timestamp: new Date(Date.now() - 1000 * 60 * 4),
    },
    {
      id: '3',
      sender: 'ai',
      content: 'Eigenvalues and eigenvectors are special numbers and vectors associated with a square matrix. When we multiply a matrix by an eigenvector, the result is a scaled version of the same vector, and the scaling factor is the eigenvalue.',
      timestamp: new Date(Date.now() - 1000 * 60 * 3),
    },
  ];

  // State for the virtual class settings
  const [currentModule, setCurrentModule] = useState("Linear Algebra - Virtual Class");
  const [institution, setInstitution] = useState("University of Oxford, Mathematics");
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [annotations, setAnnotations] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLessonScopeOpen, setIsLessonScopeOpen] = useState(false);
  const [whiteboardState, setWhiteboardState] = useState<string>('{}');

  const handleChangeModule = (moduleName: string) => {
    setCurrentModule(moduleName);
    toast({
      title: "Module Changed",
      description: `Now attending: ${moduleName}`,
    });
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch(err => {
          toast({
            title: "Fullscreen Error",
            description: `Error attempting to enable fullscreen: ${err.message}`,
            variant: "destructive"
          });
        });
    } else {
      document.exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch(err => {
          toast({
            title: "Fullscreen Error",
            description: `Error attempting to exit fullscreen: ${err.message}`,
            variant: "destructive"
          });
        });
    }
  };

  const handleSaveLessonScope = useCallback((settings: LessonScopeSettings) => {
    // Here you would handle the lesson scope settings
    console.log('Saving lesson scope settings:', settings);
    
    toast({
      title: "Lesson Scope Updated",
      description: `Focusing on ${settings.selectedTopics.length} topics with ${settings.depth} depth.`,
    });
  }, [toast]);

  // Get whiteboard state for AI
  const getWhiteboardState = useCallback(() => {
    return whiteboardState;
  }, [whiteboardState]);

  // Update whiteboard state
  const updateWhiteboardState = useCallback((state: string) => {
    setWhiteboardState(state);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col overflow-x-hidden">
      {isMobile ? (
        <MobileNavBar />
      ) : (
        <NavBar variant="learning" />
      )}

      <div className={`flex flex-col md:flex-row w-full ${isMobile ? 'h-[calc(100vh-64px)]' : 'h-[calc(100vh-64px)]'} overflow-hidden`}>
        {/* Mobile Header */}
        {isMobile && (
          <VirtualClassHeader 
            title={currentModule}
            institution={institution}
            onChangeModule={handleChangeModule}
          />
        )}
        
        {/* Main Content Area */}
        <div className={`w-full md:flex-1 flex flex-col overflow-hidden ${isMobile ? 'h-[calc(100%-80px)]' : ''}`}>
          {/* Control Bar for Desktop with Module Dropdown */}
          {!isMobile && (
            <div className="bg-white border-b border-gray-200 py-2 px-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1 font-medium hover:bg-gray-100 rounded-md px-2 py-1 transition-colors">
                    {currentModule}
                    <ChevronDown className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-64">
                    {availableModules.map((module) => (
                      <DropdownMenuItem 
                        key={module}
                        onClick={() => handleChangeModule(module)}
                        className={`${currentModule === module ? 'bg-gray-100 font-medium' : ''}`}
                      >
                        {module}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <span className="text-xs text-gray-500">{institution}</span>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsPaused(!isPaused)}
                  className={`px-3 py-1 rounded-md text-sm ${isPaused ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}
                >
                  {isPaused ? 'Resume Class' : 'Pause Class'}
                </button>
                <button 
                  onClick={() => setIsHandRaised(!isHandRaised)}
                  className={`px-3 py-1 rounded-md text-sm ${isHandRaised ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-700'}`}
                >
                  {isHandRaised ? 'Hand Raised' : 'Raise Hand'}
                </button>
              </div>
            </div>
          )}

          {/* Virtual Board Area */}
          <div className="flex-1 overflow-hidden">
            <VirtualBoard 
              isPaused={isPaused}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              annotations={annotations}
              setAnnotations={setAnnotations}
              getWhiteboardState={updateWhiteboardState}
            />
          </div>
        </div>

        {/* For desktop: Sidebar for chat, notes, etc */}
        {!isMobile && (
          <VirtualClassSidebar
            title={currentModule}
            institution={institution}
            initialMessages={initialMessages}
            isHandRaised={isHandRaised}
            setIsHandRaised={setIsHandRaised}
            isMicOn={isMicOn}
            setIsMicOn={setIsMicOn}
            isSpeakerOn={isSpeakerOn}
            setIsSpeakerOn={setIsSpeakerOn}
            isPaused={isPaused}
            setIsPaused={setIsPaused}
            onChangeModule={handleChangeModule}
            onFullscreen={toggleFullscreen}
            onSetLessonScope={() => setIsLessonScopeOpen(true)}
            getWhiteboardState={getWhiteboardState}
          />
        )}
        
        {/* For mobile: Bottom sheet for the sidebar */}
        {isMobile && (
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-10 rounded-full shadow-lg px-4 py-2 bg-primary text-white"
                size="sm"
              >
                <ChevronUp className="h-4 w-4 mr-2" />
                <span>Tools & Chat</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh]">
              <VirtualClassSidebar
                title={currentModule}
                institution={institution}
                initialMessages={initialMessages}
                isHandRaised={isHandRaised}
                setIsHandRaised={setIsHandRaised}
                isMicOn={isMicOn}
                setIsMicOn={setIsMicOn}
                isSpeakerOn={isSpeakerOn}
                setIsSpeakerOn={setIsSpeakerOn}
                isPaused={isPaused}
                setIsPaused={setIsPaused}
                onChangeModule={handleChangeModule}
                onFullscreen={toggleFullscreen}
                onSetLessonScope={() => setIsLessonScopeOpen(true)}
                getWhiteboardState={getWhiteboardState}
              />
            </SheetContent>
          </Sheet>
        )}

        {/* Fullscreen button for mobile */}
        {isMobile && (
          <Button 
            variant="outline" 
            size="icon"
            onClick={toggleFullscreen}
            className="fixed top-20 right-4 rounded-full bg-white shadow-md z-10"
          >
            {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
          </Button>
        )}

        {/* Lesson Scope Modal */}
        <LessonScopeModal 
          isOpen={isLessonScopeOpen} 
          onClose={() => setIsLessonScopeOpen(false)}
          onSave={handleSaveLessonScope}
        />
      </div>
    </div>
  );
};

export default VirtualClassPage;
