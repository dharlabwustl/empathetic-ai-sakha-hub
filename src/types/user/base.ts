
/**
 * Enum for user roles in the system
 */
export enum UserRole {
  Student = "Student",
  Employee = "Employee",
  Doctor = "Doctor",
  Founder = "Founder",
  Admin = "Admin"
}

/**
 * Types of moods a user can select
 */
export type MoodType = 
  | "motivated"
  | "curious" 
  | "neutral" 
  | "tired" 
  | "stressed" 
  | "focused" 
  | "happy" 
  | "okay" 
  | "overwhelmed" 
  | "sad";

/**
 * Types of personalities a user can have
 */
export type PersonalityType = 
  | "analytical" 
  | "creative" 
  | "practical" 
  | "social" 
  | "independent";
