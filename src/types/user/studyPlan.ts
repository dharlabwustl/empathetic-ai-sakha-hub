
export interface StudyPlanSubject {
  id: string;
  name: string;
  color: string;
  hoursPerWeek: number;
  weeklyHours: number;
  progress: number;
  priority: "high" | "medium" | "low";
  proficiency: "strong" | "medium" | "weak";
  completed: boolean;
  difficulty?: string;
  status?: "strong" | "weak" | "needs_focus";
  topics?: string[];
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
  status: "pending" | "active" | "completed" | "archived";
  createdAt: string;
  examDate: string;
  progressPercent?: number;
  daysLeft?: number;
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
  status?: "pending" | "active" | "completed" | "archived";
  examDate?: string;
}
