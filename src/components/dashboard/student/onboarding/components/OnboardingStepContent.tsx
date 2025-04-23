
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
  studyTime: string;
  examGoal: string;
  setExamDate: (date: Date | undefined) => void;
  setStudyHours: (hours: number) => void;
  handleToggleSubject: (subject: string | Subject, type: "strong" | "weak") => void;
  setStudyPace: (pace: "slow" | "moderate" | "fast") => void;
  setStudyTime: (time: "morning" | "afternoon" | "evening" | "night") => void;
  studyPlanData?: any;
}

// Adapter functions to handle different types
const adaptPace = (pace: string): "slow" | "moderate" | "fast" => {
  if (pace === "fast" || pace === "Aggressive") return "fast";
  if (pace === "moderate" || pace === "Balanced") return "moderate";
  return "slow";
};

const adaptTimeCasing = (time: string): "morning" | "afternoon" | "evening" | "night" => {
  return time.toLowerCase() as "morning" | "afternoon" | "evening" | "night";
};

const adaptSubjects = (subjects: NewStudyPlanSubject[] | Subject[]): Subject[] => {
  return subjects.map(subject => {
    if ('key' in subject && subject.key) return subject as Subject;
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
    handleToggleSubject(subject, type);
  };

  // Render the appropriate step content
  switch (currentStep) {
    case 1:
      return (
        <StepExamDate 
          examDate={examDate} 
          setExamDate={setExamDate} 
          examGoal={examGoal}
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
