
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Mail, Lock, Loader2, UserCheck } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useAdminAuth } from "@/contexts/auth/AdminAuthContext";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface LoginPageProps {
  returnTo?: string;
  onError?: (error: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ returnTo = '/dashboard/student', onError }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, isAuthenticated } = useAuth();
  const { adminLogin, isAdminAuthenticated } = useAdminAuth();
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Check for saved email on component mount
  useEffect(() => {
    const savedEmailOrPhone = localStorage.getItem("prepzr_remembered_login");
    if (savedEmailOrPhone) {
      setFormData(prev => ({ ...prev, emailOrPhone: savedEmailOrPhone }));
      setRememberMe(true);
    }
  }, []);
  
  // Check if already authenticated and redirect
  useEffect(() => {
    const isAdminLoggedIn = localStorage.getItem('admin_logged_in') === 'true';
    const isUserLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (isAdminLoggedIn) {
      navigate('/admin/dashboard', { replace: true });
      return;
    }
    
    if (isUserLoggedIn) {
      navigate('/dashboard/student', { replace: true });
      return;
    }
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (loginError) setLoginError(null);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.emailOrPhone || !formData.password) {
      const errorMessage = "Please provide both email/phone and password";
      setLoginError(errorMessage);
      if (onError) onError(errorMessage);
      return;
    }
    
    setIsLoading(true);
    setLoginError(null);
    
    try {
      // Check if trying to login as admin
      const isAdminEmail = formData.emailOrPhone.includes('admin');
      
      if (isAdminEmail) {
        // Try admin login
        const adminSuccess = await adminLogin(formData.emailOrPhone, formData.password);
        
        if (adminSuccess) {
          toast({
            title: "Admin Login successful",
            description: "Welcome to the PREPZR admin dashboard!",
          });
          
          // Remember email if option is checked
          if (rememberMe) {
            localStorage.setItem("prepzr_remembered_login", formData.emailOrPhone);
          } else {
            localStorage.removeItem("prepzr_remembered_login");
          }
          
          // Navigate to admin dashboard
          navigate("/admin/dashboard", { replace: true });
        } else {
          const errorMessage = "Invalid admin credentials.";
          setLoginError(errorMessage);
          if (onError) onError(errorMessage);
        }
      } else {
        // Try regular student login
        await login(formData.emailOrPhone, formData.password);
        
        toast({
          title: "Login successful",
          description: "Welcome back to PREPZR!",
        });
        
        // Remember email if option is checked
        if (rememberMe) {
          localStorage.setItem("prepzr_remembered_login", formData.emailOrPhone);
        } else {
          localStorage.removeItem("prepzr_remembered_login");
        }
        
        // Navigate to student dashboard
        navigate("/dashboard/student", { replace: true });
      }
    } catch (error) {
      const errorMessage = "Invalid email/phone or password.";
      setLoginError(errorMessage);
      if (onError) onError(errorMessage);
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const handleDemoLogin = async () => {
    setFormData({
      emailOrPhone: "demo@prepzr.com",
      password: "demo123"
    });
    
    // Automatically login with demo credentials
    setIsLoading(true);
    setLoginError(null);
    
    try {
      // Clear any existing admin session
      localStorage.removeItem('admin_logged_in');
      localStorage.removeItem('admin_user');
      
      // Login with demo credentials
      await login("demo@prepzr.com", "demo123");
      
      toast({
        title: "Demo Login successful",
        description: "Welcome to the demo account"
      });
      
      // Navigate to student dashboard
      navigate("/dashboard/student", { replace: true });
    } catch (error) {
      const errorMessage = "Demo login failed. Please try again.";
      setLoginError(errorMessage);
      if (onError) onError(errorMessage);
      console.error("Demo login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {loginError && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{loginError}</AlertDescription>
        </Alert>
      )}
      
      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="emailOrPhone" className="text-sm font-medium">Email Address or Phone Number</Label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              <Mail size={16} />
            </div>
            <Input
              id="emailOrPhone"
              name="emailOrPhone"
              value={formData.emailOrPhone}
              onChange={handleInputChange}
              placeholder="Enter your email or phone number"
              type="text"
              className={`pl-9 ${loginError && !formData.emailOrPhone ? "border-red-500" : ""}`}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium">Password</Label>
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
              className={`pl-9 pr-10 ${loginError && !formData.password ? "border-red-500" : ""}`}
              autoComplete="current-password"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(!!checked)}
            />
            <Label htmlFor="remember" className="text-sm text-gray-700 cursor-pointer">
              Remember me
            </Label>
          </div>
          
          <button
            type="button"
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            onClick={() => {
              toast({
                title: "Password Reset",
                description: "Password reset feature is coming soon."
              });
            }}
          >
            Forgot password?
          </button>
        </div>
        
        <div className="pt-2">
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 shadow-md hover:shadow-lg transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing In...
              </>
            ) : (
              <>
                <UserCheck className="mr-2 h-4 w-4" />
                Sign In
              </>
            )}
          </Button>
          
          <div className="mt-3">
            <Button
              type="button"
              variant="outline"
              className="w-full border-blue-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
              onClick={handleDemoLogin}
            >
              Use Demo Account
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
