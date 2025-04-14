
/**
 * API Configuration and Endpoints
 */

// Base API URL - should be configured based on the environment
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.sakhaai.com/v1';

// API Response interface
export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error: string | null;
  status?: number;
}

// API Endpoints configuration
export const API_ENDPOINTS = {
  // Authentication endpoints
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    ADMIN_LOGIN: `${API_BASE_URL}/auth/admin-login`,
    REFRESH_TOKEN: `${API_BASE_URL}/auth/refresh-token`,
    FORGOT_PASSWORD: `${API_BASE_URL}/auth/forgot-password`,
    RESET_PASSWORD: `${API_BASE_URL}/auth/reset-password`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
  },
  
  // Student related endpoints
  STUDENTS: {
    PROFILE: (id: string) => `${API_BASE_URL}/students/${id}/profile`,
    GOALS: (id: string) => `${API_BASE_URL}/students/${id}/goals`,
    STUDY_PLAN: (id: string) => `${API_BASE_URL}/students/${id}/study-plan`,
    PROGRESS: (id: string) => `${API_BASE_URL}/students/${id}/progress`,
    ACTIVITIES: (id: string) => `${API_BASE_URL}/students/${id}/activities`,
    MOOD_LOGS: (id: string) => `${API_BASE_URL}/students/${id}/mood-logs`,
    RECOMMENDATIONS: (id: string) => `${API_BASE_URL}/students/${id}/recommendations`,
    DOUBTS: (id: string) => `${API_BASE_URL}/students/${id}/doubts`,
    ONBOARDING: (id: string) => `${API_BASE_URL}/students/${id}/onboarding`,
    STUDY_MATERIALS: (id: string) => `${API_BASE_URL}/students/${id}/study-materials`,
    CONCEPT_CARDS: (id: string) => `${API_BASE_URL}/students/${id}/concept-cards`,
    FLASHCARDS: (id: string) => `${API_BASE_URL}/students/${id}/flashcards`,
    PRACTICE_EXAMS: (id: string) => `${API_BASE_URL}/students/${id}/practice-exams`,
  },
  
  // Admin related endpoints
  ADMIN: {
    DASHBOARD: `${API_BASE_URL}/admin/dashboard`,
    USERS: `${API_BASE_URL}/admin/users`,
    CONTENT: `${API_BASE_URL}/admin/content`,
    SYSTEM_LOGS: `${API_BASE_URL}/admin/system-logs`,
    CONFIGURATIONS: `${API_BASE_URL}/admin/configurations`,
    AI_MODELS: `${API_BASE_URL}/admin/ai-models`,
    DATABASE_SCHEMA: `${API_BASE_URL}/admin/database-schema`,
    FLASK_INTEGRATION: `${API_BASE_URL}/admin/flask-integration`,
    API_HEALTH: `${API_BASE_URL}/admin/api-health`,
    ML_MODELS: `${API_BASE_URL}/admin/ml-models`,
    STUDENTS: `${API_BASE_URL}/admin/students`,
    SETTINGS: `${API_BASE_URL}/admin/settings`,
    NOTIFICATIONS: `${API_BASE_URL}/admin/notifications`,
  },
  
  // Content related endpoints
  CONTENT: {
    GET_ALL: `${API_BASE_URL}/content`,
    GET_BY_ID: (id: string) => `${API_BASE_URL}/content/${id}`,
    CREATE: `${API_BASE_URL}/content`,
    UPDATE: (id: string) => `${API_BASE_URL}/content/${id}`,
    DELETE: (id: string) => `${API_BASE_URL}/content/${id}`,
    UPLOAD: `${API_BASE_URL}/content/upload`,
    GENERATE: `${API_BASE_URL}/content/generate`,
  },
  
  // AI and ML endpoints
  AI: {
    ANALYZE_MOOD: `${API_BASE_URL}/ai/analyze-mood`,
    GENERATE_PLAN: `${API_BASE_URL}/ai/generate-plan`,
    ANSWER_DOUBT: `${API_BASE_URL}/ai/answer-doubt`,
    DETECT_LEARNING_STYLE: `${API_BASE_URL}/ai/detect-learning-style`,
    PERSONALIZE_CONTENT: `${API_BASE_URL}/ai/personalize-content`,
    MODEL_STATUS: `${API_BASE_URL}/ai/model-status`,
    UPDATE_MODEL: (id: string) => `${API_BASE_URL}/ai/models/${id}`,
    PERSONALIZE: `${API_BASE_URL}/ai/personalize`,
    LEARNING_STYLE: `${API_BASE_URL}/ai/learning-style`,
    DOUBT_RESPONSE: `${API_BASE_URL}/ai/doubt-response`,
    TUTOR_CHAT: `${API_BASE_URL}/ai/tutor-chat`,
    MOOD_SUGGESTIONS: `${API_BASE_URL}/ai/mood-suggestions`,
  },
  
  // Miscellaneous endpoints
  MISC: {
    HEALTH_CHECK: `${API_BASE_URL}/health`,
    VERSION: `${API_BASE_URL}/version`,
    FEEDBACK: `${API_BASE_URL}/feedback`,
  }
};

export default API_ENDPOINTS;
