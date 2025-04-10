
export interface UserProfileType {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
  userType: string;
  subscription: string;
  goals: Goal[];
  bio?: string;
  progress?: number;
  level?: number;
  points?: number;
  streakDays?: number;
  completedLessons?: number;
  personalityType?: string; // Personality type like "Strategic Thinker"
  focusDuration?: string; // E.g., "45 minutes with 15-minute breaks"
  studyPreference?: string; // E.g., "Visual learning with practical applications"
  mood?: {
    current: string;
    history: Array<{ date: Date; mood: string }>;
  };
  studyHabits?: {
    preferredTime?: string;
    focusDuration?: number;
    breakFrequency?: number;
  };
}

export interface Goal {
  id: string;
  title: string;
  description?: string;
  deadline?: Date;
  progress: number;
  milestones?: Milestone[];
}

export interface Milestone {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: Date;
}

export interface SubjectProgress {
  id: string;
  name: string;
  progress: number;
  lastStudied?: Date;
  totalTopics?: number;
  completedTopics?: number;
  expectedMastery?: string;
}

export interface StudyStreak {
  current?: number;
  longest?: number;
  lastUpdated: Date;
}
