import { FounderProfile } from "@/types/user";
import { UserRole, SubscriptionType } from "@/types/user/base";
import { v4 as uuidv4 } from "uuid";

export const mockFounderProfile: FounderProfile = {
  id: uuidv4(),
  name: "Priya Mehta",
  email: "priya.mehta@edumatch.com",
  phoneNumber: "+919876543212",
  role: UserRole.Founder,
  personalityType: "Creative Builder",
  subscription: {
    id: "sub-founder-1",
    plan: "enterprise",
    expiresAt: "2026-12-31",
    status: "active"
  },
  joinDate: "2024-12-05",
  lastActive: "2025-04-07",
  startupName: "EduMatch",
  industry: "EdTech",
  foundingYear: "2024",
  teamSize: 4,
  funding: "Seed",
  stage: "Early Traction",
  mvpStatus: 80,
  pitchDeckReady: true,
  startupStage: "Product-Market Fit",
  startupGoal: "Series A Funding",
  mvpCompletion: 80,
  pitchDeckStatus: 100,
  goals: [
    {
      id: "goal-1",
      title: "Scale platform user base",
      description: "Reach 100,000 active users by Q3",
      progress: 48,
      status: "in_progress",
      dueDate: "2025-09-30",
      targetDate: new Date("2025-09-30")
    },
    {
      id: "goal-2",
      title: "Secure Series B funding",
      description: "Prepare pitch deck and investor meetings",
      progress: 65,
      status: "in_progress",
      dueDate: "2025-06-15",
      targetDate: new Date("2025-06-15")
    }
  ],
  areasOfInterest: [
    {
      id: uuidv4(),
      name: "Growth Marketing",
      level: "Intermediate"
    },
    {
      id: uuidv4(),
      name: "Financial Modeling",
      level: "Beginner"
    }
  ]
};
