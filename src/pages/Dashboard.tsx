
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, UploadCloud, CalendarDays, FileText, BookCopy, MessageSquare } from 'lucide-react';
import NavBar from '@/components/NavBar';
import DashboardCard from '@/components/DashboardCard';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      {/* Header */}
      <div className="border-b bg-gradpath-purple text-white sticky top-0 z-50 w-full">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="flex items-center">
                <BookOpen className="h-10 w-10 text-white" />
                <span className="text-xl font-semibold ml-2 hidden sm:inline-block">GradPath</span>
              </Link>
            </div>
            
            <div className="flex items-center gap-2">
              <Link to="/global-chat">
                <button className="px-4 py-2 bg-white/20 rounded-lg text-white hover:bg-white/30 transition-colors">
                  Global Chat
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
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
