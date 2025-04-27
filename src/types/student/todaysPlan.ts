
export type MoodType = 'sad' | 'neutral' | 'happy' | 'motivated' | 'anxious' | 'stressed' | 'tired' | 'focused' | 'overwhelmed' | 'curious' | 'okay';

export interface TodaysPlanData {
  userName?: string;
  examGoal?: string;
  subjectBreakdown?: {
    [subject: string]: {
      concepts?: Array<{
        id: string;
        title: string;
        status: string;
        timeEstimate: number;
        cardCount?: number;
        questionCount?: number;
      }>;
      flashcards?: Array<{
        id: string;
        title: string;
        status: string;
        timeEstimate: number;
        cardCount?: number;
      }>;
      practiceExams?: Array<{
        id: string;
        title: string;
        status: string;
        timeEstimate: number;
        questionCount?: number;
      }>;
    }
  };
  pastDays?: Array<{
    date: string;
    status?: string;
    completedTasks?: number;
    totalTasks?: number;
    conceptsCompleted?: number;
    conceptsTotal?: number;
    flashcardsCompleted?: number;
    flashcardsTotal?: number;
    practiceCompleted?: number;
    practiceTotal?: number;
    mood?: MoodType;
  }>;
  tasks?: Array<{
    id: string;
    title: string;
    subject: string;
    type: 'concept' | 'flashcard' | 'practice-exam';
    status: string;
    timeEstimate: number;
  }>;
  timeAllocation?: {
    conceptCards: number;
    flashcards: number;
    practiceTests: number;
    total: number;
  };
  tomorrowPreview?: {
    concepts: number;
    flashcards: number;
    practiceExams: number;
  };
  smartExtras?: {
    bookmarks: string[];
    notes: {
      id: string;
      date: string;
      content: string;
    }[];
  };
}

export type PastDayRecord = TodaysPlanData['pastDays'][0];
export type TimelineView = 'daily' | 'weekly' | 'monthly';
export type SubjectTaskBreakdown = TodaysPlanData['subjectBreakdown'];
