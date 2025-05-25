
export interface ContentUploaderProps {
  handleFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpload: () => void;
  selectedFile: File | null;
  onFileRemove: () => void;
  uploading: boolean;
  uploadProgress: number;
}

export interface ContentMetadata {
  exam: string;
  subject: string;
  topic: string;
  concept: string;
  difficulty: string;
  contentType: string;
  year?: string;
  tags: string[];
}

export type ContentType = 'upload' | 'queue' | 'studyMaterials' | 'prompts';

export interface ContentItem {
  id: string;
  title: string;
  type: string;
  status: 'pending' | 'approved' | 'rejected';
  uploadDate: string;
  metadata: ContentMetadata;
}
