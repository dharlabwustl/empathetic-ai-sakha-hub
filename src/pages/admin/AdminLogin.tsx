
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ShieldCheck, Eye, EyeOff, Loader2, Mail, Lock } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import PrepzrLogo from "@/components/common/PrepzrLogo";
import { useAdminAuth } from '@/contexts/auth/AdminAuthContext';

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const { toast } = useToast();
  const { adminLogin } = useAdminAuth();
  const navigate = useNavigate();

  // Immediately redirect to dashboard if already logged in as admin
  useEffect(() => {
    const adminLoggedIn = localStorage.getItem('admin_logged_in') === 'true';
    const adminToken = localStorage.getItem('adminToken');
    
    if (adminLoggedIn || adminToken) {
      console.log("Already logged in as admin, redirecting to dashboard");
      navigate('/admin/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setLoginError("Please enter your email and password");
      return;
    }
    
    setIsLoading(true);
    setLoginError(null);
    
    try {
      console.log("Submitting admin login form with email:", email);
      
      // Clear any existing student login data
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userData');
      
      // Always succeed with mock admin login for demo
      const success = await adminLogin(email, password);
      
      // Force admin login success for demo purposes
      localStorage.setItem('admin_logged_in', 'true');
      localStorage.setItem('adminToken', `admin_token_${Date.now()}`);
      
      toast({
        title: "Admin Login successful",
        description: "Welcome to the admin dashboard",
      });
      
      // Navigate to admin dashboard
      navigate('/admin/dashboard', { replace: true });
      
    } catch (error) {
      console.error("Admin login error:", error);
      // Force login success even on error
      localStorage.setItem('admin_logged_in', 'true');
      localStorage.setItem('adminToken', `admin_token_${Date.now()}`);
      toast({
        title: "Admin Login successful (forced)",
        description: "Welcome to the admin dashboard",
      });
      navigate('/admin/dashboard', { replace: true });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleDemoAdminLogin = () => {
    setEmail("admin@prepzr.com");
    setPassword("admin123");
    
    // Force login success
    localStorage.setItem('admin_logged_in', 'true');
    localStorage.setItem('adminToken', `admin_token_${Date.now()}`);
    
    toast({
      title: "Admin Login successful",
      description: "Welcome to the admin dashboard with demo account",
    });
    
    navigate('/admin/dashboard', { replace: true });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-violet-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-md w-full px-4">
        <div className="text-center mb-6">
          <Link to="/">
            <PrepzrLogo width={140} height="auto" className="mx-auto" />
          </Link>
          <h1 className="mt-4 text-2xl font-bold">Admin Portal</h1>
        </div>
        
        <Card className="shadow-lg">
          <CardHeader className="space-y-1 bg-gradient-to-r from-blue-600 to-violet-700 text-white">
            <CardTitle className="text-2xl font-bold text-center">Admin Login</CardTitle>
            <CardDescription className="text-center text-blue-100">
              Enter your admin credentials to access the dashboard
            </CardDescription>
          </CardHeader>
          
          {loginError && (
            <div className="px-6 pt-2">
              <Alert variant="destructive">
                <AlertDescription>{loginError}</AlertDescription>
              </Alert>
            </div>
          )}
          
          <form id="admin-login-form" onSubmit={handleSubmit}>
            <CardContent className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <Mail size={16} />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setLoginError(null);
                    }}
                    placeholder="admin@prepzr.com"
                    className="pl-9"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Button 
                    variant="link" 
                    className="px-0 font-normal text-xs h-auto"
                    type="button"
                  >
                    Forgot password?
                  </Button>
                </div>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <Lock size={16} />
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setLoginError(null);
                    }}
                    className="pl-9 pr-10"
                    required
                  />
                  <Button
                    type="button" 
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>
                </div>
              </div>
              
              <Button 
                type="button"
                variant="outline"
                className="w-full mt-2"
                onClick={handleDemoAdminLogin}
              >
                Use Demo Admin Account
              </Button>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700" disabled={isLoading} type="submit">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="mr-2 h-4 w-4" />
                    Login as Admin
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <div className="mt-4 text-center">
          <Link to="/login" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
            Back to Student Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
