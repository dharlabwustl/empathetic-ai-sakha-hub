
import apiClient from '../api/apiClient';
import { API_ENDPOINTS, ApiResponse } from '../api/apiConfig';

// AI service for handling AI-related API calls
const aiService = {
  // Get personalized content recommendations
  async getPersonalizedContent(userId: string, contentType: string, count: number = 5): Promise<ApiResponse<any[]>> {
    const endpoint = `${API_ENDPOINTS.AI.PERSONALIZE}?userId=${userId}&type=${contentType}&count=${count}`;
    return apiClient.get<any[]>(endpoint);
  },
  
  // Detect learning style
  async detectLearningStyle(userId: string, interactionData: any): Promise<ApiResponse<any>> {
    return apiClient.post<any>(`${API_ENDPOINTS.AI.LEARNING_STYLE}`, {
      userId,
      interactionData
    });
  },
  
  // Generate study plan based on user data
  async generateStudyPlan(userId: string, preferences: any): Promise<ApiResponse<any>> {
    return apiClient.post<any>(`${API_ENDPOINTS.AI.GENERATE_PLAN}`, {
      userId,
      preferences
    });
  },
  
  // Get response to student doubt
  async getDoubtResponse(userId: string, question: string, subject: string, topic: string): Promise<ApiResponse<any>> {
    return apiClient.post<any>(`${API_ENDPOINTS.AI.DOUBT_RESPONSE}`, {
      userId,
      question,
      subject,
      topic
    });
  },
  
  // Send message to AI tutor
  async sendTutorChatMessage(userId: string, message: string, context?: any): Promise<ApiResponse<any>> {
    return apiClient.post<any>(`${API_ENDPOINTS.AI.TUTOR_CHAT}`, {
      userId,
      message,
      context
    });
  },
  
  // Get mood-based content suggestions
  async getMoodSuggestions(userId: string, mood: number): Promise<ApiResponse<any>> {
    return apiClient.post<any>(`${API_ENDPOINTS.AI.MOOD_SUGGESTIONS}`, {
      userId,
      mood
    });
  }
};

export default aiService;
