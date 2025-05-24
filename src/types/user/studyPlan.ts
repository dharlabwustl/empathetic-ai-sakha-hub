
export interface StudyPlanTopic {
  id: string;
  name: string;
  completed: boolean;
  status?: 'pending' | 'in-progress' | 'completed' | 'skipped';
  priority?: 'high' | 'medium' | 'low';
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface StudyPlanSubject {
  id: string;
  name: string;
  topics: string[];
  hours: number;
  difficulty: 'easy' | 'medium' | 'hard';
  priority: 'low' | 'medium' | 'high';
  progress: number;
  completed: boolean;
  color?: string;
  proficiency?: 'weak' | 'medium' | 'strong';
  hoursPerWeek?: number;
  isWeakSubject?: boolean;
  status?: 'pending' | 'in-progress' | 'completed' | 'skipped';
}

export interface StudyPlan {
  id: string;
  name: string;
  description: string;
  subjects: StudyPlanSubject[];
  startDate: string;
  endDate: string;
  totalHours: number;
  completedHours: number;
  progress: number;
  status: 'active' | 'completed' | 'paused' | 'pending';
  createdAt: string;
  updatedAt: string;
  isCustom: boolean;
  examType?: string;
  examGoal: string;
  examDate: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  learningPace?: 'slow' | 'moderate' | 'fast';
  preferredStudyTime?: 'morning' | 'afternoon' | 'evening' | 'night';
  studyHoursPerDay?: number;
  weeklyHours?: number;
  progressPercent?: number;
  progressPercentage?: number;
  daysLeft?: number;
  userId?: string;
  title?: string;
  goal?: string;
}

export interface NewStudyPlan {
  name: string;
  description: string;
  subjects: Omit<StudyPlanSubject, 'id' | 'progress' | 'completed'>[];
  startDate: string;
  endDate: string;
  examType?: string;
  examGoal: string;
  examDate: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  learningPace?: 'slow' | 'moderate' | 'fast';
  preferredStudyTime?: 'morning' | 'afternoon' | 'evening' | 'night';
  studyHoursPerDay?: number;
  weeklyHours?: number;
  status: 'active' | 'completed' | 'paused';
  title?: string;
  goal?: string;
}

export interface StudySession {
  id: string;
  studyPlanId: string;
  subjectId: string;
  topic: string;
  duration: number;
  completedAt: string;
  efficiency: number;
  notes?: string;
}
