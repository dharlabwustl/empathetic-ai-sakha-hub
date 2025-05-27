
export interface TodaysPlanData {
  streak: number;
  timeAllocation: {
    concepts: number;
    flashcards: number;
    practiceExams: number;
    total: number;
  };
  concepts: Array<{
    id: string;
    title: string;
    subject: string;
    duration: number;
    difficulty: string;
    status: 'pending' | 'completed' | 'in-progress';
  }>;
  flashcards: Array<{
    id: string;
    title: string;
    subject: string;
    duration: number;
    difficulty: string;
    status: 'pending' | 'completed' | 'in-progress';
  }>;
  practiceExams: Array<{
    id: string;
    title: string;
    subject: string;
    duration: number;
    difficulty: string;
    status: 'pending' | 'completed' | 'in-progress';
  }>;
  smartSuggestions?: Array<{
    id: string;
    title: string;
    description: string;
  }>;
  tomorrowPreview?: {
    totalTasks: number;
    concepts: number;
    flashcards: number;
    practiceExams: number;
  };
}
