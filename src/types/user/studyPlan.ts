export interface Topic {
  name: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'high' | 'medium' | 'low';
}

export interface Subject {
  name: string;
  progress: number;
  proficiency: 'weak' | 'moderate' | 'strong';
  topics: Topic[];
}

export interface StudyPlan {
  id: string;
  examGoal: string;
  examDate: string;
  daysLeft: number;
  createdAt: string;
  status: 'active' | 'completed' | 'expired';
  progressPercentage: number;
  subjects: Subject[];
  studyHoursPerDay: number;
  preferredStudyTime: 'morning' | 'afternoon' | 'evening' | 'night';
  learningPace: 'slow' | 'moderate' | 'fast';
}

export interface NewStudyPlanSubject {
  name: string;
  proficiency: 'weak' | 'moderate' | 'strong';
}

export interface NewStudyPlan {
  examGoal: string;
  examDate: Date;
  subjects: NewStudyPlanSubject[];
  studyHoursPerDay: number;
  preferredStudyTime: 'morning' | 'afternoon' | 'evening' | 'night';
  learningPace: 'slow' | 'moderate' | 'fast';
  goalTitle?: string;
}
