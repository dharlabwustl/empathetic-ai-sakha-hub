
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useAdminAuth } from "@/contexts/auth/AdminAuthContext";
import StudentLoginForm from "./forms/StudentLoginForm";
import AdminLoginRedirect from "./forms/AdminLoginRedirect";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface LoginPageProps {
  returnTo?: string;
  onError?: (error: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ returnTo = '/dashboard/student', onError }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { isAdminAuthenticated } = useAdminAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("student");
  
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

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="p-6 space-y-6">
      <Tabs 
        defaultValue="student" 
        value={activeTab} 
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="student">Student</TabsTrigger>
          <TabsTrigger value="admin">Admin</TabsTrigger>
        </TabsList>
        
        <TabsContent value="student" className="mt-4">
          <StudentLoginForm activeTab={activeTab} />
        </TabsContent>
        
        <TabsContent value="admin" className="mt-4">
          <AdminLoginRedirect />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LoginPage;
