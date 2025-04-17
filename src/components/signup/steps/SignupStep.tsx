
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useOnboarding } from "../OnboardingContext";

interface SignupStepProps {
  onSubmit: (formValues: { name: string; mobile: string; otp: string }) => void;
  isLoading: boolean;
}

const SignupStep: React.FC<SignupStepProps> = ({ onSubmit, isLoading }) => {
  const { toast } = useToast();
  const { onboardingData } = useOnboarding();
  const [formValues, setFormValues] = useState({
    name: onboardingData.name || "",
    mobile: "",
    otp: "",
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleRequestOtp = () => {
    if (!formValues.mobile) {
      toast({
        title: "Please fill in all fields",
        description: "We need your mobile number to proceed.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "OTP Sent",
      description: "A verification code has been sent to your mobile.",
    });
    
    setFormValues({ ...formValues, otp: "1234" }); // Auto-fill OTP for demo
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="mobile">Mobile Number</Label>
        <Input 
          id="mobile" 
          name="mobile" 
          value={formValues.mobile} 
          onChange={handleFormChange} 
          required 
          type="tel"
          className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
        />
      </div>
      {formValues.mobile && (
        <Button 
          type="button" 
          variant="outline"
          onClick={handleRequestOtp}
          className="w-full border-purple-500 text-purple-600 hover:bg-purple-50"
        >
          Get OTP
        </Button>
      )}
      {formValues.mobile && (
        <div>
          <Label htmlFor="otp">OTP</Label>
          <Input 
            id="otp" 
            name="otp" 
            value={formValues.otp} 
            onChange={handleFormChange} 
            required 
            className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
          />
        </div>
      )}
      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-purple-600 to-violet-700"
        disabled={isLoading || !formValues.name || !formValues.mobile || !formValues.otp}
      >
        {isLoading ? "Creating Account..." : "Create Account"}
      </Button>
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-600 hover:underline">Login</Link>
        </p>
      </div>
    </form>
  );
};

export default SignupStep;
