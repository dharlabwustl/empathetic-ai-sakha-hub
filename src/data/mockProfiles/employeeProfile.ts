
import { EmployeeProfile, UserRole } from "@/types/user";

export const mockEmployeeProfile: EmployeeProfile = {
  id: "2",
  name: "Priya Sharma",
  phoneNumber: "9876543211",
  role: "Employee" as UserRole,
  personalityType: "Collaborative Leader",
  goals: [
    {
      id: "g1",
      title: "Complete Python Certification",
      description: "Finish advanced Python course",
      progress: 60,
      dueDate: "2025-06-15",
    }
  ],
  areasOfInterest: [
    {
      id: "i1",
      name: "Data Science",
      level: "Intermediate" as const,
    },
    {
      id: "i2",
      name: "Project Management",
      level: "Advanced" as const,
    }
  ],
  subscription: "Premium" as const,
  joinDate: "2025-02-15",
  lastActive: "2025-05-12",
  jobTitle: "Senior Project Manager",
  industry: "Technology",
  experienceLevel: "Senior",
  skillsToGrow: ["Data Analysis", "Leadership", "Python"],
  productivityScore: 85,
  workHoursToday: 7.5,
  tasksCovered: 6,
  wellnessScore: 75,
};
