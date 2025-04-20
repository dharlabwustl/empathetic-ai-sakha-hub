
import { StudentData } from "@/types/admin/studentData";
import { SystemLog } from "@/types/admin/systemLog";

// Mock student data
const mockStudents: StudentData[] = [
  {
    id: "1",
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    registrationDate: "2023-01-15",
    role: "student",
    status: "active",
    examType: "NEET",
    subjects: ["Physics", "Chemistry", "Biology"],
    progress: 65,
    lastActive: "2023-08-15T10:30:00Z",
    avatarUrl: "https://i.pravatar.cc/150?img=11"
  },
  {
    id: "2",
    name: "Priya Patel",
    email: "priya.patel@example.com",
    registrationDate: "2023-02-20",
    role: "student",
    status: "active",
    examType: "JEE",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    progress: 78,
    lastActive: "2023-08-14T15:45:00Z",
    avatarUrl: "https://i.pravatar.cc/150?img=5"
  },
  {
    id: "3",
    name: "Aditya Singh",
    email: "aditya.singh@example.com",
    registrationDate: "2023-03-10",
    role: "student",
    status: "active",
    examType: "UPSC",
    subjects: ["History", "Geography", "Political Science", "Economics"],
    progress: 42,
    lastActive: "2023-08-12T09:15:00Z",
    avatarUrl: "https://i.pravatar.cc/150?img=12"
  }
];

// Mock system logs
const mockLogs: SystemLog[] = [
  {
    id: "1",
    timestamp: "2023-08-15T15:30:00Z",
    source: "Authentication Service",
    level: "info",
    message: "User login successful",
    resolved: true
  },
  {
    id: "2",
    timestamp: "2023-08-15T14:45:00Z",
    source: "Content Delivery Network",
    level: "warning",
    message: "Slow response times detected",
    resolved: true
  },
  {
    id: "3",
    timestamp: "2023-08-15T12:15:00Z",
    source: "Database Service",
    level: "error",
    message: "Connection timeout error",
    resolved: false,
    details: "Connection to the primary database timed out after 30 seconds. Failover to secondary database was successful."
  },
  {
    id: "4",
    timestamp: "2023-08-14T23:10:00Z",
    source: "Payment Gateway",
    level: "critical",
    message: "Payment processing failure",
    resolved: false,
    details: "Multiple payment attempts failed due to API timeout. Affected user IDs: 1042, 1055, 1060. Technical team has been notified."
  }
];

// Admin service functions
export const getAllStudents = async (): Promise<StudentData[]> => {
  // In a real app, this would fetch from an API
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockStudents), 500);
  });
};

export const getSystemLogs = async (): Promise<SystemLog[]> => {
  // In a real app, this would fetch from an API
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockLogs), 500);
  });
};
