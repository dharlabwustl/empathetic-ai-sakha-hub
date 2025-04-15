
import { UserProfileType, UserRole } from "@/types/user";
import { getStudentProfile } from "./studentProfile";
import { getEmployeeProfile } from "./employeeProfile";
import { getDoctorProfile } from "./doctorProfile";
import { getFounderProfile } from "./founderProfile";

const profiles: Record<string, UserProfileType> = {
  student: {
    id: "student-001",
    name: "Aryan Sharma",
    email: "aryan.sharma@example.com",
    phoneNumber: "+91 98765 43210",
    role: "student" as UserRole,
    avatar: "/assets/avatars/student-male.png",
    bio: "Preparing for JEE Advanced with a focus on Physics and Mathematics.",
    loginCount: 24,
    completedOnboarding: true,
    subscription: "Basic",
    joinDate: "2025-01-15T10:30:00",
    personalityType: "Analytical Problem Solver",
    areasOfInterest: [
      { id: "a1", name: "Physics", level: "Advanced" },
      { id: "a2", name: "Mathematics", level: "Advanced" },
      { id: "a3", name: "Computer Science", level: "Intermediate" }
    ],
    lastActive: "2025-04-14T18:45:00",
    goals: [
      {
        id: "g1",
        title: "JEE Advanced",
        dueDate: "2025-06-15",
        progress: 68,
        description: "Target rank under 1000"
      },
      {
        id: "g2",
        title: "Master Quantum Physics",
        dueDate: "2025-05-20",
        progress: 45,
        description: "Complete all advanced problems"
      }
    ],
    subjects: [
      { id: "s1", name: "Physics", progress: 72, lastStudied: new Date("2025-04-13") },
      { id: "s2", name: "Mathematics", progress: 81, lastStudied: new Date("2025-04-14") },
      { id: "s3", name: "Chemistry", progress: 54, lastStudied: new Date("2025-04-10") }
    ],
    stats: {
      averageScore: 78,
      studyStreak: 18,
      totalStudyHours: 342,
      quizzesCompleted: 64
    },
    examPreparation: "JEE Advanced"
  },
  
  employee: {
    id: "employee-001",
    name: "Priya Mehta",
    email: "priya.mehta@example.com",
    phoneNumber: "+91 87654 32109",
    role: "employee" as UserRole,
    avatar: "/assets/avatars/employee-female.png",
    bio: "Working in tech and upskilling in data science and AI.",
    loginCount: 16,
    completedOnboarding: true,
    subscription: "Premium",
    joinDate: "2025-02-10T14:15:00",
    personalityType: "Strategic Thinker",
    areasOfInterest: [
      { id: "a1", name: "Data Science", level: "Intermediate" },
      { id: "a2", name: "Artificial Intelligence", level: "Beginner" },
      { id: "a3", name: "Project Management", level: "Advanced" }
    ],
    lastActive: "2025-04-14T12:30:00",
    goals: [
      {
        id: "g1",
        title: "Complete Data Science Certification",
        dueDate: "2025-07-30",
        progress: 45,
        description: "IBM Data Science Professional Certificate"
      },
      {
        id: "g2",
        title: "Learn Python for Data Analysis",
        dueDate: "2025-05-15",
        progress: 72,
        description: "Master pandas and NumPy libraries"
      }
    ]
  },
  
  doctor: {
    id: "doctor-001",
    name: "Dr. Rajiv Kumar",
    email: "dr.rajiv@example.com",
    phoneNumber: "+91 76543 21098",
    role: "doctor" as UserRole,
    avatar: "/assets/avatars/doctor-male.png",
    bio: "Cardiologist with 10+ years experience, focusing on latest treatments.",
    loginCount: 8,
    completedOnboarding: true,
    subscription: "Premium",
    joinDate: "2025-03-05T09:20:00",
    personalityType: "Detailed Analyzer",
    areasOfInterest: [
      { id: "a1", name: "Cardiology", level: "Advanced" },
      { id: "a2", name: "Medical Research", level: "Advanced" },
      { id: "a3", name: "Healthcare Technology", level: "Intermediate" }
    ],
    lastActive: "2025-04-13T17:15:00",
    goals: [
      {
        id: "g1",
        title: "Complete CME Credits",
        dueDate: "2025-08-30",
        progress: 65,
        description: "Annual continuing medical education requirements"
      },
      {
        id: "g2",
        title: "Publish Research Paper",
        dueDate: "2025-06-15",
        progress: 40,
        description: "On new cardiac treatment approaches"
      }
    ]
  },
  
  founder: {
    id: "founder-001",
    name: "Neha Patel",
    email: "neha.patel@example.com",
    phoneNumber: "+91 65432 10987",
    role: "founder" as UserRole,
    avatar: "/assets/avatars/founder-female.png",
    bio: "Tech entrepreneur building a healthcare startup to improve patient care.",
    loginCount: 32,
    completedOnboarding: true,
    subscription: "Enterprise",
    joinDate: "2025-01-20T11:45:00",
    personalityType: "Creative Builder",
    areasOfInterest: [
      { id: "a1", name: "Healthcare Innovation", level: "Advanced" },
      { id: "a2", name: "Startup Growth", level: "Advanced" },
      { id: "a3", name: "Venture Capital", level: "Intermediate" }
    ],
    lastActive: "2025-04-14T20:10:00",
    goals: [
      {
        id: "g1",
        title: "Secure Series A Funding",
        dueDate: "2025-09-30",
        progress: 35,
        description: "Target: $3M investment"
      },
      {
        id: "g2",
        title: "Product Market Fit",
        dueDate: "2025-06-30",
        progress: 60,
        description: "Achieve 20% month-over-month growth"
      }
    ]
  }
};

export function getMockProfileByRole(role: UserRole): UserProfileType {
  switch (role.toLowerCase()) {
    case "student":
      return getStudentProfile();
    case "employee":
      return getEmployeeProfile();
    case "doctor":
      return getDoctorProfile();
    case "founder":
      return getFounderProfile();
    default:
      return profiles.student; // default to student if role doesn't match
  }
}
