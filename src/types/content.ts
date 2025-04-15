
export type ContentType = 'concept' | 'flashcard' | 'exam' | 'syllabus' | 'practice_exam' | 'question_bank' | 'notes' | 'reference' | 'previous_papers' | 'study_material';

export interface ContentUploaderProps {
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpload: () => void;
  selectedFile: File | null;
  onFileRemove: () => void;
  uploading: boolean;
  uploadProgress: number;
}
