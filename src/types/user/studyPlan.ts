
export interface Subject {
  name: string;
  key: string;
  group?: string;
  proficiency?: 'strong' | 'weak' | 'moderate';
}

export interface NewStudyPlanSubject {
  name: string;
  proficiency: 'strong' | 'weak' | 'moderate';
  key?: string; // Making key optional to match with Subject
}

export interface NewStudyPlan {
  examGoal: string;
  examDate: Date;
  subjects: NewStudyPlanSubject[];
  studyHoursPerDay: number;
  preferredStudyTime: 'morning' | 'afternoon' | 'evening' | 'night';
  learningPace: 'slow' | 'moderate' | 'fast';
}

export interface StudyPlanTopic {
  id: string;
  name: string;
  status: 'not_started' | 'in_progress' | 'completed';
  scheduledDate?: string;
  duration?: number; // in minutes
  complexity?: 'easy' | 'medium' | 'hard';
  resources?: string[];
  priority?: 'high' | 'medium' | 'low'; // Adding priority as it's being used
}

export interface StudyPlanSubject {
  name: string;
  key?: string; // Making key optional to allow compatibility with Subject type
  proficiency: 'strong' | 'weak' | 'moderate';
  progress: number; // percentage
  topics: StudyPlanTopic[];
}

export interface StudyPlan {
  id: string;
  userId: string; // Required field
  examGoal: string;
  createdAt: string;
  updatedAt: string; // Required field
  status: 'active' | 'completed' | 'archived' | 'draft';
  examDate: string;
  daysLeft: number;
  studyHoursPerDay: number;
  subjects: StudyPlanSubject[];
  progressPercentage: number; // overall progress
  preferredStudyTime: 'morning' | 'afternoon' | 'evening' | 'night';
  learningPace: 'slow' | 'moderate' | 'fast';
}
