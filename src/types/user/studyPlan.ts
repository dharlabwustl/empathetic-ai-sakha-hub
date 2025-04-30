
export interface StudyPlanTopic {
  id?: string;
  name: string;
  status: 'pending' | 'in-progress' | 'completed' | 'skipped';
  priority?: 'high' | 'medium' | 'low';
  difficulty?: 'easy' | 'medium' | 'hard';
  completed?: boolean;
}

export interface StudyPlanSubject {
  id?: string;
  name: string;
  progress: number;
  proficiency: 'strong' | 'weak' | 'moderate';
  topics: StudyPlanTopic[];
  color?: string;
  hoursPerWeek?: number;
  priority?: 'high' | 'medium' | 'low';
}

export interface StudyPlan {
  id: string;
  examGoal: string;
  examDate: string;
  daysLeft: number;
  createdAt: string;
  status: 'active' | 'completed' | 'paused';
  progressPercentage: number;
  subjects: StudyPlanSubject[];
  studyHoursPerDay: number;
  preferredStudyTime: 'morning' | 'afternoon' | 'evening' | 'night';
  learningPace: 'slow' | 'moderate' | 'fast';
}

export interface NewStudyPlan {
  examGoal: string;
  examDate: Date;
  subjects: {
    name: string;
    proficiency: 'strong' | 'weak' | 'moderate';
  }[];
  studyHoursPerDay: number;
  preferredStudyTime: 'morning' | 'afternoon' | 'evening' | 'night';
  learningPace: 'slow' | 'moderate' | 'fast';
}
