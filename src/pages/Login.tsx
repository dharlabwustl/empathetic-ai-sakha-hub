
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
    <div className="min-h-screen bg-gradient-to-br from-sky-100/30 via-white to-violet-100/30 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-xl border-gray-200">
        <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="mb-4">
            <Link to="/" className="inline-flex items-center gap-2">
              <img 
                src="/lovable-uploads/ffd1ed0a-7a25-477e-bc91-1da9aca3497f.png" 
                alt="Sakha AI Logo" 
                className="w-12 h-12 object-contain"
              />
              <span className="text-3xl font-display font-semibold text-white">Sakha AI</span>
            </Link>
          </div>
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription className="text-blue-100">
            Login to continue your journey with Sakha AI
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Enter your registered phone number"
                type="tel"
                className="border-gray-300"
              />
            </div>
            
            {showOtpField ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="otp">Verification Code</Label>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-sm text-blue-600"
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
                    className="border-gray-300 pr-10"
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
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white"
              onClick={showOtpField ? handleLogin : handleSendOtp}
            >
              {showOtpField ? "Login" : "Send Verification Code"}
            </Button>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-center pb-6 border-t pt-6">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
