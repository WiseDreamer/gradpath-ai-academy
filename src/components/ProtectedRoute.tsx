
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { useToast } from '@/hooks/use-toast';

export default function ProtectedRoute() {
  const { session } = useAuth();
  const { toast } = useToast();
  
  if (!session) {
    toast({
      title: "Authentication required",
      description: "Please log in to access this page",
      variant: "destructive",
    });
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
