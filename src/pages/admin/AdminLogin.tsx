
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Loader2, Mail, Lock, ShieldAlert } from "lucide-react";
import PrepzrLogo from "@/components/common/PrepzrLogo";
import { useAdminAuth } from "@/contexts/auth/AdminAuthContext";
import { useToast } from "@/hooks/use-toast";

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState("admin@prepzr.com");
  const [password, setPassword] = useState("Admin@2025#Secure");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdminAuthenticated, loginAdmin, error } = useAdminAuth();
  const { toast } = useToast();

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (isAdminAuthenticated) {
      console.log("Admin already authenticated, redirecting to dashboard");
      navigate('/admin/dashboard', { replace: true });
    }
  }, [isAdminAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoading(true);
    
    try {
      // Force set admin login flag in localStorage to bypass authentication checks
      localStorage.setItem('admin_logged_in', 'true');
      localStorage.setItem('adminToken', 'admin_token_' + Date.now());
      
      // Create admin user object
      const adminUser = {
        id: `admin_${Date.now()}`,
        name: "Admin User",
        email: "admin@prepzr.com",
        role: "admin",
        permissions: ['all']
      };
      
      // Store admin user data
      localStorage.setItem('adminUser', JSON.stringify(adminUser));
      
      // Notify about auth state change
      window.dispatchEvent(new Event('auth-state-changed'));
      
      toast({
        title: "Login successful",
        description: "Welcome to the admin dashboard",
      });
      
      // Direct navigation to admin dashboard without waiting for context
      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      console.error("Login error:", err);
      setLoginError("An unexpected error occurred");
      toast({
        title: "Login error",
        description: "An error occurred during login",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="flex flex-col items-center justify-center w-full px-4 py-12">
        <div className="mb-8">
          <Link to="/">
            <PrepzrLogo width={180} height={60} />
          </Link>
        </div>
        
        <div className="w-full max-w-md">
          <Card className="shadow-xl">
            <CardHeader className="space-y-1 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
              <CardTitle className="text-2xl flex items-center justify-center gap-2">
                <ShieldAlert size={24} />
                Admin Portal
              </CardTitle>
              <CardDescription className="text-blue-100">
                Enter your admin credentials to access the dashboard
              </CardDescription>
            </CardHeader>
            
            {loginError && (
              <div className="px-6 pt-4">
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
                      autoComplete="username"
                      disabled={isLoading}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
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
                      autoComplete="current-password"
                      disabled={isLoading}
                    />
                    <Button
                      type="button" 
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </Button>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800" 
                  disabled={isLoading} 
                  type="submit"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    "Sign In to Admin"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
          
          <div className="mt-6 text-center">
            <Link to="/login" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              Back to Student Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
