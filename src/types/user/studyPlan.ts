
export interface StudyPlan {
  id: string;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  goalId?: string;
  userId: string;
  progress: number;
  status: 'active' | 'completed' | 'paused';
  subjects: StudyPlanSubject[];
  createdAt?: string;
  updatedAt?: string;
}

export interface StudyPlanSubject {
  id: string;
  name: string;
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  hoursPerWeek?: number;
  proficiency?: number;
  topics?: StudyPlanTopic[];
  progress?: number;
}

export interface StudyPlanTopic {
  id: string;
  name: string;
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  duration?: number;
  scheduledDate?: string;
  subtopics?: StudyPlanSubtopic[];
  progress?: number;
}

export interface StudyPlanSubtopic {
  id: string;
  name: string;
  completed: boolean;
  duration?: number;
}

export interface DailyStudySchedule {
  date: string;
  topics: ScheduledTopic[];
  totalHours: number;
  completed: boolean;
}

export interface ScheduledTopic {
  id: string;
  topicId: string;
  name: string;
  subjectName: string;
  duration: number;
  startTime: string;
  endTime: string;
  completed: boolean;
}

export interface NewStudyPlan {
  name: string;
  examType: string;
  startDate: string;
  endDate: string;
  studyHoursPerWeek: number;
  weakSubjects: string[];
  strongSubjects: string[];
  selectedSubjects: string[];
}
