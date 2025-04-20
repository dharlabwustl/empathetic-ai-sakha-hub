
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
}
