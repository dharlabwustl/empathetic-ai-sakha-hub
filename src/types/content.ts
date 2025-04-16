
export type ContentType = 
  | 'all' 
  | 'study_material' 
  | 'concept_card' 
  | 'flashcard' 
  | 'practice_exam' 
  | 'quiz'
  | 'notes'
  | 'concept';

export interface ContentItem {
  id: string;
  title: string;
  type: ContentType;
  subject: string;
  examGoal?: string;
  difficultyLevel?: 'beginner' | 'intermediate' | 'advanced';
  createdAt: string;
  updatedAt?: string;
  fileSize?: number | string;
  fileType?: string;
  fileName?: string;
  fileUrl?: string;
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
  onSelect?: (content: ContentItem) => void;
  selectedContent?: ContentItem;
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
  onDelete?: (file: ContentItem) => void;
  onEdit?: (file: ContentItem) => void;
}

export interface FilesTableProps {
  files: ContentItem[];
  selectedFile?: ContentItem;
  onSelect?: (file: ContentItem) => void;
  onDelete?: (file: ContentItem) => void;
  onEdit?: (file: ContentItem) => void;
}
