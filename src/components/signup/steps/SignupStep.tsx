
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface SignupStepProps {
  onSubmit: (formValues: { name: string; mobile: string; otp: string; agreeTerms: boolean }) => void;
  isLoading: boolean;
}

const SignupStep: React.FC<SignupStepProps> = ({ onSubmit, isLoading }) => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!name.trim()) newErrors.name = "Name is required";
    if (!mobile.trim()) newErrors.mobile = "Mobile number is required";
    else if (!/^\d{10}$/.test(mobile)) newErrors.mobile = "Please enter a valid 10-digit mobile number";
    if (!otp.trim()) newErrors.otp = "OTP is required";
    if (!agreeTerms) newErrors.agreeTerms = "You must agree to the terms and conditions";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({ name, mobile, otp, agreeTerms });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold mb-2">Create Your Account</h2>
        <p className="text-gray-500">
          Enter your details to get started with PREPZR.
        </p>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
        </div>
        
        <div>
          <Label htmlFor="mobile">Mobile Number</Label>
          <Input
            id="mobile"
            type="tel"
            placeholder="10-digit mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
          />
          {errors.mobile && <p className="text-sm text-red-500 mt-1">{errors.mobile}</p>}
        </div>
        
        <div className="flex gap-3">
          <div className="flex-1">
            <Label htmlFor="otp">OTP</Label>
            <Input
              id="otp"
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
            />
            {errors.otp && <p className="text-sm text-red-500 mt-1">{errors.otp}</p>}
          </div>
          <div className="self-end">
            <Button type="button" variant="outline" className="h-10">
              Get OTP
            </Button>
          </div>
        </div>
        
        <div className="flex items-start space-x-2 pt-2">
          <Checkbox 
            id="agreeTerms" 
            checked={agreeTerms} 
            onCheckedChange={(checked) => setAgreeTerms(checked === true)} 
          />
          <Label htmlFor="agreeTerms" className="text-sm leading-tight">
            I agree to the <a href="#" className="text-primary underline">Terms and Conditions</a> and <a href="#" className="text-primary underline">Privacy Policy</a>
          </Label>
        </div>
        {errors.agreeTerms && <p className="text-sm text-red-500 mt-1">{errors.agreeTerms}</p>}
      </div>
      
      <Button
        type="submit"
        className="w-full mt-6"
        disabled={isLoading}
      >
        {isLoading ? "Creating Account..." : "Create Account"}
      </Button>
      
      <p className="text-sm text-center text-gray-500 mt-4">
        Already have an account? <a href="/login" className="text-primary underline">Login</a>
      </p>
    </form>
  );
};

export default SignupStep;
