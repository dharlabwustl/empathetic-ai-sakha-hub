
import React from 'react';
import StepExamDate from './StepExamDate';
import StepStudyHours from './StepStudyHours';
import StepSubjects from './StepSubjects';
import StepStudyPace from './StepStudyPace';
import StepStudyTime from './StepStudyTime';
import StepReview from './StepReview';
import { NewStudyPlanSubject } from '@/types/user/studyPlan';
import { Subject } from '@/types/user/studyPlan';

// Add interface for component props
interface OnboardingStepContentProps {
  currentStep: number;
  examDate: Date;
  studyHours: number;
  strongSubjects: NewStudyPlanSubject[] | Subject[];
  weakSubjects: NewStudyPlanSubject[] | Subject[];
  studyPace: string;
  studyTime: "Morning" | "Afternoon" | "Evening" | "Night";
  examGoal: string;
  setExamDate: (date: Date | undefined) => void;
  setStudyHours: (hours: number) => void;
  handleToggleSubject: (subject: string | Subject, type: "strong" | "weak") => void;
  setStudyPace: (pace: "Aggressive" | "Balanced" | "Relaxed") => void;
  setStudyTime: (time: "Morning" | "Afternoon" | "Evening" | "Night") => void;
}

// Adapter functions to handle different types
const adaptPace = (pace: string): "Aggressive" | "Balanced" | "Relaxed" => {
  if (pace === "fast") return "Aggressive";
  if (pace === "moderate") return "Balanced";
  return "Relaxed";
};

const adaptTimeCasing = (time: string): "Morning" | "Afternoon" | "Evening" | "Night" => {
  const capitalizedTime = time.charAt(0).toUpperCase() + time.slice(1).toLowerCase();
  return capitalizedTime as "Morning" | "Afternoon" | "Evening" | "Night";
};

const adaptSubjects = (subjects: NewStudyPlanSubject[] | Subject[]): Subject[] => {
  return subjects.map(subject => {
    if ('key' in subject) return subject as Subject;
    return {
      name: subject.name,
      key: subject.name.toLowerCase().replace(/\s+/g, '-'),
      proficiency: subject.proficiency
    };
  });
};

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
  setStudyTime
}) => {
  // Convert NewStudyPlanSubject arrays to Subject arrays for compatibility
  const adaptedStrongSubjects = adaptSubjects(strongSubjects);
  const adaptedWeakSubjects = adaptSubjects(weakSubjects);
  
  // Wrapper function for handleToggleSubject to handle type conversion
  const handleToggleSubjectWrapper = (subject: Subject, type: "strong" | "weak") => {
    handleToggleSubject(subject.name, type);
  };

  // Render the appropriate step content
  switch (currentStep) {
    case 1:
      return (
        <StepExamDate 
          examDate={examDate} 
          setExamDate={setExamDate} 
        />
      );
    case 2:
      return (
        <StepStudyHours 
          studyHours={studyHours}
          setStudyHours={setStudyHours}
        />
      );
    case 3:
      return (
        <StepSubjects
          strongSubjects={adaptedStrongSubjects}
          weakSubjects={adaptedWeakSubjects}
          handleToggleSubject={handleToggleSubjectWrapper}
          examGoal={examGoal}
        />
      );
    case 4:
      return (
        <StepStudyPace 
          studyPace={adaptPace(studyPace)}
          setStudyPace={setStudyPace}
        />
      );
    case 5:
      return (
        <StepStudyTime 
          studyTime={adaptTimeCasing(studyTime)}
          setStudyTime={setStudyTime}
        />
      );
    case 6:
      return (
        <StepReview 
          examDate={examDate}
          studyHours={studyHours}
          strongSubjects={adaptedStrongSubjects}
          weakSubjects={adaptedWeakSubjects}
          studyPace={adaptPace(studyPace)}
          studyTime={adaptTimeCasing(studyTime)}
          examGoal={examGoal}
        />
      );
    default:
      return <div>Unknown step</div>;
  }
};

export default OnboardingStepContent;
