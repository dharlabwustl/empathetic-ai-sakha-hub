
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Mail, Lock, Loader2, UserCheck, ChevronRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useAdminAuth } from "@/contexts/auth/AdminAuthContext";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { UserRole } from "@/types/user/base";

interface LoginPageProps {
  returnTo?: string;
}

const LoginPage: React.FC<LoginPageProps> = ({ returnTo = '/dashboard/student' }) => {
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
  
  // Check if already authenticated and redirect accordingly
  useEffect(() => {
    if (isAdminAuthenticated) {
      navigate('/admin/dashboard', { replace: true });
      return;
    }
    
    if (isAuthenticated) {
      navigate('/dashboard/student', { replace: true });
      return;
    }
  }, [isAuthenticated, isAdminAuthenticated, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (loginError) setLoginError(null);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.emailOrPhone || !formData.password) {
      setLoginError("Please provide both email/phone and password");
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
          setLoginError("Invalid admin credentials.");
        }
      } else {
        // Try regular student login
        const success = await login(formData.emailOrPhone, formData.password);
        
        if (success) {
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
        } else {
          setLoginError("Invalid email/phone or password.");
        }
      }
    } catch (error) {
      setLoginError("An unexpected error occurred. Please try again.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const handleDemoLogin = () => {
    setFormData({
      emailOrPhone: "demo@prepzr.com",
      password: "demo123"
    });
  };

  return (
    <div className="p-6 space-y-6">
      {loginError && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{loginError}</AlertDescription>
        </Alert>
      )}
      
      <form onSubmit={handleLogin} className="space-y-4">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-2"
        >
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
              className={`pl-9 border-blue-200 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${loginError && !formData.emailOrPhone ? "border-red-500" : ""}`}
            />
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="space-y-2"
        >
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
              className={`pl-9 pr-10 border-blue-200 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${loginError && !formData.password ? "border-red-500" : ""}`}
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
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex items-center justify-between"
        >
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
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="pt-2"
        >
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
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
                  Sign In <ChevronRight className="ml-1 h-4 w-4" />
                </>
              )}
            </Button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-3"
          >
            <Button
              type="button"
              variant="outline"
              className="w-full border-blue-200 hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
              onClick={handleDemoLogin}
            >
              Use Demo Account
            </Button>
          </motion.div>
        </motion.div>
      </form>
    </div>
  );
};

export default LoginPage;
