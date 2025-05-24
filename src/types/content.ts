
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

export interface ContentBrowserProps {
  onSelectContent: (content: ContentItem) => void;
  selectedType?: ContentType;
}

export interface EmptyStateProps {
  message: string;
  actionText?: string;
  onAction?: () => void;
}

export interface FilesTableProps {
  files: ContentItem[];
  onSelectFile: (file: ContentItem) => void;
}

export interface FileRowProps {
  file: ContentItem;
  onSelect: (file: ContentItem) => void;
}

export interface ContentUploaderProps {
  onUpload: (file: File) => void;
  acceptedTypes?: string[];
  maxSize?: number;
}
