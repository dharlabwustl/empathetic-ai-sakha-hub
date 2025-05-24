
export interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed';
  completed?: boolean;
  progress: number;
  type: 'exam' | 'assignment' | 'project' | 'goal';
}
