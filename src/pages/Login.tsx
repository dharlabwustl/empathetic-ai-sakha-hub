import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Lock, Phone, ArrowRight } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    phoneNumber: "",
    otp: "",
  });
  const [showOtpField, setShowOtpField] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSendOtp = () => {
    if (!formData.phoneNumber || formData.phoneNumber.length < 10) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid phone number.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      toast({
        title: "OTP Sent",
        description: "A verification code has been sent to your phone.",
      });
      
      setShowOtpField(true);
      setIsLoading(false);
    }, 1000);
  };

  const handleLogin = () => {
    if (!formData.otp || formData.otp.length < 4) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid verification code.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      const existingUserData = localStorage.getItem("userData");
      
      if (existingUserData) {
        const userData = JSON.parse(existingUserData);
        userData.completedOnboarding = true;
        userData.isNewUser = false;
        localStorage.setItem("userData", JSON.stringify(userData));
      } else {
        const userData = {
          name: "Returning User",
          phoneNumber: formData.phoneNumber,
          completedOnboarding: true,
          isNewUser: false,
          sawWelcomeTour: true
        };
        localStorage.setItem("userData", JSON.stringify(userData));
      }
      
      toast({
        title: "Login Successful",
        description: "Welcome back to Sakha AI!",
      });
      
      setTimeout(() => {
        navigate("/dashboard/student");
      }, 1000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100/30 via-white to-violet-100/30 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <img 
              src="/lovable-uploads/ffd1ed0a-7a25-477e-bc91-1da9aca3497f.png" 
              alt="Sakha AI Logo" 
              className="w-16 h-16 object-contain"
            />
          </Link>
          <h1 className="mt-4 text-4xl font-display font-bold gradient-text">Welcome Back</h1>
          <p className="mt-2 text-gray-600">Login to continue your journey with Sakha AI</p>
        </div>
        
        <Card className="shadow-xl border-gray-200 overflow-hidden animate-fade-in">
          <CardHeader className="bg-gradient-to-r from-sky-500 to-violet-500 text-white">
            <CardTitle className="text-2xl font-semibold">Sign In</CardTitle>
            <CardDescription className="text-white/80">
              Enter your phone number to receive a verification code
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-6 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-sm font-medium">Phone Number</Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <Phone size={16} />
                  </div>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Enter your registered phone number"
                    type="tel"
                    className="pl-9 border-gray-300 focus:ring-violet-500 focus:border-violet-500"
                  />
                </div>
              </div>
              
              {showOtpField ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="otp" className="text-sm font-medium">Verification Code</Label>
                    <Button 
                      variant="link" 
                      className="p-0 h-auto text-sm text-violet-600"
                      onClick={handleSendOtp}
                      disabled={isLoading}
                    >
                      Resend Code
                    </Button>
                  </div>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <Lock size={16} />
                    </div>
                    <Input
                      id="otp"
                      name="otp"
                      value={formData.otp}
                      onChange={handleInputChange}
                      placeholder="Enter verification code"
                      type={showPassword ? "text" : "password"}
                      maxLength={6}
                      className="pl-9 border-gray-300 focus:ring-violet-500 focus:border-violet-500 pr-10"
                    />
                    <Button 
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full"
                      onClick={() => setShowPassword(!showPassword)}
                      type="button"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </Button>
                  </div>
                </div>
              ) : null}
              
              <Button 
                className="w-full bg-gradient-to-r from-sky-500 to-violet-500 hover:from-sky-600 hover:to-violet-600 text-white shadow-md"
                onClick={showOtpField ? handleLogin : handleSendOtp}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>{showOtpField ? "Verifying..." : "Sending..."}</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    {showOtpField ? "Login" : "Send Verification Code"}
                    <ArrowRight size={16} />
                  </div>
                )}
              </Button>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-center pb-6 border-t pt-6">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-violet-600 hover:text-violet-700 font-medium hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Need help? <a href="#" className="text-violet-600 hover:underline">Contact Support</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
