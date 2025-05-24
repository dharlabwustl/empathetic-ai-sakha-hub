
// Progress tracking types
export interface SubjectProgress {
  id: string;
  subject: string;
  totalConcepts: number;
  completedConcepts: number;
  progress: number;
  timeSpent: number;
  lastActivity: string;
  streak: number;
  averageScore: number;
  conceptsThisWeek: number;
  improvementRate: number;
}

export interface WeeklyProgress {
  week: string;
  hoursStudied: number;
  conceptsCompleted: number;
  testsCompleted: number;
  averageScore: number;
}

export interface ConceptProgress {
  conceptId: string;
  conceptName: string;
  subject: string;
  mastery: number;
  timeSpent: number;
  lastReviewed: string;
  attempts: number;
  correctAnswers: number;
  status: 'not-started' | 'in-progress' | 'mastered' | 'needs-review';
}
