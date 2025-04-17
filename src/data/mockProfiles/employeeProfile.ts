
import { EmployeeProfile } from "@/types/user";
import { MoodType } from "@/types/user/base";
import { v4 as uuidv4 } from "uuid";

export const mockEmployeeProfile: EmployeeProfile = {
  id: "2",
  name: "Priyanka Sharma",
  email: "priyanka.sharma@example.com",
  phoneNumber: "8765432109",
  role: "employee",
  personalityType: "analytical",
  subscription: "premium",
  joinDate: "2025-02-15",
  lastActive: "2025-05-12",
  areasOfInterest: [
    { id: "i1", name: "Project Management", level: "Advanced" },
    { id: "i2", name: "Data Analysis", level: "Intermediate" },
    { id: "i3", name: "Team Leadership", level: "Advanced" }
  ],
  jobTitle: "Senior Product Manager",
  industry: "Technology",
  seniorityLevel: "Mid-level",
  domain: "Software",
  goals: [
    {
      id: "g1",
      title: "Complete PMP Certification",
      description: "Study for and pass the PMP exam",
      progress: 65,
      status: "in-progress",
      dueDate: "2025-07-30"
    },
    {
      id: "g2",
      title: "Learn Advanced SQL",
      description: "Master data analysis with complex queries",
      progress: 40,
      status: "in-progress",
      dueDate: "2025-06-15"
    }
  ],
  currentMood: "focused" as MoodType
};
