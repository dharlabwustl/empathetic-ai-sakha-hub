import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Phone, Lock, Loader2, Mail } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PostLoginRedirect from "@/components/login/PostLoginRedirect";

interface StudentLoginFormProps {
  activeTab: string;
}

const StudentLoginForm: React.FC<StudentLoginFormProps> = ({ activeTab }) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [resetMethod, setResetMethod] = useState<"email" | "phone">("email");
  const [resetIdentifier, setResetIdentifier] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  const [showRedirectPrompt, setShowRedirectPrompt] = useState(false);
  const [lastUserActivity, setLastUserActivity] = useState<{
    type: string;
    id?: string;
    description: string;
  } | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!identifier || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    try {
      const isPhone = /^\d+$/.test(identifier);
      const email = isPhone ? `${identifier}@sakha.ai` : identifier;
      const success = await login(email, password);
      
      if (success) {
        const userData = localStorage.getItem("userData");
        let lastActivity = null;
        
        if (userData) {
          const parsedData = JSON.parse(userData);
          if (parsedData.lastActivity) {
            lastActivity = parsedData.lastActivity;
          }
        }
        
        setLastUserActivity(lastActivity);
        setShowRedirectPrompt(true);
        
        toast({
          title: "Login successful",
          description: "Welcome back!"
        });
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: "Invalid credentials, please try again",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleResetRequest = () => {
    if (!resetIdentifier) {
      toast({
        title: "Error",
        description: "Please provide your email or phone number",
        variant: "destructive"
      });
      return;
    }
    
    setOtpSent(true);
    toast({
      title: "OTP Sent",
      description: `Verification code sent to your ${resetMethod}`,
    });
  };
  
  const handleResetComplete = () => {
    if (!otp || !newPassword) {
      toast({
        title: "Error",
        description: "Please enter both OTP and new password",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Password Reset Successful",
      description: "You can now login with your new password",
    });
    
    setShowPasswordReset(false);
    setOtpSent(false);
    setResetIdentifier("");
    setOtp("");
    setNewPassword("");
  };

  return (
    <>
      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-4">
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input 
              type="text" 
              placeholder="Mobile Number or Email"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input 
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
              Remember me
            </label>
          </div>
          <div className="text-sm">
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
              onClick={() => setShowPasswordReset(true)}
            >
              Forgot password?
            </button>
          </div>
        </div>
        
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing In...
            </>
          ) : (
            "Sign In"
          )}
        </Button>
        
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account yet?{" "}
            <Link to="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
              Sign up
            </Link>
          </p>
        </div>
      </form>
      
      <Dialog open={showPasswordReset} onOpenChange={setShowPasswordReset}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{otpSent ? "Enter OTP" : "Reset Password"}</DialogTitle>
            <DialogDescription>
              {otpSent
                ? "Enter the verification code sent to your email or phone"
                : "We'll send you a verification code to reset your password"}
            </DialogDescription>
          </DialogHeader>
          
          {!otpSent ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Button
                  variant={resetMethod === "email" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setResetMethod("email")}
                  className={resetMethod === "email" ? "bg-indigo-600" : ""}
                >
                  <Mail className="h-4 w-4 mr-1" />
                  Email
                </Button>
                <Button
                  variant={resetMethod === "phone" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setResetMethod("phone")}
                  className={resetMethod === "phone" ? "bg-indigo-600" : ""}
                >
                  <Phone className="h-4 w-4 mr-1" />
                  Phone
                </Button>
              </div>
              
              <Input
                placeholder={resetMethod === "email" ? "Enter your email" : "Enter your phone number"}
                value={resetIdentifier}
                onChange={(e) => setResetIdentifier(e.target.value)}
              />
              
              <DialogFooter className="sm:justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowPasswordReset(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleResetRequest}
                  className="bg-indigo-600"
                >
                  Send OTP
                </Button>
              </DialogFooter>
            </div>
          ) : (
            <div className="space-y-4">
              <Input
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <Input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <DialogFooter className="sm:justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setOtpSent(false);
                    setOtp("");
                  }}
                >
                  Back
                </Button>
                <Button
                  onClick={handleResetComplete}
                  className="bg-indigo-600"
                >
                  Reset Password
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      <PostLoginRedirect
        open={showRedirectPrompt}
        onOpenChange={setShowRedirectPrompt}
        lastActivity={lastUserActivity}
      />
    </>
  );
};

export default StudentLoginForm;
