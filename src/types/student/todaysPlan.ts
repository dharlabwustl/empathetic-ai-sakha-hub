
import { MoodType } from "../user/base";

export enum TaskType {
  Concept = 'concept',
  Flashcard = 'flashcard',
  PracticeExam = 'practice-exam'
}

export interface BaseTask {
  id: string;
  type: TaskType;
  subject: string;
  timeEstimate: string; // e.g. "30 min" or "1 hr"
  status: 'pending' | 'in-progress' | 'completed' | 'skipped';
  priority?: 'low' | 'medium' | 'high';
  chapter?: string;
  title?: string;
  completionPercent?: number;
}

export interface ConceptTask extends BaseTask {
  type: TaskType.Concept;
  conceptId: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface FlashcardTask extends BaseTask {
  type: TaskType.Flashcard;
  deckId: string;
  cardCount: number;
  recallAccuracy?: number;
}

export interface PracticeExamTask extends BaseTask {
  type: TaskType.PracticeExam;
  examId: string;
  questionCount: number;
  timeLimit?: string;
  lastScore?: number;
}

export interface StudyBlock {
  id: string;
  timeSlot: string;
  tasks: Array<ConceptTask | FlashcardTask | PracticeExamTask>;
}

export interface PastDayRecord {
  date: string;
  totalCompleted: number;
  totalTasks: number;
  studyTime: string;
  status?: 'completed' | 'partial' | 'missed';
  conceptsCompleted?: number;
  conceptsTotal?: number;
  flashcardsCompleted?: number;
  flashcardsTotal?: number;
  practiceCompleted?: number;
  practiceTotal?: number;
}

export interface SubjectBreakdown {
  subject: string;
  concepts: { total: number; completed: number };
  flashcards: { total: number; completed: number };
  practiceExams: { total: number; completed: number };
  timeSpent: string;
}

export interface TomorrowPreview {
  conceptCount: number;
  flashcardCount: number;
  practiceExamCount: number;
  totalTasks: number;
  estimatedTime: string;
}

export interface TodaysPlanData {
  currentBlock: StudyBlock | null;
  completedBlocks: StudyBlock[];
  upcomingBlocks: StudyBlock[];
  backlog: Array<ConceptTask | FlashcardTask | PracticeExamTask>;
  timeAllocations: { subject: string; minutes: number }[];
  tasks?: {
    concepts: ConceptTask[];
    flashcards: FlashcardTask[];
    practiceExams: PracticeExamTask[];
  };
  pastDays?: PastDayRecord[];
  subjectBreakdown?: SubjectBreakdown[];
  tomorrowPreview?: TomorrowPreview;
}
