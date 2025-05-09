
export interface ConceptCard {
  id: string;
  title: string;
  subject: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  explanation: string;
  examples: string[];
  imageUrl?: string;
  tags: string[];
  flowDiagram?: string;
  userProgress?: number;
  lastReviewed?: string;
  recallAccuracy?: number;
}
