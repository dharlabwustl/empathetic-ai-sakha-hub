
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
    setOnboardingData({ ...onboardingData, role });
    goToNextStep();
  };

  const handleGoalSelect = (goal: string) => {
    setOnboardingData({ ...onboardingData, goal });
    goToNextStep();
  };

  const handleExamDateSelect = (date: Date) => {
    setOnboardingData({ ...onboardingData, examDate: date });
    goToNextStep();
  };

  const handleStudyHoursSelect = (hours: number) => {
    setOnboardingData({ ...onboardingData, studyHours: hours });
    goToNextStep();
  };

  const handleSubjectsSelect = (strongSubjects: string[], weakSubjects: string[]) => {
    setOnboardingData({ ...onboardingData, strongSubjects, weakSubjects });
    goToNextStep();
  };

  const handleStudyPaceSelect = (pace: string) => {
    setOnboardingData({ ...onboardingData, studyPace: pace });
    goToNextStep();
  };

  const handleStudyTimeSelect = (time: string) => {
    setOnboardingData({ ...onboardingData, studyTime: time });
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
    setOnboardingData({ ...onboardingData, personality });
    goToNextStep();
  };

  const handleMoodSelect = (mood: MoodType) => {
    setOnboardingData({ ...onboardingData, mood });
    goToNextStep();
  };

  const handleHabitsSubmit = (habits: Record<string, string>) => {
    setOnboardingData({ ...onboardingData, habits });
    goToNextStep();
  };

  const handleInterestsSubmit = (interests: string) => {
    setOnboardingData({ ...onboardingData, interests: interests.split(',').map(i => i.trim()) });
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

      // Redirect to welcome screen
      setTimeout(() => {
        navigate("/welcome");
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
    handleExamDateSelect,
    handleStudyHoursSelect,
    handleSubjectsSelect,
    handleStudyPaceSelect,
    handleStudyTimeSelect,
    handleDemographicsSubmit,
    handlePersonalitySelect,
    handleMoodSelect,
    handleHabitsSubmit,
    handleInterestsSubmit,
    handleSignupSubmit,
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
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
        role: UserRole.Student,
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
      variants={cardVariants}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <Card className="relative overflow-hidden bg-white dark:bg-gray-900 shadow-xl rounded-xl">
        <div className="p-6 md:p-8">
          <div className="flex flex-col items-center mb-6">
            <PrepzrLogo width={72} height={72} />
            <h1 className="mt-4 text-2xl font-bold">Join PREPZR</h1>
            <p className="text-gray-500 text-sm text-center mt-1">
              Create your personalized study partner
            </p>
          </div>

          <SignupProgressBar currentStep={currentStep} />

          <div className="mt-6">
            <StepRenderer 
              step={currentStep}
              onboardingData={onboardingData}
              handlers={handlers}
              isLoading={isLoading}
            />
          </div>

          {currentStep === "role" && (
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-300"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white dark:bg-gray-900 px-2 text-gray-500">Or sign up with</span>
                </div>
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  className="w-full flex justify-center items-center gap-2 bg-white border border-gray-300 rounded-md py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  onClick={handleGoogleSignup}
                >
                  <img src="https://www.google.com/favicon.ico" alt="Google" className="h-4 w-4" />
                  Sign up with Google
                </button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default SignupContent;
