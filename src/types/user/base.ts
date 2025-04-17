
// Create or update the base.ts file with additional properties

export enum UserRole {
  Student = "Student",
  Employee = "Employee",
  Doctor = "Doctor",
  Founder = "Founder",
  Admin = "Admin"
}

export enum MoodType {
  Energetic = "Energetic",
  Balanced = "Balanced",
  Distracted = "Distracted",
  Tired = "Tired",
  Anxious = "Anxious",
  // Adding additional mood types that are used in components
  Happy = "happy",
  Okay = "okay",
  Focused = "focused",
  Overwhelmed = "overwhelmed",
  Sad = "sad",
  Motivated = "motivated",
  Curious = "curious",
  Neutral = "neutral",
  Stressed = "stressed"
}

export enum PersonalityType {
  Analytical = "Analytical",
  Creative = "Creative",
  Practical = "Practical",
  Social = "Social",
  Independent = "Independent",
  // Add these personality types that are used in the profiles
  StrategicThinker = "Strategic Thinker",
  AnalyticalProblemSolver = "Analytical Problem Solver",
  CreativeBuilder = "Creative Builder"
}

export enum SubscriptionType {
  Basic = "basic",
  Premium = "premium",
  Pro = "pro"
}

export interface UserProfileType {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  avatar?: string;
  role: UserRole;
  personalityType?: PersonalityType;
  goals: Array<{id: string; title: string; progress: number; description?: string; status?: string; dueDate?: string}>;
  joinDate?: string;
  bio?: string;
  subscription?: SubscriptionType;
  areasOfInterest?: Array<{id: string; name: string; level: string}>;
  
  // Extended properties for student profile
  location?: string;
  educationLevel?: string;
  schoolName?: string;
  dateOfBirth?: string;
  studyStreak?: number;
  quizzesTaken?: number;
  quizPerformance?: number;
  syllabusCoverage?: number;
  examPreparation?: string;
  loginCount?: number;
  completedOnboarding?: boolean;
}
