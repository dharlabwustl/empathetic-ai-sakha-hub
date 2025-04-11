
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'superadmin';
  permissions: string[];
  lastLogin?: Date;
}

export interface AdminDashboardStats {
  totalStudents: number;
  activeStudents: number;
  newSignupsToday: number;
  totalQuestions: number;
  totalConcepts: number;
  totalFlashcards: number;
  totalEngagementHours: number;
  averageMoodScore: number;
}

export interface StudentData {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  registrationDate: Date;
  lastActive: Date;
  completedOnboarding: boolean;
  goals: string[];
  examType: string;
  studyHours: number;
  subjectsSelected: string[];
  moodScore: number;
  engagementScore: number;
}

export interface ContentItem {
  id: string;
  type: 'concept' | 'flashcard' | 'question' | 'exam';
  title: string;
  subject: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  createdAt: Date;
  approved: boolean;
  usageCount: number;
}

export interface NotificationTemplate {
  id: string;
  title: string;
  body: string;
  type: 'reminder' | 'achievement' | 'suggestion' | 'system';
  trigger: 'time' | 'event' | 'mood' | 'manual';
  active: boolean;
}

export interface AIModelSettings {
  modelName: string;
  apiKey: string;
  temperature: number;
  maxTokens: number;
  active: boolean;
}

export interface SystemLog {
  id: string;
  timestamp: Date;
  level: 'info' | 'warning' | 'error';
  message: string;
  source: string;
  details?: any;
}

export interface AdminSettings {
  aiModels: AIModelSettings[];
  notificationSettings: {
    maxPerDay: number;
    quietHoursStart: number;
    quietHoursEnd: number;
  };
  contentApprovalRequired: boolean;
  flaskApiUrl: string;
  apiKey: string;
}

// Database schemas for the application
export interface StudentProfile {
  id: string;
  userId: string;
  name: string;
  email: string;
  phoneNumber: string;
  registrationDate: Date;
  lastActive: Date;
  completedOnboarding: boolean;
  role: 'student' | 'tutor' | 'admin';
  preferences: {
    theme: 'light' | 'dark';
    notifications: boolean;
  };
}

export interface StudentGoal {
  id: string;
  studentId: string;
  title: string; // e.g., "IIT-JEE", "NEET"
  targetDate: Date;
  currentProgress: number; // 0-100%
  status: 'active' | 'completed' | 'abandoned';
  createdAt: Date;
}

export interface OnboardingData {
  id: string;
  studentId: string;
  examType: string;
  studyHours: number;
  studyPace: 'relaxed' | 'balanced' | 'intensive';
  preferredStudyTime: 'morning' | 'afternoon' | 'evening' | 'night';
  subjectsSelected: string[];
  learningStyle: 'visual' | 'auditory' | 'reading' | 'kinesthetic' | 'mixed';
  completedAt: Date;
}

export interface StudyPlan {
  id: string;
  studentId: string;
  title: string;
  description: string;
  createdAt: Date;
  validUntil: Date;
  status: 'active' | 'completed' | 'expired';
  generationType: 'ai' | 'manual' | 'mixed';
  dailySessions: StudySession[];
}

export interface StudySession {
  id: string;
  planId: string;
  date: Date;
  startTime: string;
  duration: number; // in minutes
  subject: string;
  topics: string[];
  status: 'pending' | 'completed' | 'missed';
  contentItems: ContentItemReference[];
}

export interface ContentItemReference {
  id: string;
  sessionId: string;
  contentType: 'concept' | 'flashcard' | 'question' | 'exam';
  contentId: string;
  status: 'pending' | 'completed';
  score?: number; // if applicable
  timeSpent?: number; // in seconds
}

export interface ConceptCard {
  id: string;
  subject: string;
  topic: string;
  title: string;
  content: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  imageUrl?: string;
  createdAt: Date;
  createdBy: 'ai' | 'admin';
  approved: boolean;
  usageCount: number;
}

export interface Flashcard {
  id: string;
  subject: string;
  topic: string;
  front: string;
  back: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  imageUrl?: string;
  createdAt: Date;
  createdBy: 'ai' | 'admin';
  approved: boolean;
  usageCount: number;
}

export interface Question {
  id: string;
  subject: string;
  topic: string;
  questionText: string;
  options: string[];
  correctAnswer: number; // index of correct option
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  imageUrl?: string;
  createdAt: Date;
  createdBy: 'ai' | 'admin';
  approved: boolean;
  usageCount: number;
}

export interface ExamPaper {
  id: string;
  title: string;
  subject: string;
  description: string;
  duration: number; // in minutes
  totalMarks: number;
  difficulty: 'easy' | 'medium' | 'hard';
  questionIds: string[];
  createdAt: Date;
  createdBy: 'ai' | 'admin';
  approved: boolean;
  usageCount: number;
}

export interface MoodLog {
  id: string;
  studentId: string;
  score: number; // 1-10
  notes?: string;
  timestamp: Date;
}

export interface FeelGoodContent {
  id: string;
  type: 'meme' | 'joke' | 'quote' | 'puzzle' | 'video';
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  tags: string[];
  moodTags: string[]; // e.g., "stress", "anxiety", "motivation"
  usageCount: number;
  approved: boolean;
  createdAt: Date;
}

export interface SurroundingInfluence {
  id: string;
  studentId: string;
  timestamp: Date;
  confidenceLevel: number; // 1-10
  peerInfluence: number; // -5 to 5 (negative to positive)
  environmentalFactors: {
    noise: number; // 1-10
    comfort: number; // 1-10
    distractions: number; // 1-10
  };
  overallScore: number; // calculated score
}

export interface UserDoubts {
  id: string;
  studentId: string;
  question: string;
  subject: string;
  topic: string;
  response: string;
  responseSource: 'ai' | 'tutor';
  satisfied: boolean;
  timestamp: Date;
  escalated: boolean;
}

export interface TutorChat {
  id: string;
  studentId: string;
  tutorId: string; // can be 'ai' for AI tutor
  messages: {
    sender: 'student' | 'tutor' | 'system';
    content: string;
    timestamp: Date;
  }[];
  subject?: string;
  topic?: string;
  status: 'active' | 'closed';
  rating?: number; // 1-5
  startedAt: Date;
  endedAt?: Date;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  body: string;
  type: 'reminder' | 'achievement' | 'suggestion' | 'system';
  read: boolean;
  actionUrl?: string;
  createdAt: Date;
  expiresAt?: Date;
  priority: 'low' | 'normal' | 'high';
}
