
export interface ExamPreparation {
  id: string;
  title: string;
  examDate: string;
  target?: string;
  subjects: string[];
  daysLeft: number;
  progress: number;
  startDate: string;
}
