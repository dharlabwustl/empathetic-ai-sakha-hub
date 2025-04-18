
import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import { useOnboardingForm } from "./onboarding/hooks/useOnboardingForm";
import OnboardingStepContent from "./onboarding/components/OnboardingStepContent";
import OnboardingProgress from "./onboarding/OnboardingProgress";
import LoadingScreen from "./onboarding/LoadingScreen";
import SuccessScreen from "./onboarding/SuccessScreen";
import OnboardingFooter from "./onboarding/OnboardingFooter";
import type { UserProfileType } from "@/types/user";

interface OnboardingFlowProps {
  userProfile: UserProfileType;
  goalTitle: string;
  onComplete: () => void;
}

export default function OnboardingFlow({ userProfile, goalTitle, onComplete }: OnboardingFlowProps) {
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
    setStudyPace,
    setStudyTime,
    handleNext,
    handlePrevious,
    handleToggleSubject
  } = useOnboardingForm(goalTitle, onComplete);

  useEffect(() => {
    switch (currentStep) {
      case 1:
        setStepComplete(!!examDate);
        break;
      case 2:
        setStepComplete(studyHours > 0);
        break;
      case 3:
        setStepComplete(strongSubjects.length > 0 || weakSubjects.length > 0);
        break;
      case 4:
        setStepComplete(!!studyTime);
        break;
      case 5:
        setStepComplete(!!studyPace);
        break;
      default:
        setStepComplete(false);
    }
  }, [currentStep, examDate, studyHours, strongSubjects, weakSubjects, studyPace, studyTime]);

  if (loading) {
    return <LoadingScreen goalTitle={goalTitle} weakSubjects={weakSubjects.map(s => s.name)} />;
  }
  
  if (showSuccessCard) {
    return <SuccessScreen />;
  }

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
              <OnboardingProgress currentStep={currentStep} loading={loading} />
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
                    setStudyPace={setStudyPace}
                    setStudyTime={setStudyTime}
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
            />
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
