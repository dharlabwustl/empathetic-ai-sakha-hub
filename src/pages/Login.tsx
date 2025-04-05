
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    phoneNumber: "",
    otp: "",
  });
  const [showOtpField, setShowOtpField] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
    
    toast({
      title: "OTP Sent",
      description: "A verification code has been sent to your phone.",
    });
    
    setShowOtpField(true);
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
    
    toast({
      title: "Login Successful",
      description: "Welcome back to Sakha AI!",
    });
    
    setTimeout(() => {
      navigate("/dashboard/student");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sakha-light-blue/10 via-white to-sakha-lavender/10 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2">
            <img 
              src="/lovable-uploads/ffd1ed0a-7a25-477e-bc91-1da9aca3497f.png" 
              alt="Sakha AI Logo" 
              className="w-12 h-12 object-contain"
            />
            <span className="text-3xl font-display font-semibold gradient-text">Sakha AI</span>
          </Link>
          <h1 className="mt-6 text-3xl font-display font-bold text-gray-900">Welcome back</h1>
          <p className="mt-2 text-gray-600">
            Login to continue your journey with Sakha AI
          </p>
        </div>
        
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Enter your registered phone number"
                type="tel"
              />
            </div>
            
            {showOtpField ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="otp">Verification Code</Label>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-sm text-sakha-blue"
                    onClick={handleSendOtp}
                  >
                    Resend Code
                  </Button>
                </div>
                <div className="relative">
                  <Input
                    id="otp"
                    name="otp"
                    value={formData.otp}
                    onChange={handleInputChange}
                    placeholder="Enter verification code"
                    type={showPassword ? "text" : "password"}
                    maxLength={6}
                  />
                  <Button 
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>
                </div>
              </div>
            ) : null}
            
            <Button 
              className="w-full bg-gradient-to-r from-sakha-blue to-sakha-purple text-white"
              onClick={showOtpField ? handleLogin : handleSendOtp}
            >
              {showOtpField ? "Login" : "Send Verification Code"}
            </Button>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-sakha-blue hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
