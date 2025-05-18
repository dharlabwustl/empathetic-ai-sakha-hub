
export interface StudyPlanTopic {
  id: string;
  name: string;
  difficulty: string;
  subject: string;
  status: string;
  priority: string;
  lastReviewed?: string;
  completed?: boolean;
}

export interface StudyPlanSubject {
  name: string;
  progress: number;
  color: string;
}

export interface StudyPlan {
  overallProgress: number;
  subjects: StudyPlanSubject[];
  weakTopics: StudyPlanTopic[];
  strongTopics: StudyPlanTopic[];
}
