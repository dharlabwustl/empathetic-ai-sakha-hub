
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Loader2, Mail, Lock, ShieldAlert } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
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

  useEffect(() => {
    console.log("🔍 AdminLogin: Checking auth state - isAdminAuthenticated:", isAdminAuthenticated);
    if (isAdminAuthenticated) {
      console.log("✅ AdminLogin: User already authenticated, redirecting immediately");
      navigate('/admin/dashboard', { replace: true });
    }
  }, [isAdminAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      console.log("❌ AdminLogin: Error from context:", error);
      setLoginError(error);
    }
  }, [error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🚀 AdminLogin: Form submitted");
    console.log("📧 AdminLogin: Email:", email);
    console.log("🔒 AdminLogin: Password length:", password.length);
    
    setLoginError(null);
    setIsLoading(true);
    
    try {
      console.log("🔐 AdminLogin: Calling loginAdmin function");
      const success = await loginAdmin(email, password);
      
      console.log("📊 AdminLogin: Login result received:", success);
      
      if (success) {
        console.log("✅ AdminLogin: Login successful!");
        toast({
          title: "Login successful",
          description: "Welcome to the admin dashboard",
        });
        
        console.log("🎯 AdminLogin: Navigating to dashboard...");
        navigate("/admin/dashboard", { replace: true });
      } else {
        console.log("❌ AdminLogin: Login failed");
        setLoginError("Invalid admin credentials");
      }
    } catch (err) {
      console.error("💥 AdminLogin: Unexpected login error:", err);
      setLoginError("Login failed. Please try again.");
    } finally {
      console.log("🏁 AdminLogin: Setting loading to false");
      setIsLoading(false);
    }
  };

  console.log("🎨 AdminLogin: Rendering component with state:", {
    email,
    passwordLength: password.length,
    isLoading,
    loginError,
    isAdminAuthenticated
  });

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
                      autoComplete="username"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
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
                    />
                    <Button
                      type="button" 
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full"
                      onClick={() => setShowPassword(!showPassword)}
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
