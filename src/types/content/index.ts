
export type ContentType = 'concept' | 'flashcard' | 'question' | 'exam' | 'resource' | 'feel-good';

export interface ContentMetadata {
  subject: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedDuration: number;
  tags: string[];
  examType: string;
}

export interface ContentUploadData {
  name: string;
  subject: string;
  examType: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string;
  description: string;
}
