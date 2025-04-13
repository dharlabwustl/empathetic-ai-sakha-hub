
// API Configuration for Flask backend integration
import { AdminSettings } from "@/types/admin";

// Environment-specific API URLs
const getApiBaseUrl = (): string => {
  const environment = import.meta.env.VITE_APP_ENVIRONMENT || 'development';
  
  switch (environment) {
    case 'production':
      return import.meta.env.VITE_API_URL_PRODUCTION || 'https://api.sakha.ai/api/v1';
    case 'staging':
      return import.meta.env.VITE_API_URL_STAGING || 'https://staging-api.sakha.ai/api/v1';
    case 'development':
    default:
      return import.meta.env.VITE_API_URL_DEVELOPMENT || 'http://localhost:5000/api/v1';
  }
};

// API endpoints organized by feature
export const API_ENDPOINTS = {
  // Authentication endpoints
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    VERIFY_EMAIL: '/auth/verify-email',
    RESET_PASSWORD: '/auth/reset-password',
    REFRESH_TOKEN: '/auth/refresh-token',
    ADMIN_LOGIN: '/auth/admin/login',
    VERIFY_TOKEN: '/auth/verify-token',
  },
  
  // Student-related endpoints
  STUDENTS: {
    BASE: '/students',
    PROFILE: (id: string) => `/students/${id}/profile`,
    ONBOARDING: (id: string) => `/students/${id}/onboarding`,
    STUDY_PLAN: (id: string) => `/students/${id}/study-plan`,
    PROGRESS: (id: string) => `/students/${id}/progress`,
    MOOD_LOGS: (id: string) => `/students/${id}/mood-logs`,
    GOALS: (id: string) => `/students/${id}/goals`,
    DOUBTS: (id: string) => `/students/${id}/doubts`,
  },
  
  // Content-related endpoints
  CONTENT: {
    CONCEPTS: '/content/concepts',
    FLASHCARDS: '/content/flashcards',
    QUESTIONS: '/content/questions',
    EXAMS: '/content/exams',
    FEEL_GOOD: '/content/feel-good',
    UPLOAD: '/content/upload',
    APPROVE: (id: string) => `/content/${id}/approve`,
  },
  
  // AI personalization endpoints
  AI: {
    PERSONALIZE: '/ai/personalize',
    LEARNING_STYLE: '/ai/learning-style',
    GENERATE_PLAN: '/ai/generate-plan',
    DOUBT_RESPONSE: '/ai/doubt-response',
    TUTOR_CHAT: '/ai/tutor-chat',
    MOOD_SUGGESTIONS: '/ai/mood-suggestions',
  },
  
  // Analytics endpoints
  ANALYTICS: {
    DASHBOARD: '/analytics/dashboard',
    STUDENT_ENGAGEMENT: '/analytics/student-engagement',
    CONTENT_USAGE: '/analytics/content-usage',
    LEARNING_PULSE: '/analytics/learning-pulse',
    SURROUNDING_INFLUENCES: '/analytics/surrounding-influences',
  },
  
  // Admin endpoints
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    STUDENTS: '/admin/students',
    CONTENT: '/admin/content',
    SETTINGS: '/admin/settings',
    NOTIFICATIONS: '/admin/notifications',
    SYSTEM_LOGS: '/admin/system-logs',
  },
};

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// API configuration
export const apiConfig = {
  baseUrl: getApiBaseUrl(),
  defaultHeaders: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};

export default apiConfig;
