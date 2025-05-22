
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
  onSubmit: (formValues: { name: string; email: string; password: string; confirmPassword: string; mobile: string; otp: string; agreeTerms: boolean }) => void;
  isLoading: boolean;
  showPasswordRequirements: boolean;
  handlePasswordRequirementsFocus: () => void;
}

const SignupStep: React.FC<SignupStepProps> = ({ 
  onSubmit, 
  isLoading, 
  showPasswordRequirements,
  handlePasswordRequirementsFocus 
}) => {
  const { toast } = useToast();
  const { onboardingData } = useOnboarding();
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

  // Provide field-specific help with voice guidance
  useEffect(() => {
    if (focusedField === 'name') {
      setHelpTooltip("Enter your full name (e.g., Raj Sharma)");
      // Speak help text using speech synthesis
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance("Please enter your full name");
        utterance.volume = 0.5;
        window.speechSynthesis.speak(utterance);
      }
    } else if (focusedField === 'email') {
      setHelpTooltip("Enter your email address (e.g., your@email.com)");
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance("Please enter your email address");
        utterance.volume = 0.5;
        window.speechSynthesis.speak(utterance);
      }
    } else if (focusedField === 'password') {
      setHelpTooltip("Create a strong password");
      handlePasswordRequirementsFocus();
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance("Create a strong password with at least 8 characters including uppercase, lowercase, numbers, and special characters");
        utterance.volume = 0.5;
        window.speechSynthesis.speak(utterance);
      }
    } else if (focusedField === 'confirmPassword') {
      setHelpTooltip("Confirm your password");
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance("Please confirm your password");
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
  }, [focusedField, handlePasswordRequirementsFocus]);

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
    
    if (formValues.name && formValues.email && formValues.password && formValues.confirmPassword && formValues.mobile && formValues.otp) {
      if (formValues.password !== formValues.confirmPassword) {
        toast({
          title: "Passwords don't match",
          description: "Please make sure both passwords match.",
          variant: "destructive"
        });
        
        // Speak the message
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance("The passwords you entered don't match. Please try again.");
          window.speechSynthesis.speak(utterance);
        }
        return;
      }
      
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
      email: "google.user@example.com",
      password: "GoogleAuth123!",
      confirmPassword: "GoogleAuth123!",
      mobile: "9999999999",
      otp: "verified", 
      agreeTerms: true
    });
  };

  // Voice command support for form filling
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      return;
    }
    
    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      console.log("Voice command detected:", transcript);
      
      // Process field-specific commands
      if (transcript.includes('name') && transcript.includes('is')) {
        const nameMatch = transcript.match(/(?:my name is|name is) (.*)/i);
        if (nameMatch && nameMatch[1]) {
          const name = nameMatch[1].trim();
          setFormValues(prev => ({ ...prev, name }));
          
          // Announce change
          const utterance = new SpeechSynthesisUtterance(`Name set to ${name}`);
          window.speechSynthesis.speak(utterance);
          
          // Focus next field
          setTimeout(() => {
            const emailField = document.getElementById('email');
            if (emailField) emailField.focus();
          }, 1000);
        }
      } else if (transcript.includes('email') && (transcript.includes('is') || transcript.includes('address'))) {
        // Extract email with a simple pattern matching
        // In a real app, you'd want more sophisticated parsing
        const emailMatch = transcript.match(/(?:my email is|email is|email address is) (.*?)(?:dot|\.| ) (.*)/i);
        if (emailMatch) {
          const emailText = `${emailMatch[1].replace(' at ', '@').replace(' dot ', '.')}.${emailMatch[2]}`;
          setFormValues(prev => ({ ...prev, email: emailText }));
          
          // Announce change
          const utterance = new SpeechSynthesisUtterance(`Email set to ${emailText.split('').join(' ')}`);
          window.speechSynthesis.speak(utterance);
          
          // Focus next field
          setTimeout(() => {
            const passwordField = document.getElementById('password');
            if (passwordField) passwordField.focus();
          }, 1000);
        }
      } else if (transcript.includes('mobile') || transcript.includes('phone')) {
        // Extract phone number (digits only)
        const digits = transcript.replace(/\D/g, '');
        if (digits.length >= 10) {
          const mobile = digits.slice(0, 10);
          setFormValues(prev => ({ ...prev, mobile }));
          
          // Announce change
          const utterance = new SpeechSynthesisUtterance(`Mobile number set to ${mobile.split('').join(' ')}`);
          window.speechSynthesis.speak(utterance);
          
          // Request OTP automatically
          setTimeout(handleRequestOtp, 1000);
        }
      } else if (transcript.includes('agree') || transcript.includes('terms')) {
        setFormValues(prev => ({ ...prev, agreeTerms: true }));
        
        // Announce change
        const utterance = new SpeechSynthesisUtterance(`Terms and conditions accepted`);
        window.speechSynthesis.speak(utterance);
      } else if (transcript.includes('submit') || transcript.includes('create account')) {
        // Trigger form submission
        const submitBtn = document.querySelector('button[type="submit"]');
        if (submitBtn) {
          (submitBtn as HTMLButtonElement).click();
        }
      }
    };
    
    recognition.onend = () => {
      // Restart recognition after brief pause
      setTimeout(() => {
        if (document.visibilityState === 'visible') {
          recognition.start();
        }
      }, 1000);
    };
    
    recognition.onerror = (event) => {
      console.log('Speech recognition error', event.error);
      
      // Restart recognition after error
      setTimeout(() => {
        if (document.visibilityState === 'visible') {
          recognition.start();
        }
      }, 3000);
    };
    
    // Start recognition
    setTimeout(() => {
      recognition.start();
    }, 2000);
    
    return () => {
      recognition.abort();
    };
  }, [handleRequestOtp]);

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

        {/* Email field with voice guidance */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="email">Email Address</Label>
            {helpTooltip && focusedField === 'email' && (
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
              name="email"
              id="email"
              type="email"
              value={formValues.email}
              onChange={handleFormChange}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              autoComplete="email"
              placeholder="Enter your email address"
              className={`pr-10 ${focusedField === 'email' ? 'border-blue-400 ring-1 ring-blue-200' : ''}`}
            />
            {focusedField === 'email' && (
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
        
        {/* Password fields */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            {helpTooltip && focusedField === 'password' && (
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
              name="password"
              id="password"
              type="password"
              value={formValues.password}
              onChange={handleFormChange}
              onFocus={() => {
                setFocusedField('password');
                handlePasswordRequirementsFocus();
              }}
              onBlur={() => setFocusedField(null)}
              autoComplete="new-password"
              placeholder="Create a password"
              className={`pr-10 ${focusedField === 'password' ? 'border-blue-400 ring-1 ring-blue-200' : ''}`}
            />
            {focusedField === 'password' && (
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
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            {helpTooltip && focusedField === 'confirmPassword' && (
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
              name="confirmPassword"
              id="confirmPassword"
              type="password"
              value={formValues.confirmPassword}
              onChange={handleFormChange}
              onFocus={() => setFocusedField('confirmPassword')}
              onBlur={() => setFocusedField(null)}
              autoComplete="new-password"
              placeholder="Confirm your password"
              className={`pr-10 ${focusedField === 'confirmPassword' ? 'border-blue-400 ring-1 ring-blue-200' : ''}`}
            />
            {focusedField === 'confirmPassword' && (
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

      {/* Voice commands help text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-3"
      >
        <p className="text-xs text-blue-700 dark:text-blue-300 text-center">
          <span className="font-semibold block mb-1">Voice commands available!</span>
          Try saying "My name is [your name]" or "My email is [your email]"
        </p>
      </motion.div>
    </div>
  );
};

export default SignupStep;
