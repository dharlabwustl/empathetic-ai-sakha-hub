
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import { format, addMonths } from "date-fns";
import { UserProfileType } from "@/types/user";

// Import our new components
import ExamDateStep from "./onboarding/ExamDateStep";
import StudyHoursStep from "./onboarding/StudyHoursStep";
import SubjectsStep from "./onboarding/SubjectsStep";
import StudyPaceStep from "./onboarding/StudyPaceStep";
import StudyTimeStep from "./onboarding/StudyTimeStep";
import OnboardingFooter from "./onboarding/OnboardingFooter";
import OnboardingProgress from "./onboarding/OnboardingProgress";
import LoadingScreen from "./onboarding/LoadingScreen";
import SuccessScreen from "./onboarding/SuccessScreen";
import { getSubjectsForGoal } from "./onboarding/SubjectData";

interface OnboardingFlowProps {
  userProfile: UserProfileType;
  goalTitle: string;
  onComplete: () => void;
}

export default function OnboardingFlow({ userProfile, goalTitle, onComplete }: OnboardingFlowProps) {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [stepComplete, setStepComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessCard, setShowSuccessCard] = useState(false);
  
  // Form state
  const [examDate, setExamDate] = useState<Date | undefined>(addMonths(new Date(), 6));
  const [studyHours, setStudyHours] = useState<number>(4);
  const [strongSubjects, setStrongSubjects] = useState<string[]>([]);
  const [weakSubjects, setWeakSubjects] = useState<string[]>([]);
  const [studyPace, setStudyPace] = useState<"Aggressive" | "Balanced" | "Relaxed">("Balanced");
  const [studyTime, setStudyTime] = useState<"Morning" | "Afternoon" | "Evening" | "Night">("Evening");

  // Get subjects for the goal
  const subjects = getSubjectsForGoal(goalTitle);
  
  // Find normalized goal title for recommendations
  const normalizedGoalTitle = Object.keys(subjectsByGoal).find(
    goal => goalTitle.toLowerCase().includes(goal.toLowerCase())
  );

  useEffect(() => {
    // Check if the current step is complete
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
        setStepComplete(!!studyPace);
        break;
      case 5:
        setStepComplete(!!studyTime);
        break;
      default:
        setStepComplete(false);
    }
  }, [currentStep, examDate, studyHours, strongSubjects, weakSubjects, studyPace, studyTime]);

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      // Handle final submission
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    
    // Simulate API call to generate plan
    setTimeout(() => {
      setLoading(false);
      setShowSuccessCard(true);
      
      toast({
        title: "Success!",
        description: "Your personalized study plan has been created.",
      });
      
      // Wait a moment to show success screen before completing
      setTimeout(() => {
        onComplete();
      }, 3000);
    }, 2500);
  };

  const handleToggleSubject = (subject: string, type: 'strong' | 'weak') => {
    if (type === 'strong') {
      if (strongSubjects.includes(subject)) {
        setStrongSubjects(strongSubjects.filter(s => s !== subject));
      } else {
        // Remove from weak subjects if it's there
        if (weakSubjects.includes(subject)) {
          setWeakSubjects(weakSubjects.filter(s => s !== subject));
        }
        setStrongSubjects([...strongSubjects, subject]);
      }
    } else {
      if (weakSubjects.includes(subject)) {
        setWeakSubjects(weakSubjects.filter(s => s !== subject));
      } else {
        // Remove from strong subjects if it's there
        if (strongSubjects.includes(subject)) {
          setStrongSubjects(strongSubjects.filter(s => s !== subject));
        }
        setWeakSubjects([...weakSubjects, subject]);
      }
    }
  };

  // Show loading or success screens
  if (loading) {
    return <LoadingScreen goalTitle={goalTitle} weakSubjects={weakSubjects} />;
  }
  
  if (showSuccessCard) {
    return <SuccessScreen />;
  }

  // Animation variants
  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3
      }
    }
  };

  // Main onboarding flow
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100/10 via-white to-violet-100/10 dark:from-purple-900/10 dark:via-gray-900 dark:to-violet-900/10 p-4">
      <motion.div
        className="max-w-4xl w-full"
        initial="hidden"
        animate="visible"
        variants={pageVariants}
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
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <ExamDateStep examDate={examDate} setExamDate={setExamDate} />
              )}

              {currentStep === 2 && (
                <StudyHoursStep 
                  studyHours={studyHours} 
                  setStudyHours={setStudyHours} 
                  normalizedGoalTitle={normalizedGoalTitle} 
                />
              )}

              {currentStep === 3 && (
                <SubjectsStep 
                  subjects={subjects}
                  strongSubjects={strongSubjects}
                  weakSubjects={weakSubjects}
                  handleToggleSubject={handleToggleSubject}
                />
              )}

              {currentStep === 4 && (
                <StudyPaceStep 
                  studyPace={studyPace} 
                  setStudyPace={setStudyPace} 
                />
              )}

              {currentStep === 5 && (
                <StudyTimeStep 
                  studyTime={studyTime} 
                  setStudyTime={setStudyTime}
                />
              )}
            </AnimatePresence>
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

// Import needed for type checking and subject data
import { subjectsByGoal } from "./onboarding/SubjectData";
