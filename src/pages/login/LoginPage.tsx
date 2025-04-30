
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { School, Lock } from "lucide-react";
import PrepzrLogo from "@/components/common/PrepzrLogo";
import StudentLoginForm from "./forms/StudentLoginForm";
import AdminLoginRedirect from "./forms/AdminLoginRedirect";
import { useAuth } from "@/contexts/auth/AuthContext";
import { useToast } from "@/hooks/use-toast";

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState("student");
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await login(credentials.email, credentials.password);
      
      if (success) {
        toast({
          title: "Login successful",
          description: "Welcome back to Prepzr"
        });
        navigate("/dashboard/student/today");
      } else {
        toast({
          title: "Login failed",
          description: "Invalid credentials",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Login error",
        description: "An error occurred while logging in",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="p-8 bg-white dark:bg-gray-950 rounded-2xl shadow-xl w-full max-w-md relative overflow-hidden border border-gray-100 dark:border-gray-800">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-violet-200/30 to-indigo-300/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-gradient-to-tr from-blue-200/30 to-purple-300/20 rounded-full blur-3xl"></div>
        
        <div className="text-center mb-8 relative">
          <div className="flex justify-center mb-4">
            <Link to="/" className="flex items-center gap-2">
              <PrepzrLogo width={40} showText={true} />
            </Link>
          </div>
          <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
          <p className="text-gray-500 dark:text-gray-400">Sign in to your account to continue</p>
        </div>
        
        <Tabs defaultValue="student" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-8">
            <TabsTrigger value="student" className="flex items-center gap-2">
              <School size={16} />
              Student
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center gap-2">
              <Lock size={16} />
              Admin
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="student">
            <StudentLoginForm activeTab={activeTab} />
          </TabsContent>
          
          <TabsContent value="admin">
            <AdminLoginRedirect />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LoginPage;
