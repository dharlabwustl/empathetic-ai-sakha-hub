
// Define as both type and enum for UserRole
export type UserRole = "student" | "parent" | "teacher" | "admin" | "employee" | "doctor" | "founder";

// Create an enum that can be used as values
export enum UserRoleEnum {
  Student = "student",
  Parent = "parent",
  Teacher = "teacher",
  Admin = "admin",
  Employee = "employee",
  Doctor = "doctor",
  Founder = "founder"
}

export type MoodType = "happy" | "motivated" | "focused" | "curious" | "neutral" | "tired" | "stressed" | "sad" | "overwhelmed" | "okay";

export interface UserBasicInfo {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
  lastLogin?: string;
  currentMood?: MoodType;
  moodHistory?: Array<{
    mood: MoodType;
    timestamp: string;
  }>;
  // Add missing properties referenced in components
  joinDate?: string;
  personalityType?: PersonalityType;
  areasOfInterest?: Array<{ id: string; name: string; level: string }>;
  loginCount?: number;
  completedOnboarding?: boolean;
  bio?: string;
  phoneNumber?: string;
  lastActive?: string;
}

// Define as both type and enum for SubscriptionType
export type SubscriptionType = "free" | "basic" | "premium" | "enterprise";

// Create an enum that can be used as values
export enum SubscriptionTypeEnum {
  Free = "free",
  Basic = "basic",
  Premium = "premium",
  Enterprise = "enterprise"
}

export type PersonalityType = "visual" | "auditory" | "kinesthetic" | "reading" | "analytical" | "creative" | "practical" | "social" | "independent" | "Strategic Thinker" | "Analytical Problem Solver" | "Creative Builder";

// Define common goal structure
export interface Goal {
  id: string;
  title: string;
  progress: number;
  description?: string;
  status?: string;
  dueDate?: string;
  targetDate?: Date;
}

// Role-specific types
export type StudentProfile = UserBasicInfo & {
  role: "student";
  grade?: string;
  subjects?: Array<string | { id: string; name: string; progress: number }>;
  goals?: Goal[];
  subscription?: SubscriptionType;
  personality?: PersonalityType;
  achievements?: Array<string | { id: string; name: string; progress: number }>;
  educationLevel?: string;
  studyStreak?: number;
  quizzesTaken?: number;
  flashcardsCreated?: number;
  examPreparation?: string;
  studyHoursToday?: number;
  subjectsCovered?: number;
  quizPerformance?: number;
  mood?: MoodType;
  syllabusCoverage?: number;
  strongSubjects?: string[];
  weakSubjects?: string[];
};

export type ParentProfile = UserBasicInfo & {
  role: "parent";
  children?: string[];
  subscription?: SubscriptionType;
  goals?: Goal[];
};

export type TeacherProfile = UserBasicInfo & {
  role: "teacher";
  subjects?: string[];
  classes?: string[];
  subscription?: SubscriptionType;
  specializations?: string[];
  goals?: Goal[];
};

export type AdminProfile = UserBasicInfo & {
  role: "admin";
  permissions?: string[];
  department?: string;
  subscription?: SubscriptionType;
  goals?: Goal[];
};

// Define additional profile types
export type EmployeeProfile = UserBasicInfo & {
  role: "employee";
  jobRole?: string;
  seniorityLevel?: string;
  domain?: string;
  subscription?: SubscriptionType;
  goals?: Goal[];
  jobTitle?: string;
  industry?: string;
};

export type DoctorProfile = UserBasicInfo & {
  role: "doctor";
  specialization?: string;
  institution?: string;
  research?: string;
  subscription?: SubscriptionType;
  goals?: Goal[];
};

export type FounderProfile = UserBasicInfo & {
  role: "founder";
  startupStage?: string;
  teamSize?: number;
  industry?: string;
  subscription?: SubscriptionType;
  goals?: Goal[];
  startupName?: string;
};

export type UserProfile = StudentProfile | ParentProfile | TeacherProfile | AdminProfile | EmployeeProfile | DoctorProfile | FounderProfile;
export type UserProfileType = StudentProfile | ParentProfile | TeacherProfile | AdminProfile | EmployeeProfile | DoctorProfile | FounderProfile;
