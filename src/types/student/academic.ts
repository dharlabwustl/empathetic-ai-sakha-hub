
export interface StudyPlanSubject {
  id: string;
  name: string;
  color?: string;
  hoursPerWeek: number;
  weeklyHours: number;
  progress: number;
  priority: 'high' | 'medium' | 'low';
  proficiency: string | number;
  completed: boolean;
  difficulty?: 'easy' | 'medium' | 'hard';
  status?: 'pending' | 'in-progress' | 'completed';
}

export interface NewStudyPlan {
  id?: string;
  title: string;
  goal: string;
  examGoal: string;
  subjects: StudyPlanSubject[];
  studyHoursPerDay: number;
  preferredStudyTime: 'morning' | 'afternoon' | 'evening' | 'night';
  learningPace: 'slow' | 'moderate' | 'fast';
  weeklyHours: number;
  examDate: string;
  status: 'pending' | 'active' | 'completed' | 'archived';
}

export interface StudyPlan extends NewStudyPlan {
  id: string;
  createdAt: string;
  updatedAt: string;
  completionPercentage: number;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  type: 'exam' | 'assessment' | 'revision' | 'project';
  completed?: boolean;
  priority: 'high' | 'medium' | 'low';
  subject?: string;
}
