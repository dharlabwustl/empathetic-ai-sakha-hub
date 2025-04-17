
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

export type MoodType = 
  | "happy" 
  | "motivated" 
  | "focused" 
  | "curious" 
  | "neutral" 
  | "tired" 
  | "stressed" 
  | "sad" 
  | "overwhelmed" 
  | "okay";

export type PersonalityType = "visual" | "auditory" | "kinesthetic" | "reading" | "analytical" | "creative" | "practical" | "social" | "independent" | "Strategic Thinker" | "Analytical Problem Solver" | "Creative Builder";

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
  joinDate?: string;
  personalityType?: PersonalityType;
  areasOfInterest?: Array<{ id: string; name: string; level: string }>;
  loginCount?: number;
  completedOnboarding?: boolean;
  bio?: string;
  phoneNumber?: string;
  lastActive?: string;
  gender?: "male" | "female";
  subscription?: SubscriptionType;
}

export type SubscriptionType = "free" | "basic" | "premium" | "enterprise";

export enum SubscriptionTypeEnum {
  Free = "free",
  Basic = "basic",
  Premium = "premium",
  Enterprise = "enterprise"
}

export type Goal = {
  id: string;
  title: string;
  progress: number;
  description?: string;
  status?: string;
  dueDate?: string;
  targetDate?: Date;
};

export interface StudentProfile extends UserBasicInfo {
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
}

export interface ParentProfile extends UserBasicInfo {
  role: "parent";
  children?: string[];
  subscription?: SubscriptionType;
  goals?: Goal[];
}

export interface TeacherProfile extends UserBasicInfo {
  role: "teacher";
  subjects?: string[];
  classes?: string[];
  subscription?: SubscriptionType;
  specializations?: string[];
  goals?: Goal[];
}

export interface AdminProfile extends UserBasicInfo {
  role: "admin";
  permissions?: string[];
  department?: string;
  subscription?: SubscriptionType;
  goals?: Goal[];
}

export interface EmployeeProfile extends UserBasicInfo {
  role: "employee";
  jobRole?: string;
  seniorityLevel?: string;
  domain?: string;
  subscription?: SubscriptionType;
  goals?: Goal[];
  jobTitle?: string;
  industry?: string;
  examPreparation?: string;
}

export interface DoctorProfile extends UserBasicInfo {
  role: "doctor";
  specialization?: string;
  institution?: string;
  research?: string;
  subscription?: SubscriptionType;
  goals?: Goal[];
  examPreparation?: string;
}

export interface FounderProfile extends UserBasicInfo {
  role: "founder";
  startupStage?: string;
  teamSize?: number;
  industry?: string;
  subscription?: SubscriptionType;
  goals?: Goal[];
  startupName?: string;
  examPreparation?: string;
}

export type UserProfile = StudentProfile | ParentProfile | TeacherProfile | AdminProfile | EmployeeProfile | DoctorProfile | FounderProfile;
export type UserProfileType = StudentProfile | ParentProfile | TeacherProfile | AdminProfile | EmployeeProfile | DoctorProfile | FounderProfile;
