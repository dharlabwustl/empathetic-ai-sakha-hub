import { 
  AdminDashboardStats, 
  StudentData, 
  ContentItem, 
  SystemLog, 
  AdminSettings, 
  AdminUser, 
  NotificationTemplate, 
  Flashcard,
  ConceptCard,
  ExamPaper,
  Question,
  FeelGoodContent,
  SurroundingInfluence,
  StudyPlan,
  MoodLog,
  UserDoubts,
  TutorChat,
  Notification
} from "@/types/admin";

// This is a placeholder service that would be connected to a Flask backend
// For now, it returns mock data but would be replaced with actual API calls

const API_URL = import.meta.env.VITE_FLASK_API_URL || 'http://localhost:5000/api';

// Helper function to simulate API calls (would be replaced with actual fetch calls)
const simulateApiCall = <T>(data: T, delay: number = 500): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
};

// Helper function for real API calls (when backend is ready)
const apiCall = async <T>(endpoint: string, method: string = 'GET', data?: any): Promise<T> => {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('admin_token')}`,
    },
  };
  
  if (data) {
    options.body = JSON.stringify(data);
  }
  
  const response = await fetch(`${API_URL}${endpoint}`, options);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'API call failed');
  }
  
  return response.json();
};

// Mock data for development (would come from Flask backend)
const mockStats: AdminDashboardStats = {
  totalStudents: 1245,
  activeStudents: 876,
  newSignupsToday: 27,
  totalQuestions: 5432,
  totalConcepts: 1289,
  totalFlashcards: 3456,
  totalEngagementHours: 4532,
  averageMoodScore: 7.8,
  studentsWithConsistentHabits: 876,
  averageConfidenceScore: 8.2,
  totalSessions: 12487,
  moodBasedSessionsCount: 7832,
  
  // New KPIs added
  dailyActiveUsers: 347,
  weeklyActiveUsers: 762,
  monthlyActiveUsers: 1042,
  freeUsers: 984,
  paidUsers: 261,
  groupUsers: 128,
  subscriptionConversionRate: 24.6,
  churnRate: 3.2,
  averageStudyTimePerUser: 42,
  practiceAttemptsPerUser: 18,
  weakAreaIdentificationRate: 68,
  userSatisfactionScore: 87,
  referralRate: 28,
  totalRevenue: 127840
};

const mockStudents: StudentData[] = Array(20).fill(0).map((_, i) => ({
  id: `st-${i+100}`,
  name: `Student ${i+1}`,
  email: `student${i+1}@example.com`,
  phoneNumber: `+91${9000000000 + i}`,
  registrationDate: new Date(2023, 0, Math.floor(Math.random() * 365)),
  lastActive: new Date(Date.now() - Math.floor(Math.random() * 10 * 24 * 60 * 60 * 1000)),
  completedOnboarding: Math.random() > 0.2,
  goals: ['IIT-JEE', 'NEET'].slice(0, Math.floor(Math.random() * 2) + 1),
  examType: Math.random() > 0.5 ? 'IIT-JEE' : 'NEET',
  studyHours: Math.floor(Math.random() * 8) + 2,
  subjectsSelected: ['Physics', 'Chemistry', 'Mathematics', 'Biology'].slice(0, Math.floor(Math.random() * 4) + 1),
  moodScore: Math.floor(Math.random() * 10) + 1,
  engagementScore: Math.floor(Math.random() * 100)
}));

export const adminService = {
  login: async (email: string, password: string): Promise<AdminUser> => {
    // This would be a real API call to authenticate the admin
    console.log('Attempting admin login with:', email);
    
    // For development, simulate authentication
    if (email === 'admin@sakha.ai' && password === 'admin123') {
      return simulateApiCall<AdminUser>({
        id: 'admin-1',
        name: 'Admin User',
        email: 'admin@sakha.ai',
        role: 'admin',
        permissions: ['view_students', 'view_content', 'edit_content', 'view_analytics'],
        lastLogin: new Date()
      });
    }
    
    // In production, this would be:
    // return apiCall<AdminUser>('/admin/login', 'POST', { email, password });
    
    throw new Error('Invalid email or password');
  },

  getDashboardStats: async (): Promise<AdminDashboardStats> => {
    // This would fetch stats from Flask API
    // return apiCall<AdminDashboardStats>('/admin/stats');
    return simulateApiCall(mockStats);
  },

  getStudents: async (page: number = 1, limit: number = 10): Promise<{data: StudentData[], total: number}> => {
    // This would fetch students from Flask API with pagination
    // return apiCall<{data: StudentData[], total: number}>(`/admin/students?page=${page}&limit=${limit}`);
    const start = (page - 1) * limit;
    const end = start + limit;
    return simulateApiCall({
      data: mockStudents.slice(start, end),
      total: mockStudents.length
    });
  },

  getStudent: async (id: string): Promise<StudentData> => {
    // This would fetch a specific student from Flask API
    // return apiCall<StudentData>(`/admin/students/${id}`);
    const student = mockStudents.find(s => s.id === id);
    if (!student) throw new Error('Student not found');
    return simulateApiCall(student);
  },

  getContent: async (type: string, page: number = 1, limit: number = 10): Promise<{data: ContentItem[], total: number}> => {
    // This would fetch content items from Flask API
    // return apiCall<{data: ContentItem[], total: number}>(`/admin/content?type=${type}&page=${page}&limit=${limit}`);
    const mockContent: ContentItem[] = Array(30).fill(0).map((_, i) => ({
      id: `content-${i+100}`,
      type: ['concept', 'flashcard', 'question', 'exam'][Math.floor(Math.random() * 4)] as any,
      title: `${['Physics', 'Chemistry', 'Mathematics', 'Biology'][Math.floor(Math.random() * 4)]} - Topic ${i+1}`,
      subject: ['Physics', 'Chemistry', 'Mathematics', 'Biology'][Math.floor(Math.random() * 4)],
      topic: `Topic ${Math.floor(Math.random() * 20) + 1}`,
      difficulty: ['easy', 'medium', 'hard'][Math.floor(Math.random() * 3)] as any,
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)),
      approved: Math.random() > 0.3,
      usageCount: Math.floor(Math.random() * 100)
    }));
    
    const filtered = type ? mockContent.filter(c => c.type === type) : mockContent;
    const start = (page - 1) * limit;
    const end = start + limit;
    
    return simulateApiCall({
      data: filtered.slice(start, end),
      total: filtered.length
    });
  },
  
  getSystemLogs: async (level: string = '', page: number = 1, limit: number = 10): Promise<{data: SystemLog[], total: number}> => {
    // This would fetch system logs from Flask API
    // return apiCall<{data: SystemLog[], total: number}>(`/admin/logs?level=${level}&page=${page}&limit=${limit}`);
    const mockLogs: SystemLog[] = Array(50).fill(0).map((_, i) => ({
      id: `log-${i+100}`,
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
      level: ['info', 'warning', 'error'][Math.floor(Math.random() * 3)] as any,
      message: `System ${['info', 'warning', 'error'][Math.floor(Math.random() * 3)]} message ${i+1}`,
      source: ['api', 'database', 'auth', 'ai-model'][Math.floor(Math.random() * 4)],
      details: { code: Math.floor(Math.random() * 500) }
    }));
    
    const filtered = level ? mockLogs.filter(l => l.level === level) : mockLogs;
    const start = (page - 1) * limit;
    const end = start + limit;
    
    return simulateApiCall({
      data: filtered.slice(start, end),
      total: filtered.length
    });
  },
  
  getSettings: async (): Promise<AdminSettings> => {
    // This would fetch admin settings from Flask API
    // return apiCall<AdminSettings>('/admin/settings');
    return simulateApiCall({
      aiModels: [
        {
          modelName: 'GPT-4',
          apiKey: '••••••••••••••••••••••',
          temperature: 0.7,
          maxTokens: 2048,
          active: true
        },
        {
          modelName: 'Claude-3',
          apiKey: '••••••••••••••••••••••',
          temperature: 0.5,
          maxTokens: 4096,
          active: false
        }
      ],
      notificationSettings: {
        maxPerDay: 5,
        quietHoursStart: 22,
        quietHoursEnd: 8
      },
      contentApprovalRequired: true,
      flaskApiUrl: 'http://localhost:5000/api',
      apiKey: '••••••••••••••••••••••'
    });
  },
  
  updateSettings: async (settings: AdminSettings): Promise<AdminSettings> => {
    // This would update admin settings via Flask API
    // return apiCall<AdminSettings>('/admin/settings', 'PUT', settings);
    return simulateApiCall(settings);
  },
  
  getNotificationTemplates: async (): Promise<NotificationTemplate[]> => {
    // This would fetch notification templates from Flask API
    // return apiCall<NotificationTemplate[]>('/admin/notifications/templates');
    return simulateApiCall([
      {
        id: 'notif-1',
        title: 'Study Reminder',
        body: 'It\'s time for your {{subject}} study session!',
        type: 'reminder',
        trigger: 'time',
        active: true
      },
      {
        id: 'notif-2',
        title: 'Achievement Unlocked',
        body: 'Congratulations! You\'ve completed {{count}} practice questions!',
        type: 'achievement',
        trigger: 'event',
        active: true
      },
      {
        id: 'notif-3',
        title: 'Feeling Down?',
        body: 'We noticed you might be feeling stressed. Take a break with our Feel-Good corner!',
        type: 'suggestion',
        trigger: 'mood',
        active: true
      }
    ]);
  },
  
  sendTestNotification: async (templateId: string, userId: string): Promise<boolean> => {
    // This would send a test notification via Flask API
    // return apiCall<{success: boolean}>('/admin/notifications/test', 'POST', { templateId, userId })
    //   .then(res => res.success);
    
    console.log(`Sending test notification: Template ${templateId} to User ${userId}`);
    return simulateApiCall(true);
  },

  // AI Personalization related endpoints
  getLearningStyles: async (): Promise<{styleName: string, count: number}[]> => {
    // This would fetch learning style statistics from Flask API
    // return apiCall<{styleName: string, count: number}[]>('/admin/ai/learning-styles');
    return simulateApiCall([
      { styleName: 'Visual', count: 542 },
      { styleName: 'Auditory', count: 324 },
      { styleName: 'Reading', count: 189 },
      { styleName: 'Kinesthetic', count: 190 }
    ]);
  },

  updateLearningStyleSettings: async (settings: any): Promise<boolean> => {
    // This would update learning style detection settings
    // return apiCall<{success: boolean}>('/admin/ai/learning-styles/settings', 'PUT', settings)
    //   .then(res => res.success);
    console.log('Updating learning style settings:', settings);
    return simulateApiCall(true);
  },

  updateReinforcementSettings: async (settings: any): Promise<boolean> => {
    // This would update concept reinforcement settings
    // return apiCall<{success: boolean}>('/admin/ai/reinforcement/settings', 'PUT', settings)
    //   .then(res => res.success);
    console.log('Updating reinforcement settings:', settings);
    return simulateApiCall(true);
  },

  updatePlannerSettings: async (settings: any): Promise<boolean> => {
    // This would update study planner settings
    // return apiCall<{success: boolean}>('/admin/ai/planner/settings', 'PUT', settings)
    //   .then(res => res.success);
    console.log('Updating planner settings:', settings);
    return simulateApiCall(true);
  },

  // Feel-Good Corner management
  getFeelGoodContent: async (page: number = 1, limit: number = 10): Promise<{data: FeelGoodContent[], total: number}> => {
    // This would fetch feel-good content items
    // return apiCall<{data: FeelGoodContent[], total: number}>(`/admin/feel-good?page=${page}&limit=${limit}`);
    const mockContent: FeelGoodContent[] = Array(30).fill(0).map((_, i) => ({
      id: `feel-good-${i+100}`,
      type: ['meme', 'joke', 'quote', 'puzzle', 'video'][Math.floor(Math.random() * 5)] as any,
      content: `Sample ${['meme', 'joke', 'quote', 'puzzle', 'video'][Math.floor(Math.random() * 5)]} content ${i+1}`,
      imageUrl: Math.random() > 0.5 ? `https://example.com/image${i}.jpg` : undefined,
      videoUrl: Math.random() > 0.8 ? `https://example.com/video${i}.mp4` : undefined,
      tags: ['funny', 'motivational', 'educational', 'inspirational'].slice(0, Math.floor(Math.random() * 3) + 1),
      moodTags: ['stress', 'anxiety', 'motivation', 'focus'].slice(0, Math.floor(Math.random() * 3) + 1),
      usageCount: Math.floor(Math.random() * 500),
      approved: Math.random() > 0.2,
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 90 * 24 * 60 * 60 * 1000))
    }));
    
    const start = (page - 1) * limit;
    const end = start + limit;
    
    return simulateApiCall({
      data: mockContent.slice(start, end),
      total: mockContent.length
    });
  },

  createFeelGoodContent: async (content: Partial<FeelGoodContent>): Promise<FeelGoodContent> => {
    // This would create a new feel-good content item
    // return apiCall<FeelGoodContent>('/admin/feel-good', 'POST', content);
    const newContent: FeelGoodContent = {
      id: `feel-good-${Date.now()}`,
      type: content.type!,
      content: content.content!,
      imageUrl: content.imageUrl,
      videoUrl: content.videoUrl,
      tags: content.tags || [],
      moodTags: content.moodTags || [],
      usageCount: 0,
      approved: true,
      createdAt: new Date()
    };
    
    return simulateApiCall(newContent);
  },

  // Surrounding Influence Meter
  getSurroundingInfluenceSettings: async (): Promise<any> => {
    // This would fetch surrounding influence meter settings
    // return apiCall<any>('/admin/surrounding-influence/settings');
    return simulateApiCall({
      confidenceWeight: 0.4,
      peerInfluenceWeight: 0.3,
      environmentalFactorsWeight: 0.3,
      updateFrequency: 'daily',
      minThreshold: 3,
      maxThreshold: 8
    });
  },

  updateSurroundingInfluenceSettings: async (settings: any): Promise<boolean> => {
    // This would update surrounding influence meter settings
    // return apiCall<{success: boolean}>('/admin/surrounding-influence/settings', 'PUT', settings)
    //   .then(res => res.success);
    console.log('Updating surrounding influence settings:', settings);
    return simulateApiCall(true);
  },

  // Peer Community Feed Tuner
  getPeerFeedSettings: async (): Promise<any> => {
    // This would fetch peer community feed settings
    // return apiCall<any>('/admin/peer-feed/settings');
    return simulateApiCall({
      maximumPostsPerDay: 10,
      contentFilters: ['inappropriate', 'promotional', 'irrelevant'],
      moderationLevel: 'medium',
      requireApproval: false,
      influencerThreshold: 50
    });
  },

  updatePeerFeedSettings: async (settings: any): Promise<boolean> => {
    // This would update peer community feed settings
    // return apiCall<{success: boolean}>('/admin/peer-feed/settings', 'PUT', settings)
    //   .then(res => res.success);
    console.log('Updating peer feed settings:', settings);
    return simulateApiCall(true);
  },

  // Learning Pulse Generator
  getLearningPulseSettings: async (): Promise<any> => {
    // This would fetch learning pulse generator settings
    // return apiCall<any>('/admin/learning-pulse/settings');
    return simulateApiCall({
      generationFrequency: 'daily',
      includeMoodMetrics: true,
      includePerformanceMetrics: true,
      includeEngagementMetrics: true,
      summaryLength: 'medium'
    });
  },

  updateLearningPulseSettings: async (settings: any): Promise<boolean> => {
    // This would update learning pulse generator settings
    // return apiCall<{success: boolean}>('/admin/learning-pulse/settings', 'PUT', settings)
    //   .then(res => res.success);
    console.log('Updating learning pulse settings:', settings);
    return simulateApiCall(true);
  },

  // Doubt Auto-Responder
  getDoubtResponderSettings: async (): Promise<any> => {
    // This would fetch doubt auto-responder settings
    // return apiCall<any>('/admin/doubt-responder/settings');
    return simulateApiCall({
      confidenceThreshold: 0.75,
      maxResponseTime: 10, // seconds
      escalationThreshold: 0.5,
      includeReferences: true,
      responseStyle: 'educational'
    });
  },

  updateDoubtResponderSettings: async (settings: any): Promise<boolean> => {
    // This would update doubt auto-responder settings
    // return apiCall<{success: boolean}>('/admin/doubt-responder/settings', 'PUT', settings)
    //   .then(res => res.success);
    console.log('Updating doubt responder settings:', settings);
    return simulateApiCall(true);
  },

  // 24x7 Tutor Chat
  getTutorChatSettings: async (): Promise<any> => {
    // This would fetch tutor chat settings
    // return apiCall<any>('/admin/tutor-chat/settings');
    return simulateApiCall({
      aiPersonality: 'friendly and supportive',
      responseLength: 'adaptive',
      includeExamples: true,
      includeFollowUpQuestions: true,
      maxSessionLength: 30 // minutes
    });
  },

  updateTutorChatSettings: async (settings: any): Promise<boolean> => {
    // This would update tutor chat settings
    // return apiCall<{success: boolean}>('/admin/tutor-chat/settings', 'PUT', settings)
    //   .then(res => res.success);
    console.log('Updating tutor chat settings:', settings);
    return simulateApiCall(true);
  },

  // Mood-Based Suggestions
  getMoodEngineSettings: async (): Promise<any> => {
    // This would fetch mood engine settings
    // return apiCall<any>('/admin/mood-engine/settings');
    return simulateApiCall({
      moodDetectionSensitivity: 0.7,
      interventionThreshold: 0.6,
      positiveReinforcementRate: 0.8,
      customMoodCategories: ['focused', 'confused', 'motivated', 'frustrated', 'bored']
    });
  },

  updateMoodEngineSettings: async (settings: any): Promise<boolean> => {
    // This would update mood engine settings
    // return apiCall<{success: boolean}>('/admin/mood-engine/settings', 'PUT', settings)
    //   .then(res => res.success);
    console.log('Updating mood engine settings:', settings);
    return simulateApiCall(true);
  }
};
