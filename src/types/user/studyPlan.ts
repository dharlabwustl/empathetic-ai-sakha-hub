
// Define the type for a study plan subject with priority
export interface StudyPlanSubject {
  id: string;
  name: string;
  difficulty: "easy" | "medium" | "hard";
  color?: string;
  progress?: number;
  proficiency?: "weak" | "moderate" | "strong";
  topics?: { name: string; completed: boolean }[];
  hoursPerWeek?: number;
  priority?: "low" | "medium" | "high"; // Making priority optional to fix errors
  completed: boolean;
  status?: "pending" | "completed" | "skipped" | "in-progress";
}

// Define the type for a new study plan
export interface NewStudyPlan {
  id?: string;
  name?: string;
  goal: string;
  examGoal?: string;
  subjects: StudyPlanSubject[];
  weeklyHours?: number;
  startDate?: string;
  endDate?: string;
  examDate: string | Date; // Allow Date type
  status: "active" | "completed" | "archived";
  progress?: number;
  createdAt?: string;
  learningPace?: "slow" | "moderate" | "fast";
}

// Define the type for a study plan
export interface StudyPlan extends NewStudyPlan {
  id: string;
  createdAt: string;
}

// Define the type for a task in a study plan
export interface StudyTask {
  id: string;
  name: string;
  completed: boolean;
  subjectId: string;
  dueDate: string;
  priority?: "low" | "medium" | "high";
  difficulty?: "easy" | "medium" | "hard";
}
