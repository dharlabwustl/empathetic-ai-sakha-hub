
// API configuration for the application

// Base API URL
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const FLASK_API_URL = import.meta.env.VITE_FLASK_API_URL || 'http://localhost:5001/api';

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
    SUBSCRIPTION_PLANS: '/admin/subscription-plans',
    PAYMENT_MANAGEMENT: '/admin/payment-management',
    MOOD_ANALYTICS: '/admin/mood-analytics',
    STUDY_PLAN_TEMPLATES: '/admin/study-plan-templates',
    AI_MODELS: '/admin/ai-models',
    CONTENT_REPOSITORY: '/admin/content-repository',
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
    MOOD_LOGS: (studentId: string) => `/students/${studentId}/mood-logs`,
    DOUBTS: (studentId: string) => `/students/${studentId}/doubts`,
    STUDY_SESSIONS: (studentId: string) => `/students/${studentId}/study-sessions`,
    STUDY_HABITS: (studentId: string) => `/students/${studentId}/study-habits`,
    SUBSCRIPTION: (studentId: string) => `/students/${studentId}/subscription`,
    PAYMENT_HISTORY: (studentId: string) => `/students/${studentId}/payment-history`,
    PAYMENT_SETTINGS: (studentId: string) => `/students/${studentId}/payment-settings`
  },
  CONTENT: {
    CONCEPTS: '/content/concepts',
    FLASHCARDS: '/content/flashcards',
    QUESTIONS: '/content/questions',
    EXAMS: '/content/exams',
    FEEL_GOOD: '/content/feel-good',
    REPOSITORY: '/content/repository',
    UPLOAD_REFERENCE: '/content/upload-reference',
    SAVE_GENERATED: '/content/save-generated',
    INTERACTIVE: (contentId: string) => `/content/interactive/${contentId}`,
    THREE_D_MODELS: (contentId: string) => `/content/3d-models/${contentId}`,
    VISUALS: (contentId: string) => `/content/visuals/${contentId}`
  },
  AI: {
    PERSONALIZE: '/ai/personalize',
    LEARNING_STYLE: '/ai/learning-style',
    GENERATE_PLAN: '/ai/generate-plan',
    DOUBT_RESPONSE: '/ai/doubt-response',
    TUTOR_CHAT: '/ai/tutor-chat',
    MOOD_SUGGESTIONS: '/ai/mood-suggestions',
    TIME_SAVED_ANALYSIS: '/ai/time-saved-analysis',
    GENERATE_CONTENT: '/ai/generate-content',
    TEST_MODEL: (modelType: string) => `/ai/test-model/${modelType}`,
    MODEL_PERFORMANCE: (modelType: string) => `/ai/model-performance/${modelType}`
  },
  SUBSCRIPTIONS: {
    PLANS: '/subscriptions/plans',
    PLAN: (planId: string) => `/subscriptions/plans/${planId}`
  },
  PAYMENTS: {
    PROCESS: '/payments/process',
    HISTORY: (userId: string) => `/payments/history/${userId}`,
    SETTINGS: (userId: string) => `/payments/settings/${userId}`
  },
  FLASK: {
    GENERATE_CONTENT: '/flask/generate-content',
    ANALYZE_STUDY_PATTERN: (userId: string) => `/flask/analyze-study-pattern/${userId}`,
    OPTIMIZE_STUDY_PLAN: (userId: string) => `/flask/optimize-study-plan/${userId}`,
    PREDICT_PERFORMANCE: (userId: string) => `/flask/predict-performance/${userId}`,
    PERSONALIZED_CONTENT: (userId: string) => `/flask/personalized-content/${userId}`
  }
};

// Response type for API calls
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error: string | null;
}
