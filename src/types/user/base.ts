
// Create or update the base.ts file with additional properties

export enum UserRole {
  Student = "Student",
  Employee = "Employee",
  Doctor = "Doctor",
  Founder = "Founder",
  Admin = "Admin"
}

export enum MoodType {
  Energetic = "Energetic",
  Balanced = "Balanced",
  Distracted = "Distracted",
  Tired = "Tired",
  Anxious = "Anxious"
}

export enum PersonalityType {
  Analytical = "Analytical",
  Creative = "Creative",
  Practical = "Practical",
  Social = "Social",
  Independent = "Independent"
}

export interface UserProfileType {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  avatar?: string;
  role: UserRole;
  personalityType?: PersonalityType;
  goals: Array<{id: string; title: string; progress: number}>;
  joinDate?: string;
  bio?: string;
  subscription?: string;
  areasOfInterest?: Array<{id: string; name: string; level: string}>;
  
  // Extended properties for student profile
  location?: string;
  educationLevel?: string;
  schoolName?: string;
  dateOfBirth?: string;
  studyStreak?: number;
  quizzesTaken?: number;
  quizPerformance?: number;
  syllabusCoverage?: number;
}
