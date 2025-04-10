
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface SignupStepProps {
  onSubmit: (formValues: { name: string; mobile: string; otp: string }) => void;
  isLoading: boolean;
}

const SignupStep: React.FC<SignupStepProps> = ({ onSubmit, isLoading }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: "",
    mobile: "",
    otp: "",
  });

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
        <Label htmlFor="name">Full Name</Label>
        <Input 
          id="name" 
          name="name" 
          value={formValues.name} 
          onChange={handleFormChange} 
          required 
        />
      </div>
      <div>
        <Label htmlFor="mobile">Mobile Number</Label>
        <Input 
          id="mobile" 
          name="mobile" 
          value={formValues.mobile} 
          onChange={handleFormChange} 
          required 
          type="tel"
        />
      </div>
      {formValues.mobile && (
        <Button 
          type="button" 
          className="w-full" 
          variant="outline"
          onClick={handleRequestOtp}
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
          />
        </div>
      )}
      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-700"
        disabled={isLoading || !formValues.name || !formValues.mobile || !formValues.otp}
      >
        {isLoading ? "Creating Account..." : "Create Account"}
      </Button>
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">Login</Link>
        </p>
      </div>
    </form>
  );
};

export default SignupStep;
