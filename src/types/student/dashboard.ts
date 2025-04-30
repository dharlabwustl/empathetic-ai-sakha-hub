
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
