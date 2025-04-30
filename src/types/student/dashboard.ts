
export interface SkillRatings {
  academic: number;
  problemSolving: number;
  timeManagement: number;
  criticalThinking: number;
  communication?: number;
  collaboration?: number;
}

export interface StudyTimeDetails {
  daily: number;
  weekly: number;
  monthly: number;
  streak: number;
}

export interface SubjectMastery {
  subject: string;
  mastery: number;
  color: string;
}

export interface StudyStreak {
  current: number;
  longest: number;
  daysThisMonth: string[];
  lastStudyDate?: string;
}

export interface SubjectProgress {
  id: string;
  name: string;
  progress: number;
  lastStudied?: string;
  color: string;
  topicsCount: {
    total: number;
    completed: number;
  };
  quizzesCount: {
    total: number;
    completed: number;
  };
  flashcardsCount: {
    total: number;
    completed: number;
  };
}
