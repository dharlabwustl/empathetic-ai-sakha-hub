
export type ContentType = 'concept' | 'flashcard' | 'exam' | 'syllabus' | 'practice_exam' | 'question_bank' | 'notes' | 'reference' | 'previous_papers' | 'study_material' | 'all';

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
  onSelect: (content: ContentItem) => void;
  selectedContent?: ContentItem | null;
}

export interface EmptyStateProps {
  message: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

export interface FilesTableProps {
  files: ContentItem[];
  onSelect: (file: ContentItem) => void;
  onDelete?: (file: ContentItem) => void;
  onEdit?: (file: ContentItem) => void;
  selectedFile?: ContentItem | null;
}

export interface FileRowProps {
  file: ContentItem;
  isSelected: boolean;
  onSelect: (file: ContentItem) => void;
  onDelete?: (file: ContentItem) => void;
  onEdit?: (file: ContentItem) => void;
}

export interface ContentItem {
  id: string;
  title: string;
  type: ContentType;
  subject?: string;
  examGoal?: string;
  difficultyLevel?: string;
  createdAt: string;
  updatedAt: string;
  tags?: string[];
  fileUrl?: string;
  fileSize?: number;
  fileName?: string;
  thumbnailUrl?: string;
  description?: string;
}

export interface MoodTheme {
  bgClass: string;
  textClass: string;
  message: string;
  elements: React.ReactNode;
  animation: string;
  icon: React.ReactNode;
}
