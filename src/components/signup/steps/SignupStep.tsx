
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Loader2 } from "lucide-react";

interface SignupStepProps {
  onSubmit: (formValues: { name: string; mobile: string; otp: string }) => void;
  isLoading: boolean;
}

const SignupStep: React.FC<SignupStepProps> = ({ onSubmit, isLoading }) => {
  const { toast } = useToast();
  const [formValues, setFormValues] = useState({
    name: "",
    mobile: "",
    otp: "",
  });
  const [otpSent, setOtpSent] = useState(false);
  const [otpRequesting, setOtpRequesting] = useState(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleRequestOtp = () => {
    if (!formValues.name || !formValues.mobile) {
      toast({
        title: "Please fill in all fields",
        description: "We need your name and mobile number to proceed.",
        variant: "destructive"
      });
      return;
    }
    
    setOtpRequesting(true);
    
    // Simulate OTP sending
    setTimeout(() => {
      toast({
        title: "OTP Sent",
        description: "A verification code has been sent to your mobile.",
      });
      
      setOtpSent(true);
      setOtpRequesting(false);
      setFormValues({ ...formValues, otp: "1234" }); // Auto-fill OTP for demo
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formValues.name && formValues.mobile && formValues.otp) {
      // Instead of directly navigating, let the StepHandler handle the completion
      onSubmit(formValues);
    } else {
      toast({
        title: "Please fill in all fields",
        description: "All fields are required to create your account.",
        variant: "destructive"
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="bg-violet-50 dark:bg-violet-900/20 p-4 rounded-lg border border-violet-100 dark:border-violet-800/30 mb-6">
        <h3 className="text-lg font-medium text-violet-800 dark:text-violet-300 mb-1">Join Sakha AI</h3>
        <p className="text-sm text-violet-600 dark:text-violet-400">
          Create your account to start your personalized learning journey
        </p>
      </div>
      
      <div>
        <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Full Name</Label>
        <Input 
          id="name" 
          name="name" 
          value={formValues.name} 
          onChange={handleFormChange} 
          required 
          placeholder="Enter your full name"
          className="mt-1 border-gray-300 focus:border-violet-500 focus:ring-violet-500 dark:border-gray-700 dark:bg-gray-800"
        />
      </div>
      
      <div>
        <Label htmlFor="mobile" className="text-gray-700 dark:text-gray-300">Mobile Number</Label>
        <Input 
          id="mobile" 
          name="mobile" 
          value={formValues.mobile} 
          onChange={handleFormChange} 
          required 
          type="tel"
          placeholder="Enter your mobile number"
          className="mt-1 border-gray-300 focus:border-violet-500 focus:ring-violet-500 dark:border-gray-700 dark:bg-gray-800"
        />
      </div>
      
      {formValues.mobile && (
        <Button 
          type="button" 
          variant="outline"
          onClick={handleRequestOtp}
          disabled={otpRequesting || otpSent}
          className={`w-full ${otpSent ? 'border-green-500 text-green-600 bg-green-50 dark:bg-green-900/20' : 'border-violet-500 text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-900/20'}`}
        >
          {otpRequesting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending OTP...
            </>
          ) : otpSent ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
              OTP Sent Successfully
            </>
          ) : (
            "Get OTP"
          )}
        </Button>
      )}
      
      {(formValues.mobile && otpSent) && (
        <div className="animate-fadeIn">
          <Label htmlFor="otp" className="text-gray-700 dark:text-gray-300">Verification Code (OTP)</Label>
          <Input 
            id="otp" 
            name="otp" 
            value={formValues.otp} 
            onChange={handleFormChange} 
            required 
            placeholder="Enter the OTP sent to your mobile"
            className="mt-1 border-gray-300 focus:border-violet-500 focus:ring-violet-500 dark:border-gray-700 dark:bg-gray-800"
          />
          <p className="text-xs text-gray-500 mt-1">For demo purposes, OTP is auto-filled</p>
        </div>
      )}
      
      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-violet-600 to-indigo-700 hover:from-violet-700 hover:to-indigo-800 transition-all duration-300 py-6"
        disabled={isLoading || !formValues.name || !formValues.mobile || !formValues.otp}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating Account...
          </>
        ) : (
          "Create Account"
        )}
      </Button>
      
      <div className="text-center pt-2">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-violet-600 dark:text-violet-400 hover:underline font-medium">
            Login here
          </Link>
        </p>
      </div>
    </form>
  );
};

export default SignupStep;
