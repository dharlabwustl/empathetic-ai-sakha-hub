
import { UserProfileType, UserRole, GoalStatus, UserSubscription } from "@/types/user/base";

const doctorProfile: UserProfileType = {
  id: "dr123",
  name: "Dr. Arun Sharma",
  email: "dr.arun@example.com",
  role: UserRole.Doctor,
  avatar: "/assets/avatars/doctor.jpg",
  phoneNumber: "+91-9845670123",
  createdAt: "2023-05-10T08:30:00Z",
  lastLogin: "2023-11-01T16:45:00Z",
  onboarded: true,
  loginCount: 45,
  completedOnboarding: true,
  
  subscription: {
    id: "sub_dr123",
    plan: "Premium",
    expiresAt: "2024-05-10T00:00:00Z",
    status: "active"
  } as UserSubscription,

  specialization: "Cardiology",
  
  // Medical education goals
  goals: [
    {
      id: "g1",
      title: "Research Paper",
      description: "Complete research on cardiac treatments",
      progress: 75,
      status: "in_progress" as GoalStatus,
      targetDate: "2024-08-15"
    },
    {
      id: "g2",
      title: "Medical Conference",
      description: "Present at the International Cardiology Conference",
      progress: 25,
      status: "active" as GoalStatus,
      targetDate: "2024-11-30"
    },
    {
      id: "g3",
      title: "Patient Case Studies",
      description: "Document 50 case studies for educational purposes",
      progress: 60,
      status: "in_progress" as GoalStatus,
      targetDate: "2024-09-01"
    }
  ],
};

export default doctorProfile;
