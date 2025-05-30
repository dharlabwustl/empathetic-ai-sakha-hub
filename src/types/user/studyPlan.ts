
export interface StudyPlanSubject {
  id: string;
  name: string;
  color: string;
  hoursPerWeek: number;
  weeklyHours: number;
  progress: number;
  priority: "low" | "medium" | "high";
  proficiency: "weak" | "medium" | "strong";
  completed: boolean;
  topics?: StudyPlanTopic[];
}

export interface StudyPlanTopic {
  id: string;
  name: string;
  completed: boolean;
  difficulty: "easy" | "medium" | "hard";
}

export interface StudyPlan {
  id: string;
  title: string;
  goal: string;
  examGoal: string;
  subjects: StudyPlanSubject[];
  studyHoursPerDay: number;
  preferredStudyTime: "morning" | "afternoon" | "evening" | "night";
  learningPace: "slow" | "moderate" | "fast";
  weeklyHours: number;
  examDate: string;
  status: "pending" | "active" | "completed" | "archived";
  createdAt?: string;
  updatedAt?: string;
}

export interface NewStudyPlan {
  id?: string;
  title?: string;
  goal?: string;
  examGoal?: string;
  subjects?: StudyPlanSubject[];
  studyHoursPerDay?: number;
  preferredStudyTime?: "morning" | "afternoon" | "evening" | "night";
  learningPace?: "slow" | "moderate" | "fast";
  weeklyHours?: number;
  examDate?: string;
  status?: "pending" | "active" | "completed" | "archived";
}

export interface CreditPack {
  id: string;
  name: string;
  credits: number;
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
  popular?: boolean;
  bestValue?: boolean;
  isExamCredits?: boolean;
}
