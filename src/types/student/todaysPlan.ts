
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
      }>;
      flashcards?: Array<{
        id: string;
        title: string;
        status: string;
        timeEstimate: number;
      }>;
      practiceExams?: Array<{
        id: string;
        title: string;
        status: string;
        timeEstimate: number;
      }>;
    }
  };
  pastDays?: Array<{
    date: string;
    status?: string;
    completedTasks?: number;
    totalTasks?: number;
  }>;
  tasks?: Array<{
    id: string;
    title: string;
    subject: string;
    type: 'concept' | 'flashcard' | 'practice-exam';
    status: string;
    timeEstimate: number;
  }>;
}

export type TimelineView = 'daily' | 'weekly' | 'monthly';
export type SubjectTaskBreakdown = TodaysPlanData['subjectBreakdown'];
