
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

const SignupContent = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { onboardingData, setOnboardingData, currentStep, goToNextStep } = useOnboarding();
  const [isLoading, setIsLoading] = useState(false);

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
      targetExamDate: data.examDate // Save exam date specifically
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

  const handleSignupSubmit = async (formValues: { name: string; mobile: string; otp: string; agreeTerms: boolean }) => {
    setIsLoading(true);

    try {
      // Set name from form data
      const finalData = {
        ...onboardingData,
        name: formValues.name,
        mobile: formValues.mobile,
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

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={cardVariants}
      className="w-full max-w-md mx-auto"
    >
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
          </motion.div>

          <SignupProgressBar currentStep={currentStep} />

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
    </motion.div>
  );
};

export default SignupContent;
