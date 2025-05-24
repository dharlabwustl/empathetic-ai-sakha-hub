
import apiClient from './apiClient';
import { API_ENDPOINTS, ApiResponse } from './apiConfig';
import { UserProfileBase, MoodType } from '@/types/user/base';
import { StudyPlan } from '@/types/user/studyPlan';

// Comprehensive API service for all admin and student features
const comprehensiveApiService = {
  // User Profile Management
  async saveOnboardingData(userId: string, onboardingData: any): Promise<ApiResponse<any>> {
    try {
      const response = await apiClient.post(`/users/${userId}/onboarding`, onboardingData);
      return { success: true, data: response.data, error: null };
    } catch (error: any) {
      return { success: false, data: null, error: error.message };
    }
  },

  async getUserProfile(userId: string): Promise<ApiResponse<UserProfileBase>> {
    try {
      const response = await apiClient.get(`/users/${userId}/profile`);
      return { success: true, data: response.data, error: null };
    } catch (error: any) {
      return { success: false, data: null, error: error.message };
    }
  },

  async updateUserProfile(userId: string, profileData: Partial<UserProfileBase>): Promise<ApiResponse<UserProfileBase>> {
    try {
      const response = await apiClient.put(`/users/${userId}/profile`, profileData);
      return { success: true, data: response.data, error: null };
    } catch (error: any) {
      return { success: false, data: null, error: error.message };
    }
  },

  // Study Plan Management
  async createStudyPlan(userId: string, planData: any): Promise<ApiResponse<StudyPlan>> {
    try {
      const response = await apiClient.post(`/users/${userId}/study-plans`, planData);
      return { success: true, data: response.data, error: null };
    } catch (error: any) {
      return { success: false, data: null, error: error.message };
    }
  },

  async getUserStudyPlans(userId: string): Promise<ApiResponse<StudyPlan[]>> {
    try {
      const response = await apiClient.get(`/users/${userId}/study-plans`);
      return { success: true, data: response.data, error: null };
    } catch (error: any) {
      return { success: false, data: null, error: error.message };
    }
  },

  async updateStudyPlan(userId: string, planId: string, planData: Partial<StudyPlan>): Promise<ApiResponse<StudyPlan>> {
    try {
      const response = await apiClient.put(`/users/${userId}/study-plans/${planId}`, planData);
      return { success: true, data: response.data, error: null };
    } catch (error: any) {
      return { success: false, data: null, error: error.message };
    }
  },

  // Content Management
  async uploadReferenceFile(file: File, metadata: any): Promise<ApiResponse<any>> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('metadata', JSON.stringify(metadata));
      
      const response = await apiClient.post('/content/upload-reference', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return { success: true, data: response.data, error: null };
    } catch (error: any) {
      return { success: false, data: null, error: error.message };
    }
  },

  async generateContentFromAI(contentRequest: {
    type: 'concept-card' | 'flashcard' | 'exam' | 'formula';
    format: 'text' | 'visual' | 'interactive' | '3d' | 'video';
    subject: string;
    topic: string;
    exam: string;
    difficulty: 'easy' | 'medium' | 'hard';
    referenceFiles?: string[];
    tags?: string[];
  }): Promise<ApiResponse<any>> {
    try {
      const response = await apiClient.post('/ai/generate-content', contentRequest);
      return { success: true, data: response.data, error: null };
    } catch (error: any) {
      return { success: false, data: null, error: error.message };
    }
  },

  async saveGeneratedContent(contentData: any): Promise<ApiResponse<any>> {
    try {
      const response = await apiClient.post('/content/save-generated', contentData);
      return { success: true, data: response.data, error: null };
    } catch (error: any) {
      return { success: false, data: null, error: error.message };
    }
  },

  async getContentRepository(filters?: any): Promise<ApiResponse<any[]>> {
    try {
      const response = await apiClient.get('/content/repository', { params: filters });
      return { success: true, data: response.data, error: null };
    } catch (error: any) {
      return { success: false, data: null, error: error.message };
    }
  },

  // Mood Tracking
  async logMood(userId: string, moodData: { mood: MoodType; timestamp: Date; note?: string }): Promise<ApiResponse<any>> {
    try {
      const response = await apiClient.post(`/users/${userId}/mood-logs`, moodData);
      return { success: true, data: response.data, error: null };
    } catch (error: any) {
      return { success: false, data: null, error: error.message };
    }
  },

  async getMoodAnalytics(userId: string, timeRange?: { start: Date; end: Date }): Promise<ApiResponse<any>> {
    try {
      const params = timeRange ? {
        start: timeRange.start.toISOString(),
        end: timeRange.end.toISOString()
      } : {};
      
      const response = await apiClient.get(`/users/${userId}/mood-analytics`, { params });
      return { success: true, data: response.data, error: null };
    } catch (error: any) {
      return { success: false, data: null, error: error.message };
    }
  },

  // AI Model Testing
  async testAIModel(modelType: string, testData: any): Promise<ApiResponse<any>> {
    try {
      const response = await apiClient.post(`/ai/test-model/${modelType}`, testData);
      return { success: true, data: response.data, error: null };
    } catch (error: any) {
      return { success: false, data: null, error: error.message };
    }
  },

  async getAIModelPerformance(modelType: string): Promise<ApiResponse<any>> {
    try {
      const response = await apiClient.get(`/ai/model-performance/${modelType}`);
      return { success: true, data: response.data, error: null };
    } catch (error: any) {
      return { success: false, data: null, error: error.message };
    }
  },

  // Subscription Management
  async getSubscriptionPlans(): Promise<ApiResponse<any[]>> {
    try {
      const response = await apiClient.get('/subscriptions/plans');
      return { success: true, data: response.data, error: null };
    } catch (error: any) {
      return { success: false, data: null, error: error.message };
    }
  },

  async updateSubscriptionPlan(planId: string, planData: any): Promise<ApiResponse<any>> {
    try {
      const response = await apiClient.put(`/subscriptions/plans/${planId}`, planData);
      return { success: true, data: response.data, error: null };
    } catch (error: any) {
      return { success: false, data: null, error: error.message };
    }
  },

  async getUserSubscription(userId: string): Promise<ApiResponse<any>> {
    try {
      const response = await apiClient.get(`/users/${userId}/subscription`);
      return { success: true, data: response.data, error: null };
    } catch (error: any) {
      return { success: false, data: null, error: error.message };
    }
  },

  // Payment Management
  async processPayment(paymentData: any): Promise<ApiResponse<any>> {
    try {
      const response = await apiClient.post('/payments/process', paymentData);
      return { success: true, data: response.data, error: null };
    } catch (error: any) {
      return { success: false, data: null, error: error.message };
    }
  },

  async getPaymentHistory(userId: string): Promise<ApiResponse<any[]>> {
    try {
      const response = await apiClient.get(`/users/${userId}/payment-history`);
      return { success: true, data: response.data, error: null };
    } catch (error: any) {
      return { success: false, data: null, error: error.message };
    }
  },

  async updatePaymentSettings(userId: string, settings: any): Promise<ApiResponse<any>> {
    try {
      const response = await apiClient.put(`/users/${userId}/payment-settings`, settings);
      return { success: true, data: response.data, error: null };
    } catch (error: any) {
      return { success: false, data: null, error: error.message };
    }
  },

  // Interactive Content
  async getInteractiveContent(contentId: string): Promise<ApiResponse<any>> {
    try {
      const response = await apiClient.get(`/content/interactive/${contentId}`);
      return { success: true, data: response.data, error: null };
    } catch (error: any) {
      return { success: false, data: null, error: error.message };
    }
  },

  async get3DModelContent(contentId: string): Promise<ApiResponse<any>> {
    try {
      const response = await apiClient.get(`/content/3d-models/${contentId}`);
      return { success: true, data: response.data, error: null };
    } catch (error: any) {
      return { success: false, data: null, error: error.message };
    }
  },

  async getVisualContent(contentId: string): Promise<ApiResponse<any>> {
    try {
      const response = await apiClient.get(`/content/visuals/${contentId}`);
      return { success: true, data: response.data, error: null };
    } catch (error: any) {
      return { success: false, data: null, error: error.message };
    }
  },

  // Flask Integration Endpoints
  flask: {
    async generateContent(data: any): Promise<ApiResponse<any>> {
      try {
        const response = await apiClient.post('/flask/generate-content', data);
        return { success: true, data: response.data, error: null };
      } catch (error: any) {
        return { success: false, data: null, error: error.message };
      }
    },

    async analyzeStudyPattern(userId: string, data: any): Promise<ApiResponse<any>> {
      try {
        const response = await apiClient.post(`/flask/analyze-study-pattern/${userId}`, data);
        return { success: true, data: response.data, error: null };
      } catch (error: any) {
        return { success: false, data: null, error: error.message };
      }
    },

    async optimizeStudyPlan(userId: string, planData: any): Promise<ApiResponse<any>> {
      try {
        const response = await apiClient.post(`/flask/optimize-study-plan/${userId}`, planData);
        return { success: true, data: response.data, error: null };
      } catch (error: any) {
        return { success: false, data: null, error: error.message };
      }
    },

    async predictPerformance(userId: string, data: any): Promise<ApiResponse<any>> {
      try {
        const response = await apiClient.post(`/flask/predict-performance/${userId}`, data);
        return { success: true, data: response.data, error: null };
      } catch (error: any) {
        return { success: false, data: null, error: error.message };
      }
    },

    async generatePersonalizedContent(userId: string, contentRequest: any): Promise<ApiResponse<any>> {
      try {
        const response = await apiClient.post(`/flask/personalized-content/${userId}`, contentRequest);
        return { success: true, data: response.data, error: null };
      } catch (error: any) {
        return { success: false, data: null, error: error.message };
      }
    }
  }
};

export default comprehensiveApiService;
