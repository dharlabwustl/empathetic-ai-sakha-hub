
export interface ProgressItem {
  id: string;
  name: string;
  progress: number;
  status: "completed" | "in-progress" | "not-started";
  lastPracticed?: string;
  score?: number;
  completed?: boolean;
  masteryLevel?: number;
  questionCount?: number;
  correctAnswers?: number;
  timeSpent?: string;
  cardsCount?: number;
  masteredCards?: number;
  subject?: string;
  topic?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  priority?: 'high' | 'medium' | 'low';
  estimatedTime?: number;
  tags?: string[];
  examGoal?: string;
  chapter?: string;
}
