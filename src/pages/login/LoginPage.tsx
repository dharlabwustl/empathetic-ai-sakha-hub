
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useAdminAuth } from "@/contexts/auth/AdminAuthContext";
import StudentLoginForm from "./forms/StudentLoginForm";

interface LoginPageProps {
  returnTo?: string;
  onError?: (error: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ returnTo = '/dashboard/student', onError }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { isAdminAuthenticated } = useAdminAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  // Check if already authenticated and redirect
  useEffect(() => {
    const isAdminLoggedIn = localStorage.getItem('admin_logged_in') === 'true';
    const isUserLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (isAdminLoggedIn) {
      navigate('/admin/dashboard', { replace: true });
      return;
    }
    
    if (isUserLoggedIn) {
      navigate('/dashboard/student', { replace: true });
      return;
    }
  }, [navigate, isAuthenticated, isAdminAuthenticated]);

  // We ensure it defaults to student
  const activeTab = "student";

  return (
    <div className="p-6 space-y-6">
      <StudentLoginForm activeTab={activeTab} />
    </div>
  );
};

export default LoginPage;
