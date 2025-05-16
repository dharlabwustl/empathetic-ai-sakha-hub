
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ShieldCheck, Eye, EyeOff, Loader2, Mail, Lock } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAdminAuth } from "@/contexts/auth/AdminAuthContext";
import PrepzrLogo from "@/components/common/PrepzrLogo";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { adminLogin, isAdminAuthenticated, adminLoading } = useAdminAuth();

  // Check if already authenticated
  useEffect(() => {
    if (isAdminAuthenticated && !adminLoading) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [isAdminAuthenticated, adminLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setLoginError("Please enter your email and password");
      return;
    }
    
    setIsLoading(true);
    setLoginError(null);
    
    try {
      const success = await adminLogin(email, password);
      
      if (success) {
        toast({
          title: "Admin Login successful",
          description: "Welcome to the admin dashboard",
        });
        
        // Navigate to admin dashboard
        navigate('/admin/dashboard', { replace: true });
      } else {
        setLoginError("Invalid admin credentials. Email must contain 'admin'");
      }
    } catch (error) {
      setLoginError("An unexpected error occurred");
      console.error("Admin login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleDemoAdminLogin = async () => {
    setEmail("admin@prepzr.com");
    setPassword("admin123");
    
    try {
      setIsLoading(true);
      setLoginError(null);
      
      const success = await adminLogin("admin@prepzr.com", "admin123");
      
      if (success) {
        toast({
          title: "Admin Demo Login",
          description: "Logged in successfully as demo admin",
        });
        navigate('/admin/dashboard', { replace: true });
      } else {
        setLoginError("Demo login failed. Please try again.");
      }
    } catch (error) {
      setLoginError("An unexpected error occurred");
      console.error("Demo login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full px-4">
        <div className="text-center mb-6">
          <PrepzrLogo width={140} height="auto" className="mx-auto" />
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
          
          <form onSubmit={handleSubmit}>
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
                disabled={isLoading}
              >
                Use Demo Admin Account
              </Button>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-gradient-to-r from-blue-600 to-violet-600" disabled={isLoading} type="submit">
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
          <Button variant="link" onClick={() => navigate("/login")}>
            Back to Student Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
