
import { StudentData } from "./studentData";

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'super_admin' | 'content_manager';
  lastLogin?: string;
  createdAt: string;
  permissions?: string[];
  isActive: boolean;
}

export interface AdminSettings {
  id: string;
  aiModelSettings: {
    defaultModel: string;
    temperature: number;
    maxTokens: number;
    customPrompts: boolean;
  };
  notificationSettings: {
    emailEnabled: boolean;
    pushEnabled: boolean;
    smsEnabled: boolean;
    digestFrequency: 'daily' | 'weekly' | 'never';
  };
  contentSettings: {
    autoapproveContent: boolean;
    requireSecondaryReview: boolean;
    maxUploadSizeMB: number;
  };
  systemSettings: {
    maintenanceMode: boolean;
    debugMode: boolean;
    allowedIPs: string[];
    useThirdPartyServices: boolean;
  };
}

export interface AdminAuthContextProps {
  admin: AdminUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
}

export interface ContentItem {
  id: string;
  title: string;
  type: 'article' | 'video' | 'exercise' | 'quiz';
  status: 'draft' | 'pending' | 'published' | 'archived';
  author: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  tags: string[];
  viewCount: number;
  subjectId: string;
  topicIds: string[];
  timeToComplete?: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface NotificationTemplate {
  id: string;
  name: string;
  type: 'email' | 'push' | 'sms' | 'in_app';
  subject: string;
  body: string;
  variables: string[];
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  subjectId: string;
  topicId: string;
  difficulty: 'easy' | 'medium' | 'hard';
  lastReviewed?: string;
  nextReview?: string;
  timesReviewed: number;
  masteryLevel: number;
}

export interface ConceptCard {
  id: string;
  title: string;
  content: string;
  subjectId: string;
  topicId: string;
  imageUrl?: string;
  examples: string[];
  relatedConcepts: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface ExamPaper {
  id: string;
  title: string;
  type: 'practice' | 'mock' | 'previous_year';
  subject: string;
  year?: number;
  totalMarks: number;
  duration: number;
  questions: Question[];
  difficulty: 'easy' | 'medium' | 'hard';
  createdAt: string;
}

export interface Question {
  id: string;
  text: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  marks: number;
  type: 'mcq' | 'short_answer' | 'long_answer' | 'true_false';
  difficulty: 'easy' | 'medium' | 'hard';
  topicIds: string[];
}

export interface FeelGoodContent {
  id: string;
  type: 'quote' | 'video' | 'exercise' | 'mindfulness' | 'tip';
  title: string;
  content: string;
  author?: string;
  imageUrl?: string;
  videoUrl?: string;
  duration?: number;
  moodTags: string[];
  usageCount: number;
  rating: number;
}

export interface SurroundingInfluence {
  id: string;
  name: string;
  type: 'physical' | 'social' | 'digital' | 'environmental';
  impact: 'positive' | 'negative' | 'neutral';
  description: string;
  recommendations: string[];
  activeTime?: string[];
}

export interface StudyPlan {
  id: string;
  userId: string;
  name: string;
  startDate: string;
  endDate: string;
  subjects: {
    id: string;
    name: string;
    topics: {
      id: string;
      name: string;
      plannedDate: string;
      completed: boolean;
      duration: number;
    }[];
  }[];
  status: 'active' | 'completed' | 'paused' | 'cancelled';
}

export interface MoodLog {
  id: string;
  userId: string;
  timestamp: string;
  mood: 'excellent' | 'good' | 'okay' | 'low' | 'bad';
  notes?: string;
  factors?: string[];
  studyEfficiency?: number;
}

export interface UserDoubts {
  id: string;
  userId: string;
  subjectId: string;
  topicId: string;
  question: string;
  context?: string;
  imageUrl?: string;
  status: 'pending' | 'answered' | 'escalated';
  createdAt: string;
  answeredAt?: string;
  answer?: string;
  answerBy?: string;
  rating?: number;
  followUpQuestions?: {
    id: string;
    question: string;
    answer?: string;
    timestamp: string;
  }[];
}

export interface TutorChat {
  id: string;
  userId: string;
  sessionId: string;
  startTime: string;
  endTime?: string;
  subject?: string;
  topic?: string;
  messages: {
    id: string;
    sender: 'user' | 'tutor';
    content: string;
    timestamp: string;
    attachments?: string[];
  }[];
  rating?: number;
  feedback?: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'system' | 'study' | 'achievement' | 'reminder';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  expiry?: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
}

export { StudentData };
