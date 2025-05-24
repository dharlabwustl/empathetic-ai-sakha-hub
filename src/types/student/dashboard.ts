
export interface RevisionItem {
  id: string;
  title: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeEstimate: number;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  dueDate?: Date;
  type?: string;
  retentionScore?: number;
}

export interface DashboardStats {
  totalStudyTime: number;
  completedTasks: number;
  upcomingExams: number;
  averageScore: number;
}

export interface ProgressSnapshot {
  id: string;
  date: string;
  completedTasks: number;
  studyTime: number;
  score: number;
  conceptsDone: number;
  flashcardsDone: number;
  testsTaken: number;
  completionPercentage: number;
}

export interface ProgressTracker {
  snapshots: ProgressSnapshot[];
  weeklyGoal: number;
  currentStreak: number;
  daily: ProgressSnapshot;
  weekly: ProgressSnapshot;
  monthly: ProgressSnapshot;
}

export interface Subject {
  id: string;
  name: string;
  progress: number;
  color: string;
  topics: number;
  completedTopics: number;
  priority: string;
  status: string;
  conceptsTotal: number;
  conceptsCompleted: number;
  flashcards: {
    total: number;
    completed: number;
    accuracy: number;
  };
  practiceTests: {
    total: number;
    completed: number;
    score: number;
  };
  quizAverage: number;
  recommendedStudyHours: number;
}

export interface ConceptCard {
  id: string;
  title: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
  progress: number;
}

export interface Milestone {
  id: string;
  title: string;
  date: string;
  type: 'exam' | 'deadline' | 'goal';
  progress: number;
  description: string;
  completed?: boolean;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: string;
  difficulty: string;
  points: number;
  dueDate: Date;
  status: string;
  completedBy: {
    userId: string;
    name: string;
    avatar: string;
    completedAt: Date;
    points: number;
  }[];
  totalParticipants: number;
  successRate: number;
}
