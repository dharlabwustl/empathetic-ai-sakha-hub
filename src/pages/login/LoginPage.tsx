
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
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
      const user = await login(formData.email, formData.password);
      
      if (user) {
        toast({
          title: "Login successful",
          description: "Redirecting to welcome screen",
        });
        
        // Check for existing user data to determine if they're returning
        const userData = localStorage.getItem("userData");
        if (userData) {
          try {
            const parsedData = JSON.parse(userData);
            const loginCount = parsedData.loginCount ? parseInt(parsedData.loginCount) + 1 : 1;
            
            localStorage.setItem("userData", JSON.stringify({
              ...parsedData,
              loginCount,
              lastLogin: new Date().toISOString()
            }));
            
            // Redirect to welcome back screen for returning users
            if (loginCount > 1) {
              navigate("/welcome-back");
            } else {
              // For first-time users
              navigate("/dashboard/student?new=true");
            }
          } catch (error) {
            console.error("Error parsing user data:", error);
            navigate("/welcome-back");
          }
        } else {
          navigate("/welcome-back");
        }
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
  
  const handleDemoLogin = () => {
    setFormData({
      email: "demo@prepzr.com",
      password: "demo123"
    });
  };

  return (
    <CardContent className="p-6 space-y-6">
      <form onSubmit={handleLogin} className="space-y-4">
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
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Signing in...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <span>Sign In</span>
              <ArrowRight size={16} />
            </div>
          )}
        </Button>
        
        <Button 
          type="button" 
          variant="outline" 
          className="w-full mt-2" 
          onClick={handleDemoLogin}
        >
          Use Demo Account
        </Button>

        <div className="text-center text-sm">
          <span className="text-gray-500">Don't have an account? </span>
          <Button variant="link" className="p-0 h-auto" onClick={() => navigate("/signup")}>
            Sign up
          </Button>
        </div>
      </form>
    </CardContent>
  );
};

export default LoginPage;
