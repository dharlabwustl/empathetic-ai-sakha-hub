
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useOnboarding } from "./OnboardingContext";
import { motion } from "framer-motion";
import { Star, HelpCircle } from "lucide-react";

interface SignupStepProps {
  onSubmit: (formValues: { name: string; mobile: string; otp: string; agreeTerms: boolean }) => void;
  isLoading: boolean;
}

const SignupStep: React.FC<SignupStepProps> = ({ onSubmit, isLoading }) => {
  const { toast } = useToast();
  const { onboardingData } = useOnboarding();
  const [formValues, setFormValues] = useState({
    name: "",
    mobile: "",
    otp: "",
    agreeTerms: false
  });
  const [fact, setFact] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [helpTooltip, setHelpTooltip] = useState<string | null>(null);
  
  const examFacts = {
    "NEET": [
      "India needs 2.5 million doctors by 2030 - huge opportunities ahead!",
      "Medical professionals are among the most respected careers globally.",
      "AIIMS Delhi sees over 10,000 patients daily - imagine the impact you'll make!"
    ]
  };

  useEffect(() => {
    if (onboardingData.examGoal) {
      const facts = examFacts[onboardingData.examGoal as keyof typeof examFacts] || [];
      const randomFact = facts[Math.floor(Math.random() * facts.length)];
      setFact(randomFact);
    }
  }, [onboardingData.examGoal]);

  // Provide field-specific help
  useEffect(() => {
    if (focusedField === 'name') {
      setHelpTooltip("Enter your full name (e.g., Raj Sharma)");
      // Optional: Speak help text using speech synthesis
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance("Please enter your full name");
        utterance.volume = 0.5;
        window.speechSynthesis.speak(utterance);
      }
    } else if (focusedField === 'mobile') {
      setHelpTooltip("Enter your 10-digit mobile number");
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance("Please enter your 10-digit mobile number");
        utterance.volume = 0.5;
        window.speechSynthesis.speak(utterance);
      }
    } else if (focusedField === 'otp') {
      setHelpTooltip("Enter the 4-digit OTP sent to your mobile");
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance("Enter the 4-digit OTP sent to your mobile");
        utterance.volume = 0.5;
        window.speechSynthesis.speak(utterance);
      }
    } else {
      setHelpTooltip(null);
    }
  }, [focusedField]);

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
    
    // Speak the message
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance("A verification code has been sent to your mobile");
      window.speechSynthesis.speak(utterance);
    }
    
    setFormValues({ ...formValues, otp: "1234" }); // Auto-fill OTP for demo
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formValues.agreeTerms) {
      toast({
        title: "Terms & Conditions Required",
        description: "Please agree to our terms and conditions to continue.",
        variant: "destructive"
      });
      
      // Speak the message
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance("Please agree to our terms and conditions to continue");
        window.speechSynthesis.speak(utterance);
      }
      return;
    }
    
    if (formValues.name && formValues.mobile && formValues.otp) {
      onSubmit(formValues);
    } else {
      toast({
        title: "Please fill in all fields",
        description: "All fields are required to create your account.",
        variant: "destructive"
      });
      
      // Speak the message
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance("Please fill in all required fields");
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  const handleGoogleSignup = () => {
    toast({
      title: "Google Sign Up",
      description: "Google authentication would be implemented here",
    });
    
    // In a real app this would trigger OAuth flow
    // For now we just pass some dummy data
    onSubmit({
      name: "Google User",
      mobile: "9999999999",
      otp: "verified", 
      agreeTerms: true
    });
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
            <p className="text-sm text-purple-700 dark:text-purple-300">
              {fact}
            </p>
          </div>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name field with voice guidance */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="name">Full Name</Label>
            {helpTooltip && focusedField === 'name' && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-blue-500"
              >
                {helpTooltip}
              </motion.div>
            )}
          </div>
          <div className="relative">
            <Input
              name="name"
              id="name"
              value={formValues.name}
              onChange={handleFormChange}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
              autoComplete="name"
              placeholder="Enter your full name"
              className={`pr-10 ${focusedField === 'name' ? 'border-blue-400 ring-1 ring-blue-200' : ''}`}
            />
            {focusedField === 'name' && (
              <motion.div 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                <HelpCircle size={16} />
              </motion.div>
            )}
          </div>
        </div>

        {/* Mobile field with voice guidance */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="mobile">Mobile Number</Label>
            {helpTooltip && focusedField === 'mobile' && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-blue-500"
              >
                {helpTooltip}
              </motion.div>
            )}
          </div>
          <div className="relative">
            <Input
              name="mobile"
              id="mobile"
              value={formValues.mobile}
              onChange={handleFormChange}
              onFocus={() => setFocusedField('mobile')}
              onBlur={() => setFocusedField(null)}
              autoComplete="tel"
              placeholder="Enter your mobile number"
              className={`pr-10 ${focusedField === 'mobile' ? 'border-blue-400 ring-1 ring-blue-200' : ''}`}
            />
            {focusedField === 'mobile' && (
              <motion.div 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                <HelpCircle size={16} />
              </motion.div>
            )}
          </div>
        </div>

        {/* OTP request */}
        <div className="space-y-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleRequestOtp}
            disabled={!formValues.mobile}
            className="w-full"
          >
            Request OTP
          </Button>
        </div>

        {/* OTP field with voice guidance */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="otp">Verification Code (OTP)</Label>
            {helpTooltip && focusedField === 'otp' && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-blue-500"
              >
                {helpTooltip}
              </motion.div>
            )}
          </div>
          <div className="relative">
            <Input
              name="otp"
              id="otp"
              value={formValues.otp}
              onChange={handleFormChange}
              onFocus={() => setFocusedField('otp')}
              onBlur={() => setFocusedField(null)}
              placeholder="Enter OTP received on your mobile"
              className={`pr-10 ${focusedField === 'otp' ? 'border-blue-400 ring-1 ring-blue-200' : ''}`}
            />
            {focusedField === 'otp' && (
              <motion.div 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                <HelpCircle size={16} />
              </motion.div>
            )}
          </div>
        </div>

        {/* Terms and conditions */}
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="agreeTerms" 
            checked={formValues.agreeTerms}
            onCheckedChange={(checked) => 
              setFormValues({ ...formValues, agreeTerms: checked as boolean })
            }
          />
          <Label htmlFor="agreeTerms" className="text-sm">
            I agree to the <Link to="#" className="text-blue-500 hover:underline">Terms & Conditions</Link>
          </Label>
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-gray-900 px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={handleGoogleSignup}
          className="w-full"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Google
        </Button>
      </form>
    </div>
  );
};

export default SignupStep;
