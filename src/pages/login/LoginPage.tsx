
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import PrepzrLogo from '@/components/common/PrepzrLogo';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

const LoginPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loginType, setLoginType] = useState<string>('student');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    adminId: '',
    adminPassword: ''
  });
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotOTP, setForgotOTP] = useState('');
  const [showOTPField, setShowOTPField] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [showNewPasswordField, setShowNewPasswordField] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (loginType === 'student') {
        // Validate student login
        if (formData.email && formData.password) {
          // Mock successful login
          localStorage.setItem('userData', JSON.stringify({ 
            role: 'student',
            name: 'Student User',
            email: formData.email
          }));
          
          // Show successful login toast
          toast({
            title: "Login Successful",
            description: "Welcome back to PREPZR!"
          });
          
          // Navigate after successful login
          navigate('/dashboard/student?returnTo=lastPage');
        } else {
          // Show error toast for empty fields
          toast({
            title: "Login Failed",
            description: "Please enter both email and password.",
            variant: "destructive"
          });
        }
      } else if (loginType === 'admin') {
        // Validate admin login
        if (formData.adminId && formData.adminPassword) {
          // Mock successful login
          localStorage.setItem('userData', JSON.stringify({ 
            role: 'admin',
            name: 'Admin User',
            adminId: formData.adminId
          }));
          
          // Show successful login toast
          toast({
            title: "Admin Login Successful",
            description: "Welcome to PREPZR Admin Panel!"
          });
          
          // Navigate after successful login
          navigate('/admin/dashboard');
        } else {
          // Show error toast for empty fields
          toast({
            title: "Login Failed",
            description: "Please enter both admin ID and password.",
            variant: "destructive"
          });
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: "An error occurred during login. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOTP = () => {
    if (!forgotEmail) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to receive OTP.",
        variant: "destructive"
      });
      return;
    }

    // Simulate OTP sending
    toast({
      title: "OTP Sent",
      description: "A verification code has been sent to your email."
    });
    
    // For demo purposes, auto-fill OTP
    setForgotOTP("1234");
    setShowOTPField(true);
  };

  const handleVerifyOTP = () => {
    if (!forgotOTP) {
      toast({
        title: "OTP Required",
        description: "Please enter the verification code.",
        variant: "destructive"
      });
      return;
    }

    // In a real app, verify OTP with backend
    if (forgotOTP === "1234") {
      toast({
        title: "OTP Verified",
        description: "Please set your new password."
      });
      setShowNewPasswordField(true);
    } else {
      toast({
        title: "Invalid OTP",
        description: "The verification code is incorrect. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleResetPassword = () => {
    if (!newPassword) {
      toast({
        title: "Password Required",
        description: "Please enter your new password.",
        variant: "destructive"
      });
      return;
    }

    // In a real app, send new password to backend
    toast({
      title: "Password Reset Successful",
      description: "Your password has been changed. You can now login with your new password."
    });
    
    setShowForgotPassword(false);
    setForgotEmail("");
    setForgotOTP("");
    setNewPassword("");
    setShowOTPField(false);
    setShowNewPasswordField(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <div className="flex flex-col items-center space-y-2 mb-6">
            <PrepzrLogo width={60} height={60} />
            <h1 className="text-2xl font-bold text-center">Welcome to PREPZR</h1>
            <p className="text-gray-500 text-center">Your personalized exam preparation partner</p>
          </div>

          <Tabs defaultValue="student" onValueChange={setLoginType} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="student">Student</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>

            <TabsContent value="student">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password">Password</Label>
                    <button 
                      type="button"
                      onClick={() => setShowForgotPassword(true)} 
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600" 
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-300"></span>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">Or login with</span>
                  </div>
                </div>

                <Button 
                  type="button"
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    toast({
                      title: "Google Login",
                      description: "Google authentication would be triggered here."
                    });
                  }}
                >
                  <img src="https://www.google.com/favicon.ico" alt="Google" className="h-4 w-4 mr-2" />
                  Sign in with Google
                </Button>

                <p className="text-center text-sm">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link>
                </p>
              </form>
            </TabsContent>

            <TabsContent value="admin">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="adminId">Admin ID</Label>
                  <Input
                    id="adminId"
                    name="adminId"
                    placeholder="Enter admin ID"
                    value={formData.adminId}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="adminPassword">Password</Label>
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(true)}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <Input
                    id="adminPassword"
                    name="adminPassword"
                    type="password"
                    placeholder="Enter password"
                    value={formData.adminPassword}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600" 
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Admin Login"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>

        <p className="text-center text-sm mt-4 text-gray-600">
          © {new Date().getFullYear()} PREPZR. All rights reserved.
        </p>
      </div>

      {/* Forgot Password Dialog */}
      <Dialog open={showForgotPassword} onOpenChange={setShowForgotPassword}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogDescription>
              {!showOTPField ? "Enter your email to receive a verification code" : 
                !showNewPasswordField ? "Enter the verification code sent to your email" :
                "Create a new password"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {!showOTPField && (
              <div className="space-y-2">
                <Label htmlFor="forgotEmail">Email Address</Label>
                <Input
                  id="forgotEmail"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
            )}

            {showOTPField && !showNewPasswordField && (
              <div className="space-y-2">
                <Label htmlFor="forgotOTP">Verification Code</Label>
                <Input
                  id="forgotOTP"
                  value={forgotOTP}
                  onChange={(e) => setForgotOTP(e.target.value)}
                  placeholder="Enter verification code"
                />
              </div>
            )}

            {showNewPasswordField && (
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                />
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              onClick={() => setShowForgotPassword(false)}
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              onClick={!showOTPField ? handleSendOTP : !showNewPasswordField ? handleVerifyOTP : handleResetPassword}
              className="bg-gradient-to-r from-blue-500 to-blue-600"
            >
              {!showOTPField ? "Send Code" : !showNewPasswordField ? "Verify Code" : "Reset Password"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoginPage;
