
export interface SubjectProgress {
  id: string;
  subject: string;
  progress: number;
  totalConcepts: number;
  completedConcepts: number;
  weakAreas: string[];
  strongAreas: string[];
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  progress: number;
  type: 'exam' | 'assignment' | 'project' | 'quiz';
}

export interface CreditPack {
  id: string;
  name: string;
  credits: number;
  price: number;
  currency: string;
  description: string;
  bestValue?: boolean;
  isExamCredits?: boolean;
}
