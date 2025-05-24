
export interface StudyStreak {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
}

export interface SubjectProgress {
  subject: string;
  completedTopics: number;
  totalTopics: number;
  percentage: number;
  weakAreas: string[];
  strongAreas: string[];
}

export interface ExamGoal {
  examName: string;
  targetDate: string;
  subjects: string[];
}
