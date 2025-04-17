
export interface StudyConceptType {
  id: string;
  title: string;
  subject: string;
  chapter: string;
  difficulty: "Easy" | "Medium" | "Hard";
  estimatedTime: number;
  content: string;
  resourceType: "Video" | "Text" | "PDF";
  resourceUrl: string;
  completed: boolean;
}

export interface StudyPlanType {
  date: Date;
  totalConcepts: number;
  completedConcepts: number;
  timeSpent: number;
  targetTime: number;
  streak: number;
  concepts: StudyConceptType[];
}
