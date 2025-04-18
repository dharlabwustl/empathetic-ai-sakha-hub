
import React from 'react';
import ExamDateStep from "../ExamDateStep";
import StudyHoursStep from "../StudyHoursStep";
import SubjectsStep from "../SubjectsStep";
import StudyTimeStep from "../StudyTimeStep";
import StudyPaceStep from "../StudyPaceStep";
import type { NewStudyPlanSubject } from '@/types/user/studyPlan';

interface OnboardingStepContentProps {
  currentStep: number;
  examDate: Date | undefined;
  studyHours: number;
  strongSubjects: NewStudyPlanSubject[];
  weakSubjects: NewStudyPlanSubject[];
  studyPace: "Aggressive" | "Balanced" | "Relaxed";
  studyTime: "Morning" | "Afternoon" | "Evening" | "Night";
  examGoal: string;
  setExamDate: (date: Date | undefined) => void;
  setStudyHours: (hours: number) => void;
  handleToggleSubject: (subject: string, type: 'strong' | 'weak') => void;
  setStudyPace: (pace: "Aggressive" | "Balanced" | "Relaxed") => void;
  setStudyTime: (time: "Morning" | "Afternoon" | "Evening" | "Night") => void;
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
  setStudyTime
}) => {
  switch (currentStep) {
    case 1:
      return <ExamDateStep examDate={examDate} setExamDate={setExamDate} />;
    case 2:
      return (
        <StudyHoursStep
          studyHours={studyHours}
          setStudyHours={setStudyHours}
          normalizedGoalTitle={examGoal}
        />
      );
    case 3:
      return (
        <SubjectsStep
          subjects={[...strongSubjects, ...weakSubjects]}
          strongSubjects={strongSubjects.map(s => s.name)}
          weakSubjects={weakSubjects.map(s => s.name)}
          handleToggleSubject={handleToggleSubject}
        />
      );
    case 4:
      return (
        <StudyTimeStep
          studyTime={studyTime}
          setStudyTime={setStudyTime}
        />
      );
    case 5:
      return (
        <StudyPaceStep
          studyPace={studyPace}
          setStudyPace={setStudyPace}
        />
      );
    default:
      return null;
  }
};

export default OnboardingStepContent;
