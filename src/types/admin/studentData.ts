
export interface StudentData {
  id: string;
  name: string;
  email: string;
  joinedDate: Date | string;
  registrationDate?: Date | string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  examType?: string;
  subjects?: string[];
  examPrep?: string;
  lastActive?: Date | string;
  progress?: number;
  
  // Additional fields needed from admin.ts StudentData
  phoneNumber?: string;
  completedOnboarding?: boolean;
  goals?: string[];
  studyHours?: number;
  subjectsSelected?: string[];
  moodScore?: number;
  engagementScore?: number;
  targetScore?: number;
  avatarUrl?: string;
}
