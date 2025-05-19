
import React from 'react';
import NavBar from '@/components/navbar/index';
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
      
      <div 
        className="w-full h-48 bg-gradient-to-r from-gradpath-navy to-gradpath-dark-navy relative"
        style={{
          backgroundImage: `linear-gradient(rgba(17, 24, 39, 0.8), rgba(17, 24, 39, 0.7)), url('/images/math-formulas.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-4 h-full flex items-end">
          <div className="pb-6">
            <h1 className="text-3xl font-bold text-white">Calculus I</h1>
            <p className="text-gray-300">University of Oxford, Mathematics</p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-6 flex-1 -mt-6">
        <div className="bg-white rounded-t-xl shadow-md p-4 flex items-center justify-between mb-4">
          <div className="flex items-center">
            <img src="/images/profile-avatar.jpg" alt="Professor" className="w-10 h-10 rounded-full mr-3" />
            <div>
              <p className="text-sm text-gray-500">Professor</p>
              <p className="font-medium">Dr. Sarah Matthews</p>
            </div>
          </div>
          <Button>
            <BookOpen className="mr-2 h-4 w-4" />
            Enter Virtual Class
          </Button>
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
