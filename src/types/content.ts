
export enum ContentType {
  CONCEPT = 'concept',
  FLASHCARD = 'flashcard',
  EXAM = 'exam',
  VIDEO = 'video',
  STUDY_MATERIAL = 'study_material'
}

export interface ContentItem {
  id: string;
  title: string;
  type: ContentType;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  createdBy: string;
  description?: string;
}
