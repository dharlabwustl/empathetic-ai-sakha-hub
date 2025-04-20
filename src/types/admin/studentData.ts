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
}
