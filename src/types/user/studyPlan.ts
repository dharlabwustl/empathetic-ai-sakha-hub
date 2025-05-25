export interface StudyPlanSubject {
  id: string;
  name: string;
  color: string;
  hoursPerWeek: number;
  priority: 'high' | 'medium' | 'low';
  proficiency: 'strong' | 'medium' | 'weak';
  topics: StudyPlanTopic[];
}

export interface StudyPlanTopic {
  id: string;
  name: string;
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
  status: 'completed' | 'in-progress' | 'pending';
}

// Keep the old interface name for backward compatibility
export interface NewStudyPlanSubject extends StudyPlanSubject {}
