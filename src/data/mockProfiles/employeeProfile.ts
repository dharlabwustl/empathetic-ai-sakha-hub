
import { UserRole } from "@/types/user";
import { EmployeeProfile } from "@/types/user/professional";

export const mockEmployeeProfile: EmployeeProfile = {
  id: "2",
  name: "Ananya Patel",
  phoneNumber: "9876543211",
  email: "ananya.patel@company.com",
  role: "employee" as UserRole,
  personalityType: "Collaborative Leader",
  subscription: "Basic",
  joinDate: "2025-02-15",
  lastActive: "2025-05-10",
  areasOfInterest: [
    { id: "i1", name: "Project Management", level: "Advanced" },
    { id: "i2", name: "Data Analysis", level: "Intermediate" },
    { id: "i3", name: "Team Building", level: "Advanced" }
  ],
  goals: [
    {
      id: "g1",
      title: "Complete PMP Certification",
      description: "Study for project management professional exam",
      progress: 60,
      dueDate: "2025-07-30"
    },
    {
      id: "g2",
      title: "Learn Data Visualization",
      description: "Master Tableau for business intelligence",
      progress: 35,
      dueDate: "2025-06-15"
    }
  ],
  jobTitle: "Senior Project Manager",
  industry: "Information Technology",
  company: "TechSolutions Inc.",
  department: "Product Development",
  projectsCompleted: 24,
  skillsAcquired: ["Agile Methodologies", "Risk Management", "Team Leadership", "Stakeholder Communication"]
};
