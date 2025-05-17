
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ShieldCheck, Eye, EyeOff, Loader2, Mail, Lock } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import PrepzrLogo from "@/components/common/PrepzrLogo";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const { toast } = useToast();

  // Check if already authenticated
  useEffect(() => {
    // Check for direct localStorage value for more robust detection
    const isAdminLoggedIn = localStorage.getItem('admin_logged_in') === 'true';
    
    if (isAdminLoggedIn) {
      // Direct navigation - more reliable than React Router
      window.location.href = '/admin/dashboard';
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setLoginError("Please enter your email and password");
      return;
    }
    
    setIsLoading(true);
    setLoginError(null);
    
    try {
      // For demo purposes accept any email containing "admin"
      if (email.includes('admin') && password.length > 0) {
        // Clear student login data first to avoid conflicts
        localStorage.removeItem('userData');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('new_user_signup');
        
        // Create admin user data
        const adminUser = {
          id: `admin_${Date.now()}`,
          name: email.split('@')[0] || 'Admin User',
          email: email,
          role: "admin",
          permissions: ['all']
        };
        
        // Save admin data to localStorage with multiple flags for redundancy
        localStorage.setItem('admin_logged_in', 'true');
        localStorage.setItem('admin_user', JSON.stringify(adminUser));
        localStorage.setItem('adminToken', `token_${Date.now()}`);
        localStorage.setItem('adminUser', JSON.stringify(adminUser));
        
        toast({
          title: "Admin Login successful",
          description: "Welcome to the admin dashboard",
        });
        
        // Use direct window location change for guaranteed redirect
        window.location.href = '/admin/dashboard';
        return; // Make sure we exit early after redirect
      } else {
        throw new Error("Invalid admin credentials");
      }
    } catch (error) {
      setLoginError("Invalid admin credentials. Email must contain 'admin'");
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
    
    // Submit the form after a brief delay to allow state update
    setTimeout(() => {
      const form = document.getElementById('admin-login-form');
      if (form) {
        form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      }
    }, 100);
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
          <Button variant="link" onClick={() => window.location.href = "/login"}>
            Back to Student Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
