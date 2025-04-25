import { UserProfileType, UserRole, SubscriptionType } from "@/types/user";

// Mock doctor profile
export const doctorProfile: UserProfileType = {
  id: "doc123",
  name: "Dr. Emily Carter",
  email: "emily.carter@example.com",
  role: UserRole.Doctor,
  avatar: "/lovable-uploads/doctor_avatar.jpg",
  joinDate: "2022-05-20",
  personalityType: "analytical",
  loginCount: 15,
  completedOnboarding: true,
  examPreparation: "Medical Licensing Exam",
  subscription: {
    id: "sub_doctor1",
    userId: "doc123",
    planType: SubscriptionType.Premium,
    startDate: "2023-01-15",
    endDate: "2024-01-15",
    status: "active",
    autoRenew: true
  },
  goals: [
    {
      id: "goal1",
      title: "Complete NEET Course",
      progress: 75,
    },
    {
      id: "goal2",
      title: "Practice 1000 Questions",
      progress: 45,
    }
  ],
};
