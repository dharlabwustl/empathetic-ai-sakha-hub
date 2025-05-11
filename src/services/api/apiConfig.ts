
// API configuration for the application

// Base API URL
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    VERIFY: '/auth/verify',
    RESET_PASSWORD: '/auth/reset-password',
    CHANGE_PASSWORD: '/auth/change-password'
  },
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    STUDENTS: '/admin/students',
    CONTENT: '/admin/content',
    SYSTEM_LOGS: '/admin/logs',
    SETTINGS: '/admin/settings',
    NOTIFICATIONS: '/admin/notifications',
    STUDY_HABITS: {
      SETTINGS: '/admin/study-habits/settings',
      ANALYTICS: '/admin/study-habits/analytics',
      SESSIONS: (studentId: string) => `/admin/study-habits/${studentId}/sessions`,
      HABITS: (studentId: string) => `/admin/study-habits/${studentId}/habits`,
      CALCULATE_CONSISTENCY: (studentId: string) => `/admin/study-habits/${studentId}/calculate-consistency`
    },
    VERIFIED_METRICS: {
      MOOD_IMPROVEMENT: '/admin/verified-metrics/mood-improvement',
      TIME_SAVED: '/admin/verified-metrics/time-saved',
      CONSISTENT_HABITS: '/admin/verified-metrics/consistent-habits',
      EXAM_CONFIDENCE: '/admin/verified-metrics/exam-confidence',
      RETENTION_RATE: '/admin/verified-metrics/retention-rate',
      MOOD_FEATURE_USAGE: '/admin/verified-metrics/mood-feature-usage'
    }
  },
  STUDENTS: {
    PROFILE: (studentId: string) => `/students/${studentId}/profile`,
    GOALS: (studentId: string) => `/students/${studentId}/goals`,
    ONBOARDING: (studentId: string) => `/students/${studentId}/onboarding`,
    STUDY_PLAN: (studentId: string) => `/students/${studentId}/study-plan`,
    DAILY_PLAN: (studentId: string) => `/students/${studentId}/daily-plan`,
    MOOD_LOGS: (studentId: string) => `/students/${studentId}/mood-logs`,
    MOOD_HISTORY: (studentId: string) => `/students/${studentId}/mood-logs/history`,
    MOOD_TRENDS: (studentId: string) => `/students/${studentId}/mood-logs/trends`,
    DOUBTS: (studentId: string) => `/students/${studentId}/doubts`,
    STUDY_SESSIONS: (studentId: string) => `/students/${studentId}/study-sessions`,
    STUDY_HABITS: (studentId: string) => `/students/${studentId}/study-habits`,
    STATISTICS: (studentId: string) => `/students/${studentId}/statistics`,
    PREFERENCES: (studentId: string) => `/students/${studentId}/preferences`,
    CONCEPTS: (studentId: string) => `/students/${studentId}/concepts`,
    CONCEPT_PROGRESS: (studentId: string, conceptId: string) => 
      `/students/${studentId}/concepts/${conceptId}/progress`,
    FLASHCARDS: {
      DECKS: (studentId: string) => `/students/${studentId}/flashcards/decks`,
      STATS: (studentId: string) => `/students/${studentId}/flashcards/stats`,
      PROGRESS: (studentId: string, cardId: string) => 
        `/students/${studentId}/flashcards/${cardId}/progress`
    },
    EXAMS: {
      LIST: (studentId: string) => `/students/${studentId}/exams`,
      STATS: (studentId: string) => `/students/${studentId}/exams/stats`,
      START: (studentId: string, examId: string) => `/students/${studentId}/exams/${examId}/start`,
      SUBMIT: (studentId: string, examId: string) => `/students/${studentId}/exams/${examId}/submit`,
      RESULTS: (studentId: string, examId: string) => `/students/${studentId}/exams/${examId}/results`
    },
    STUDY_PLANS: (studentId: string) => `/students/${studentId}/study-plans`,
    BREAKS: (studentId: string) => `/students/${studentId}/breaks`,
    ACTIVITY: (studentId: string) => `/students/${studentId}/activity`
  },
  CONTENT: {
    CONCEPTS: '/content/concepts',
    FLASHCARDS: '/content/flashcards',
    FLASHCARD_DECKS: {
      LIST: '/content/flashcards/decks',
      CARDS: (deckId: string) => `/content/flashcards/decks/${deckId}/cards`
    },
    QUESTIONS: '/content/questions',
    EXAMS: '/content/exams',
    EXAM_QUESTIONS: (examId: string) => `/content/exams/${examId}/questions`,
    FEEL_GOOD: '/content/feel-good',
    FEEL_GOOD_EXERCISES: '/content/feel-good/exercises',
    STUDY_TIPS: '/content/study-tips',
    SUBJECTS: '/content/subjects',
    TOPICS: '/content/topics'
  },
  AI: {
    PERSONALIZE: '/ai/personalize',
    LEARNING_STYLE: '/ai/learning-style',
    GENERATE_PLAN: '/ai/generate-plan',
    DOUBT_RESPONSE: '/ai/doubt-response',
    TUTOR_CHAT: '/ai/tutor-chat',
    MOOD_SUGGESTIONS: '/ai/mood-suggestions',
    TIME_SAVED_ANALYSIS: '/ai/time-saved-analysis'
  }
};

// Response type for API calls
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error: string | null;
}
