
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useOnboarding } from "./OnboardingContext";
import SignupProgressBar from "./SignupProgressBar";
import StepRenderer from "./StepRenderer";
import PrepzrLogo from "@/components/common/PrepzrLogo";
import { MoodType, PersonalityType, UserRole } from "@/types/user/base";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Info } from "lucide-react";
import SignupVoiceAssistant from "@/components/voice/SignupVoiceAssistant";

const SignupContent = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { onboardingData, setOnboardingData, currentStep, goToNextStep } = useOnboarding();
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(true);

  const handleRoleSelect = (role: UserRole) => {
    // Only allow student role
    setOnboardingData({ ...onboardingData, role: UserRole.Student });
    goToNextStep();
  };

  const handleGoalSelect = (goal: string) => {
    setOnboardingData({ ...onboardingData, examGoal: goal });
    goToNextStep();
  };

  const handleDemographicsSubmit = (data: Record<string, string>) => {
    setOnboardingData({ 
      ...onboardingData, 
      demographics: data,
      targetExamDate: data.examDate, // Save exam date specifically
      institute: data.institute // Save institute information
    });
    goToNextStep();
  };

  const handlePersonalitySelect = (personality: PersonalityType) => {
    setOnboardingData({ ...onboardingData, personalityType: personality });
    goToNextStep();
  };

  const handleMoodSelect = (mood: MoodType) => {
    setOnboardingData({ ...onboardingData, mood });
    goToNextStep();
  };
  
  const handleStudyTimeSelect = (time: "Morning" | "Afternoon" | "Evening" | "Night") => {
    setOnboardingData({ ...onboardingData, studyTime: time });
    goToNextStep();
  };
  
  const handleStudyPaceSelect = (pace: "Aggressive" | "Balanced" | "Relaxed") => {
    setOnboardingData({ ...onboardingData, studyPace: pace });
    goToNextStep();
  };
  
  const handleStudyHoursSelect = (hours: number) => {
    setOnboardingData({ ...onboardingData, dailyStudyHours: hours });
    goToNextStep();
  };

  const handleHabitsSubmit = (habits: Record<string, string>) => {
    setOnboardingData({ ...onboardingData, habits });
    goToNextStep();
  };

  const handleInterestsSubmit = (interests: string) => {
    setOnboardingData({ ...onboardingData, interests });
    goToNextStep();
  };

  const handlePasswordRequirementsFocus = () => {
    setShowPasswordRequirements(true);
  };

  const handleSignupSubmit = async (formValues: { 
    name: string; 
    email: string;
    password: string;
    confirmPassword: string;
    mobile: string; 
    otp: string; 
    institute?: string; 
    agreeTerms: boolean 
  }) => {
    setIsLoading(true);

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    if (!passwordRegex.test(formValues.password)) {
      toast({
        title: "Password doesn't meet requirements",
        description: "Please follow the password guidelines",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }
    
    if (formValues.password !== formValues.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please ensure both passwords are the same",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    try {
      // Set name and other fields from form data
      const finalData = {
        ...onboardingData,
        name: formValues.name,
        email: formValues.email,
        mobile: formValues.mobile,
        institute: formValues.institute || onboardingData.institute
      };

      setOnboardingData(finalData);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Store data in localStorage
      localStorage.setItem("userData", JSON.stringify({
        ...finalData,
        loginCount: 1,
        createdAt: new Date().toISOString(),
      }));

      // Show success message
      toast({
        title: "Account created successfully!",
        description: "Redirecting to your personalized dashboard.",
      });

      // Go to welcome flow
      setTimeout(() => {
        navigate("/welcome-flow?completedOnboarding=true&new=true");
      }, 1000);
    } catch (error) {
      console.error("Error creating account:", error);
      toast({
        title: "Account creation failed",
        description: "Please try again later.",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  const handleVoiceInput = (fieldName: string, text: string) => {
    // Find the input element by field name and set its value
    const inputElement = document.getElementById(fieldName) as HTMLInputElement;
    if (inputElement) {
      inputElement.value = text;
      inputElement.dispatchEvent(new Event('input', { bubbles: true }));
      inputElement.dispatchEvent(new Event('change', { bubbles: true }));
    }
  };
  
  const toggleVoiceAssistant = () => {
    setShowVoiceAssistant(!showVoiceAssistant);
  };

  const handlers = {
    handleRoleSelect,
    handleGoalSelect,
    handleDemographicsSubmit,
    handlePersonalitySelect,
    handleMoodSelect,
    handleStudyTimeSelect,
    handleStudyPaceSelect,
    handleStudyHoursSelect,
    handleHabitsSubmit,
    handleInterestsSubmit,
    handleSignupSubmit,
    handlePasswordRequirementsFocus,
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  const handleGoogleSignup = () => {
    toast({
      title: "Google Sign Up",
      description: "Google authentication would be implemented here.",
    });

    // Mock successful signup for demonstration
    setTimeout(() => {
      // Store mock data in localStorage
      localStorage.setItem("userData", JSON.stringify({
        name: "Google User",
        email: "googleuser@example.com",
        role: "student",
        loginCount: 1,
        createdAt: new Date().toISOString(),
        onboardingCompleted: false,
      }));

      navigate("/welcome");
    }, 2000);
  };
  
  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={cardVariants}
      className="w-full max-w-md mx-auto"
    >
      {/* Back to Home Button */}
      <motion.button
        onClick={handleBackToHome}
        className="mb-4 flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        <span>Back to Home</span>
      </motion.button>
      
      <Card className="relative overflow-hidden bg-white dark:bg-gray-900 shadow-2xl rounded-xl border-0 transform transition-all duration-500 hover:shadow-purple-200/30 dark:hover:shadow-purple-500/10">
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        <div className="p-6 md:p-8">
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-center mb-6"
          >
            <PrepzrLogo width={120} height={120} className="animate-pulse" />
            <motion.h1 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-4 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
            >
              Join PREPZR
            </motion.h1>
            <motion.p 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-gray-500 text-sm text-center mt-1"
            >
              Create your personalized study partner
            </motion.p>
            
            {/* Voice Assistant Toggle */}
            <motion.button
              onClick={toggleVoiceAssistant}
              className={`mt-2 text-xs px-3 py-1 rounded-full transition-colors ${
                showVoiceAssistant 
                  ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Voice Assistance: {showVoiceAssistant ? 'On' : 'Off'}
            </motion.button>
          </motion.div>

          <SignupProgressBar currentStep={currentStep} />

          {/* Password Requirements - shown conditionally */}
          {showPasswordRequirements && currentStep === "account" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-4"
            >
              <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                <Info className="h-4 w-4 text-blue-500 mr-2" />
                <AlertDescription className="text-xs">
                  <div className="font-medium mb-1">Password must contain:</div>
                  <ul className="space-y-1 pl-4 list-disc">
                    <li>Minimum 8 characters</li>
                    <li>At least one uppercase letter (A-Z)</li>
                    <li>At least one lowercase letter (a-z)</li>
                    <li>At least one number (0-9)</li>
                    <li>At least one special character (@$!%*?&)</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6"
            >
              <StepRenderer 
                step={currentStep}
                onboardingData={onboardingData}
                handlers={handlers}
                isLoading={isLoading}
                showPasswordRequirements={showPasswordRequirements}
              />
            </motion.div>
          </AnimatePresence>

          {currentStep === "role" && (
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-300 dark:border-gray-700"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white dark:bg-gray-900 px-2 text-gray-500 dark:text-gray-400">Or sign up with</span>
                </div>
              </div>
              <motion.div 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-4"
              >
                <button
                  type="button"
                  className="w-full flex justify-center items-center gap-2 bg-white border border-gray-300 rounded-md py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-300 hover:shadow-md dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                  onClick={handleGoogleSignup}
                >
                  <img src="https://www.google.com/favicon.ico" alt="Google" className="h-4 w-4" />
                  Sign up with Google
                </button>
              </motion.div>
            </div>
          )}
        </div>
      </Card>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-6 text-center text-xs text-gray-500"
      >
        <p>By signing up, you agree to our <a href="/terms" className="text-blue-600 hover:underline transition-colors">Terms of Service</a> and <a href="/privacy" className="text-blue-600 hover:underline transition-colors">Privacy Policy</a></p>
      </motion.div>
      
      {/* Voice Assistant Component */}
      <SignupVoiceAssistant 
        onVoiceInput={handleVoiceInput}
        currentStep={currentStep}
        isOpen={showVoiceAssistant}
      />
    </motion.div>
  );
};

export default SignupContent;
