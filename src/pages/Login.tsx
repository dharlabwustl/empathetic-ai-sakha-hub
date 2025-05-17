
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginPage from '@/pages/login/LoginPage';
import PrepzrLogo from '@/components/common/PrepzrLogo';
import { useToast } from '@/hooks/use-toast';
import VoiceGreeting from '@/components/dashboard/student/voice/VoiceGreeting';

const Login = () => {
  const [loginTab, setLoginTab] = useState<"student" | "admin">("student");
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Check if user is already logged in
  useEffect(() => {
    console.log("Checking login status in Login.tsx");
    
    // Check admin login first
    const isAdminLoggedIn = localStorage.getItem('admin_logged_in') === 'true';
    if (isAdminLoggedIn) {
      console.log("Admin already logged in, redirecting to admin dashboard");
      // Use replace for more reliable redirection
      window.location.replace('/admin/dashboard');
      return;
    }
    
    // Then check student login
    const isUserLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isUserLoggedIn) {
      console.log("Student already logged in, redirecting to student dashboard");
      navigate('/dashboard/student', { replace: true });
      return;
    }
  }, [navigate]);
  
  const handleLoginError = (error: string) => {
    toast({
      title: "Login failed",
      description: error,
      variant: "destructive"
    });
  };
  
  const handleAdminLoginRedirect = () => {
    // Use direct window location for more reliable navigation
    window.location.href = '/admin/login';
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100/30 via-white to-violet-100/30 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <VoiceGreeting 
        isFirstTimeUser={false}
        userName="User"
        language="en"
      />
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <PrepzrLogo width={240} height="auto" />
          </Link>
          <h1 className="mt-4 text-4xl font-display font-bold gradient-text">Welcome Back</h1>
          <p className="mt-2 text-gray-600">Login to continue your learning journey</p>
        </div>
        
        <Card className="shadow-xl border-gray-200 overflow-hidden animate-fade-in">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-violet-700 text-white">
            <CardTitle className="text-2xl font-semibold">Sign In</CardTitle>
            <CardDescription className="text-blue-100">
              Choose your account type below to continue
            </CardDescription>
          </CardHeader>
          
          <Tabs defaultValue="student" value={loginTab} onValueChange={(value) => setLoginTab(value as "student" | "admin")}>
            <div className="px-6 pt-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="student">Student</TabsTrigger>
                <TabsTrigger value="admin">Administrator</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="student" className="pt-2">
              <form onSubmit={(e) => e.preventDefault()}>
                <LoginPage onError={handleLoginError} />
              </form>
            </TabsContent>
            
            <TabsContent value="admin" className="pt-2">
              <CardContent>
                <div className="space-y-4 py-4">
                  <div className="text-center">
                    <Button variant="outline" className="w-full" onClick={handleAdminLoginRedirect}>
                      Go to Admin Login
                    </Button>
                  </div>
                  <p className="text-sm text-center text-muted-foreground">
                    Administrator access is restricted to authorized personnel only.
                  </p>
                </div>
              </CardContent>
            </TabsContent>
          </Tabs>
          
          <CardFooter className="flex justify-center border-t pt-6">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
                Sign Up
              </Link>
            </p>
          </CardFooter>
        </Card>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Need help? <a href="#" className="text-blue-600 hover:underline">Contact Support</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
