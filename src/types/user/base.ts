
export interface UserSubscription {
  id?: string;
  planId: string;
  plan?: string;
  planType: SubscriptionType;
  batchCode?: string;
  batchName?: string;
  startDate?: string;
  endDate?: string;
  expiresAt?: string;
  role?: "member" | "leader" | "school_admin" | "corporate_admin";
}

export interface UserProfileType {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  bio?: string;
  avatar?: string;
  personalityType?: string;
  goal?: string; // Added for backward compatibility
  goals?: {
    id: string;
    title: string;
    description?: string;
    progress?: number;
    status?: "completed" | "in-progress" | "not-started";
    dueDate?: string;
    targetDate?: Date;
  }[];
  examDate?: string; // Added for backward compatibility
  peerRanking?: number; // Added for backward compatibility
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
  batchName?: string; // Added for backward compatibility
  batchCode?: string; // Added for backward compatibility
  isGroupLeader?: boolean; // Added for backward compatibility
  city?: string; // Added for backward compatibility
  state?: string; // Added for backward compatibility
  school?: string; // Added for backward compatibility
  grade?: string; // Added for backward compatibility
  board?: string; // Added for backward compatibility
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

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  isPopular?: boolean;
  description?: string;
  type: SubscriptionType;
  maxMembers?: number;
}

// Changed to type string
export type PersonalityType = string;
