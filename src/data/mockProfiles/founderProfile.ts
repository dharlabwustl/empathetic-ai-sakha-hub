import { UserRole } from '@/types/user/base';
import { FounderProfile } from '@/types/user';

export const mockFounderProfile: FounderProfile = {
  id: "4",
  name: "Vikram Malhotra",
  phoneNumber: "9876543213",
  email: "vikram@startup.com",
  role: "founder" as UserRole,
  personalityType: "Creative Explorer",
  subscription: "Enterprise",
  joinDate: "2024-11-25",
  createdAt: "2024-11-25",
  lastActive: "2025-05-12",
  areasOfInterest: [
    { id: "i1", name: "Entrepreneurship", level: "Advanced" },
    { id: "i2", name: "Product Design", level: "Advanced" },
    { id: "i3", name: "Market Strategy", level: "Intermediate" }
  ],
  goals: [
    {
      id: "g1",
      title: "Secure Series A Funding",
      description: "Prepare pitch deck and investor meetings",
      progress: 70,
      dueDate: "2025-08-15"
    },
    {
      id: "g2",
      title: "Launch Product Beta",
      description: "Complete MVP and prepare beta launch",
      progress: 85,
      dueDate: "2025-06-01"
    }
  ],
  startupName: "InnovateTech",
  startupStage: "Seed",
  industry: "HealthTech",
  teamSize: 12,
  funding: "₹5 Crore",
  challenges: ["Hiring talent", "Product-market fit", "Regulatory compliance", "Scaling operations"]
};
