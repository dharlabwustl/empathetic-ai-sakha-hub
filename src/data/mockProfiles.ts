
import { UserProfileType, UserRole, SubscriptionType } from "@/types/user";

export const getMockProfileByRole = (role: UserRole = UserRole.Student): UserProfileType => {
  // Basic profile that will be extended based on role
  const baseProfile: UserProfileType = {
    id: "user-" + Math.random().toString(36).substr(2, 9),
    email: "user@example.com",
    name: "Demo User",
    role: role,
    joinDate: new Date().toISOString(),
    lastActive: new Date().toISOString(),
    completedOnboarding: true,
    subscription: SubscriptionType.Basic
  };
  
  // Extend the profile based on role
  switch (role) {
    case UserRole.Student:
      return {
        ...baseProfile,
        name: "Student User",
        email: "student@example.com",
        goals: [
          {
            id: "goal-1",
            title: "Complete IIT-JEE Preparation",
            description: "Finish all coursework for IIT-JEE exam",
            progress: 45,
            status: "in-progress"
          }
        ],
        examPreparation: "IIT-JEE"
      };
      
    case UserRole.Teacher:
      return {
        ...baseProfile,
        name: "Teacher User",
        email: "teacher@example.com",
      };
      
    case UserRole.Admin:
      return {
        ...baseProfile,
        name: "Admin User",
        email: "admin@example.com",
      };
      
    default:
      return baseProfile;
  }
};
