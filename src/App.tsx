
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { AuthProvider } from "./components/AuthProvider";
import { PuterProvider } from "./contexts/PuterContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import VirtualClassPage from "./pages/VirtualClassPage";
import ModuleViewPage from "./pages/ModuleViewPage";
import ChatPage from "./pages/ChatPage";
import GlobalChatPage from "./pages/GlobalChatPage";
import MessagesPage from "./pages/MessagesPage";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import StudyPlanPage from "./pages/StudyPlanPage";
import PracticePage from "./pages/PracticePage";
import AiTutorPage from "./pages/AiTutorPage";
import PerformancePage from "./pages/PerformancePage";
import SearchPage from "./pages/SearchPage";
import AchievementsPage from "./pages/AchievementsPage"; 
import HelpRequestPage from "./pages/HelpRequestPage";
import LibraryPage from "./pages/LibraryPage";
import { useEffect } from "react";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  // Load Puter.js script
  useEffect(() => {
    const puterScript = document.createElement('script');
    puterScript.src = 'https://js.puter.com/v2/';
    puterScript.async = true;
    document.body.appendChild(puterScript);
    
    return () => {
      document.body.removeChild(puterScript);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <PuterProvider>
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/virtual-class" element={<VirtualClassPage />} />
                  <Route path="/module/:id" element={<ModuleViewPage />} />
                  <Route path="/chat" element={<ChatPage />} />
                  <Route path="/global-chat" element={<GlobalChatPage />} />
                  <Route path="/messages" element={<MessagesPage />} />
                  <Route path="/study-plan" element={<StudyPlanPage />} />
                  <Route path="/practice" element={<PracticePage />} />
                  <Route path="/ai-tutor" element={<AiTutorPage />} />
                  <Route path="/performance" element={<PerformancePage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/achievements" element={<AchievementsPage />} />
                  <Route path="/help-request" element={<HelpRequestPage />} />
                  <Route path="/library" element={<LibraryPage />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </PuterProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
