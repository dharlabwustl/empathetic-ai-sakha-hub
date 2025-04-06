
export type UserRole = "Student" | "Employee" | "Doctor" | "Founder";

export type SubscriptionType = "Free" | "Basic" | "Premium" | "Enterprise";

export type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";

export type PersonalityType = 
  | "Strategic Thinker" 
  | "Creative Mind" 
  | "Analytical Problem Solver" 
  | "Dedicated Achiever" 
  | "Balanced Learner";

export type MoodType = 
  | "Focused" 
  | "Motivated" 
  | "Anxious" 
  | "Tired" 
  | "Confident" 
  | "Stressed" 
  | "Relaxed";

export interface UserGoal {
  id: string;
  title: string;
  description: string;
  progress: number;
  dueDate: string;
}

export interface Interest {
  id: string;
  name: string;
  level: SkillLevel;
}

export interface ExamGoal {
  id: string;
  name: string;
  description: string;
  commonExamDate: string;
  recommendedHours: number;
}

export interface StudyPace {
  id: string;
  name: string;
  description: string;
}

export interface StudyTimePreference {
  id: string;
  name: string;
  icon: string;
  timeRange: string;
}

export interface UserProfileType {
  id: string;
  name: string;
  phoneNumber: string;
  role: UserRole;
  personalityType: string;
  goals: UserGoal[];
  areasOfInterest: Interest[];
  subscription: SubscriptionType;
  joinDate: string;
  lastActive: string;
  examGoal?: ExamGoal;
  studyPace?: StudyPace;
  studyTimePreference?: StudyTimePreference;
  dailyStudyHours?: number;
  targetExamDate?: string;
}

export interface StudentProfile extends UserProfileType {
  schoolName?: string;
  grade?: number;
  subjects?: string[];
  studyStreak?: number;
  quizzesTaken?: number;
  flashcardsCreated?: number;
  examGoal?: ExamGoal;
  strongSubjects?: string[];
  weakSubjects?: string[];
  // Additional fields for student profile
  educationLevel?: string;
  examPreparation?: string;
  studyHoursToday?: number;
  subjectsCovered?: number;
  quizPerformance?: number;
  mood?: MoodType;
  syllabusCoverage?: number;
}

export interface EmployeeProfile extends UserProfileType {
  companyName?: string;
  position?: string;
  department?: string;
  yearsOfExperience?: number;
  skillsToImprove?: string[];
  upcomingTrainings?: string[];
  burnoutRisk?: number;
  // Additional fields for employee profile
  jobTitle?: string;
}

export interface DoctorProfile extends UserProfileType {
  specialty?: string;
  hospital?: string;
  researchAreas?: string[];
  publications?: number;
  activeStudies?: number;
  researchBudget?: number;
  // Additional fields for doctor profile
  specialization?: string;
}

export interface FounderProfile extends UserProfileType {
  startupName?: string;
  startupStage?: string;
  industry?: string;
  teamSize?: number;
  mvpCompletion?: number;
  pitchDeckStatus?: number;
  burnoutRisk?: number;
  investorMeetings?: number;
}
