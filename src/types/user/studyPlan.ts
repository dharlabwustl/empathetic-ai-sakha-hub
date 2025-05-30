
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
  status?: "active" | "paused" | "completed";
  topics?: StudyPlanTopic[];
}

export interface StudyPlanTopic {
  id: string;
  name: string;
  completed: boolean;
  progress: number;
}

export interface StudyPlan {
  id: string;
  title: string;
  goal: string;
  examGoal: string;
  subjects: StudyPlanSubject[];
  examDate: string;
  studyHoursPerDay: number;
  preferredStudyTime: "morning" | "afternoon" | "evening" | "night";
  learningPace: "slow" | "medium" | "fast";
  weeklyHours: number;
  status: "pending" | "active" | "completed" | "archived";
  createdAt: string;
  updatedAt: string;
}

export interface NewStudyPlan {
  id?: string;
  title?: string;
  goal?: string;
  examGoal?: string;
  subjects?: StudyPlanSubject[];
  examDate: string;
  studyHoursPerDay?: number;
  preferredStudyTime?: "morning" | "afternoon" | "evening" | "night";
  learningPace?: "slow" | "medium" | "fast";
  weeklyHours?: number;
  status?: "pending" | "active" | "completed" | "archived";
}
