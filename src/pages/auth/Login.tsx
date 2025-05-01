
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import PrepzrLogo from "@/components/common/PrepzrLogo";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"student" | "admin">("student");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStudentLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate login delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo, we allow any email/password
      localStorage.setItem("userData", JSON.stringify({
        name: "Student User",
        email: formData.email,
        loggedIn: true,
        loginCount: 3, // As a returning user
        lastActivity: {
          description: "completed a Physics quiz with 85% score"
        },
        pendingTasks: [
          { title: "Complete Organic Chemistry Flashcards" }
        ]
      }));
      
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
      
      // Redirect returning users to welcome-back screen
      navigate("/welcome-back?returnTo=dashboard/student", { replace: true });
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Check admin credentials
      if (formData.email === "admin@example.com" && formData.password === "admin123") {
        // Store admin session in localStorage
        localStorage.setItem('adminSession', JSON.stringify({
          isAdmin: true,
          email: formData.email,
          name: 'Admin User',
          loggedInAt: new Date().toISOString()
        }));
        
        toast({
          title: "Admin Login Successful",
          description: "Welcome to the admin dashboard!",
        });
        
        // Navigate to admin dashboard
        navigate("/admin/dashboard", { replace: true });
      } else {
        toast({
          title: "Admin Login Failed",
          description: "Invalid admin credentials",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Login error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
      console.error("Admin login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    toast({
      title: "Password Reset",
      description: "Check your email for password reset instructions.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100/30 via-white to-violet-100/30 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <PrepzrLogo width={180} height="auto" className="mx-auto" />
          <h1 className="mt-4 text-4xl font-bold gradient-text">Welcome Back</h1>
          <p className="mt-2 text-gray-600">Log in to your PREPZR account to continue your learning journey</p>
        </div>
        
        <Card className="shadow-xl border-gray-200 overflow-hidden animate-fade-in">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardTitle className="text-2xl font-semibold">Sign In</CardTitle>
            <CardDescription className="text-blue-100">
              Enter your credentials to access your dashboard
            </CardDescription>
          </CardHeader>
          
          <Tabs defaultValue="student" value={activeTab} onValueChange={(value) => setActiveTab(value as "student" | "admin")}>
            <div className="px-6 pt-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="student">Student</TabsTrigger>
                <TabsTrigger value="admin">Administrator</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="student">
              <form onSubmit={handleStudentLogin}>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                          <Mail size={16} />
                        </div>
                        <Input
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email"
                          type="email"
                          className="pl-9 border-blue-200 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                        <button 
                          type="button" 
                          onClick={handleForgotPassword} 
                          className="text-xs text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          Forgot Password?
                        </button>
                      </div>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                          <Lock size={16} />
                        </div>
                        <Input
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder="Enter your password"
                          type={showPassword ? "text" : "password"}
                          className="pl-9 border-blue-200 focus:ring-blue-500 focus:border-blue-500 pr-10"
                        />
                        <Button 
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full"
                          onClick={() => setShowPassword(!showPassword)}
                          type="button"
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </Button>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Signing in...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <span>Sign In</span>
                          <ArrowRight size={16} />
                        </div>
                      )}
                    </Button>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-gray-300"></span>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white dark:bg-gray-900 px-2 text-gray-500">Or sign in with</span>
                    </div>
                  </div>
                  
                  <Button 
                    type="button"
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      toast({
                        title: "Google Sign In",
                        description: "Google authentication would be implemented here.",
                      });
                      // Demo Login
                      setTimeout(() => {
                        navigate("/welcome-back?returnTo=dashboard/student");
                      }, 1000);
                    }}
                  >
                    <img src="https://www.google.com/favicon.ico" alt="Google" className="h-4 w-4 mr-2" />
                    Sign in with Google
                  </Button>
                </CardContent>
              </form>
            </TabsContent>
            
            <TabsContent value="admin">
              <form onSubmit={handleAdminLogin}>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="adminEmail" className="text-sm font-medium">Admin Email</Label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                          <Mail size={16} />
                        </div>
                        <Input
                          id="adminEmail"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="admin@example.com"
                          type="email"
                          className="pl-9 border-blue-200 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="adminPassword" className="text-sm font-medium">Password</Label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                          <Lock size={16} />
                        </div>
                        <Input
                          id="adminPassword"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder="••••••••"
                          type={showPassword ? "text" : "password"}
                          className="pl-9 border-blue-200 focus:ring-blue-500 focus:border-blue-500 pr-10"
                        />
                        <Button 
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full"
                          onClick={() => setShowPassword(!showPassword)}
                          type="button"
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </Button>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-slate-950 text-white shadow-md"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Signing in...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <span>Admin Sign In</span>
                          <ArrowRight size={16} />
                        </div>
                      )}
                    </Button>
                    
                    <p className="text-center text-sm text-gray-600 mt-4">
                      For demonstration, use: <span className="font-medium">admin@example.com</span> / <span className="font-medium">admin123</span>
                    </p>
                  </div>
                </CardContent>
              </form>
            </TabsContent>
          </Tabs>
          
          <CardFooter className="flex justify-center pb-6 border-t pt-4">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:text-blue-800 font-medium hover:underline">
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
