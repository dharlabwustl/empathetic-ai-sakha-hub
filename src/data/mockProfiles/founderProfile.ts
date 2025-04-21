
import { UserProfileType, UserRole, SubscriptionType } from "@/types/user/base";

export const mockFounderProfile: UserProfileType = {
  id: "f123",
  name: "Neha Gupta",
  email: "neha@techstartup.com",
  role: UserRole.Founder,
  avatar: "/assets/avatars/founder.jpg",
  phoneNumber: "+91-9876500001",
  createdAt: "2023-03-15T14:30:00Z",
  lastLogin: "2023-11-01T18:20:00Z",
  onboarded: true,
  loginCount: 67,
  completedOnboarding: true,
  
  subscription: {
    id: "sub_f123",
    plan: "Enterprise",
    expiresAt: "2024-03-15T00:00:00Z",
    status: "active"
  },
  
  // Business and professional goals
  goals: [
    {
      id: "g1",
      title: "Series A Funding",
      description: "Prepare for Series A funding round",
      progress: 70,
      status: "in_progress"
    },
    {
      id: "g2",
      title: "Product Launch",
      description: "Launch version 2.0 of the product",
      progress: 85,
      status: "in_progress"
    },
    {
      id: "g3",
      title: "Team Expansion",
      description: "Hire key engineering and marketing roles",
      progress: 40,
      status: "in_progress"
    }
  ],
};
