
import { DoctorProfile, UserRole } from "@/types/user";

export const mockDoctorProfile: DoctorProfile = {
  id: "3",
  name: "Dr. Arjun Kumar",
  phoneNumber: "9876543212",
  role: "Doctor" as UserRole,
  personalityType: "Analytical Problem Solver",
  goals: [
    {
      id: "g1",
      title: "Complete Research Paper",
      description: "Finish research paper on COVID-19 variants",
      progress: 80,
      dueDate: "2025-06-30",
    }
  ],
  areasOfInterest: [
    {
      id: "i1",
      name: "Virology",
      level: "Advanced" as const,
    },
    {
      id: "i2",
      name: "Immunology",
      level: "Advanced" as const,
    }
  ],
  subscription: "Premium" as const,
  joinDate: "2025-01-10",
  lastActive: "2025-05-11",
  specialization: "Virologist",
  institution: "AIIMS Delhi",
  researchTopic: "COVID-19 Variant Analysis",
  researchPhase: "Data Collection",
  publicationsCount: 12,
  researchHoursToday: 6.5,
  literatureReviewed: 23,
  wellnessScore: 65,
};
