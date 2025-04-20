
// Re-export StudentData from studentData.ts to ensure consistency
export * from './studentData';
export * from './systemLog';

// Admin User Interface
export interface AdminUser {
  id: string;
  username: string;
  email: string;
  name?: string;
  role: 'admin' | 'super_admin' | 'support';
  permissions: string[];
}

// Admin Settings Interface
export interface AdminSettings {
  id: string;
  userId: string;
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  emailAlerts: boolean;
  defaultView: string;
  preferences: Record<string, any>;
}

// Admin Dashboard Stats Interface
export interface AdminDashboardStats {
  totalStudents: number;
  activeStudents: number;
  studentsWithConsistentHabits: number;
  averageMoodScore: number;
  studyPlanEfficiencyImprovement: number;
  averageConfidenceScore: number;
  totalSessions: number;
  moodBasedSessionsCount: number;
  studentsWithMoodTracking: number;
  
  // Additional KPIs for admin dashboard
  dailyActiveUsers?: number;
  weeklyActiveUsers?: number;
  monthlyActiveUsers?: number;
  freeUsers?: number;
  paidUsers?: {
    total: number;
    breakdown: {
      free: number;
      basic: number;
      premium: number;
      enterprise: number;
      school: number;
      corporate: number;
    };
  };
  subscriptionConversionRate?: number;
  churnRate?: number;
  averageStudyTimePerUser?: number;
  practiceAttemptsPerUser?: number;
  weakAreaIdentificationRate?: number;
  userSatisfactionScore?: number;
  referralRate?: number;
  totalRevenue?: number;

  // Verified metrics
  verifiedMoodImprovement?: number;
  averageTimeSavedPerWeek?: number;
  studentsWithVerifiedConsistentHabits?: number;
  verifiedExamConfidenceImprovement?: number;
  verifiedRetentionRate?: number;
  verifiedMoodFeatureUsage?: number;
  completedSurveys?: number;
  totalUsers?: number;
}

// Additional interfaces needed by admin services
export interface ContentItem {
  id: string;
  title: string;
  type: string;
  subject: string;
  topic: string;
  createdAt: string;
  updatedAt: string;
  author: string;
  status: 'draft' | 'published' | 'archived';
  content: any;
}

export interface NotificationTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export interface FeelGoodContent {
  id: string;
  title: string;
  content: string;
  type: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  subject: string;
  topic: string;
}

export interface ConceptCard {
  id: string;
  title: string;
  content: string;
  subject: string;
  topic: string;
}

export interface ExamPaper {
  id: string;
  title: string;
  subject: string;
  questions: Question[];
  duration: number;
  totalMarks: number;
}

export interface Question {
  id: string;
  text: string;
  options?: string[];
  correctAnswer: string | string[];
  marks: number;
}

export interface SurroundingInfluence {
  id: string;
  title: string;
  description: string;
  impactLevel: number;
  tips: string[];
}

export interface StudyPlan {
  id: string;
  userId: string;
  title: string;
  subjects: string[];
  startDate: string;
  endDate: string;
  sessions: any[];
}

export interface MoodLog {
  id: string;
  userId: string;
  mood: string;
  timestamp: string;
  notes?: string;
  factors?: string[];
}

export interface UserDoubts {
  id: string;
  userId: string;
  question: string;
  subject: string;
  topic: string;
  status: 'pending' | 'answered';
  timestamp: string;
}

export interface TutorChat {
  id: string;
  userId: string;
  conversationHistory: any[];
  lastActive: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: string;
}
