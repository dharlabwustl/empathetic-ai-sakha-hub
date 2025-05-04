
export interface StudyPlanTopic {
  id: string;
  name: string;
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
  status: 'pending' | 'in-progress' | 'completed';
  priority?: 'high' | 'medium' | 'low';
}

export interface StudyPlanSubject {
  id: string;
  name: string;
  color: string;
  hoursPerWeek: number;
  priority: string;
  proficiency: 'weak' | 'medium' | 'strong';
  completed: boolean;
  topics: StudyPlanTopic[];
}

export interface StudyPlan {
  id: string;
  goal: string;
  examGoal: string;
  examDate: string;
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'completed' | 'archived' | 'pending';
  weeklyHours: number;
  progressPercent: number;
  daysLeft: number;
  subjects: StudyPlanSubject[];
  studyHoursPerDay: number;
  preferredStudyTime: 'morning' | 'afternoon' | 'evening' | 'night';
  learningPace: 'slow' | 'moderate' | 'fast';
  userId?: string;
}

export interface NewStudyPlan {
  examGoal: string;
  examDate: Date | string;
  weeklyHours?: number;
  subjects: {
    id?: string;
    name: string;
    color?: string;
    hoursPerWeek?: number;
    priority?: 'high' | 'medium' | 'low';
    proficiency?: 'weak' | 'medium' | 'strong';
  }[];
  studyHoursPerDay: number;
  preferredStudyTime: 'morning' | 'afternoon' | 'evening' | 'night';
  learningPace: 'slow' | 'moderate' | 'fast';
}
