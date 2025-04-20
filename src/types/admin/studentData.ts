
export interface StudentData {
  id: string;
  name: string;
  email: string;
  role: string;
  examType?: string;
  registrationDate?: string;
  phoneNumber?: string;
  completedOnboarding?: boolean;
  goals?: string[];
  moodScore?: number;
  studyHours?: number;
  engagementScore?: number;
  subjectsSelected?: string[];
  testScores?: {
    subject: string;
    score: number;
    date: string;
  }[];
  // Add missing properties needed by admin components
  status?: "active" | "inactive" | "pending";
  joinedDate?: string;
  lastActive?: string;
  examPrep?: string;
  subjects?: string[];
  progress?: {
    completedTopics: number;
    totalTopics: number;
    lastActiveDate?: string;
  };
}
