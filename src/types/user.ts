
export type UserRole = "Student" | "Employee" | "Doctor" | "Founder";

export type SubscriptionType = "Free" | "Basic" | "Premium";

export type MoodType = "Happy" | "Okay" | "Sad" | "Focused" | "Tired" | "Overwhelmed" | "Motivated";

export interface UserProfileType {
  id: string;
  name: string;
  phoneNumber: string;
  role: UserRole;
  personalityType?: string;
  goals?: Goal[];
  areasOfInterest?: Interest[];
  subscription: SubscriptionType;
  joinDate: string;
  lastActive: string;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  progress: number;
  dueDate: string;
}

export interface Interest {
  id: string;
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced";
}

export interface StudentProfile extends UserProfileType {
  educationLevel: string;
  subjects: string[];
  studyStreak: number;
  quizzesTaken: number;
  flashcardsCreated: number;
  examPreparation: string;
  studyHoursToday: number;
  subjectsCovered: number;
  quizPerformance: number;
  mood: MoodType;
  syllabusCoverage: number;
  strongSubjects: string[];
  weakSubjects: string[];
}

export interface EmployeeProfile extends UserProfileType {
  jobTitle: string;
  workExperience: number;
  skills: string[];
  company?: string;
  industry?: string;
  careerGoal: string;
  projectsCompleted: number;
  trainingCompleted: number;
}

export interface DoctorProfile extends UserProfileType {
  specialization: string;
  qualifications: string[];
  researchInterests: string[];
  publications: number;
  institution?: string;
  yearsOfPractice: number;
  certifications: string[];
}

export interface FounderProfile extends UserProfileType {
  startupName: string;
  industry: string;
  foundingYear: string;
  teamSize: number;
  funding: string;
  stage: string;
  mvpStatus: number;
  pitchDeckReady: boolean;
}

// New types for study progress tracking
export interface SubjectProgress {
  id: string;
  name: string;
  progress: number;
  lastWeekProgress: number;
  color: string;
  topics: TopicProgress[];
  quizScores: QuizScore[];
  studyHours: StudyHoursData[];
}

export interface TopicProgress {
  id: string;
  name: string;
  completed: boolean;
  masteryLevel: number; // 0-100
  lastPracticed?: string;
}

export interface QuizScore {
  id: string;
  title: string;
  score: number;
  maxScore: number;
  date: string;
  timeTaken: number; // in minutes
}

export interface StudyHoursData {
  date: string;
  hours: number;
}

export interface StudyStreak {
  current: number;
  longest: number;
  thisWeek: number[];
  lastMonth: number[];
}

