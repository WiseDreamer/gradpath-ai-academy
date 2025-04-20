
import React from 'react';
import NavBar from '@/components/NavBar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';
import OverviewTab from '@/components/ModuleView/OverviewTab';
import MaterialsTab from '@/components/ModuleView/MaterialsTab';
import PracticeQuestionsTab from '@/components/ModuleView/PracticeQuestionsTab';
import PastPapersTab from '@/components/ModuleView/PastPapersTab';
import AiTutorTab from '@/components/ModuleView/AiTutorTab';
import CreateMockTestTab from '@/components/ModuleView/CreateMockTestTab';

const ModuleViewPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col overflow-x-hidden">
      <NavBar variant="learning" />
      
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
            <OverviewTab />
          </TabsContent>
          
          <TabsContent value="materials">
            <MaterialsTab />
          </TabsContent>
          
          <TabsContent value="practice">
            <PracticeQuestionsTab />
          </TabsContent>
          
          <TabsContent value="past-papers">
            <PastPapersTab />
          </TabsContent>
          
          <TabsContent value="ai-tutor" className="h-[70vh]">
            <AiTutorTab />
          </TabsContent>
          
          <TabsContent value="mock-test">
            <CreateMockTestTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ModuleViewPage;
