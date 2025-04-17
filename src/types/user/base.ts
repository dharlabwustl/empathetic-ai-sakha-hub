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
}
