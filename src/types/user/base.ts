
export type UserRole = "student" | "parent" | "teacher" | "admin";

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
}

export type SubscriptionType = "free" | "basic" | "premium" | "enterprise";
export type PersonalityType = "visual" | "auditory" | "kinesthetic" | "reading";

// Role-specific types
export type StudentProfile = UserBasicInfo & {
  role: "student";
  grade?: string;
  subjects?: string[];
  goals?: {
    id: string;
    title: string;
    progress: number;
  }[];
  subscription?: SubscriptionType;
  personality?: PersonalityType;
  achievements?: string[];
};

export type ParentProfile = UserBasicInfo & {
  role: "parent";
  children?: string[];
  subscription?: SubscriptionType;
};

export type TeacherProfile = UserBasicInfo & {
  role: "teacher";
  subjects?: string[];
  classes?: string[];
  subscription?: SubscriptionType;
  specializations?: string[];
};

export type AdminProfile = UserBasicInfo & {
  role: "admin";
  permissions?: string[];
  department?: string;
};

export type UserProfile = StudentProfile | ParentProfile | TeacherProfile | AdminProfile;
export type UserProfileType = StudentProfile | ParentProfile | TeacherProfile | AdminProfile;

