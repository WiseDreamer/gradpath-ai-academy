
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { useToast } from '@/hooks/use-toast';

export default function ProtectedRoute() {
  const { session, loading } = useAuth();
  const { toast } = useToast();
  const location = useLocation();
  
  // If still loading auth state, show nothing to avoid flash
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  // Once loading is complete, if no session, redirect to login
  if (!session) {
    toast({
      title: "Authentication required",
      description: "Please log in to access this page",
      variant: "destructive",
    });
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
