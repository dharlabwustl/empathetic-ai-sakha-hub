
// Study progress types
export interface SubjectProgress {
  id: string;
  name: string;
  progress: number;
  totalTopics: number;
  completedTopics: number;
  weakAreas: string[];
  strongAreas: string[];
  lastStudied?: string;
  averageScore?: number;
  color?: string; // Added missing property
  topics?: {
    id: string;
    name: string;
    progress: number;
    status: 'completed' | 'in-progress' | 'not-started';
    lastPracticed?: string;
    score?: number;
    completed?: boolean; // Added missing property
    masteryLevel?: number; // Added missing property
  }[];
  quizzes?: {
    id: string;
    name: string;
    score: number;
    date: string;
    timeSpent: number;
    totalQuestions: number;
    correctAnswers: number;
  }[];
  quizScores?: { // Added missing property
    id: string;
    title: string;
    score: number;
    maxScore: number;
    date: string;
    timeTaken: string;
  }[];
  studyHours?: { // Added missing property
    date: string;
    hours: number;
  }[];
}

export interface StudyStreak {
  current: number;
  longest: number;
  lastStudyDate: string;
  weeklyData: {
    date: string;
    minutes: number;
  }[];
  monthlyData: {
    date: string;
    minutes: number;
  }[];
  thisWeek: number[]; // Added missing property
}

export interface ExamQuestion {
  id: string;
  question: string;
  options?: string[];
  correctAnswer?: string | string[];
  explanation: string;
  type: 'multiple-choice' | 'checkbox' | 'short-answer' | 'long-answer';
  points: number;
  feedback?: string;
  imagePath?: string; // For questions with images
  hasImage?: boolean; // Flag for questions with images
  difficulty?: 'easy' | 'medium' | 'hard'; // Question difficulty level
  tags?: string[]; // Tags for categorizing questions
  subject?: string; // Subject of the question
  chapter?: string; // Chapter or topic within the subject
  timeRecommended?: number; // Recommended time to solve in seconds
}

export interface ExamAttempt {
  id: string;
  examId: string;
  startedAt: string;
  completedAt: string;
  score: number;
  totalPoints: number;
  timeSpent: number; // in seconds
  answers: {
    questionId: string;
    userAnswer: any;
    correct: boolean;
    points: number;
    feedback?: string;
    timeTaken?: number; // Time taken to answer in seconds
  }[];
  percentile?: number;
  accuracy?: number; // Percentage of correct answers
  speedIndex?: number; // Measure of answering speed relative to recommended time
  subjectwisePerformance?: { // Performance broken down by subject
    subject: string;
    score: number;
    totalQuestions: number;
    correctAnswers: number;
  }[];
}

export interface Exam {
  id: string;
  title: string;
  description?: string;
  subject?: string;
  totalQuestions: number;
  totalPoints?: number;
  timeLimit?: number; // in minutes
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  questions: ExamQuestion[];
  attempts?: ExamAttempt[];
  averageScore?: number;
  topScore?: number;
  completionRate?: number;
  tags?: string[];
  recommendedFor?: string[];
  createdAt?: string;
  updatedAt?: string;
  requiredScore?: number; // Minimum score required to pass
  status?: 'active' | 'draft' | 'archived';
}
