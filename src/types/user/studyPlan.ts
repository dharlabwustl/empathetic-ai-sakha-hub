
export interface StudyPlanSubject {
  id: string;
  name: string;
  color?: string;
  hoursPerWeek: number;
  weeklyHours: number; // Added missing property
  progress: number; // Added missing property
  priority: "high" | "medium" | "low";
  proficiency: string | number;
  completed: boolean;
  difficulty?: "easy" | "medium" | "hard";
  status?: "pending" | "in-progress" | "completed";
}

export interface NewStudyPlan {
  id?: string;
  title?: string;
  goal?: string;
  examGoal?: string;
  subjects?: StudyPlanSubject[];
  studyHoursPerDay?: number;
  preferredStudyTime?: "morning" | "afternoon" | "evening" | "night";
  learningPace?: "slow" | "fast";
  weeklyHours?: number;
  examDate: string; // Changed from Date to string
  status?: "pending" | "active" | "completed" | "archived";
}
