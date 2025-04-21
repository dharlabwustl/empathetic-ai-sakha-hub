import { UserProfileType, UserRole } from "@/types/user/base";

export const employeeProfile: UserProfileType = {
  id: "employee-1",
  name: "Anika Sharma",
  email: "anika.sharma@example.com",
  avatar: "/avatars/employee1.jpg",
  role: UserRole.Employee,
  phoneNumber: "+91 99887 76655",
  createdAt: "2022-08-15",
  lastLogin: "2024-03-20",
  onboarded: true,
  loginCount: 28,
  completedOnboarding: true,
  subscription: {
    id: "sub-emp-1",
    plan: "elite", // Changed from planId to plan
    expiresAt: "2024-07-15",
    status: "active"
  },
  batchName: "Sakha Employees",
  batchCode: "SAKHA-EMP-2022",
  isGroupLeader: false,
  peerRanking: 15,
  examDate: "N/A",
  school: "N/A",
  grade: "N/A",
  board: "N/A",
  city: "Mumbai",
  state: "Maharashtra",
  goals: [
    {
      id: "goal-1",
      title: "Complete training modules",
      description: "Finish all assigned training courses",
      progress: 65,
      status: "in_progress" // Fixed from "in-progress"
    },
    {
      id: "goal-2",
      title: "Develop leadership skills",
      description: "Attend leadership workshops and apply concepts",
      progress: 40,
      status: "not_started" // Fixed from "not-started"
    },
    {
      id: "goal-3",
      title: "Improve client communication",
      description: "Enhance communication skills for better client relations",
      progress: 80,
      status: "completed"
    }
  ]
};
