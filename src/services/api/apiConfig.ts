
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
    CHANGE_PASSWORD: '/auth/change-password',
    ADMIN_LOGIN: '/auth/admin/login'
  },
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    STUDENTS: '/admin/students',
    CONTENT: '/admin/content',
    SYSTEM_LOGS: '/admin/logs',
    SETTINGS: '/admin/settings',
    NOTIFICATIONS: '/admin/notifications',
    FEATURES: '/admin/features',
    SUBSCRIPTIONS: '/admin/subscriptions',
    ANALYTICS: '/admin/analytics',
    PAYMENT_HISTORY: '/admin/payments',
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
    DATABASE: {
      EXPORT: '/admin/database/export',
      SCHEMA: '/admin/database/schema',
      BACKUP: '/admin/database/backup',
      RESTORE: '/admin/database/restore'
    },
    USER_MANAGEMENT: {
      ADMIN_USERS: '/admin/users/admins',
      CREATE_ADMIN: '/admin/users/create-admin',
      UPDATE_ADMIN: (adminId: string) => `/admin/users/${adminId}/update`,
      DELETE_ADMIN: (adminId: string) => `/admin/users/${adminId}/delete`
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
    FEATURE_ACCESS: (studentId: string) => `/students/${studentId}/features`,
    SUBSCRIPTION: (studentId: string) => `/students/${studentId}/subscription`,
    PROGRESS: (studentId: string) => `/students/${studentId}/progress`,
    ANALYTICS: (studentId: string) => `/students/${studentId}/analytics`
  },
  CONTENT: {
    CONCEPTS: '/content/concepts',
    FLASHCARDS: '/content/flashcards',
    QUESTIONS: '/content/questions',
    EXAMS: '/content/exams',
    FEEL_GOOD: '/content/feel-good',
    TOPICS: (subject: string) => `/content/topics/${subject}`,
    CONCEPT_BY_TOPIC: (topicName: string) => `/content/concepts/topic/${topicName}`,
    FLASHCARD_BY_TOPIC: (topicName: string) => `/content/flashcards/topic/${topicName}`,
    EXAM_BY_ID: (examId: string) => `/content/exams/${examId}`,
    DAILY_QUOTES: '/content/daily-quotes',
    MOTIVATIONAL_CONTENT: '/content/motivational'
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
    PERSONALIZED_FEEDBACK: '/ai/personalized-feedback'
  },
  SUBSCRIPTION: {
    PLANS: '/subscription/plans',
    USER_SUBSCRIPTION: (userId: string) => `/subscription/user/${userId}`,
    CREATE: '/subscription/create',
    CANCEL: (subscriptionId: string) => `/subscription/cancel/${subscriptionId}`,
    UPGRADE: (subscriptionId: string) => `/subscription/upgrade/${subscriptionId}`,
    INVOICES: (userId: string) => `/subscription/invoices/${userId}`
  }
};

// Response type for API calls
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error: string | null;
}

// Database schema definition for easier API consumption
export const DATABASE_SCHEMA = {
  TABLES: {
    USERS: 'users',
    STUDENTS: 'students',
    ADMINS: 'admins',
    STUDENT_PROFILES: 'student_profiles',
    STUDY_PLANS: 'study_plans',
    STUDY_SESSIONS: 'study_sessions',
    MOOD_LOGS: 'mood_logs',
    CONCEPTS: 'concepts',
    FLASHCARDS: 'flashcards',
    QUESTIONS: 'questions',
    EXAMS: 'exams',
    EXAM_ATTEMPTS: 'exam_attempts',
    SUBSCRIPTIONS: 'subscriptions',
    PAYMENT_HISTORY: 'payment_history',
    FEATURES: 'features',
    FEATURE_ACCESS: 'feature_access',
    STUDENT_GOALS: 'student_goals',
    TOPICS: 'topics',
    SUBJECTS: 'subjects',
    DAILY_QUOTES: 'daily_quotes',
    MOTIVATIONAL_CONTENT: 'motivational_content',
    NOTIFICATIONS: 'notifications',
    ACTIVITY_LOGS: 'activity_logs',
    SYSTEM_LOGS: 'system_logs',
    SETTINGS: 'settings'
  },
  RELATIONS: {
    STUDENT_TO_PROFILE: 'student_id -> student_profiles.student_id',
    STUDENT_TO_STUDY_PLAN: 'student_id -> study_plans.student_id',
    STUDENT_TO_MOOD_LOGS: 'student_id -> mood_logs.student_id',
    STUDENT_TO_EXAM_ATTEMPTS: 'student_id -> exam_attempts.student_id',
    STUDENT_TO_SUBSCRIPTION: 'student_id -> subscriptions.user_id',
    STUDENT_TO_FEATURES: 'student_id -> feature_access.user_id',
    FEATURE_ACCESS_TO_FEATURE: 'feature_id -> features.id',
    SUBSCRIPTIONS_TO_PAYMENT: 'subscription_id -> payment_history.subscription_id',
    TOPIC_TO_SUBJECT: 'subject_id -> subjects.id',
    CONCEPT_TO_TOPIC: 'topic_id -> topics.id',
    FLASHCARD_TO_TOPIC: 'topic_id -> topics.id',
    QUESTION_TO_TOPIC: 'topic_id -> topics.id',
    EXAM_TO_QUESTIONS: 'exam_id -> questions.id (many-to-many)',
    NOTIFICATION_TO_USER: 'user_id -> users.id'
  }
};

// Export the database schema for download
export const getSchemaForDownload = () => {
  return {
    schema: DATABASE_SCHEMA,
    tables: [
      {
        name: 'users',
        columns: [
          { name: 'id', type: 'uuid', primary: true },
          { name: 'email', type: 'varchar', unique: true },
          { name: 'password_hash', type: 'varchar' },
          { name: 'role', type: 'varchar' },
          { name: 'created_at', type: 'timestamp' },
          { name: 'last_login', type: 'timestamp' },
          { name: 'is_active', type: 'boolean' }
        ]
      },
      {
        name: 'students',
        columns: [
          { name: 'student_id', type: 'uuid', primary: true, references: 'users(id)' },
          { name: 'name', type: 'varchar' },
          { name: 'phone_number', type: 'varchar', nullable: true },
          { name: 'registration_date', type: 'timestamp' }
        ]
      },
      {
        name: 'student_profiles',
        columns: [
          { name: 'profile_id', type: 'uuid', primary: true },
          { name: 'student_id', type: 'uuid', references: 'students(student_id)' },
          { name: 'goals', type: 'text[]' },
          { name: 'exam_type', type: 'varchar' },
          { name: 'study_hours', type: 'integer' },
          { name: 'subjects_selected', type: 'varchar[]' },
          { name: 'learning_style', type: 'varchar' },
          { name: 'preferred_study_time', type: 'varchar' }
        ]
      },
      {
        name: 'subscriptions',
        columns: [
          { name: 'subscription_id', type: 'uuid', primary: true },
          { name: 'user_id', type: 'uuid', references: 'users(id)' },
          { name: 'plan_type', type: 'varchar' },
          { name: 'start_date', type: 'timestamp' },
          { name: 'end_date', type: 'timestamp' },
          { name: 'is_active', type: 'boolean' },
          { name: 'auto_renew', type: 'boolean' },
          { name: 'price', type: 'decimal' }
        ]
      },
      {
        name: 'features',
        columns: [
          { name: 'id', type: 'uuid', primary: true },
          { name: 'title', type: 'varchar' },
          { name: 'description', type: 'text' },
          { name: 'path', type: 'varchar' },
          { name: 'is_premium', type: 'boolean' },
          { name: 'free_access_type', type: 'varchar', nullable: true },
          { name: 'free_access_limit', type: 'integer', nullable: true },
          { name: 'allowed_plans', type: 'varchar[]', nullable: true }
        ]
      },
      {
        name: 'feature_access',
        columns: [
          { name: 'id', type: 'uuid', primary: true },
          { name: 'user_id', type: 'uuid', references: 'users(id)' },
          { name: 'feature_id', type: 'uuid', references: 'features(id)' },
          { name: 'has_access', type: 'boolean' },
          { name: 'usage_count', type: 'integer' },
          { name: 'last_accessed', type: 'timestamp' }
        ]
      }
    ]
  };
};
