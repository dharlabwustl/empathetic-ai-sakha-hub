
export interface StudyPlanSubject {
  id: string;
  name: string;
  progress: number;
  hoursSpent: number;
  targetHours: number;
  concepts: number;
  completedConcepts: number;
}

export interface NewStudyPlanSubject {
  id: string;
  name: string;
  selected: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  priority: number;
}

export interface StudyPlan {
  id: string;
  name: string;
  subjects: StudyPlanSubject[];
  targetExam: string;
  dailyGoal: number;
  weeklyGoal: number;
  createdAt: Date;
  updatedAt: Date;
}
