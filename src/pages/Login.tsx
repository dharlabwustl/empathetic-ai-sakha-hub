
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import authService from "@/services/auth/authService";
import { motion } from "framer-motion";
import PrepzrLogo from "@/components/common/PrepzrLogo";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await authService.login({
        email: credentials.email,
        password: credentials.password
      });

      if (response.success && response.data) {
        toast({
          title: "Login successful",
          description: "Welcome back to PREPZR"
        });

        // Save last visited page if exists
        const lastPage = localStorage.getItem('lastVisitedPage');

        // Check user's role to direct to appropriate page
        const userRole = response.data.role.toLowerCase();
        
        // Redirect to post-login prompt for students
        if (userRole === 'student') {
          navigate("/welcome-back?returnTo=" + (lastPage ? 'lastPage' : 'dashboard'));
        } else {
          // Redirect other roles based on role
          switch (userRole) {
            case 'employee':
              navigate("/dashboard/employee");
              break;
            case 'doctor':
              navigate("/dashboard/doctor");
              break;
            case 'founder':
              navigate("/dashboard/founder");
              break;
            case 'admin':
              navigate("/admin/dashboard");
              break;
            default:
              navigate("/welcome-back");
          }
        }
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setCredentials({
      email: "demo@prepzr.com",
      password: "demo123"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-violet-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <div className="flex justify-center mb-2">
              <PrepzrLogo width={60} />
            </div>
            <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
            <CardDescription className="text-blue-100 text-center">
              Log in to your PREPZR account
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  placeholder="your.email@example.com" 
                  required 
                  value={credentials.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a 
                    href="#" 
                    className="text-sm text-blue-600 hover:text-blue-800"
                    onClick={(e) => { 
                      e.preventDefault(); 
                      toast({
                        title: "Password Reset",
                        description: "Password reset functionality will be available soon."
                      });
                    }}
                  >
                    Forgot password?
                  </a>
                </div>
                <Input 
                  id="password" 
                  name="password" 
                  type="password" 
                  required 
                  value={credentials.password}
                  onChange={handleInputChange}
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-600 hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
            <div className="mt-6">
              <Button 
                variant="outline" 
                className="w-full border-blue-300 text-blue-700 hover:bg-blue-50"
                onClick={handleDemoLogin}
              >
                Use Demo Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
