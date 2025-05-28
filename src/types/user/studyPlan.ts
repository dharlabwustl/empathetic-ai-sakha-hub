// Study Plan Types
export interface StudyPlanTopic {
  id: string;
  name: string;
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
  status: 'completed' | 'in-progress' | 'pending' | 'skipped';
  priority: 'high' | 'medium' | 'low';
  // Enhanced fields for topic analysis
  weightage?: number;
  progress?: number;
  subtopics?: {
    id: string;
    name: string;
    weightage: number;
    completed: boolean;
  }[];
  examImportance?: 'critical' | 'important' | 'moderate' | 'low';
  estimatedHours?: number;
  prerequisites?: string[];
}

export interface StudyPlanSubject {
  id: string;
  name: string;
  color?: string;
  hoursPerWeek: number;
  priority: 'high' | 'medium' | 'low';
  proficiency: 'weak' | 'medium' | 'strong';
  completed: boolean;
  status?: 'completed' | 'in-progress' | 'pending' | 'skipped';
  difficulty?: 'easy' | 'medium' | 'hard';
  topics?: StudyPlanTopic[];
  // Enhanced fields for weightage analysis
  examWeightage?: number;
  completionRate?: number;
  weightageProgress?: number;
  remainingWeight?: number;
}

export interface StudyPlan {
  id: string;
  title?: string;
  goal?: string;
  examGoal: string;
  examDate: string | Date;
  status: 'active' | 'completed' | 'archived' | 'pending';
  subjects: StudyPlanSubject[];
  studyHoursPerDay: number;
  preferredStudyTime: 'morning' | 'afternoon' | 'evening' | 'night';
  learningPace: 'slow' | 'moderate' | 'fast';
  createdAt: string;
  updatedAt?: string;
  progressPercent?: number;
  progressPercentage?: number;
  progress?: number;
  daysLeft?: number;
  weeklyHours?: number;
  userId?: string;
}

export interface NewStudyPlan {
  id?: string;
  title?: string;
  goal?: string;
  examGoal: string;
  examDate: string | Date;
  subjects: StudyPlanSubject[];
  studyHoursPerDay: number;
  preferredStudyTime: 'morning' | 'afternoon' | 'evening' | 'night';
  learningPace: 'slow' | 'moderate' | 'fast';
  weeklyHours?: number;
  status?: 'active' | 'completed' | 'archived' | 'pending';
}

// Export types to be used in other files
export type { StudyPlan, StudyPlanSubject, NewStudyPlan, StudyPlanTopic };
