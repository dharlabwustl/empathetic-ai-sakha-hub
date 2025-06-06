
export interface FlashcardAnalytics {
  id: string;
  userId: string;
  flashcardId: string;
  accuracyRate: number; // 0-100
  masteryLevel: number; // 0-100
  reviewCount: number;
  streakCount: number;
  longestStreak: number;
  averageResponseTime: number; // in milliseconds
  fastestTime: number;
  slowestTime: number;
  difficultyRating: number; // 1-5 user perceived difficulty
  confidenceLevel: number; // 1-5
  lastReviewDate: string;
  nextReviewDate: string;
  spacedRepetitionInterval: number; // in days
  createdAt: string;
  updatedAt: string;
}

export interface FlashcardAttempt {
  id: string;
  userId: string;
  flashcardId: string;
  isCorrect: boolean;
  responseTime: number; // in milliseconds
  attemptDate: string;
  hintsUsed: number;
  confidenceBeforeReveal: number; // 1-5
  difficultyPerceived: number; // 1-5
  studySessionId?: string;
}

export interface FlashcardAccuracyTracking {
  id: string;
  userId: string;
  flashcardId: string;
  accuracyPercentage: number;
  streakCount: number;
  lastAttempt: string;
  improvementRate: number;
  consistencyScore: number;
  createdAt: string;
  updatedAt: string;
}

export interface FlashcardTimingData {
  id: string;
  userId: string;
  flashcardId: string;
  averageTime: number;
  fastestTime: number;
  trendData: {
    date: string;
    averageTime: number;
  }[];
  timeImprovement: number; // percentage improvement
  createdAt: string;
}
