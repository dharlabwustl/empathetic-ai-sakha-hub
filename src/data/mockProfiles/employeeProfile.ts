
import { UserProfileType, UserRole, SubscriptionType } from "@/types/user/base";

export const employeeProfile: UserProfileType = {
  id: "emp123",
  name: "Vishal Mehta",
  email: "vishal@corporate.com",
  role: UserRole.Employee,
  avatar: "/assets/avatars/employee.jpg",
  phoneNumber: "+91-9998887776",
  createdAt: "2023-04-20T09:45:00Z",
  lastLogin: "2023-11-01T17:30:00Z",
  onboarded: true,
  loginCount: 28,
  completedOnboarding: true,
  
  subscription: {
    id: "sub_emp123",
    plan: "Premium",
    expiresAt: "2024-04-20T00:00:00Z",
    status: "active"
  },
  
  // Professional development goals
  goals: [
    {
      id: "g1",
      title: "Project Management",
      description: "Complete PMP certification",
      progress: 60,
      status: "in_progress",
      targetDate: "2025-01-15"
    },
    {
      id: "g2",
      title: "Leadership Skills",
      description: "Complete leadership training course",
      progress: 30,
      status: "active", // Changed from not_started
      targetDate: "2024-09-30"
    },
    {
      id: "g3",
      title: "Technical Skills",
      description: "Learn advanced data analysis",
      progress: 25,
      status: "in_progress",
      targetDate: "2024-11-15"
    }
  ],
};
