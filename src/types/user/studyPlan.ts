
export interface StudyPlanTopic {
  name: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'high' | 'medium' | 'low';
}

export interface StudyPlanSubject {
  name: string;
  progress: number;
  proficiency: 'weak' | 'moderate' | 'strong';
  topics: StudyPlanTopic[];
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
    proficiency: 'weak' | 'moderate' | 'strong';
  }[];
  studyHoursPerDay: number;
  preferredStudyTime: 'morning' | 'afternoon' | 'evening' | 'night';
  learningPace: 'slow' | 'moderate' | 'fast';
}
