
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { CheckCircle, Loader2 } from 'lucide-react';

interface MobileSignupProps {
  onComplete: (userData: {
    name: string;
    phone: string;
    email?: string;
    goal: string;
  }) => void;
}

const MobileSignup: React.FC<MobileSignupProps> = ({ onComplete }) => {
  const { toast } = useToast();
  const [step, setStep] = useState<'phone' | 'verification' | 'details'>('phone');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    goal: 'JEE',
    otp: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validatePhone = () => {
    // Basic validation for Indian phone numbers
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(formData.phone);
  };

  const handleSendOtp = async () => {
    if (!validatePhone()) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid 10-digit Indian mobile number",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate OTP sending delay
    setTimeout(() => {
      setIsLoading(false);
      setStep('verification');
      toast({
        title: "OTP Sent",
        description: "A verification code has been sent to your mobile number",
      });
      
      // For demo purposes, let's set a dummy OTP
      setFormData(prev => ({ ...prev, otp: "1234" }));
    }, 1500);
  };

  const handleVerifyOtp = () => {
    setIsLoading(true);
    
    // Simulate verification delay
    setTimeout(() => {
      setIsLoading(false);
      setStep('details');
      toast({
        title: "Verification Successful",
        description: "Your phone number has been verified",
      });
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name) {
      toast({
        title: "Name required",
        description: "Please enter your name to continue",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate account creation delay
    setTimeout(() => {
      setIsLoading(false);
      onComplete({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        goal: formData.goal
      });
      
      toast({
        title: "Account Created",
        description: "Welcome to Sakha AI",
      });
    }, 1500);
  };
  
  const examOptions = ["JEE", "NEET", "UPSC", "CAT", "Bank Exam", "GATE", "Other"];
  
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Get Started</h2>
        <p className="text-gray-600">Create your account to start learning</p>
      </div>
      
      {step === 'phone' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <div className="mb-6">
            <Label htmlFor="phone">Mobile Number</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Enter your 10-digit number"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1"
              disabled={isLoading}
              maxLength={10}
            />
            <p className="mt-1 text-xs text-gray-500">We'll send you a verification code</p>
          </div>
          
          <Button
            type="button"
            className="w-full bg-violet-600 hover:bg-violet-700"
            onClick={handleSendOtp}
            disabled={isLoading || !formData.phone}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending OTP...
              </>
            ) : (
              "Get OTP"
            )}
          </Button>
        </motion.div>
      )}
      
      {step === 'verification' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <div className="mb-6">
            <Label htmlFor="otp">Enter Verification Code</Label>
            <div className="flex items-center gap-2 mt-1">
              <Input
                id="otp"
                name="otp"
                placeholder="Enter 4-digit OTP"
                value={formData.otp}
                onChange={handleChange}
                disabled={isLoading}
                maxLength={4}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleSendOtp}
                disabled={isLoading}
              >
                Resend
              </Button>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              OTP sent to +91 {formData.phone}
            </p>
          </div>
          
          <Button
            type="button"
            className="w-full bg-violet-600 hover:bg-violet-700"
            onClick={handleVerifyOtp}
            disabled={isLoading || formData.otp.length < 4}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify"
            )}
          </Button>
        </motion.div>
      )}
      
      {step === 'details' && (
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <div className="flex items-center gap-2 text-green-600 mb-4 p-2 bg-green-50 rounded-md">
              <CheckCircle size={16} />
              <span className="text-sm">Phone number verified</span>
            </div>
            
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1"
              disabled={isLoading}
              required
            />
          </div>
          
          <div className="mb-4">
            <Label htmlFor="email">Email (Optional)</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1"
              disabled={isLoading}
            />
          </div>
          
          <div className="mb-6">
            <Label htmlFor="goal">Preparing for</Label>
            <select
              id="goal"
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
              disabled={isLoading}
            >
              {examOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          
          <Button
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-700"
            disabled={isLoading}
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
        </motion.form>
      )}
    </div>
  );
};

export default MobileSignup;
