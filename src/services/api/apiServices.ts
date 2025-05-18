
import apiClient, { ApiResponse } from './apiClient';
import { API_ENDPOINTS } from './apiConfig';

// Student service
const studentService = {
  // Profile related endpoints
  getProfile: async (studentId: string): Promise<ApiResponse> => {
    return await apiClient.get(API_ENDPOINTS.STUDENTS.PROFILE(studentId));
  },
  
  updateProfile: async (studentId: string, profileData: any): Promise<ApiResponse> => {
    return await apiClient.put(API_ENDPOINTS.STUDENTS.PROFILE(studentId), profileData);
  },
  
  // Study plan management
  getStudyPlan: async (studentId: string): Promise<ApiResponse> => {
    return await apiClient.get(API_ENDPOINTS.STUDENTS.STUDY_PLAN(studentId));
  },
  
  createStudyPlan: async (studentId: string, planData: any): Promise<ApiResponse> => {
    return await apiClient.post(API_ENDPOINTS.STUDENTS.STUDY_PLAN(studentId), planData);
  },
  
  // Study habits tracking
  getStudyHabits: async (studentId: string): Promise<ApiResponse> => {
    return await apiClient.get(API_ENDPOINTS.STUDENTS.STUDY_HABITS(studentId));
  },
  
  logStudySession: async (studentId: string, sessionData: any): Promise<ApiResponse> => {
    return await apiClient.post(API_ENDPOINTS.STUDENTS.STUDY_SESSIONS(studentId), sessionData);
  },
  
  // Mood logging
  getMoodLogs: async (studentId: string): Promise<ApiResponse> => {
    return await apiClient.get(API_ENDPOINTS.STUDENTS.MOOD_LOGS(studentId));
  },
  
  logMood: async (studentId: string, moodData: any): Promise<ApiResponse> => {
    return await apiClient.post(API_ENDPOINTS.STUDENTS.MOOD_LOGS(studentId), moodData);
  }
};

// Content service
const contentService = {
  // Concepts
  getConcepts: async (filters = {}): Promise<ApiResponse> => {
    return await apiClient.get(API_ENDPOINTS.CONTENT.CONCEPTS, { params: filters });
  },
  
  getConceptById: async (conceptId: string): Promise<ApiResponse> => {
    return await apiClient.get(`${API_ENDPOINTS.CONTENT.CONCEPTS}/${conceptId}`);
  },
  
  // Flashcards
  getFlashcards: async (filters = {}): Promise<ApiResponse> => {
    return await apiClient.get(API_ENDPOINTS.CONTENT.FLASHCARDS, { params: filters });
  },
  
  getFlashcardById: async (flashcardId: string): Promise<ApiResponse> => {
    return await apiClient.get(`${API_ENDPOINTS.CONTENT.FLASHCARDS}/${flashcardId}`);
  },
  
  // Practice exams
  getExams: async (filters = {}): Promise<ApiResponse> => {
    return await apiClient.get(API_ENDPOINTS.CONTENT.EXAMS, { params: filters });
  },
  
  getExamById: async (examId: string): Promise<ApiResponse> => {
    return await apiClient.get(`${API_ENDPOINTS.CONTENT.EXAMS}/${examId}`);
  },
  
  submitExamResults: async (examId: string, resultData: any): Promise<ApiResponse> => {
    return await apiClient.post(`${API_ENDPOINTS.CONTENT.EXAMS}/${examId}/results`, resultData);
  }
};

// AI service
const aiService = {
  // Personalization
  personalizeContent: async (userData: any): Promise<ApiResponse> => {
    return await apiClient.post(API_ENDPOINTS.AI.PERSONALIZE, userData);
  },
  
  // Learning style analysis
  analyzeLearningStyle: async (learningData: any): Promise<ApiResponse> => {
    return await apiClient.post(API_ENDPOINTS.AI.LEARNING_STYLE, learningData);
  },
  
  // Study plan generation
  generateStudyPlan: async (planParams: any): Promise<ApiResponse> => {
    return await apiClient.post(API_ENDPOINTS.AI.GENERATE_PLAN, planParams);
  },
  
  // Doubt resolution
  resolveDoubt: async (doubtData: any): Promise<ApiResponse> => {
    return await apiClient.post(API_ENDPOINTS.AI.DOUBT_RESPONSE, doubtData);
  },
  
  // Tutor chat
  sendTutorMessage: async (messageData: any): Promise<ApiResponse> => {
    return await apiClient.post(API_ENDPOINTS.AI.TUTOR_CHAT, messageData);
  },
  
  // Mood-based suggestions
  getMoodSuggestions: async (moodData: any): Promise<ApiResponse> => {
    return await apiClient.post(API_ENDPOINTS.AI.MOOD_SUGGESTIONS, moodData);
  }
};

// Subscription service
const subscriptionService = {
  // Get available plans
  getPlans: async (): Promise<ApiResponse> => {
    return await apiClient.get('/subscription/plans');
  },
  
  // Subscribe to a plan
  subscribe: async (planData: any): Promise<ApiResponse> => {
    return await apiClient.post('/subscription/subscribe', planData);
  },
  
  // Cancel subscription
  cancelSubscription: async (subscriptionId: string): Promise<ApiResponse> => {
    return await apiClient.post(`/subscription/${subscriptionId}/cancel`);
  },
  
  // Create batch invitation code
  createBatchInvitation: async (batchData: any): Promise<ApiResponse> => {
    return await apiClient.post('/subscription/batch/create', batchData);
  },
  
  // Redeem invitation code
  redeemInvitationCode: async (inviteCode: string): Promise<ApiResponse> => {
    return await apiClient.post('/subscription/batch/redeem', { inviteCode });
  }
};

// Authentication service with API integration
const authApiService = {
  login: async (credentials: { email: string; password: string }): Promise<ApiResponse> => {
    return await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
  },
  
  register: async (userData: any): Promise<ApiResponse> => {
    return await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, userData);
  },
  
  verifyEmail: async (token: string): Promise<ApiResponse> => {
    return await apiClient.post(API_ENDPOINTS.AUTH.VERIFY, { token });
  },
  
  resetPassword: async (email: string): Promise<ApiResponse> => {
    return await apiClient.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, { email });
  },
  
  changePassword: async (passwordData: { currentPassword: string; newPassword: string }): Promise<ApiResponse> => {
    return await apiClient.post(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, passwordData);
  },
  
  refreshToken: async (): Promise<ApiResponse> => {
    return await apiClient.post(API_ENDPOINTS.AUTH.REFRESH);
  },
  
  logout: async (): Promise<ApiResponse> => {
    return await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
  }
};

// Export all services
export {
  studentService,
  contentService,
  aiService,
  subscriptionService,
  authApiService
};
