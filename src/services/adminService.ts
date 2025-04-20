
import { AdminSettings, AdminUser } from "@/types/admin";
import { StudentProfile } from "@/types/student";

// Mock admin users
const mockAdmins: AdminUser[] = [
  {
    id: "admin-1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    avatar: "/avatar.png",
    lastLogin: new Date().toISOString(),
    permissions: ["view_dashboard", "manage_users", "manage_content"]
  },
  {
    id: "admin-2",
    name: "Super Admin",
    email: "superadmin@example.com",
    role: "super_admin",
    avatar: "/avatar2.png",
    lastLogin: new Date().toISOString(),
    permissions: ["view_dashboard", "manage_users", "manage_content", "manage_settings", "manage_admins"]
  }
];

// Mock student data
const mockStudents: StudentProfile[] = [
  {
    id: "student-1",
    name: "Student One",
    email: "student1@example.com",
    role: "student",
    grade: "11th",
    schoolName: "Delhi Public School",
    avatar: "/student1.png",
    attendance: {
      total: 90,
      present: 85,
      percentage: 94
    }
  },
  {
    id: "student-2",
    name: "Student Two",
    email: "student2@example.com",
    role: "student",
    grade: "12th",
    schoolName: "Ryan International School",
    avatar: "/student2.png",
    attendance: {
      total: 90,
      present: 78,
      percentage: 87
    }
  }
];

// Mock admin service
export const adminService = {
  // Admin user management
  getCurrentAdmin: async (): Promise<AdminUser> => {
    return mockAdmins[0];
  },
  
  getAllAdmins: async (): Promise<AdminUser[]> => {
    return mockAdmins;
  },
  
  // Student management
  getStudents: async (): Promise<StudentProfile[]> => {
    return mockStudents;
  },
  
  getStudentById: async (id: string): Promise<StudentProfile | null> => {
    const student = mockStudents.find(s => s.id === id);
    return student || null;
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
      contentApprovalRequired: true,
      logoutTimeoutMinutes: 30,
      aiModels: [
        {
          modelName: "gpt-3.5-turbo",
          apiKey: "sk-....",
          temperature: 0.7,
          maxTokens: 100,
          active: true
        },
        {
          modelName: "gpt-4",
          apiKey: "sk-....",
          temperature: 0.5,
          maxTokens: 200,
          active: false
        }
      ],
      flaskApiUrl: 'https://api.example.com',
      apiKey: '',
      notificationSettings: {
        email: true,
        push: true,
        sms: false
      }
    };
  },
  
  updateSettings: async (settings: Partial<AdminSettings>): Promise<AdminSettings> => {
    console.log('Updating settings:', settings);
    return {
      ...(await adminService.getSettings()),
      ...settings
    };
  },
  
  // Stats
  getAdminStats: async () => {
    return {
      totalStudents: 1245,
      activeStudents: 876,
      totalContent: 324,
      totalQuizzes: 98,
      totalRevenue: "₹345,600",
      monthlyActiveUsers: 567,
      averageSessionTime: "23m",
      completionRate: 76
    };
  },
  
  // KPI data
  getKpiData: async () => {
    return [
      {
        id: "kpi-1",
        title: "New Users",
        value: "128",
        changePercent: 12.5,
        label: "Last 7 days",
        trend: "up"
      },
      {
        id: "kpi-2",
        title: "Engagement",
        value: "85%",
        changePercent: 3.2,
        label: "Last 7 days",
        trend: "up"
      },
      {
        id: "kpi-3",
        title: "Study Time",
        value: "42h",
        changePercent: -5.1,
        label: "Last 7 days",
        trend: "down"
      },
      {
        id: "kpi-4",
        title: "Questions",
        value: "1,204",
        changePercent: 8.3,
        label: "Last 7 days",
        trend: "up"
      }
    ];
  }
};
