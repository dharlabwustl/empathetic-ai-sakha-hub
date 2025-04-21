
export interface SubjectProgress {
  subject: string;
  completedTopics: number;
  totalTopics: number;
  currentStreak: number;
  highestStreak: number;
  averageScore: number;
  timeSpent: number;
}

export interface StudyStreak {
  currentStreak: number;
  longestStreak: number;
  startDate: string;
  endDate: string;
  totalDaysStudied: number;
  weeklyConsistency: number;
  monthlyConsistency: number;
}
