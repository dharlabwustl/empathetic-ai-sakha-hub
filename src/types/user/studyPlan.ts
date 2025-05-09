
// Define the topic structure in a study plan
export interface StudyPlanTopic {
  id: string;
  name: string;
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'high' | 'medium' | 'low';
}

// Define the subject structure in a study plan
export interface StudyPlanSubject {
  id: string;
  name: string;
  color: string;
  hoursPerWeek: number;
  priority: 'high' | 'medium' | 'low';
  proficiency: 'strong' | 'medium' | 'weak';
  completed: boolean;
  topics: StudyPlanTopic[];
}

// Define the study plan structure
export interface StudyPlan {
  id: string;
  userId: string;
  goal: string;
  examGoal: string;
  examDate: string;
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'completed' | 'archived';
  weeklyHours: number;
  progressPercentage: number;
  daysLeft: number;
  subjects: StudyPlanSubject[];
  studyHoursPerDay: number;
  preferredStudyTime: 'morning' | 'afternoon' | 'evening' | 'night';
  learningPace: 'aggressive' | 'moderate' | 'slow';
}

// Define the structure for creating a new study plan
export interface NewStudyPlan {
  examGoal: string;
  examDate: Date | string;
  weeklyHours?: number;
  subjects: StudyPlanSubject[];
  studyHoursPerDay: number;
  preferredStudyTime: 'morning' | 'afternoon' | 'evening' | 'night';
  learningPace: 'aggressive' | 'moderate' | 'slow';
}

// For onboarding process
export type NewStudyPlanSubject = {
  id?: string;
  name: string;
  color?: string;
  hoursPerWeek?: number;
  priority?: 'high' | 'medium' | 'low';
  proficiency?: 'strong' | 'medium' | 'weak';
};
