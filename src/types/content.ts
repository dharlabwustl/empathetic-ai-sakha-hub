
export type ContentType = 'concepts' | 'flashcards' | 'exams' | 'formulas' | 'study-materials';

export interface ContentItem {
  id: string;
  title: string;
  type: ContentType;
  subject: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
  author: string;
}

export interface UploadResource {
  title: string;
  description: string;
  category: ContentType;
  file: File;
}
