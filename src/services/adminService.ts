
import { AdminSettings, StudentData, SystemLog } from "@/types/admin";

// Create a mock admin service
export const adminService = {
  // Admin users management
  getAdminUsers: () => Promise.resolve([]),
  
  // Student management
  getStudents: async (): Promise<StudentData[]> => {
    return [
      {
        id: "1",
        name: "Rahul Sharma",
        email: "rahul.s@example.com",
        role: "student",
        status: "active",
        joinedDate: "2023-01-15T00:00:00Z",
        lastActive: "2023-08-10T14:30:00Z",
        examType: "IIT-JEE",
        studyHours: 25,
        progress: {
          completedTopics: 45,
          totalTopics: 100,
          lastActiveDate: "2023-08-10T14:30:00Z"
        }
      },
      {
        id: "2",
        name: "Priya Patel",
        email: "priya.p@example.com",
        role: "student",
        status: "inactive",
        joinedDate: "2023-02-20T00:00:00Z",
        lastActive: "2023-07-25T09:15:00Z",
        examType: "NEET",
        studyHours: 18,
        progress: {
          completedTopics: 30,
          totalTopics: 100,
          lastActiveDate: "2023-07-25T09:15:00Z"
        }
      },
      {
        id: "3",
        name: "Amit Kumar",
        email: "amit.k@example.com",
        role: "student",
        status: "pending",
        joinedDate: "2023-07-10T00:00:00Z",
        lastActive: "2023-08-12T16:45:00Z",
        examType: "CAT",
        studyHours: 12,
        progress: {
          completedTopics: 15,
          totalTopics: 100,
          lastActiveDate: "2023-08-12T16:45:00Z"
        }
      }
    ];
  },
  
  // System logs
  getSystemLogs: async (): Promise<SystemLog[]> => {
    return [
      {
        id: "log1",
        timestamp: new Date().toISOString(),
        level: "info",
        source: "Authentication Service",
        message: "User login successful"
      },
      {
        id: "log2",
        timestamp: new Date().toISOString(),
        level: "warning",
        source: "Content Delivery Network",
        message: "Increased latency detected"
      },
      {
        id: "log3",
        timestamp: new Date().toISOString(),
        level: "error",
        source: "Payment Gateway",
        message: "Transaction failed"
      }
    ];
  },
  
  // Settings management
  getSettings: async (): Promise<AdminSettings> => {
    return {
      notificationsEnabled: true,
      emailAlerts: true,
      dashboardRefreshInterval: 5,
      theme: 'light',
      analyticsEnabled: true,
      autoLogout: false,
      logoutTimeoutMinutes: 30,
      aiModels: ['gpt-3.5-turbo', 'gpt-4'],
      flaskApiUrl: 'https://api.example.com',
      apiKey: '***************',
      notificationSettings: {
        userSignup: true,
        paymentSuccess: true,
        systemErrors: true
      },
      contentApprovalRequired: false
    };
  },
  
  updateSettings: async (settings: AdminSettings): Promise<AdminSettings> => {
    console.log('Settings updated', settings);
    return settings;
  }
};
