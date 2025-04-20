
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
  
  // Existing additional fields
  phoneNumber?: string;
  completedOnboarding?: boolean;
  goals?: string[];
  studyHours?: number;
  subjectsSelected?: string[];
  moodScore?: number;
  engagementScore?: number;
  
  // Adding the previously missing properties
  targetScore?: number;
  avatarUrl?: string;

  // Adding group plan related fields
  batchCode?: string;
  batchName?: string;
  batchRole?: 'member' | 'leader' | 'school_admin' | 'corporate_admin';
  batchId?: string;
  groupPlanType?: 'group' | 'school' | 'corporate';
  invitationCodes?: string[];
}
