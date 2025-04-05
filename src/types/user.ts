
export type UserRole = "Student" | "Employee" | "Doctor" | "Founder";

export type PersonalityType = 
  | "Strategic Thinker" 
  | "Empathetic Learner" 
  | "Creative Builder" 
  | "Analytical Problem Solver" 
  | "Collaborative Leader";

export type MoodType = "Happy" | "Okay" | "Tired" | "Overwhelmed" | "Focused";

export interface Goal {
  id: string;
  title: string;
  description: string;
  progress: number; // 0-100
  dueDate?: string;
}

export interface AreaOfInterest {
  id: string;
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced";
}

export interface UserProfile {
  id: string;
  name: string;
  phoneNumber: string;
  email?: string;
  role: UserRole;
  personalityType: PersonalityType;
  goals: Goal[];
  areasOfInterest: AreaOfInterest[];
  subscription: "Basic" | "Premium";
  joinDate: string;
  lastActive: string;
}

export interface StudentProfile extends UserProfile {
  educationLevel: string;
  subjects: string[];
  examPreparation?: string;
  studyHoursToday: number;
  subjectsCovered: number;
  quizPerformance: number;
  mood: MoodType;
  syllabusCoverage: number;
}

export interface EmployeeProfile extends UserProfile {
  jobTitle: string;
  industry: string;
  experienceLevel: string;
  skillsToGrow: string[];
  productivityScore: number;
  workHoursToday: number;
  tasksCovered: number;
  wellnessScore: number;
}

export interface DoctorProfile extends UserProfile {
  specialization: string;
  institution: string;
  researchTopic?: string;
  researchPhase?: string;
  publicationsCount: number;
  researchHoursToday: number;
  literatureReviewed: number;
  wellnessScore: number;
}

export interface FounderProfile extends UserProfile {
  startupName: string;
  startupStage: string;
  industry: string;
  teamSize: number;
  mvpCompletion: number;
  pitchDeckStatus: number;
  burnoutRisk: number;
  investorMeetings: number;
}

export type UserProfileType = 
  | StudentProfile 
  | EmployeeProfile 
  | DoctorProfile 
  | FounderProfile;
