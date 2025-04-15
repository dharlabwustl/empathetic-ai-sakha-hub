
export type UserRole = 'student' | 'employee' | 'doctor' | 'founder' | 'admin' | 'content_creator' | 'teacher' | 'parent';

export interface UserProfileType {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  goals?: Goal[];
  subjects?: Subject[];
  createdAt: string;
  stats?: UserStats;
  loginCount?: number;
  lastLogin?: string;
  streak?: number;
  profileImage?: string;
  school?: string;
  grade?: string;
  preferences?: UserPreferences;
  moodHistory?: MoodEntry[];
  // Add these fields from base.ts
  phoneNumber: string;
  joinDate: string;
  lastActive: string;
  personalityType: string;
  areasOfInterest: Array<{ id: string; name: string; level: 'Beginner' | 'Intermediate' | 'Advanced' }>;
  subscription: string;
  completedOnboarding?: boolean;
}

export interface UserPreferences {
  theme: string;
  notifications: boolean;
  studyReminders: boolean;
  contentFormat: 'text' | 'visual' | 'audio' | 'mixed';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  studySessionDuration: number;
}

export interface MoodEntry {
  mood: 'sad' | 'neutral' | 'happy' | 'motivated' | 'curious' | 'stressed' | 'tired';
  timestamp: string;
  note?: string;
}

export interface Goal {
  id: string;
  title: string;
  deadline?: string;
  progress: number;
  type: 'exam' | 'course' | 'skill' | 'other';
  description?: string;
  subgoals?: Goal[];
  dueDate?: string; // Add this missing field
}

export interface Subject {
  id: string;
  name: string;
  progress: number;
  lastStudied?: string;
  totalTimeSpent?: number;
  chapters?: Chapter[];
}

export interface Chapter {
  id: string;
  title: string;
  progress: number;
}

export interface UserStats {
  totalStudyTime: number;
  questionsAnswered: number;
  testsCompleted: number;
  averageScore: number;
  lastActive?: string;
  weeklyStudyTime: number[];
  studyStreak?: number; // Add this missing field
  totalStudyHours?: number; // Add this missing field
}

// Add missing types referenced in study progress components
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
  masteryLevel: number;
  lastPracticed?: string;
}

export interface QuizScore {
  id: string;
  title: string;
  score: number;
  maxScore: number;
  date: string;
  timeTaken: number;
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

export type MoodType = 'Happy' | 'Okay' | 'Tired' | 'Overwhelmed' | 'Focused' | 'sad' | 'neutral' | 'happy' | 'motivated' | 'curious' | 'stressed';

// Adding these types referenced by the import errors
export interface DoctorProfile extends UserProfileType {
  specialization: string;
  institution: string;
  patientsHelped: number;
  yearsOfExperience: number;
  publications: number;
  certifications: string[];
}

export interface EmployeeProfile extends UserProfileType {
  jobTitle: string;
  industry: string;
  company: string;
  department: string;
  projectsCompleted: number;
  skillsAcquired: string[];
}

export interface FounderProfile extends UserProfileType {
  startupName: string;
  startupStage: string;
  industry: string;
  teamSize: number;
  funding: string;
  challenges: string[];
}

export interface StudentProfile extends UserProfileType {
  educationLevel: string;
  subjects: Array<{id: string; name: string; progress: number; lastStudied?: string}>;
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
  age?: number;
  location?: string;
  grade?: string;
}

export type SubscriptionType = 'Free' | 'Basic' | 'Premium' | 'Enterprise';
