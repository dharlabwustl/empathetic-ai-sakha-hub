
// Study Plan Types
export interface StudyPlan {
  id: string;
  title: string;
  description: string;
  subjects: StudyPlanSubject[];
  startDate: string;
  endDate: string;
  targetExam: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedHours: number;
  status: 'active' | 'completed' | 'paused';
  progress: number;
  createdAt: string;
  updatedAt: string;
}

export interface StudyPlanSubject {
  id: string;
  name: string;
  topics: string[];
  allocatedHours: number;
  completedHours: number;
  progress: number;
  priority: 'high' | 'medium' | 'low';
  resources: StudyResource[];
}

export interface StudyResource {
  id: string;
  title: string;
  type: 'video' | 'pdf' | 'practice' | 'concept';
  url: string;
  duration?: number;
  completed: boolean;
}

export interface NewStudyPlan {
  title: string;
  description: string;
  targetExam: string;
  subjects: string[];
  startDate: string;
  endDate: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  studyHoursPerDay: number;
}
