
export interface StudyPlanSubject {
  id: string;
  name: string;
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  hoursPerWeek: number;
  color: string;
  status?: 'pending' | 'in-progress' | 'completed';
}

export interface StudyPlan {
  id: string;
  title: string;
  description?: string;
  examGoal: string;
  examDate: string;
  status: 'active' | 'completed' | 'archived' | 'pending';
  progress: number;
  subjects: StudyPlanSubject[];
  studyHoursPerDay: number;
  preferredStudyTime: 'morning' | 'afternoon' | 'evening' | 'night';
  learningPace: 'slow' | 'moderate' | 'fast';
  createdAt: string;
  updatedAt?: string;
}

export interface NewStudyPlan {
  examGoal: string;
  examDate: string;
  subjects: {
    id: string;
    name: string;
    difficulty: 'easy' | 'medium' | 'hard';
    completed: boolean;
    hoursPerWeek: number;
  }[];
  studyHoursPerDay: number;
  preferredStudyTime: 'morning' | 'afternoon' | 'evening' | 'night';
  learningPace: 'slow' | 'moderate' | 'fast';
}
