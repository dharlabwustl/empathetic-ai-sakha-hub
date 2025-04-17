
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
  createdAt: string;
  updatedAt: string;
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

export type PersonalityType = "visual" | "auditory" | "kinesthetic" | "reading" | "analytical" | "creative" | "practical" | "social" | "independent" | "Strategic Thinker";

// Role-specific types
export type StudentProfile = UserBasicInfo & {
  role: "student";
  grade?: string;
  subjects?: string[];
  goals?: {
    id: string;
    title: string;
    progress: number;
    description?: string;
    status?: string; // Added for compatibility
  }[];
  subscription?: SubscriptionType;
  personality?: PersonalityType;
  achievements?: string[] | { id: string; name: string; progress: number }[]; // Updated to support both formats
};

export type ParentProfile = UserBasicInfo & {
  role: "parent";
  children?: string[];
  subscription?: SubscriptionType;
  goals?: {
    id: string;
    title: string;
    progress: number;
    status?: string; // Added for compatibility
  }[];
};

export type TeacherProfile = UserBasicInfo & {
  role: "teacher";
  subjects?: string[];
  classes?: string[];
  subscription?: SubscriptionType;
  specializations?: string[];
  goals?: {
    id: string;
    title: string;
    progress: number;
    status?: string; // Added for compatibility
  }[];
};

export type AdminProfile = UserBasicInfo & {
  role: "admin";
  permissions?: string[];
  department?: string;
  subscription?: SubscriptionType;
  goals?: {
    id: string;
    title: string;
    progress: number;
    status?: string; // Added for compatibility
  }[];
};

// Define additional profile types
export type EmployeeProfile = UserBasicInfo & {
  role: "employee";
  jobRole?: string;
  seniorityLevel?: string;
  domain?: string;
  subscription?: SubscriptionType;
  goals?: {
    id: string;
    title: string;
    progress: number;
    description?: string;
    status?: string;
  }[];
  id?: string; // Added for compatibility
};

export type DoctorProfile = UserBasicInfo & {
  role: "doctor";
  specialization?: string;
  institution?: string;
  research?: string;
  subscription?: SubscriptionType;
  goals?: {
    id: string;
    title: string;
    progress: number;
    description?: string;
    status?: string;
  }[];
  id?: string; // Added for compatibility
};

export type FounderProfile = UserBasicInfo & {
  role: "founder";
  startupStage?: string;
  teamSize?: number;
  industry?: string;
  subscription?: SubscriptionType;
  goals?: {
    id: string;
    title: string;
    progress: number;
    description?: string;
    status?: string;
  }[];
  id?: string; // Added for compatibility
};

export type UserProfile = StudentProfile | ParentProfile | TeacherProfile | AdminProfile | EmployeeProfile | DoctorProfile | FounderProfile;
export type UserProfileType = StudentProfile | ParentProfile | TeacherProfile | AdminProfile | EmployeeProfile | DoctorProfile | FounderProfile;
