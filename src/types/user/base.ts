
export type UserRole = "Student" | "Employee" | "Doctor" | "Founder";

export type SubscriptionType = "Free" | "Basic" | "Premium";

export type MoodType = "Happy" | "Okay" | "Sad" | "Focused" | "Tired" | "Overwhelmed" | "Motivated";

export type PersonalityType = 
  | "Analytical"
  | "Creative"
  | "Practical"
  | "Social"
  | "Strategic Thinker"
  | "Empathetic Learner"
  | "Creative Builder"
  | "Collaborative Leader"
  | "Analytical Problem Solver";

export interface Goal {
  id: string;
  title: string;
  description: string;
  progress: number;
  dueDate: string;
}

export interface Interest {
  id: string;
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced";
}

export interface UserProfileType {
  id: string;
  name: string;
  phoneNumber: string;
  role: UserRole;
  personalityType?: PersonalityType;
  goals?: Goal[];
  areasOfInterest?: Interest[];
  subscription: SubscriptionType;
  joinDate: string;
  lastActive: string;
  examPreparation?: string;
  studyStreak?: number;
  loginCount?: number;
  completedOnboarding?: boolean;
}
