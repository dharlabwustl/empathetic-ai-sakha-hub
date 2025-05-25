
export interface Milestone {
  id: string;
  title: string;
  description: string;
  date: string;
  type: string;
  completed: boolean;
}

export interface SubjectProgress {
  id: string;
  name: string;
  progress: number;
  totalConcepts: number;
  completedConcepts: number;
}

export interface CreditPack {
  id: string;
  name: string;
  credits: number;
  price: number;
  description: string;
  bestValue?: boolean;
  isExamCredits?: boolean;
}
