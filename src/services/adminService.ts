
import { AdminDashboardStats, StudentData, ContentItem, SystemLog, AdminSettings, AdminUser, NotificationTemplate } from "@/types/admin";

// This is a placeholder service that would be connected to a Flask backend
// For now, it returns mock data but would be replaced with actual API calls

const API_URL = import.meta.env.VITE_FLASK_API_URL || 'http://localhost:5000/api';

// Helper function to simulate API calls (would be replaced with actual fetch calls)
const simulateApiCall = <T>(data: T, delay: number = 500): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
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
  averageMoodScore: 7.8
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
    
    throw new Error('Invalid email or password');
  },

  getDashboardStats: async (): Promise<AdminDashboardStats> => {
    // This would fetch stats from Flask API
    // return fetch(`${API_URL}/admin/stats`).then(res => res.json());
    return simulateApiCall(mockStats);
  },

  getStudents: async (page: number = 1, limit: number = 10): Promise<{data: StudentData[], total: number}> => {
    // This would fetch students from Flask API with pagination
    // return fetch(`${API_URL}/admin/students?page=${page}&limit=${limit}`).then(res => res.json());
    const start = (page - 1) * limit;
    const end = start + limit;
    return simulateApiCall({
      data: mockStudents.slice(start, end),
      total: mockStudents.length
    });
  },

  getStudent: async (id: string): Promise<StudentData> => {
    // This would fetch a specific student from Flask API
    // return fetch(`${API_URL}/admin/students/${id}`).then(res => res.json());
    const student = mockStudents.find(s => s.id === id);
    if (!student) throw new Error('Student not found');
    return simulateApiCall(student);
  },

  getContent: async (type: string, page: number = 1, limit: number = 10): Promise<{data: ContentItem[], total: number}> => {
    // This would fetch content items from Flask API
    // return fetch(`${API_URL}/admin/content?type=${type}&page=${page}&limit=${limit}`).then(res => res.json());
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
    // return fetch(`${API_URL}/admin/logs?level=${level}&page=${page}&limit=${limit}`).then(res => res.json());
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
    // return fetch(`${API_URL}/admin/settings`).then(res => res.json());
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
    // return fetch(`${API_URL}/admin/settings`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(settings)
    // }).then(res => res.json());
    
    return simulateApiCall(settings);
  },
  
  getNotificationTemplates: async (): Promise<NotificationTemplate[]> => {
    // This would fetch notification templates from Flask API
    // return fetch(`${API_URL}/admin/notifications/templates`).then(res => res.json());
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
    // return fetch(`${API_URL}/admin/notifications/test`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ templateId, userId })
    // }).then(res => res.json()).then(data => data.success);
    
    console.log(`Sending test notification: Template ${templateId} to User ${userId}`);
    return simulateApiCall(true);
  }
};
