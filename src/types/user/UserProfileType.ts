
import { UserRole, UserSubscription, UserGoal, UserNotification, UserPreferences, UserActivity, MoodType, PersonalityType } from "./base";

export interface UserProfileType {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  role: UserRole;
  avatar?: string;
  subscription: UserSubscription;
  goals: UserGoal[];
  activeGoal?: string;
  notifications: UserNotification[];
  preferences: UserPreferences;
  recentActivities: UserActivity[];
  lastLogin?: string;
  mood?: MoodType;
  personality?: PersonalityType;
  streak?: number;
  points?: number;
  level?: number;
  badges?: string[];
  joinDate?: string;
  loginCount?: number;
  totalStudyTime?: number; // in minutes
}
