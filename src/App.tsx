import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import VirtualClassPage from "./pages/VirtualClassPage";
import ModuleViewPage from "./pages/ModuleViewPage";
import ChatPage from "./pages/ChatPage";
import NotFound from "./pages/NotFound";
import GlobalChatPage from "./pages/GlobalChatPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/virtual-class" element={<VirtualClassPage />} />
          <Route path="/module/:id" element={<ModuleViewPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/global-chat" element={<GlobalChatPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
