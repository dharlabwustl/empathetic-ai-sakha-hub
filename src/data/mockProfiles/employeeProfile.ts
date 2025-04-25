import { UserProfileType, UserRole, SubscriptionType } from "@/types/user";

// Fix employeeProfile definition
export const employeeProfile: UserProfileType = {
  id: "emp123",
  name: "Alice Johnson",
  email: "alice.johnson@example.com",
  role: UserRole.Employee,
  avatar: "/lovable-uploads/default-avatar.webp",
  joinDate: "2022-05-20",
  personalityType: "practical",
  loginCount: 15,
  completedOnboarding: true,
  examPreparation: "Professional Development",
  subscription: {
    id: "sub_emp1",
    userId: "emp123",
    planType: SubscriptionType.Corporate,
    startDate: "2023-02-10",
    endDate: "2024-02-10",
    status: "active",
    autoRenew: true
  },
  goals: [
    {
      id: "goal1",
      title: "Complete Leadership Course",
      progress: 85
    },
    {
      id: "goal2",
      title: "Data Analysis Certification",
      progress: 35
    }
  ]
};
