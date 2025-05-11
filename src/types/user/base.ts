
export enum UserRole {
  Student = "student",
  Employee = "employee",
  Doctor = "doctor",
  Founder = "founder",
  Admin = "admin"
}

export enum MoodType {
  HAPPY = "HAPPY",
  MOTIVATED = "MOTIVATED",
  FOCUSED = "FOCUSED",
  CALM = "CALM",
  TIRED = "TIRED",
  CONFUSED = "CONFUSED",
  ANXIOUS = "ANXIOUS",
  STRESSED = "STRESSED",
  OVERWHELMED = "OVERWHELMED",
  NEUTRAL = "NEUTRAL",
  OKAY = "OKAY",
  SAD = "SAD"
}

export enum SubscriptionType {
  FREE = "FREE",
  PRO = "PRO",
  PREMIUM = "PREMIUM"
}

export interface UserProfile {
  id?: string;
  name: string;
  role: UserRole;
  avatar?: string;
  enrollmentDate?: string;
  examGoal?: string;
  studyPace?: string;
  stats?: {
    streak: number;
    totalHours: number;
    completedTasks: number;
  };
  status?: {
    online: boolean;
    lastActive?: string;
  };
  mood?: MoodType;
}

export interface MoodTheme {
  background: string;
  text: string;
  accent: string;
  border: string;
  colors: {
    primary: string;
    secondary: string;
  };
}
