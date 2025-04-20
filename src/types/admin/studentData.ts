
export interface StudentData {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  lastActive: string;
  subscriptionTier: string;
  studyTime: number;
  completedLessons: number;
  targetScore: number;
  avatarUrl?: string;
  
  // Add missing properties
  registrationDate: string;
  examType: string;
  subjectsSelected: string[];
  engagementScore: number;
  phoneNumber: string;
  completedOnboarding: boolean;
  goals: string[];
  studyHours: number;
  moodScore: number;
  
  // Optional properties that are being used
  status?: "active" | "inactive" | "pending";
  joinedDate?: string; // Alternative to joinDate used in some components
  role?: string;
  examPrep?: string;
  subjects?: string[];
  progress?: {
    completedTopics: number;
    totalTopics: number;
    lastActiveDate?: string;
  };
}
