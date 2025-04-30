
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/auth/AuthContext";
import PrepzrLogo from "@/components/common/PrepzrLogo";

const LoginPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast({
        title: "Missing information",
        description: "Please provide both email and password.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await login(formData.email, formData.password);
      
      if (success) {
        toast({
          title: "Login successful",
          description: "Redirecting to your dashboard",
        });
        
        navigate("/welcome-back");
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive"
        });
      }
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
          <Link to="/" className="inline-flex items-center gap-2">
            <PrepzrLogo width={150} height="auto" />
          </Link>
          <h1 className="mt-4 text-4xl font-display font-bold gradient-text">Welcome Back</h1>
          <p className="mt-2 text-gray-600">Log in to your PREPZR account to continue your learning journey</p>
        </div>
        
        <Card className="shadow-xl border-gray-200 overflow-hidden animate-fade-in">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardTitle className="text-2xl font-semibold">Sign In</CardTitle>
            <CardDescription className="text-blue-100">
              Enter your credentials to access your dashboard
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleLogin}>
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
                }}
              >
                <img src="https://www.google.com/favicon.ico" alt="Google" className="h-4 w-4 mr-2" />
                Sign in with Google
              </Button>
            </CardContent>
          </form>
          
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

export default LoginPage;
