
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useOnboarding } from "../OnboardingContext";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

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
  const [fact, setFact] = useState("");
  const examFacts = {
    "IIT-JEE": [
      "Did you know? The highest package offered to an IIT graduate was ₹2.4 Cr!",
      "11 of India's Fortune 500 CEOs are IIT alumni.",
      "IITs have a 98% placement rate across all branches."
    ],
    "NEET": [
      "India needs 2.5 million doctors by 2030 - huge opportunities ahead!",
      "Medical professionals are among the most respected careers globally.",
      "AIIMS Delhi sees over 10,000 patients daily - imagine the impact you'll make!"
    ],
    "UPSC": [
      "The youngest IAS officer was just 21 when selected!",
      "Over 48% of current IAS officers come from small towns.",
      "Civil servants directly impact millions of lives daily."
    ]
  };

  useEffect(() => {
    if (onboardingData.goal) {
      const facts = examFacts[onboardingData.goal as keyof typeof examFacts] || [];
      const randomFact = facts[Math.floor(Math.random() * facts.length)];
      setFact(randomFact);
    }
  }, [onboardingData.goal]);

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
    <div className="space-y-6">
      {fact && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg border border-purple-100 dark:border-purple-800"
        >
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
              <Star className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
            <p className="text-sm text-purple-700 dark:text-purple-300 font-medium">
              {fact}
            </p>
          </div>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input 
            id="name" 
            name="name" 
            value={formValues.name} 
            onChange={handleFormChange} 
            required 
            className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
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
    </div>
  );
};

export default SignupStep;
