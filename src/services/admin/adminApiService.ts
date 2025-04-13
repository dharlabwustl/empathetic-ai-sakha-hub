
import apiClient from '../api/apiClient';
import { API_ENDPOINTS, ApiResponse } from '../api/apiConfig';
import { 
  AdminDashboardStats,
  StudentData,
  ContentItem,
  SystemLog,
  AdminSettings,
  NotificationTemplate,
  FeelGoodContent
} from '@/types/admin';

// Admin service for handling admin-related API calls
const adminApiService = {
  // Get dashboard stats
  async getDashboardStats(): Promise<ApiResponse<AdminDashboardStats>> {
    return apiClient.get<AdminDashboardStats>(API_ENDPOINTS.ADMIN.DASHBOARD);
  },
  
  // Get students with pagination
  async getStudents(page: number = 1, limit: number = 10, filters?: Record<string, any>): Promise<ApiResponse<{data: StudentData[], total: number}>> {
    let endpoint = `${API_ENDPOINTS.ADMIN.STUDENTS}?page=${page}&limit=${limit}`;
    
    // Add filters if provided
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          endpoint += `&${key}=${encodeURIComponent(String(value))}`;
        }
      });
    }
    
    return apiClient.get<{data: StudentData[], total: number}>(endpoint);
  },
  
  // Get specific student
  async getStudent(id: string): Promise<ApiResponse<StudentData>> {
    return apiClient.get<StudentData>(`${API_ENDPOINTS.ADMIN.STUDENTS}/${id}`);
  },
  
  // Get content items with type filter and pagination
  async getContent(type: string = '', page: number = 1, limit: number = 10): Promise<ApiResponse<{data: ContentItem[], total: number}>> {
    const endpoint = `${API_ENDPOINTS.ADMIN.CONTENT}?type=${type}&page=${page}&limit=${limit}`;
    return apiClient.get<{data: ContentItem[], total: number}>(endpoint);
  },
  
  // Approve content item
  async approveContent(contentId: string): Promise<ApiResponse<ContentItem>> {
    return apiClient.post<ContentItem>(`${API_ENDPOINTS.ADMIN.CONTENT}/${contentId}/approve`, {});
  },
  
  // Get system logs with level filter and pagination
  async getSystemLogs(level: string = '', page: number = 1, limit: number = 10): Promise<ApiResponse<{data: SystemLog[], total: number}>> {
    const endpoint = `${API_ENDPOINTS.ADMIN.SYSTEM_LOGS}?level=${level}&page=${page}&limit=${limit}`;
    return apiClient.get<{data: SystemLog[], total: number}>(endpoint);
  },
  
  // Get admin settings
  async getSettings(): Promise<ApiResponse<AdminSettings>> {
    return apiClient.get<AdminSettings>(API_ENDPOINTS.ADMIN.SETTINGS);
  },
  
  // Update admin settings
  async updateSettings(settings: Partial<AdminSettings>): Promise<ApiResponse<AdminSettings>> {
    return apiClient.put<AdminSettings>(API_ENDPOINTS.ADMIN.SETTINGS, settings);
  },
  
  // Get notification templates
  async getNotificationTemplates(): Promise<ApiResponse<NotificationTemplate[]>> {
    return apiClient.get<NotificationTemplate[]>(`${API_ENDPOINTS.ADMIN.NOTIFICATIONS}/templates`);
  },
  
  // Create notification template
  async createNotificationTemplate(template: Partial<NotificationTemplate>): Promise<ApiResponse<NotificationTemplate>> {
    return apiClient.post<NotificationTemplate>(`${API_ENDPOINTS.ADMIN.NOTIFICATIONS}/templates`, template);
  },
  
  // Update notification template
  async updateNotificationTemplate(id: string, template: Partial<NotificationTemplate>): Promise<ApiResponse<NotificationTemplate>> {
    return apiClient.put<NotificationTemplate>(`${API_ENDPOINTS.ADMIN.NOTIFICATIONS}/templates/${id}`, template);
  },
  
  // Send test notification
  async sendTestNotification(templateId: string, userId: string): Promise<ApiResponse<boolean>> {
    return apiClient.post<boolean>(`${API_ENDPOINTS.ADMIN.NOTIFICATIONS}/test`, { templateId, userId });
  },
  
  // Get feel-good content
  async getFeelGoodContent(page: number = 1, limit: number = 10): Promise<ApiResponse<{data: FeelGoodContent[], total: number}>> {
    const endpoint = `${API_ENDPOINTS.ADMIN.CONTENT}/feel-good?page=${page}&limit=${limit}`;
    return apiClient.get<{data: FeelGoodContent[], total: number}>(endpoint);
  },
  
  // Create feel-good content
  async createFeelGoodContent(content: Partial<FeelGoodContent>): Promise<ApiResponse<FeelGoodContent>> {
    return apiClient.post<FeelGoodContent>(`${API_ENDPOINTS.ADMIN.CONTENT}/feel-good`, content);
  },
  
  // AI Personalization settings
  
  // Get learning style settings
  async getLearningStyleSettings(): Promise<ApiResponse<any>> {
    return apiClient.get<any>(`${API_ENDPOINTS.ADMIN.SETTINGS}/ai/learning-styles`);
  },
  
  // Update learning style settings
  async updateLearningStyleSettings(settings: any): Promise<ApiResponse<any>> {
    return apiClient.put<any>(`${API_ENDPOINTS.ADMIN.SETTINGS}/ai/learning-styles`, settings);
  },
  
  // Update doubt responder settings
  async updateDoubtResponderSettings(settings: any): Promise<ApiResponse<any>> {
    return apiClient.put<any>(`${API_ENDPOINTS.ADMIN.SETTINGS}/ai/doubt-responder`, settings);
  },
  
  // Update mood engine settings
  async updateMoodEngineSettings(settings: any): Promise<ApiResponse<any>> {
    return apiClient.put<any>(`${API_ENDPOINTS.ADMIN.SETTINGS}/ai/mood-engine`, settings);
  },
};

export default adminApiService;
