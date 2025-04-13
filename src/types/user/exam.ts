// Use string type for ExamGoal to resolve type issues
export type ExamGoal = 
  | "IIT JEE"
  | "NEET"
  | "MBA"
  | "CUET UG"
  | "UPSC"
  | "CLAT"
  | "BANK PO";

// Keep the detailed exam goal type as a separate interface
export interface ExamGoalDetails {
  id: string;
  name: string;
  description: string;
  commonExamDate: string;
  recommendedHours: number;
  subjects?: string[];
}

export interface StudyPlanSettings {
  examDate: string;
  dailyStudyHours: number;
  strongSubjects: string[];
  weakSubjects: string[];
  studyPace: "Aggressive" | "Balanced" | "Relaxed";
  preferredStudyTime: "Morning" | "Afternoon" | "Evening" | "Night";
}
