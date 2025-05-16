
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAdminAuth } from "@/contexts/auth/AdminAuthContext";
import { Eye, EyeOff, Mail, Lock, Loader2, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import PrepzrLogo from "@/components/common/PrepzrLogo";
import { Alert, AlertDescription } from "@/components/ui/alert";

const AdminLogin = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const returnTo = searchParams.get('returnTo') || '/admin/dashboard';
  
  const navigate = useNavigate();
  const { adminLogin, isAdminAuthenticated, adminLoading } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const { toast } = useToast();

  // Redirect to admin dashboard if already authenticated
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
    
    // Validate that email contains 'admin'
    if (!email.includes('admin')) {
      setLoginError("This login is for admins only. Email must contain 'admin'");
      return;
    }
    
    setIsLoading(true);
    setLoginError(null);
    
    try {
      // Call the adminLogin function from the context
      const success = await adminLogin(email, password);
      
      if (success) {
        toast({
          title: "Admin Login successful",
          description: "Welcome to the admin dashboard",
        });
        
        // Clear any regular user data
        localStorage.removeItem('userData');
        localStorage.removeItem('isLoggedIn');
        
        // Make sure we go to admin dashboard, not student dashboard
        navigate('/admin/dashboard', { replace: true });
      } else {
        setLoginError("Invalid admin credentials.");
      }
    } catch (error) {
      setLoginError("An unexpected error occurred. Please try again.");
      console.error("Admin login error:", error);
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
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100/30 via-white to-violet-100/30 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <PrepzrLogo width={120} height={120} />
          </Link>
          <h1 className="mt-4 text-4xl font-display font-bold gradient-text">Admin Portal</h1>
          <p className="mt-2 text-gray-600">Login to access the PREPZR administration panel</p>
        </div>
        
        <Card className="shadow-xl border-gray-200 overflow-hidden animate-fade-in">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-violet-700 text-white">
            <CardTitle className="text-2xl font-semibold">Admin Sign In</CardTitle>
            <CardDescription className="text-purple-100">
              Enter your admin credentials to access the dashboard
            </CardDescription>
          </CardHeader>
          
          {loginError && (
            <Alert variant="destructive" className="m-6 mb-0">
              <AlertDescription>{loginError}</AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit}>
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
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@prepzr.com"
                      className="pl-9 border-purple-200 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-medium">Password</Label>
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
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-9 border-purple-200 focus:ring-purple-500 focus:border-purple-500 pr-10"
                    />
                    <Button 
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full"
                      onClick={togglePasswordVisibility}
                      type="button"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </Button>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800 text-white shadow-md"
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
                      <ShieldCheck className="h-4 w-4 mr-1" />
                      <span>Sign In</span>
                    </div>
                  )}
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  className="w-full mt-2"
                  onClick={handleDemoAdminLogin}
                >
                  Use Demo Admin Account
                </Button>
              </div>
            </CardContent>
          </form>
          
          <CardFooter className="flex justify-center pb-6 border-t pt-6">
            <p className="text-sm text-gray-600">
              Not an admin?{" "}
              <Link to="/login" className="text-purple-600 hover:text-purple-700 font-medium hover:underline">
                Go to Student Login
              </Link>
            </p>
          </CardFooter>
        </Card>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Need help? <a href="#" className="text-purple-600 hover:underline">Contact Support</a></p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
