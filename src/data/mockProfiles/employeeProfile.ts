
// Correcting the mock data for employee profile
import { EmployeeProfile } from "@/types/user";
import { v4 as uuidv4 } from "uuid";

export const mockEmployeeProfile: EmployeeProfile = {
  id: uuidv4(),
  name: "Rajesh Kumar",
  email: "rajesh.kumar@techsolutions.com",
  phoneNumber: "+919876543211",
  role: "employee", // Changed from "Employee" to lowercase "employee"
  personalityType: "Strategic Thinker",
  subscription: "Basic",
  joinDate: "2025-01-15",
  lastActive: "2025-04-06",
  jobTitle: "Product Manager",
  workExperience: 6,
  skills: [
    "Product Strategy",
    "User Research",
    "Agile Methodologies",
    "Roadmapping",
    "Team Leadership"
  ],
  company: "TechSolutions India",
  industry: "SaaS",
  careerGoal: "Director of Product",
  projectsCompleted: 12,
  trainingCompleted: 8,
  experienceLevel: "Mid-Senior",
  skillsToGrow: ["Data Analytics", "Machine Learning Basics", "Product Marketing"],
  productivityScore: 85,
  goals: [
    {
      id: uuidv4(),
      title: "Complete PMP Certification",
      description: "Pass the Project Management Professional exam",
      progress: 75,
      dueDate: "2025-05-30", // Keep dueDate as Goal now supports it
      targetDate: new Date("2025-05-30")
    },
    {
      id: uuidv4(),
      title: "Learn SQL",
      description: "Complete advanced SQL course for data analysis",
      progress: 45,
      dueDate: "2025-07-15", // Keep dueDate as Goal now supports it
      targetDate: new Date("2025-07-15")
    }
  ],
  areasOfInterest: [
    {
      id: uuidv4(),
      name: "Product Analytics",
      level: "Intermediate"
    },
    {
      id: uuidv4(),
      name: "UX Design",
      level: "Beginner"
    }
  ]
};
