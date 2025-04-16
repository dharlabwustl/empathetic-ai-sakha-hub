
export type ContentType = 
  | 'all' 
  | 'study_material' 
  | 'concept_card' 
  | 'flashcard' 
  | 'practice_exam' 
  | 'quiz';

export interface ContentItem {
  id: string;
  title: string;
  type: ContentType;
  subject: string;
  examGoal?: string;
  difficultyLevel?: 'beginner' | 'intermediate' | 'advanced';
  createdAt: string;
  fileSize?: string;
  fileType?: string;
  thumbnail?: string;
  tags?: string[];
}

export interface ContentUploaderProps {
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpload: () => void;
  selectedFile: File | null;
  onFileRemove: () => void;
  uploading: boolean;
  uploadProgress: number;
}

export interface ContentBrowserProps {
  contentType: ContentType;
}

export interface EmptyStateProps {
  message: string;
  icon: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

export interface FileRowProps {
  file: ContentItem;
  onSelect?: (file: ContentItem) => void;
  isSelected?: boolean;
}

export interface FilesTableProps {
  files: ContentItem[];
  selectedFiles?: ContentItem[];
  onFileSelect?: (file: ContentItem) => void;
}
