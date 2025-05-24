
export interface StudyPlanSubject {
  id: string;
  name: string;
  topics: string[];
  hours: number;
  difficulty: 'easy' | 'medium' | 'hard';
  priority: 'low' | 'medium' | 'high';
  progress: number;
  completed: boolean;
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
  status: 'active' | 'completed' | 'paused';
  createdAt: string;
  updatedAt: string;
  isCustom: boolean;
  examType?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface NewStudyPlan {
  name: string;
  description: string;
  subjects: Omit<StudyPlanSubject, 'id' | 'progress' | 'completed'>[];
  startDate: string;
  endDate: string;
  examType?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
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
