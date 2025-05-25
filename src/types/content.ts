
/**
 * Content Management System Type Definitions
 */

export interface ContentFile {
  id: string;
  name: string;
  type: ContentType;
  subject: string;
  examType: string;
  uploadDate: string;
  size: string;
  tags: string[];
  format?: ConceptCardFormat;
  generatedContent?: GeneratedContentStats;
}

export type ContentType = 'study-material' | 'syllabus' | 'practice' | 'exam-material' | 'concept-card' | 'all';

export type ConceptCardFormat = 
  | 'text-summary' 
  | 'visual-diagram' 
  | '3d-model' 
  | 'interactive-lab' 
  | 'video' 
  | 'exam-mistakes';

export interface ConceptCardFormatOption {
  id: ConceptCardFormat;
  name: string;
  description: string;
  icon: string;
  features: string[];
}

export interface GeneratedContentStats {
  textSummary?: boolean;
  visualDiagram?: boolean;
  threeDModel?: boolean;
  interactiveLab?: boolean;
  video?: boolean;
  examMistakes?: boolean;
  audioAnalysis?: boolean;
  createdAt: string;
  processingTime?: number;
}

export interface ContentOverviewStats {
  totalGenerated: number;
  byFormat: Record<ConceptCardFormat, number>;
  bySubject: Record<string, number>;
  byExam: Record<string, number>;
  recentActivity: {
    today: number;
    thisWeek: number;
    thisMonth: number;
  };
  qualityMetrics: {
    averageProcessingTime: number;
    successRate: number;
    userSatisfaction: number;
  };
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
  files: ContentFile[];
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export interface ContentManagementHookReturn {
  uploading: boolean;
  uploadProgress: number;
  selectedFile: File | null;
  uploadedFiles: ContentFile[];
  searchTerm: string;
  currentTab: ContentType;
  filteredFiles: ContentFile[];
  overviewStats: ContentOverviewStats;
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileRemove: () => void;
  handleUpload: () => void;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setCurrentTab: React.Dispatch<React.SetStateAction<ContentType>>;
}

export interface FileRowProps {
  file: ContentFile;
  onDownload: (fileName: string) => void;
  onView: (fileId: string) => void;
  onTagFile: (fileId: string) => void;
}

export interface FilesTableProps {
  files: ContentFile[];
  onDownload: (fileName: string) => void;
  onView: (fileId: string) => void;
  onTagFile: (fileId: string) => void;
}

export interface EmptyStateProps {
  searchTerm: string;
}
