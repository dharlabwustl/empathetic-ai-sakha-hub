
import React, { useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from 'lucide-react';
import PrepzrLogo from '@/components/common/PrepzrLogo';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("student");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock login for demo
    setTimeout(() => {
      setIsLoading(false);
      
      if (activeTab === "admin") {
        navigate('/admin/dashboard');
      } else {
        // For students, redirect to the post-login prompt page
        navigate('/welcome-back?returnTo=lastPage');
      }
      
      toast({
        title: "Login successful",
        description: `Logged in as ${activeTab}`,
      });
      
      // Save login info in localStorage for demo purposes
      try {
        const userData = {
          email: formData.email,
          role: activeTab,
          name: formData.email.split('@')[0],
          loginCount: 1,
          lastLoginDate: new Date().toISOString(),
        };
        localStorage.setItem("userData", JSON.stringify(userData));
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }
    }, 1500);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 via-white to-violet-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950 p-4">
      <Card className="w-full max-w-md shadow-xl border-0">
        <Tabs defaultValue="student" value={activeTab} onValueChange={setActiveTab}>
          <CardHeader className="pb-4">
            <div className="flex justify-center mb-4">
              <PrepzrLogo width={120} />
            </div>
            <CardTitle className="text-2xl text-center font-bold">Welcome Back</CardTitle>
            <CardDescription className="text-center">
              Log in to your PREPZR account
            </CardDescription>
            <TabsList className="grid w-full grid-cols-2 mt-4">
              <TabsTrigger value="student">Student</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link 
                    to="/forgot-password" 
                    className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </Button>
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin mr-2"></div>
                    <span>Logging in...</span>
                  </div>
                ) : (
                  "Log In"
                )}
              </Button>
              
              {activeTab === "student" && (
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t"></span>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or</span>
                  </div>
                </div>
              )}
              
              {activeTab === "student" && (
                <Button variant="outline" className="w-full" type="button">
                  <img src="/google.svg" alt="Google" className="w-5 h-5 mr-2" />
                  Continue with Google
                </Button>
              )}
            </form>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Tabs>
      </Card>
    </div>
  );
};

export default Login;
