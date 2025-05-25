
export interface OnboardingData {
  role?: string;
  examGoal?: string;
  age?: number;
  grade?: string;
  location?: string;
  city?: string;
  institute?: string;
  institution?: string;
  personalityType?: string;
  mood?: string;
  learningStyle?: string;
  dailyStudyHours?: number;
  preferredStudyTime?: string;
  studyPace?: string;
  studyEnvironment?: string;
  interests?: string[];
  weakSubjects?: string[];
  preferredSubjects?: string[];
  sleepSchedule?: string;
  focusHours?: number;
  stressManagement?: string;
  breakRoutine?: string;
  breakFrequency?: string;
  [key: string]: any;
}

export interface ProgressData {
  completedTopics: number;
  totalTopics: number;
}

export interface StudentData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  joinedDate?: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  subjects?: string[];
  examPrep?: string;
  lastActive?: string;
  progress?: ProgressData | number;
  subscription?: string;
  mood?: string;
  studyStreak?: number;
  onboardingData?: OnboardingData;
}
