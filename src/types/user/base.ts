
export interface UserSubscription {
  planType: SubscriptionType;
  batchCode?: string;
  batchName?: string;
  startDate?: string;
  endDate?: string;
  role?: "member" | "leader" | "school_admin" | "corporate_admin";
  planId?: string;
  planName?: string;
  status?: "active" | "inactive" | "trial";
  isGroupLeader?: boolean;
  plan?: string;
  expiresAt?: string;
  id?: string;
}

export interface UserProfileType {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  bio?: string;
  avatar?: string;
  personalityType?: PersonalityType;
  goals?: {
    id: string;
    title: string;
    description?: string;
    progress?: number;
    status?: "completed" | "in-progress" | "not-started";
    dueDate?: string;
    targetDate?: Date;
    target?: string;
    examDate?: string;
  }[];
  areasOfInterest?: {
    id: string;
    name: string;
    level?: string;
  }[];
  subscription?: SubscriptionType | UserSubscription;
  joinDate?: string;
  lastActive?: string;
  gender?: "male" | "female" | "other";
  phoneNumber?: string;
  examPreparation?: string;
  loginCount?: number;
  completedOnboarding?: boolean;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  education?: {
    level?: string;
    institution?: string;
    fieldOfStudy?: string;
    graduationYear?: number;
  };
  location?: string;
  personalInfo?: {
    firstName?: string;
    lastName?: string;
    dob?: string;
    gender?: string;
    occupation?: string;
    location?: string;
    phoneNumber?: string;
    city?: string;
    state?: string;
    school?: string;
    grade?: string;
    board?: string;
  };
}

export enum UserRole {
  Student = "student",
  Teacher = "teacher",
  Parent = "parent",
  Admin = "admin",
  Employee = "employee",
  Doctor = "doctor",
  Founder = "founder"
}

export type MoodType = 
  | "happy"
  | "sad"
  | "tired"
  | "motivated"
  | "focused"
  | "stressed"
  | "overwhelmed"
  | "curious"
  | "neutral"
  | "okay";

export enum SubscriptionType {
  Free = "free",
  Basic = "basic",
  Premium = "premium",
  Enterprise = "enterprise",
  School = "school",
  Corporate = "corporate"
}

export interface PersonalityType {
  type: string;
  traits: string[];
  learningStyle: string;
}

export interface KpiData {
  id: string;
  title: string;
  value: number | { value: number; trend: "up" | "down" | "neutral" };
  trend?: "up" | "down" | "neutral";
  icon?: React.ReactNode;
  description?: string;
  color?: string;
}
