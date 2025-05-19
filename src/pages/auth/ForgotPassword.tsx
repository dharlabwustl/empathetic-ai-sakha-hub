
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Mail, Loader2, Key, Lock, Smartphone, CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import PrepzrLogo from "@/components/common/PrepzrLogo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

enum ForgotPasswordStep {
  CONTACT_INFO = "contact_info",
  OTP_VERIFICATION = "otp_verification",
  NEW_PASSWORD = "new_password",
  COMPLETE = "complete"
}

enum ContactMethod {
  EMAIL = "email",
  PHONE = "phone"
}

const ForgotPassword = () => {
  const [activeTab, setActiveTab] = useState<ContactMethod>(ContactMethod.EMAIL);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentStep, setCurrentStep] = useState<ForgotPasswordStep>(ForgotPasswordStep.CONTACT_INFO);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (activeTab === ContactMethod.EMAIL && (!email || !email.includes('@'))) {
      setError("Please enter a valid email address");
      return;
    }
    
    if (activeTab === ContactMethod.PHONE && (!phone || phone.length < 10)) {
      setError("Please enter a valid phone number");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, this would call an API to send OTP
      // For demo, we simulate API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock OTP sent successfully
      toast({
        title: "OTP Sent",
        description: activeTab === ContactMethod.EMAIL
          ? `A verification code has been sent to ${email}`
          : `A verification code has been sent to ${phone}`,
      });
      
      // Move to OTP verification step
      setCurrentStep(ForgotPasswordStep.OTP_VERIFICATION);
      
      // For demo: Show the OTP (in a real app this would be sent via email/SMS)
      console.log("Demo OTP: 123456");
      
    } catch (err) {
      setError("Failed to send verification code. Please try again.");
      console.error("Error sending OTP:", err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!otp || otp.length < 6) {
      setError("Please enter a valid 6-digit verification code");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, this would verify the OTP with an API
      // For demo, we'll accept "123456" as valid
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (otp === "123456") {
        // OTP verified, move to new password step
        toast({
          title: "OTP Verified",
          description: "Verification successful. Please set a new password.",
        });
        setCurrentStep(ForgotPasswordStep.NEW_PASSWORD);
      } else {
        setError("Invalid verification code. Please try again.");
      }
      
    } catch (err) {
      setError("Failed to verify code. Please try again.");
      console.error("Error verifying OTP:", err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!newPassword || newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, this would call an API to reset the password
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Password reset success
      toast({
        title: "Password Reset Successful",
        description: "Your password has been reset successfully. You can now log in with your new password.",
      });
      
      setCurrentStep(ForgotPasswordStep.COMPLETE);
      
    } catch (err) {
      setError("Failed to reset password. Please try again.");
      console.error("Error resetting password:", err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const renderStepContent = () => {
    switch (currentStep) {
      case ForgotPasswordStep.CONTACT_INFO:
        return (
          <form onSubmit={handleSendOTP}>
            <CardContent className="space-y-4 pt-4">
              <Tabs defaultValue="email" value={activeTab} onValueChange={(value) => setActiveTab(value as ContactMethod)}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="email">Email</TabsTrigger>
                  <TabsTrigger value="phone">Phone</TabsTrigger>
                </TabsList>
                
                <TabsContent value="email" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                        <Mail size={16} />
                      </div>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="pl-9"
                        required={activeTab === 'email'}
                      />
                    </div>
                    <p className="text-sm text-gray-500">
                      Enter the email address associated with your account. We'll send you a verification code.
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="phone" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                        <Smartphone size={16} />
                      </div>
                      <Input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').substring(0, 15))}
                        placeholder="(123) 456-7890"
                        className="pl-9"
                        required={activeTab === 'phone'}
                      />
                    </div>
                    <p className="text-sm text-gray-500">
                      Enter the phone number associated with your account. We'll send you a verification code via SMS.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700" 
                disabled={isLoading} 
                type="submit"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending Code...
                  </>
                ) : "Send Verification Code"}
              </Button>
            </CardFooter>
          </form>
        );
        
      case ForgotPasswordStep.OTP_VERIFICATION:
        return (
          <form onSubmit={handleVerifyOTP}>
            <CardContent className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="otp">Verification Code</Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <Key size={16} />
                  </div>
                  <Input
                    id="otp"
                    type="text"
                    inputMode="numeric"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                    placeholder="123456"
                    className="pl-9 tracking-widest text-center font-mono"
                    maxLength={6}
                    required
                  />
                </div>
                <p className="text-sm text-gray-500">
                  Enter the 6-digit verification code sent to {activeTab === ContactMethod.EMAIL ? email : phone}
                </p>
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-sm w-full"
                  type="button"
                  onClick={() => {
                    setCurrentStep(ForgotPasswordStep.CONTACT_INFO);
                    setOtp("");
                  }}
                >
                  Use a different contact method
                </Button>
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-sm w-full"
                  type="button"
                  onClick={() => {
                    toast({
                      title: "Code Resent",
                      description: activeTab === ContactMethod.EMAIL 
                        ? `A new verification code has been sent to ${email}` 
                        : `A new verification code has been sent to ${phone}`,
                    });
                    // In a real app, this would trigger a new OTP to be sent
                    console.log("Demo OTP resent: 123456");
                  }}
                >
                  Resend verification code
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700" 
                disabled={isLoading} 
                type="submit"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : "Verify Code"}
              </Button>
            </CardFooter>
          </form>
        );
        
      case ForgotPasswordStep.NEW_PASSWORD:
        return (
          <form onSubmit={handleResetPassword}>
            <CardContent className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <Lock size={16} />
                  </div>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New password"
                    className="pl-9"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <Lock size={16} />
                  </div>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="pl-9"
                    required
                  />
                </div>
                <p className="text-sm text-gray-500">
                  Password must be at least 8 characters long
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700" 
                disabled={isLoading} 
                type="submit"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Resetting Password...
                  </>
                ) : "Reset Password"}
              </Button>
            </CardFooter>
          </form>
        );
        
      case ForgotPasswordStep.COMPLETE:
        return (
          <>
            <CardContent className="space-y-4 pt-4 text-center">
              <div className="mx-auto bg-green-100 dark:bg-green-900 rounded-full p-3 w-16 h-16 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-300" />
              </div>
              
              <h3 className="text-lg font-medium">Password Reset Successful</h3>
              
              <p className="text-gray-600 dark:text-gray-300">
                Your password has been reset successfully. You can now log in with your new password.
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700"
                onClick={() => navigate('/login')}
              >
                Return to Login
              </Button>
            </CardFooter>
          </>
        );
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-100/30 via-white to-violet-100/30">
      <div className="max-w-md w-full px-4">
        <div className="text-center mb-6">
          <Link to="/">
            <PrepzrLogo width={120} height="auto" className="mx-auto" />
          </Link>
        </div>
        
        <Card className="shadow-lg border-gray-200 overflow-hidden">
          <CardHeader className="space-y-1 bg-gradient-to-r from-blue-600 to-violet-700 text-white">
            <div className="flex items-center">
              {currentStep !== ForgotPasswordStep.CONTACT_INFO && currentStep !== ForgotPasswordStep.COMPLETE && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-blue-700/20 mr-2"
                  onClick={() => setCurrentStep(prev => 
                    prev === ForgotPasswordStep.OTP_VERIFICATION 
                      ? ForgotPasswordStep.CONTACT_INFO 
                      : ForgotPasswordStep.OTP_VERIFICATION
                  )}
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              )}
              <CardTitle className="text-xl font-bold">Reset Password</CardTitle>
            </div>
            <CardDescription className="text-blue-100">
              {currentStep === ForgotPasswordStep.CONTACT_INFO && "Enter your email or phone to receive a verification code"}
              {currentStep === ForgotPasswordStep.OTP_VERIFICATION && "Enter the verification code we sent you"}
              {currentStep === ForgotPasswordStep.NEW_PASSWORD && "Create a new password"}
              {currentStep === ForgotPasswordStep.COMPLETE && "Password reset successful"}
            </CardDescription>
          </CardHeader>
          
          {error && (
            <div className="px-6 pt-2">
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </div>
          )}
          
          {renderStepContent()}
          
          {currentStep !== ForgotPasswordStep.COMPLETE && (
            <div className="p-6 pt-2 text-center border-t">
              <Link 
                to="/login"
                className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Return to Login
              </Link>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
