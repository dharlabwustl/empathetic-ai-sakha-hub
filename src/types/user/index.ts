
// Re-export everything from base for compatibility
export * from './base';

// Additional types for study progress
export interface StudyHours {
  date: string;
  hours: number;
}

export interface QuizScore {
  id: string;
  title: string;
  score: number;
  maxScore: number;
  date: string;
  timeTaken: number;
}

export interface Topic {
  id: string;
  name: string;
  completed: boolean;
  masteryLevel: number;
  lastPracticed?: string;
}

export interface SubjectProgress {
  id: string;
  name: string;
  studyHours: StudyHours[];
  quizScores: QuizScore[];
  topics: Topic[];
  completed?: boolean;
  color?: string;
  proficiency?: number;
  hoursPerWeek?: number;
  difficulty?: string;
}

export interface StudyStreak {
  current: number;
  longest: number;
  thisWeek: number[];
}

// Language option interface
export interface LanguageOption {
  value: string;
  label: string;
  flag: string;
}

// Study plan interfaces
export interface StudyPlanSubject {
  id: string;
  name: string;
  hoursPerWeek: number;
  proficiency: 'beginner' | 'intermediate' | 'advanced';
  priority: 'high' | 'medium' | 'low';
  color: string;
  difficulty?: string;
}

export interface StudyPlan {
  id: string;
  title: string;
  examGoal: string;
  examDate: string;
  status: 'active' | 'completed' | 'paused';
  subjects: StudyPlanSubject[];
  createdAt: string;
  updatedAt: string;
  progressPercent: number;
  daysLeft: number;
  studyHoursPerDay: number;
}

export interface NewStudyPlan {
  examGoal: string;
  examDate: string;
  preferredStudyTime: string;
  learningPace: string;
  subjects: StudyPlanSubject[];
}
