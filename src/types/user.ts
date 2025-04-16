
// Define the allowed mood types
export type MoodType = 
  | "happy" 
  | "tired" 
  | "sad" 
  | "neutral" 
  | "motivated" 
  | "curious" 
  | "stressed" 
  | "okay" 
  | "focused" 
  | "overwhelmed";

export type SubscriptionType = 'Free' | 'Basic' | 'Premium' | 'Enterprise';

// Define Goal interface that matches the one in base.ts
export interface Goal {
  id: string;
  title: string;
  progress: number;
  target: string;
  targetDate?: string;
  type?: string;
  description?: string;
  dueDate?: string;
}

// User Profile Type
export interface UserProfileType {
  id: string;
  name: string;
  email: string;
  role: string;
  profileImage?: string;
  joinDate?: string;
  createdAt?: string;
  personalityType?: string;
  areasOfInterest?: Array<{ id: string; name: string; level: 'Beginner' | 'Intermediate' | 'Advanced' }>;
  lastActive?: string;
  subscription?: SubscriptionType;
  completedOnboarding?: boolean;
  school?: string;
  grade?: string;
  subjects?: Array<{id: string; name: string; progress: number; lastStudied?: string}>;
  goals?: Goal[];  // Using the consistent Goal interface
  stats?: {
    studyStreak: number;
    totalStudyHours: number;
    questionsAttempted: number;
    conceptsMastered: number;
    // Optional properties from UserStats in base.ts
    questionsAnswered?: number;
    testsCompleted?: number;
    averageScore?: number;
    weeklyStudyTime?: number[];
    quizzesCompleted?: number;
    totalStudyTime?: number; // Added to match UserStats in base.ts
    lastActive?: string; // Added to match UserStats in base.ts
  };
  preferences?: {
    theme: string;
    notificationsEnabled: boolean;
    studyReminders: boolean;
    language: string;
    // Adding additional fields to match with UserPreferences in base.ts
    contentFormat?: 'text' | 'visual' | 'audio' | 'mixed';
    difficulty?: 'beginner' | 'intermediate' | 'advanced';
    studySessionDuration?: number;
    emailNotifications?: boolean;
    pushNotifications?: boolean;
    notifications?: boolean; // For compatibility with base.ts
  };
  recentActivities?: {
    id: string;
    type: string;
    description: string;
    timestamp: string;
  }[];
  badges?: {
    id: string;
    name: string;
    description: string;
    image: string;
    dateEarned: string;
  }[];
  loginCount?: number;
}

// Define SubjectProgress for study progress components
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

export interface MotivationCardProps {
  currentMood: MoodType;
  streak: number;
  target: string;
  progress: number;
}
