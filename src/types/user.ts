
export type UserRole = "Student" | "Employee" | "Doctor" | "Founder";

export type SubscriptionType = "Free" | "Basic" | "Premium" | "Enterprise";

export type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";

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
}

export interface EmployeeProfile extends UserProfileType {
  companyName?: string;
  position?: string;
  department?: string;
  yearsOfExperience?: number;
  skillsToImprove?: string[];
  upcomingTrainings?: string[];
  burnoutRisk?: number;
}

export interface DoctorProfile extends UserProfileType {
  specialty?: string;
  hospital?: string;
  researchAreas?: string[];
  publications?: number;
  activeStudies?: number;
  researchBudget?: number;
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
