// Types for today's plan

export type TimelineView = 'daily' | 'weekly' | 'monthly';

export type MoodType = 'happy' | 'focused' | 'tired' | 'stressed' | 'confused' | 'motivated' | 'anxious' | 'overwhelmed' | 'sad' | 'curious' | 'neutral' | 'okay' | undefined;

export interface SubjectTaskBreakdown {
  [subject: string]: {
    concepts: {
      id: string;
      title: string;
      status: string;
      timeEstimate: string;
    }[];
    flashcards: {
      id: string;
      deckName: string;
      status: string;
      timeEstimate: string;
    }[];
    practiceExams: {
      id: string;
      examName: string;
      status: string;
      timeEstimate: string;
    }[];
  };
}

export interface TimeAllocation {
  concepts: number;
  flashcards: number;
  practiceExams: number;
  revision: number;
  total: number;
}

export interface TomorrowPreview {
  totalTasks: number;
  focusArea: string;
  difficulty: 'easy' | 'moderate' | 'challenging';
}

export interface SmartExtras {
  bookmarks: {
    id: string;
    title: string;
    type: 'concept' | 'flashcard' | 'exam';
    addedOn: string;
  }[];
  notes: {
    id: string;
    content: string;
    createdAt: string;
  }[];
}

export interface TodaysPlanData {
  userName: string;
  examGoal: string;
  date: string;
  subjectBreakdown: SubjectTaskBreakdown;
  timeAllocation: TimeAllocation;
  tomorrowPreview: TomorrowPreview;
  smartExtras: SmartExtras;
  tasks: {
    concepts: any[];
    flashcards: any[];
    practiceExams: any[];
    revision: any[];
  };
}

export interface MoodTheme {
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  iconColor: string;
  gradientFrom: string;
  gradientTo: string;
  buttonColor: string;
  buttonTextColor: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    muted: string;
  };
}

export interface MoodRecommendation {
  id: string;
  title: string;
  description: string;
  actionLabel: string;
  actionPath: string;
}
