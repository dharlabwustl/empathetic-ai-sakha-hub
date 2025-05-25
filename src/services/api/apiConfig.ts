
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
    STUDENT_DATA_SYNC: '/admin/student-data-sync',
    DOCUMENTATION: '/admin/documentation',
    DATABASE_SCHEMA: '/admin/database-schema',
    API_DOCUMENTATION: '/admin/api-docs',
    FLASK_INTEGRATION: '/admin/flask-integration',
    DOWNLOAD_EXPORTS: '/admin/downloads',
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
    },
    STUDENT_MODULES: {
      TODAY_PLAN: '/admin/student-modules/today-plan',
      CONCEPTS: '/admin/student-modules/concepts',
      FLASHCARDS: '/admin/student-modules/flashcards',
      PRACTICE_EXAMS: '/admin/student-modules/practice-exams',
      MOOD_TRACKING: '/admin/student-modules/mood-tracking',
      VOICE_ASSISTANT: '/admin/student-modules/voice-assistant',
      ANALYTICS: '/admin/student-modules/analytics',
      PROFILE_MANAGEMENT: '/admin/student-modules/profile-management',
      NOTIFICATIONS: '/admin/student-modules/notifications',
      FEEL_GOOD_CORNER: '/admin/student-modules/feel-good-corner',
      SURROUNDING_INFLUENCES: '/admin/student-modules/surrounding-influences',
      AI_TUTOR: '/admin/student-modules/ai-tutor',
      EXAM_READINESS: '/admin/student-modules/exam-readiness',
      STUDY_HABITS: '/admin/student-modules/study-habits',
      BATCH_MANAGEMENT: '/admin/student-modules/batch-management',
      SUBSCRIPTION_MANAGEMENT: '/admin/student-modules/subscription-management'
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
    TODAY_PLAN: (studentId: string) => `/students/${studentId}/today-plan`,
    CONCEPTS: (studentId: string) => `/students/${studentId}/concepts`,
    FLASHCARDS: (studentId: string) => `/students/${studentId}/flashcards`,
    PRACTICE_EXAMS: (studentId: string) => `/students/${studentId}/practice-exams`,
    VOICE_ASSISTANT: (studentId: string) => `/students/${studentId}/voice-assistant`,
    ANALYTICS: (studentId: string) => `/students/${studentId}/analytics`,
    NOTIFICATIONS: (studentId: string) => `/students/${studentId}/notifications`,
    FEEL_GOOD_CORNER: (studentId: string) => `/students/${studentId}/feel-good-corner`,
    SURROUNDING_INFLUENCES: (studentId: string) => `/students/${studentId}/surrounding-influences`,
    AI_TUTOR: (studentId: string) => `/students/${studentId}/ai-tutor`,
    EXAM_READINESS: (studentId: string) => `/students/${studentId}/exam-readiness`,
    BATCH_INFO: (studentId: string) => `/students/${studentId}/batch-info`,
    SUBSCRIPTION_INFO: (studentId: string) => `/students/${studentId}/subscription-info`
  },
  CONTENT: {
    CONCEPTS: '/content/concepts',
    FLASHCARDS: '/content/flashcards',
    QUESTIONS: '/content/questions',
    EXAMS: '/content/exams',
    FEEL_GOOD: '/content/feel-good',
    STUDY_MATERIALS: '/content/study-materials',
    VOICE_CONTENT: '/content/voice-content',
    ANALYTICS_DATA: '/content/analytics-data'
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
    MODEL_TEST: '/ai/models/test',
    VOICE_ASSISTANT: '/ai/voice-assistant',
    ANALYTICS_AI: '/ai/analytics',
    EXAM_READINESS_AI: '/ai/exam-readiness'
  },
  EXPORTS: {
    DATABASE_SCHEMA_CSV: '/exports/database-schema.csv',
    DATABASE_SCHEMA_JSON: '/exports/database-schema.json',
    API_DOCS_PDF: '/exports/api-documentation.pdf',
    API_DOCS_WORD: '/exports/api-documentation.docx',
    FLASK_GUIDE_PDF: '/exports/flask-integration-guide.pdf',
    FLASK_GUIDE_WORD: '/exports/flask-integration-guide.docx',
    COMPLETE_DOCUMENTATION_PDF: '/exports/complete-documentation.pdf',
    COMPLETE_DOCUMENTATION_WORD: '/exports/complete-documentation.docx'
  }
};

// Response type for API calls
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error: string | null;
}

// Export format types
export type ExportFormat = 'csv' | 'json' | 'pdf' | 'docx';

// Documentation export types
export interface DocumentationExport {
  format: ExportFormat;
  title: string;
  description: string;
  endpoint: string;
}

export const AVAILABLE_EXPORTS: DocumentationExport[] = [
  {
    format: 'csv',
    title: 'Database Schema (CSV)',
    description: 'Complete database schema with tables, columns, and relationships',
    endpoint: API_ENDPOINTS.EXPORTS.DATABASE_SCHEMA_CSV
  },
  {
    format: 'json',
    title: 'Database Schema (JSON)',
    description: 'Structured database schema in JSON format',
    endpoint: API_ENDPOINTS.EXPORTS.DATABASE_SCHEMA_JSON
  },
  {
    format: 'pdf',
    title: 'API Documentation (PDF)',
    description: 'Complete API documentation with endpoints and examples',
    endpoint: API_ENDPOINTS.EXPORTS.API_DOCS_PDF
  },
  {
    format: 'docx',
    title: 'API Documentation (Word)',
    description: 'Editable API documentation in Word format',
    endpoint: API_ENDPOINTS.EXPORTS.API_DOCS_WORD
  },
  {
    format: 'pdf',
    title: 'Flask Integration Guide (PDF)',
    description: 'Step-by-step Flask backend integration guide',
    endpoint: API_ENDPOINTS.EXPORTS.FLASK_GUIDE_PDF
  },
  {
    format: 'docx',
    title: 'Flask Integration Guide (Word)',
    description: 'Editable Flask integration guide in Word format',
    endpoint: API_ENDPOINTS.EXPORTS.FLASK_GUIDE_WORD
  },
  {
    format: 'pdf',
    title: 'Complete Documentation (PDF)',
    description: 'All documentation combined in a single PDF',
    endpoint: API_ENDPOINTS.EXPORTS.COMPLETE_DOCUMENTATION_PDF
  },
  {
    format: 'docx',
    title: 'Complete Documentation (Word)',
    description: 'All documentation combined in a single Word document',
    endpoint: API_ENDPOINTS.EXPORTS.COMPLETE_DOCUMENTATION_WORD
  }
];
