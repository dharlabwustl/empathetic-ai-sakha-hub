
import { FounderProfile, UserRole } from "@/types/user";

export const mockFounderProfile: FounderProfile = {
  id: "4",
  name: "Vikram Mehta",
  phoneNumber: "9876543213",
  role: "Founder" as UserRole,
  personalityType: "Creative Builder",
  goals: [
    {
      id: "g1",
      title: "Raise Seed Funding",
      description: "Secure $500K in seed funding",
      progress: 40,
      dueDate: "2025-07-30",
    }
  ],
  areasOfInterest: [
    {
      id: "i1",
      name: "HealthTech",
      level: "Advanced" as const,
    },
    {
      id: "i2",
      name: "AI",
      level: "Intermediate" as const,
    }
  ],
  subscription: "Premium" as const,
  joinDate: "2024-12-05",
  lastActive: "2025-05-12",
  startupName: "MediSync",
  startupStage: "Prototype",
  industry: "HealthTech",
  teamSize: 4,
  mvpCompletion: 75,
  pitchDeckStatus: 90,
  burnoutRisk: 35,
  investorMeetings: 8,
};
