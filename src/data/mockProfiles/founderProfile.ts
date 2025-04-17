
import { FounderProfile } from "@/types/user";
import { MoodType } from "@/types/user/base";
import { v4 as uuidv4 } from "uuid";

export const mockFounderProfile: FounderProfile = {
  id: "4",
  name: "Arjun Mehta",
  email: "arjun.mehta@example.com",
  phoneNumber: "6543210987",
  role: "founder",
  personalityType: "creative",
  subscription: "premium",
  joinDate: "2025-03-05",
  lastActive: "2025-05-12",
  areasOfInterest: [
    { id: "i1", name: "Startup Growth", level: "Advanced" },
    { id: "i2", name: "Product Development", level: "Intermediate" },
    { id: "i3", name: "Venture Capital", level: "Beginner" }
  ],
  startupName: "EcoTech Solutions",
  startupStage: "Series A",
  teamSize: 15,
  industry: "CleanTech",
  goals: [
    {
      id: "g1",
      title: "Secure Series B Funding",
      description: "Prepare pitch deck and investor meetings",
      progress: 40,
      status: "in-progress",
      dueDate: "2025-09-30"
    },
    {
      id: "g2",
      title: "Product Market Fit",
      description: "Achieve key metrics for product-market fit",
      progress: 65,
      status: "in-progress",
      dueDate: "2025-06-30"
    }
  ],
  currentMood: "motivated" as MoodType
};
