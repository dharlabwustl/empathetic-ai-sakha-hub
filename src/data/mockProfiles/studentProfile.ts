
import { UserProfileType, UserRole, GoalStatus, PersonalityType, UserSubscription } from "@/types/user/base";

export const mockStudentProfile: UserProfileType = {
  id: "123",
  name: "Rohit Kumar",
  email: "rohit@example.com",
  role: UserRole.Student,
  avatar: "/assets/avatars/student.jpg",
  phoneNumber: "+91-9876543210",
  createdAt: "2023-07-15T10:30:00Z",
  lastLogin: "2023-11-02T09:15:00Z",
  onboarded: true,
  loginCount: 12,
  completedOnboarding: true,
  personalityType: {
    type: "systematic_learner",
    traits: ["Organized", "Detail-oriented", "Methodical", "Focused"],
    learningStyle: "Sequential and structured learning"
  } as PersonalityType,
  
  // Academic details
  batchName: "IIT-JEE 2024",
  batchCode: "IJ24-A1",
  isGroupLeader: true,
  peerRanking: 3,
  examDate: "2024-05-25",
  school: "Delhi Public School",
  grade: "12",
  board: "CBSE",
  city: "Delhi",
  state: "Delhi",
  
  // Goals
  goals: [
    {
      id: "g1",
      title: "IIT-JEE",
      description: "Crack IIT-JEE with rank under 1000",
      progress: 65,
      status: "in_progress" as GoalStatus,
      targetDate: "2024-05-20",
      examDate: "2024-05-25"
    },
    {
      id: "g2",
      title: "Physics Olympiad",
      description: "Qualify for national level",
      progress: 40,
      status: "active" as GoalStatus,
      targetDate: "2024-03-15"
    }
  ],
};
