
export interface StudyPlan {
  id: string;
  userId: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  totalHours: number;
  hoursPerDay: number;
  subjects: StudyPlanSubject[];
  createdAt: Date;
  updatedAt: Date;
  status?: 'active' | 'completed' | 'paused';
}

export interface StudyPlanSubject {
  id: string;
  name: string;
  topics: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedHours: number;
  completed: boolean;
  progress: number;
  status?: 'not_started' | 'in_progress' | 'completed';
}

export interface StudySession {
  id: string;
  studyPlanId: string;
  subjectId: string;
  date: Date;
  startTime: string;
  endTime: string;
  duration: number;
  notes: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
