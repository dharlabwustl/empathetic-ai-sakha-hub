
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

export interface ContentFile {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: string;
  status: 'uploaded' | 'processing' | 'ready';
}

export interface ContentBrowserProps {
  onUpload: () => void;
  onCreateContent: () => void;
}

export interface EmptyStateProps {
  title: string;
  description: string;
  onAction: () => void;
  actionLabel: string;
}

export interface FilesTableProps {
  files: ContentFile[];
  onEdit: (file: ContentFile) => void;
  onDelete: (file: ContentFile) => void;
}

export interface FileRowProps {
  file: ContentFile;
  onEdit: (file: ContentFile) => void;
  onDelete: (file: ContentFile) => void;
}
