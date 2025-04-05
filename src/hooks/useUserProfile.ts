
import { useState, useEffect } from "react";
import { UserProfileType, UserRole } from "@/types/user";

// Sample mock data
const mockStudentProfile = {
  id: "1",
  name: "Rahul Singh",
  phoneNumber: "9876543210",
  role: "Student" as UserRole,
  personalityType: "Strategic Thinker",
  goals: [
    {
      id: "g1",
      title: "Complete Physics Syllabus",
      description: "Finish all chapters in NCERT Physics",
      progress: 75,
      dueDate: "2025-05-30",
    },
    {
      id: "g2",
      title: "Score 90% in Math Test",
      description: "Practice integration problems",
      progress: 60,
      dueDate: "2025-05-15",
    },
  ],
  areasOfInterest: [
    {
      id: "i1",
      name: "Physics",
      level: "Advanced" as const,
    },
    {
      id: "i2",
      name: "Mathematics",
      level: "Intermediate" as const,
    },
    {
      id: "i3",
      name: "Chemistry",
      level: "Intermediate" as const,
    },
  ],
  subscription: "Basic" as const,
  joinDate: "2025-03-01",
  lastActive: "2025-05-12",
  educationLevel: "11th Grade",
  subjects: ["Physics", "Chemistry", "Mathematics", "Biology"],
  examPreparation: "IIT-JEE",
  studyHoursToday: 2.5,
  subjectsCovered: 3,
  quizPerformance: 82,
  mood: "Focused" as MoodType,
  syllabusCoverage: 65,
};

const mockEmployeeProfile = {
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

const mockDoctorProfile = {
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

const mockFounderProfile = {
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

export function useUserProfile(role: UserRole = "Student"): {
  userProfile: UserProfileType | null;
  loading: boolean;
  updateUserProfile: (updates: Partial<UserProfileType>) => void;
} {
  const [userProfile, setUserProfile] = useState<UserProfileType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch user profile
    const fetchUserProfile = () => {
      setLoading(true);
      
      setTimeout(() => {
        switch (role) {
          case "Student":
            setUserProfile(mockStudentProfile as UserProfileType);
            break;
          case "Employee":
            setUserProfile(mockEmployeeProfile as UserProfileType);
            break;
          case "Doctor":
            setUserProfile(mockDoctorProfile as UserProfileType);
            break;
          case "Founder":
            setUserProfile(mockFounderProfile as UserProfileType);
            break;
          default:
            setUserProfile(mockStudentProfile as UserProfileType);
        }
        setLoading(false);
      }, 800);
    };

    fetchUserProfile();
  }, [role]);

  const updateUserProfile = (updates: Partial<UserProfileType>) => {
    setUserProfile(prev => {
      if (!prev) return prev;
      return { ...prev, ...updates };
    });
  };

  return { userProfile, loading, updateUserProfile };
}
