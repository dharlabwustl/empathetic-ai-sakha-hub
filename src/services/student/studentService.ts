
import apiClient from '../api/apiClient';
import { API_ENDPOINTS, ApiResponse } from '../api/apiConfig';
import { 
  StudentProfile, 
  StudentGoal, 
  OnboardingData, 
  StudyPlan,
  MoodLog
} from '@/types/admin';

// Student service for handling student-related API calls
const studentService = {
  // Get student profile
  async getProfile(studentId: string): Promise<ApiResponse<StudentProfile>> {
    return apiClient.get<StudentProfile>(API_ENDPOINTS.STUDENTS.PROFILE(studentId));
  },
  
  // Update student profile
  async updateProfile(studentId: string, profileData: Partial<StudentProfile>): Promise<ApiResponse<StudentProfile>> {
    return apiClient.patch<StudentProfile>(API_ENDPOINTS.STUDENTS.PROFILE(studentId), profileData);
  },
  
  // Get student goals
  async getGoals(studentId: string): Promise<ApiResponse<StudentGoal[]>> {
    return apiClient.get<StudentGoal[]>(API_ENDPOINTS.STUDENTS.GOALS(studentId));
  },
  
  // Create student goal
  async createGoal(studentId: string, goalData: Partial<StudentGoal>): Promise<ApiResponse<StudentGoal>> {
    return apiClient.post<StudentGoal>(API_ENDPOINTS.STUDENTS.GOALS(studentId), goalData);
  },
  
  // Update student goal
  async updateGoal(studentId: string, goalId: string, goalData: Partial<StudentGoal>): Promise<ApiResponse<StudentGoal>> {
    return apiClient.patch<StudentGoal>(`${API_ENDPOINTS.STUDENTS.GOALS(studentId)}/${goalId}`, goalData);
  },
  
  // Get onboarding data
  async getOnboardingData(studentId: string): Promise<ApiResponse<OnboardingData>> {
    return apiClient.get<OnboardingData>(API_ENDPOINTS.STUDENTS.ONBOARDING(studentId));
  },
  
  // Save onboarding data
  async saveOnboardingData(studentId: string, onboardingData: Partial<OnboardingData>): Promise<ApiResponse<OnboardingData>> {
    return apiClient.post<OnboardingData>(API_ENDPOINTS.STUDENTS.ONBOARDING(studentId), onboardingData);
  },
  
  // Get study plan
  async getStudyPlan(studentId: string): Promise<ApiResponse<StudyPlan>> {
    return apiClient.get<StudyPlan>(API_ENDPOINTS.STUDENTS.STUDY_PLAN(studentId));
  },
  
  // Generate new study plan
  async generateStudyPlan(studentId: string, preferences: Record<string, any>): Promise<ApiResponse<StudyPlan>> {
    return apiClient.post<StudyPlan>(API_ENDPOINTS.STUDENTS.STUDY_PLAN(studentId), preferences);
  },
  
  // Update study plan
  async updateStudyPlan(studentId: string, planId: string, planData: Partial<StudyPlan>): Promise<ApiResponse<StudyPlan>> {
    return apiClient.patch<StudyPlan>(`${API_ENDPOINTS.STUDENTS.STUDY_PLAN(studentId)}/${planId}`, planData);
  },
  
  // Record mood log
  async recordMood(studentId: string, moodData: Partial<MoodLog>): Promise<ApiResponse<MoodLog>> {
    return apiClient.post<MoodLog>(API_ENDPOINTS.STUDENTS.MOOD_LOGS(studentId), moodData);
  },
  
  // Get mood logs
  async getMoodLogs(studentId: string, timeRange?: { start: Date, end: Date }): Promise<ApiResponse<MoodLog[]>> {
    let endpoint = API_ENDPOINTS.STUDENTS.MOOD_LOGS(studentId);
    
    if (timeRange) {
      const startDate = timeRange.start.toISOString();
      const endDate = timeRange.end.toISOString();
      endpoint += `?start=${startDate}&end=${endDate}`;
    }
    
    return apiClient.get<MoodLog[]>(endpoint);
  },
  
  // Submit doubt/question
  async submitDoubt(studentId: string, question: string, subject: string, topic: string): Promise<ApiResponse<any>> {
    return apiClient.post(API_ENDPOINTS.STUDENTS.DOUBTS(studentId), {
      question,
      subject,
      topic
    });
  }
};

export default studentService;
