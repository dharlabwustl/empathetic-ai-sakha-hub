
export interface ExplanationType {
  title: string;
  content: string;
}

export interface CommonMistakeType {
  mistake: string;
  correction: string;
}

export interface MicroConceptProps {
  title?: string;
  subject?: string;
  explanation?: ExplanationType[];
  example?: string;
  commonMistakes?: CommonMistakeType[];
  examRelevance?: string;
  difficulty?: "easy" | "medium" | "hard";
  id?: string;
  chapter?: string;
  estimatedTime?: number;
  content?: string;
  resourceType?: "Video" | "Text" | "PDF";
  resourceUrl?: string;
  onComplete?: (id: string) => void;
  onNeedHelp?: (id: string) => void;
  isCompleted?: boolean;
}
