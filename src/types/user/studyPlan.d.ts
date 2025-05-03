
// Basic study plan types
export interface StudyPlanSubject {
  id: string;
  name: string;
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
  priority?: 'high' | 'medium' | 'low';
  status?: 'completed' | 'pending' | 'in-progress' | 'skipped';
  proficiency?: 'strong' | 'medium' | 'weak';
  color?: string;
  hoursPerWeek: number;
}

export interface StudyPlan {
  id: string;
  title: string;
  description?: string;
  examGoal: string;
  examDate: Date | string;
  status: 'active' | 'completed' | 'pending';
  progress?: number;
  subjects: StudyPlanSubject[];
  studyHoursPerDay: number;
  preferredStudyTime: 'morning' | 'afternoon' | 'evening' | 'night';
  learningPace: 'slow' | 'moderate' | 'fast';
  createdAt: Date | string;
  updatedAt?: Date | string;
}

// Interface for creating new study plans
export interface NewStudyPlan {
  examGoal: string;
  examDate: Date | string;
  subjects: StudyPlanSubject[];
  studyHoursPerDay: number;
  preferredStudyTime: 'morning' | 'afternoon' | 'evening' | 'night';
  learningPace: 'slow' | 'moderate' | 'fast';
}

// Interface for tracking study sessions
export interface StudySession {
  id: string;
  planId: string;
  subjectId: string;
  date: Date | string;
  duration: number; // in minutes
  completed: boolean;
  notes?: string;
}
