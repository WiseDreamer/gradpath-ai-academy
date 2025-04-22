
import { AuthProvider } from "./components/AuthProvider";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
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
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
