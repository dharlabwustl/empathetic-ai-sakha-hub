
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react";
import { useAuth } from '@/contexts/auth/AuthContext';
import { useToast } from '@/hooks/use-toast';
import StudentLoginForm from '@/pages/login/forms/StudentLoginForm';
import TutorLoginForm from '@/pages/login/forms/TutorLoginForm';
import PrepzrLogo from '@/components/common/PrepzrLogo';

const Login = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("student");
  
  // Redirect if already logged in
  if (user) {
    const redirectPath = user.role === 'admin' ? '/dashboard/admin' : '/dashboard/student';
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-blue-50/30 dark:to-blue-950/20 flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <PrepzrLogo size="medium" />
          </div>
          <CardTitle className="text-2xl font-bold">Welcome back!</CardTitle>
          <CardDescription>
            Sign in to continue to your account
          </CardDescription>
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="student">Student</TabsTrigger>
              <TabsTrigger value="tutor">Tutor</TabsTrigger>
              <TabsTrigger value="parent">Parent</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        
        <CardContent className="px-6">
          <TabsContent value="student" className="mt-0">
            <StudentLoginForm activeTab={activeTab} />
          </TabsContent>
          
          <TabsContent value="tutor" className="mt-0">
            <TutorLoginForm activeTab={activeTab} />
          </TabsContent>
          
          <TabsContent value="parent" className="mt-0">
            <StudentLoginForm activeTab={activeTab} />
          </TabsContent>
          
          <div className="mt-6 text-center text-sm">
            <span className="text-gray-500 dark:text-gray-400">Don't have an account?</span>{" "}
            <Button variant="link" className="p-0 h-auto" asChild>
              <a href="/signup">Create Account</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
