
import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import PrepzrLogo from '@/components/common/PrepzrLogo';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const { toast } = useToast();
  
  // Check if user is already logged in
  const userToken = localStorage.getItem('userData');
  
  if (userToken) {
    return <Navigate to="/welcome-back?returnTo=dashboard/student" replace />;
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!credentials.email || !credentials.password) {
      toast({
        title: "Required fields",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // For demo purposes, create a user session
    const userData = {
      name: credentials.email.split('@')[0].replace(/\./g, ' '),
      email: credentials.email,
      role: 'student',
      loginCount: 2, // Set as a returning user
      completedOnboarding: true, // Skip onboarding
      sawWelcomeTour: true, // Skip welcome tour
      lastActivity: {
        type: 'study',
        description: 'studied Physics: Mechanics'
      }
    };
    
    // Store in localStorage
    localStorage.setItem('userData', JSON.stringify(userData));
    
    // Show success toast
    toast({
      title: "Login successful",
      description: "Welcome back to PREPZR"
    });
    
    // Redirect to welcome back screen
    window.location.href = '/welcome-back?returnTo=dashboard/student';
  };
  
  const handleAdminRedirect = () => {
    window.location.href = '/admin/login';
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100/30 via-white to-violet-100/30 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <PrepzrLogo width={120} height="auto" />
          </Link>
          <h1 className="mt-4 text-4xl font-display font-bold gradient-text">Welcome Back</h1>
          <p className="mt-2 text-gray-600">Login to continue your learning journey</p>
        </div>
        
        <Card className="shadow-xl border-gray-200 overflow-hidden animate-fade-in">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-violet-700 text-white">
            <CardTitle className="text-2xl font-semibold">Sign In</CardTitle>
            <p className="text-blue-100">
              Choose your account type below to continue
            </p>
          </CardHeader>
          
          <Tabs defaultValue="student">
            <div className="px-6 pt-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="student">Student</TabsTrigger>
                <TabsTrigger value="admin">Administrator</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="student" className="pt-2">
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email"
                      type="email" 
                      placeholder="student@example.com" 
                      value={credentials.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link to="/forgot-password" className="text-xs text-blue-600 hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <Input 
                      id="password" 
                      name="password"
                      type="password" 
                      placeholder="••••••••" 
                      value={credentials.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="remember" 
                      checked={rememberMe} 
                      onCheckedChange={(checked) => setRememberMe(checked === true)}
                    />
                    <label
                      htmlFor="remember"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember me
                    </label>
                  </div>
                  <Button type="submit" className="w-full">Sign In</Button>
                  
                  <div className="text-center text-sm">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full mt-2"
                      onClick={() => {
                        setCredentials({
                          email: "student@prepzr.com",
                          password: "student123",
                        });
                      }}
                    >
                      Use Demo Credentials
                    </Button>
                  </div>
                </form>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="admin" className="pt-2">
              <CardContent>
                <div className="space-y-4 py-4">
                  <div className="text-center">
                    <Button 
                      onClick={handleAdminRedirect} 
                      className="w-full inline-flex justify-center py-2 px-4"
                    >
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
