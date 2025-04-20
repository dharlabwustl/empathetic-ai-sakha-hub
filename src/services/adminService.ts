
// Define the AdminSettings type
export interface AdminSettings {
  enableNotifications: boolean;
  darkModeDefault: boolean;
  systemAnnouncements: boolean;
  maintenanceMode: boolean;
  betaFeatures: boolean;
  dataBackupFrequency: "daily" | "weekly" | "monthly";
  userRegistration: boolean;
  feedbackCollection: boolean;
  analyticsEnabled: boolean;
  contentApprovalRequired: boolean;
}

export interface SystemLog {
  id: string;
  timestamp: string;
  level: "info" | "warning" | "error" | "critical";
  message: string;
  source: string;
  userId?: string;
  details?: Record<string, any>;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  lastActive?: string;
  progress?: number;
  subscriptionType: string;
  status: "active" | "inactive" | "suspended";
}

// Mock admin service implementations
const adminService = {
  getSettings: async (): Promise<AdminSettings> => {
    return {
      enableNotifications: true,
      darkModeDefault: false,
      systemAnnouncements: true,
      maintenanceMode: false,
      betaFeatures: true,
      dataBackupFrequency: "weekly",
      userRegistration: true,
      feedbackCollection: true,
      analyticsEnabled: true,
      contentApprovalRequired: false
    };
  },
  
  updateSettings: async (settings: Partial<AdminSettings>): Promise<AdminSettings> => {
    console.log("Settings updated:", settings);
    return {
      enableNotifications: true,
      darkModeDefault: false,
      systemAnnouncements: true,
      maintenanceMode: false,
      betaFeatures: true,
      dataBackupFrequency: "weekly",
      userRegistration: true,
      feedbackCollection: true,
      analyticsEnabled: true,
      contentApprovalRequired: settings.contentApprovalRequired || false
    };
  },
  
  getSystemLogs: async (): Promise<SystemLog[]> => {
    return [
      {
        id: "log1",
        timestamp: new Date().toISOString(),
        level: "info",
        message: "User login successful",
        source: "auth-service"
      },
      {
        id: "log2",
        timestamp: new Date().toISOString(),
        level: "warning",
        message: "Failed login attempt",
        source: "auth-service",
        userId: "user123"
      }
    ];
  },
  
  getAllStudents: async (): Promise<Student[]> => {
    return [
      {
        id: "student1",
        name: "John Doe",
        email: "john@example.com",
        joinDate: "2023-01-15",
        lastActive: "2023-04-20",
        progress: 65,
        subscriptionType: "Premium",
        status: "active"
      },
      {
        id: "student2",
        name: "Jane Smith",
        email: "jane@example.com",
        joinDate: "2023-02-10",
        lastActive: "2023-04-18",
        progress: 42,
        subscriptionType: "Basic",
        status: "active"
      }
    ];
  }
};

export default adminService;
