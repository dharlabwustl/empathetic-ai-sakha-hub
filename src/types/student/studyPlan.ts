
export interface StudyPlanTopic {
  id: string;
  title: string;
  description?: string;
  subject: string;
  duration: number; // in minutes
  status: 'not-started' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  completedAt?: string;
  resources?: StudyResource[];
}

export interface StudyPlan {
  id: string;
  title: string;
  description?: string;
  topics: StudyPlanTopic[];
  startDate: string;
  endDate: string;
  progress: number;
  status: 'draft' | 'active' | 'completed';
  examId?: string;
  examName?: string;
}

export interface StudyResource {
  id: string;
  title: string;
  type: 'video' | 'pdf' | 'document' | 'link' | 'exercise';
  url: string;
}

export interface StudySchedule {
  id: string;
  day: string;
  date: string;
  topics: StudyPlanTopic[];
  totalDuration: number;
  completed: boolean;
}
