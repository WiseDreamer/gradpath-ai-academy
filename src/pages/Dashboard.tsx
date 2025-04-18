
import React from 'react';
import { BookOpen, UploadCloud, CalendarDays, FileText, BookCopy, MessageSquare } from 'lucide-react';
import NavBar from '@/components/NavBar';
import DashboardCard from '@/components/DashboardCard';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar />
      
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Welcome back, Alex</h1>
          <p className="text-gray-600">Continue your learning journey</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard
            title="Join Virtual Class"
            description="Jump into an interactive AI-powered virtual classroom"
            icon={BookOpen}
            to="/virtual-class"
            color="bg-gradpath-purple"
          />
          
          <DashboardCard
            title="Upload Module Resources"
            description="Upload lecture slides, notes, and study material"
            icon={UploadCloud}
            to="/upload"
            color="bg-gradpath-bright-blue"
          />
          
          <DashboardCard
            title="Study Plan"
            description="View and manage your personalized study schedule"
            icon={CalendarDays}
            to="/study-plan"
            color="bg-green-500"
          />
          
          <DashboardCard
            title="Practice Questions"
            description="Test your knowledge with AI-generated practice questions"
            icon={FileText}
            to="/practice"
            color="bg-amber-500"
          />
          
          <DashboardCard
            title="Past Papers"
            description="Access and review previous examination papers"
            icon={BookCopy}
            to="/past-papers"
            color="bg-red-500"
          />
          
          <DashboardCard
            title="Ask AI Tutor"
            description="Get instant answers to your academic questions"
            icon={MessageSquare}
            to="/chat"
            color="bg-indigo-600"
          />
        </div>
        
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Recent Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {['Calculus I', 'Linear Algebra', 'Quantum Mechanics'].map((module) => (
              <div
                key={module}
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <h3 className="font-medium">{module}</h3>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradpath-purple h-2 rounded-full"
                    style={{ width: `${Math.floor(Math.random() * 100)}%` }}
                  />
                </div>
                <div className="mt-4 flex justify-end">
                  <div className="text-xs inline-block px-2 py-1 bg-gray-100 rounded text-gray-600">
                    Last accessed: Yesterday
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
