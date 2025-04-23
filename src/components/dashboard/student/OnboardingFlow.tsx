
import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import { useOnboardingForm } from "./onboarding/hooks/useOnboardingForm";
import OnboardingStepContent from "./onboarding/components/OnboardingStepContent";
import OnboardingProgress from "./onboarding/OnboardingProgress";
import LoadingScreen from "./onboarding/LoadingScreen";
import SuccessScreen from "./onboarding/SuccessScreen";
import OnboardingFooter from "./onboarding/OnboardingFooter";
import { useToast } from "@/hooks/use-toast";
import type { UserProfileType } from "@/types/user";

interface OnboardingFlowProps {
  userProfile: UserProfileType;
  goalTitle: string;
  onComplete: () => void;
}

export default function OnboardingFlow({ userProfile, goalTitle, onComplete }: OnboardingFlowProps) {
  const { toast } = useToast();
  
  // Check if we have data from localStorage that was collected during signup
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      console.log("Retrieved onboarding data from signup:", parsedData);
      
      // If we have study plan data, use it to prefill the onboarding form
      if (parsedData.studyPlan) {
        const { 
          examDate, 
          studyHoursPerDay, 
          strongSubjects, 
          weakSubjects, 
          studyPace, 
          preferredStudyTime 
        } = parsedData.studyPlan;
        
        // This would be where we'd set values from the stored data
        // For now, we'll just log that we found it
        console.log("Found study plan data to prefill onboarding:", {
          examDate, 
          studyHoursPerDay, 
          strongSubjects, 
          weakSubjects, 
          studyPace, 
          preferredStudyTime
        });
        
        toast({
          title: "Welcome to your personalized study journey!",
          description: "We've retrieved your preferences from signup. Let's complete your study plan setup."
        });
      }
    }
  }, [toast]);

  const {
    currentStep,
    stepComplete,
    loading,
    showSuccessCard,
    examDate,
    studyHours,
    strongSubjects,
    weakSubjects,
    studyPace,
    studyTime,
    setExamDate,
    setStudyHours,
    setStudyPace: originalSetStudyPace,
    setStudyTime: originalSetStudyTime,
    handleNext,
    handlePrevious,
    handleToggleSubject,
    savingStudyPlan
  } = useOnboardingForm(goalTitle, onComplete);

  // Create adapter functions for type compatibility
  const setPaceAdapter = (pace: "Aggressive" | "Balanced" | "Relaxed") => {
    const mappedPace = 
      pace === "Aggressive" ? "fast" :
      pace === "Balanced" ? "moderate" : "slow";
    originalSetStudyPace(mappedPace);
  };

  const setTimeAdapter = (time: "Morning" | "Afternoon" | "Evening" | "Night") => {
    const mappedTime = time.toLowerCase() as "morning" | "afternoon" | "evening" | "night";
    originalSetStudyTime(mappedTime);
  };

  if (loading) {
    return <LoadingScreen goalTitle={goalTitle} weakSubjects={weakSubjects.map(s => s.name)} />;
  }
  
  if (showSuccessCard) {
    return <SuccessScreen />;
  }

  // Build the study plan data for UI display and backend storage
  const studyPlanData = {
    examGoal: goalTitle,
    examDate: examDate?.toISOString() || new Date().toISOString(),
    daysLeft: examDate ? Math.ceil((examDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24)) : 180,
    studyHoursPerDay: studyHours,
    strongSubjects: strongSubjects.map(s => s.name),
    weakSubjects: weakSubjects.map(s => s.name),
    studyPace,
    preferredStudyTime: studyTime
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100/10 via-white to-violet-100/10 dark:from-purple-900/10 dark:via-gray-900 dark:to-violet-900/10 p-4">
      <motion.div
        className="max-w-4xl w-full"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: {
              duration: 0.5,
              ease: "easeOut"
            }
          }
        }}
      >
        <Card className="shadow-xl overflow-hidden border-0">
          <CardHeader className="bg-gradient-to-br from-purple-600 to-violet-700 text-white p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold">Let's create your personalized study plan</h2>
                <p className="text-purple-100">For {goalTitle}</p>
              </div>
              <OnboardingProgress currentStep={currentStep} loading={loading || savingStudyPlan} />
            </div>
          </CardHeader>
          
          <CardContent className="p-6">
            <div className="py-4 text-gray-900 dark:text-gray-100">
              <div className="mb-6">
                <AnimatePresence mode="wait">
                  <OnboardingStepContent
                    currentStep={currentStep}
                    examDate={examDate}
                    studyHours={studyHours}
                    strongSubjects={strongSubjects}
                    weakSubjects={weakSubjects}
                    studyPace={studyPace}
                    studyTime={studyTime}
                    examGoal={goalTitle}
                    setExamDate={setExamDate}
                    setStudyHours={setStudyHours}
                    handleToggleSubject={handleToggleSubject}
                    setStudyPace={originalSetStudyPace}
                    setStudyTime={originalSetStudyTime}
                    studyPlanData={studyPlanData}
                  />
                </AnimatePresence>
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <OnboardingFooter 
              currentStep={currentStep}
              stepComplete={stepComplete}
              handlePrevious={handlePrevious}
              handleNext={handleNext}
              loading={savingStudyPlan}
            />
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
