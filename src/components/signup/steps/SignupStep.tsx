
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useOnboarding } from "../OnboardingContext";
import { motion } from "framer-motion";
import { Star, Eye, EyeOff, Info, Tabs, TabsContent, TabsList, TabsTrigger } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

interface SignupStepProps {
  onSubmit: (formValues: { 
    name: string; 
    mobile: string;
    email: string;
    password: string;
    confirmPassword: string;
    otp: string; 
    institute?: string;
    agreeTerms: boolean 
  }) => void;
  isLoading: boolean;
  handlePasswordRequirementsFocus?: () => void;
  showPasswordRequirements?: boolean;
}

const SignupStep: React.FC<SignupStepProps> = ({ 
  onSubmit, 
  isLoading,
  handlePasswordRequirementsFocus,
  showPasswordRequirements 
}) => {
  const { toast } = useToast();
  const { onboardingData } = useOnboarding();
  const [formValues, setFormValues] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
    institute: "",
    agreeTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fact, setFact] = useState("");
  const [signupMethod, setSignupMethod] = useState<"mobile" | "email">("mobile");
  const [passwordValid, setPasswordValid] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  });
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

  useEffect(() => {
    // Validate password as user types
    const password = formValues.password;
    setPasswordValid({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[@$!%*?&]/.test(password)
    });
  }, [formValues.password]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleRequestOtp = () => {
    if (signupMethod === "mobile" && !formValues.mobile) {
      toast({
        title: "Please enter mobile number",
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
    
    if (!formValues.agreeTerms) {
      toast({
        title: "Terms & Conditions Required",
        description: "Please agree to our terms and conditions to continue.",
        variant: "destructive"
      });
      return;
    }

    // Check if passwords match
    if (formValues.password !== formValues.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please ensure both passwords are the same",
        variant: "destructive"
      });
      return;
    }
    
    // Check password requirements
    const allValid = Object.values(passwordValid).every(Boolean);
    if (!allValid) {
      toast({
        title: "Password doesn't meet requirements",
        description: "Please follow the password guidelines",
        variant: "destructive"
      });
      return;
    }
    
    // Check required fields based on signup method
    if (formValues.name && formValues.password) {
      if ((signupMethod === "mobile" && formValues.mobile && formValues.otp) ||
          (signupMethod === "email" && formValues.email)) {
        onSubmit(formValues);
      } else {
        toast({
          title: "Please fill in all required fields",
          description: "All fields marked with * are required to create your account.",
          variant: "destructive"
        });
      }
    } else {
      toast({
        title: "Please fill in all required fields",
        description: "All fields marked with * are required to create your account.",
        variant: "destructive"
      });
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
      email: "google@example.com",
      password: "Google@Auth123",
      confirmPassword: "Google@Auth123",
      otp: "verified", 
      institute: onboardingData.institute || "",
      agreeTerms: true
    });
  };

  const getPasswordStrengthColor = () => {
    const validCount = Object.values(passwordValid).filter(Boolean).length;
    if (validCount <= 2) return "bg-red-500";
    if (validCount <= 4) return "bg-yellow-500";
    return "bg-green-500";
  };

  const passwordStrengthWidth = () => {
    const validCount = Object.values(passwordValid).filter(Boolean).length;
    return `${(validCount / 5) * 100}%`;
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
          <div className="mb-2">
            <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
          </div>
          <Input 
            id="name" 
            name="name" 
            value={formValues.name} 
            onChange={handleFormChange} 
            required 
            className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
            placeholder="Your full name"
          />
        </div>

        {/* Signup Method Toggle */}
        <div className="bg-gray-50 dark:bg-gray-800/50 p-2 rounded-lg">
          <div className="flex justify-center space-x-2 mb-4">
            <Button
              type="button"
              variant={signupMethod === "mobile" ? "default" : "outline"}
              className={`w-full ${signupMethod === "mobile" ? "bg-purple-600" : ""}`}
              onClick={() => setSignupMethod("mobile")}
            >
              Mobile Number
            </Button>
            <Button
              type="button"
              variant={signupMethod === "email" ? "default" : "outline"}
              className={`w-full ${signupMethod === "email" ? "bg-purple-600" : ""}`}
              onClick={() => setSignupMethod("email")}
            >
              Email Address
            </Button>
          </div>

          {signupMethod === "mobile" ? (
            <>
              <motion.div
                key="mobile-input"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-2">
                  <Label htmlFor="mobile">Mobile Number <span className="text-red-500">*</span></Label>
                </div>
                <Input 
                  id="mobile" 
                  name="mobile" 
                  value={formValues.mobile} 
                  onChange={handleFormChange} 
                  required={signupMethod === "mobile"}
                  type="tel"
                  className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                  placeholder="+91 9876543210"
                />
                
                {formValues.mobile && (
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={handleRequestOtp}
                    className="w-full mt-2 border-purple-500 text-purple-600 hover:bg-purple-50"
                  >
                    Get OTP
                  </Button>
                )}
                
                {formValues.mobile && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-3"
                  >
                    <Label htmlFor="otp">OTP <span className="text-red-500">*</span></Label>
                    <Input 
                      id="otp" 
                      name="otp" 
                      value={formValues.otp} 
                      onChange={handleFormChange} 
                      required={signupMethod === "mobile"}
                      className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                      placeholder="Enter OTP"
                    />
                  </motion.div>
                )}
              </motion.div>
            </>
          ) : (
            <motion.div
              key="email-input"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-2">
                <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
              </div>
              <Input 
                id="email" 
                name="email" 
                type="email"
                value={formValues.email} 
                onChange={handleFormChange} 
                required={signupMethod === "email"}
                className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                placeholder="Your email address"
              />
            </motion.div>
          )}
        </div>
        
        <div>
          <div className="mb-2">
            <Label htmlFor="password">Password <span className="text-red-500">*</span></Label>
          </div>
          <div className="relative">
            <Input 
              id="password" 
              name="password" 
              type={showPassword ? "text" : "password"}
              value={formValues.password} 
              onChange={handleFormChange} 
              onFocus={handlePasswordRequirementsFocus}
              required 
              className="border-purple-200 focus:border-purple-500 focus:ring-purple-500 pr-10"
              placeholder="Create a strong password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>

          {/* Password strength indicator */}
          {formValues.password && (
            <div className="mt-1">
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div className={`h-1.5 rounded-full ${getPasswordStrengthColor()}`} style={{ width: passwordStrengthWidth() }}></div>
              </div>
              <div className="text-xs text-right mt-1">
                <span className="text-gray-500">
                  Password strength: 
                  <span className={`ml-1 font-medium ${
                    Object.values(passwordValid).filter(Boolean).length <= 2 ? "text-red-500" : 
                    Object.values(passwordValid).filter(Boolean).length <= 4 ? "text-yellow-500" : 
                    "text-green-500"
                  }`}>
                    {Object.values(passwordValid).filter(Boolean).length <= 2 ? "Weak" : 
                     Object.values(passwordValid).filter(Boolean).length <= 4 ? "Medium" : 
                     "Strong"}
                  </span>
                </span>
              </div>
            </div>
          )}

          {/* Always show password requirements below the password field */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
            className="mt-2"
          >
            <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <Info className="h-4 w-4 text-blue-500 mr-2" />
              <AlertDescription className="text-xs">
                <div className="font-medium mb-1">Password must contain:</div>
                <ul className="space-y-1 pl-4 list-disc">
                  <li className={passwordValid.length ? "text-green-600" : ""}>Minimum 8 characters</li>
                  <li className={passwordValid.uppercase ? "text-green-600" : ""}>At least one uppercase letter (A-Z)</li>
                  <li className={passwordValid.lowercase ? "text-green-600" : ""}>At least one lowercase letter (a-z)</li>
                  <li className={passwordValid.number ? "text-green-600" : ""}>At least one number (0-9)</li>
                  <li className={passwordValid.special ? "text-green-600" : ""}>At least one special character (@$!%*?&)</li>
                </ul>
              </AlertDescription>
            </Alert>
          </motion.div>
        </div>

        <div>
          <div className="mb-2">
            <Label htmlFor="confirmPassword">Confirm Password <span className="text-red-500">*</span></Label>
          </div>
          <div className="relative">
            <Input 
              id="confirmPassword" 
              name="confirmPassword" 
              type={showConfirmPassword ? "text" : "password"}
              value={formValues.confirmPassword} 
              onChange={handleFormChange} 
              required 
              className="border-purple-200 focus:border-purple-500 focus:ring-purple-500 pr-10"
              placeholder="Confirm your password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
          {formValues.password && formValues.confirmPassword && formValues.password !== formValues.confirmPassword && (
            <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
          )}
        </div>
        
        <div>
          <div className="mb-2">
            <Label htmlFor="institute">School / Institute <span className="text-sm text-muted-foreground">(Optional)</span></Label>
          </div>
          <Input 
            id="institute" 
            name="institute" 
            value={formValues.institute} 
            onChange={handleFormChange}
            className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
            placeholder="Your school or institute name"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="terms" 
            checked={formValues.agreeTerms} 
            onCheckedChange={(checked) => {
              setFormValues({ ...formValues, agreeTerms: checked === true });
            }}
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I agree to the{" "}
            <Link to="/terms" className="text-purple-600 hover:underline">
              Terms & Conditions
            </Link>
          </label>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600"
          disabled={isLoading}
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-gray-900 px-2 text-gray-500">Or continue with</span>
          </div>
        </div>
        
        <Button 
          type="button"
          variant="outline" 
          className="w-full"
          onClick={handleGoogleSignup}
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="h-4 w-4 mr-2" />
          Sign up with Google
        </Button>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignupStep;
