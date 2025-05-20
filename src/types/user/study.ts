
export interface SubjectProgress {
  id: string;
  name: string;
  progress: number;
  lastStudied?: Date | string;
  totalTopics: number;
  completedTopics: number;
  upcomingTests?: {
    id: string;
    name: string;
    date: Date | string;
  }[];
}

export interface StudyStreak {
  currentStreak: number;
  longestStreak: number;
  lastStudyDate: Date | string;
  streakDates: {
    date: string;
    completed: boolean;
  }[];
}
