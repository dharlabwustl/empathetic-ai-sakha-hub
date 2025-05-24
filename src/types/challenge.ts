
export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'quiz' | 'problem' | 'activity' | 'reading';
  difficulty: string;
  points: number;
  dueDate: Date;
  status: string;
  completedBy: {
    userId: string;
    name: string;
    avatar: string;
    completedAt: Date;
    points: number;
  }[];
  totalParticipants: number;
  successRate: number;
}
