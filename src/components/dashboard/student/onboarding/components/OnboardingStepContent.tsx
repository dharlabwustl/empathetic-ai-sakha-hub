
import React from 'react';
import { motion } from 'framer-motion';
import StepExamDate from './StepExamDate';
import StepStudyHours from './StepStudyHours';
import StepSubjects from './StepSubjects';
import StepStudyPace from './StepStudyPace';
import StepStudyTime from './StepStudyTime';
import ReviewStep from './ReviewStep';

interface Subject {
  name: string;
  key: string;
  group?: string;
}

interface StudyPlanData {
  examGoal: string;
  examDate: string;
  daysLeft: number;
  studyHoursPerDay: number;
  strongSubjects: string[];
  weakSubjects: string[];
  studyPace: 'slow' | 'moderate' | 'fast';
  preferredStudyTime: 'morning' | 'afternoon' | 'evening' | 'night';
}

interface OnboardingStepContentProps {
  currentStep: number;
  examDate: Date | undefined;
  studyHours: number;
  strongSubjects: Subject[];
  weakSubjects: Subject[];
  studyPace: 'slow' | 'moderate' | 'fast';
  studyTime: 'morning' | 'afternoon' | 'evening' | 'night';
  examGoal: string;
  setExamDate: (date: Date | undefined) => void;
  setStudyHours: (hours: number) => void;
  handleToggleSubject: (subject: Subject, type: 'strong' | 'weak') => void;
  setStudyPace: (pace: 'slow' | 'moderate' | 'fast') => void;
  setStudyTime: (time: 'morning' | 'afternoon' | 'evening' | 'night') => void;
  studyPlanData: StudyPlanData;
}

const OnboardingStepContent: React.FC<OnboardingStepContentProps> = ({ 
  currentStep, 
  examDate, 
  studyHours,
  strongSubjects,
  weakSubjects,
  studyPace,
  studyTime,
  examGoal,
  setExamDate,
  setStudyHours,
  handleToggleSubject,
  setStudyPace,
  setStudyTime,
  studyPlanData
}) => {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    exit: { 
      opacity: 0, 
      y: -20, 
      transition: { 
        ease: "easeInOut", 
        duration: 0.3 
      } 
    }
  };

  // Render the correct step content based on currentStep
  const renderStepContent = () => {
    switch(currentStep) {
      case 0:
        return (
          <StepExamDate 
            examDate={examDate}
            setExamDate={setExamDate}
            examGoal={examGoal}
          />
        );
      case 1:
        return (
          <StepStudyHours 
            studyHours={studyHours}
            setStudyHours={setStudyHours}
          />
        );
      case 2:
        return (
          <StepSubjects 
            strongSubjects={strongSubjects}
            weakSubjects={weakSubjects}
            handleToggleSubject={handleToggleSubject}
            examGoal={examGoal}
          />
        );
      case 3:
        return (
          <StepStudyPace 
            studyPace={studyPace}
            setStudyPace={setStudyPace}
          />
        );
      case 4:
        return (
          <StepStudyTime 
            studyTime={studyTime}
            setStudyTime={setStudyTime}
          />
        );
      case 5:
        return (
          <ReviewStep 
            studyPlanData={studyPlanData}
          />
        );
      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <motion.div
      key={`step-${currentStep}`}
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {renderStepContent()}
    </motion.div>
  );
};

export default OnboardingStepContent;
