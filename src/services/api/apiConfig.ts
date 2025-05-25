
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
    AI_MODELS: '/admin/ai-models',
    BATCH_MANAGEMENT: '/admin/batches',
    EXAM_MANAGEMENT: '/admin/exams',
    SUBSCRIPTION_MANAGEMENT: '/admin/subscriptions',
    ANALYTICS_CENTER: '/admin/analytics',
    SECURITY_CENTER: '/admin/security',
    NOTIFICATION_CENTER: '/admin/notification-center',
    VOICE_ASSISTANT: '/admin/voice-assistant',
    STUDY_PLAN_MANAGEMENT: '/admin/study-plans',
    MOOD_ANALYTICS: '/admin/mood-analytics',
    FEEL_GOOD_CORNER: '/admin/feel-good-corner',
    SURROUNDING_INFLUENCE: '/admin/surrounding-influence',
    EXAM_READINESS: '/admin/exam-readiness',
    ONBOARDING_DATA: '/admin/onboarding-data',
    AI_TUTOR_MANAGEMENT: '/admin/ai-tutor',
    SYSTEM_OVERVIEW: '/admin/system-overview',
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
    },
    CONTENT_MANAGEMENT: {
      OVERVIEW: '/admin/content/overview',
      CONCEPT_CARDS: '/admin/content/concept-cards',
      FLASHCARDS: '/admin/content/flashcards',
      EXAMS: '/admin/content/exams',
      STUDY_MATERIALS: '/admin/content/study-materials',
      APPROVAL_QUEUE: '/admin/content/approval-queue',
      UPLOAD: '/admin/content/upload',
      GENERATE: '/admin/content/generate',
      AI_MODELS: '/admin/content/ai-models'
    }
  },
  STUDENTS: {
    PROFILE: (studentId: string) => `/students/${studentId}/profile`,
    GOALS: (studentId: string) => `/students/${studentId}/goals`,
    ONBOARDING: (studentId: string) => `/students/${studentId}/onboarding`,
    STUDY_PLAN: (studentId: string) => `/students/${studentId}/study-plan`,
    MOOD_LOGS: (studentId: string) => `/students/${studentId}/mood-logs`,
    DOUBTS: (studentId: string) => `/students/${studentId}/doubts`,
    STUDY_SESSIONS: (studentId: string) => `/students/${studentId}/study-sessions`,
    STUDY_HABITS: (studentId: string) => `/students/${studentId}/study-habits`
  },
  CONTENT: {
    CONCEPTS: '/content/concepts',
    FLASHCARDS: '/content/flashcards',
    QUESTIONS: '/content/questions',
    EXAMS: '/content/exams',
    FEEL_GOOD: '/content/feel-good'
  },
  AI: {
    PERSONALIZE: '/ai/personalize',
    LEARNING_STYLE: '/ai/learning-style',
    GENERATE_PLAN: '/ai/generate-plan',
    DOUBT_RESPONSE: '/ai/doubt-response',
    TUTOR_CHAT: '/ai/tutor-chat',
    MOOD_SUGGESTIONS: '/ai/mood-suggestions',
    TIME_SAVED_ANALYSIS: '/ai/time-saved-analysis',
    CONTENT_GENERATION: '/ai/content/generate',
    MODEL_CONFIG: '/ai/models/config',
    MODEL_TEST: '/ai/models/test'
  }
};

// Response type for API calls
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error: string | null;
}
