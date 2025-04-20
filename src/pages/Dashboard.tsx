
import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, User, BookOpen, Upload, Calendar, FileText, Book, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DashboardCard from '@/components/DashboardCard';
import Logo from '@/components/Logo';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F5F5F7] overflow-x-hidden">
      {/* Header */}
      <div className="border-b bg-gradpath-purple text-white sticky top-0 z-50 w-full">
        <div className="w-full px-0 mx-0">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Logo />
            </div>

            <div className="flex items-center gap-2">
              <Link to="/global-chat">
                <Button variant="ghost" size="lg" className="text-white hover:bg-white/20">
                  Global Chat
                </Button>
              </Link>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <Bell className="h-7 w-7" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <User className="h-7 w-7" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-0 mx-0">
        {/* Learning Resources Section */}
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Learning Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
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
            icon={Upload}
            to="/upload"
            color="bg-gradpath-bright-blue"
          />
          
          <DashboardCard
            title="Study Plan"
            description="View and manage your personalized study schedule"
            icon={Calendar}
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
            icon={Book}
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

        {/* Recent Modules Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border p-4">
          <h3 className="font-semibold mb-3">Recent Modules</h3>
          <div className="space-y-2">
            {['Calculus I', 'Linear Algebra', 'Quantum Mechanics'].map((module) => (
              <div key={module} className="p-2 hover:bg-gray-50 rounded-lg">
                <p className="text-sm font-medium">{module}</p>
                <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-gradpath-purple h-1.5 rounded-full"
                    style={{ width: `${Math.floor(Math.random() * 100)}%` }}
                  />
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
