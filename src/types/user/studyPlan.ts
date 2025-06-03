
export type StudyPlanStatus = 'active' | 'completed' | 'paused' | 'draft';
export type SubjectStatus = 'not-started' | 'in-progress' | 'completed';
export type Priority = 'low' | 'medium' | 'high';
export type Proficiency = 'weak' | 'medium' | 'strong';
export type LearningPace = 'slow' | 'medium' | 'fast';
export type PreferredStudyTime = 'morning' | 'afternoon' | 'evening' | 'night';

export interface StudyPlanTopic {
  id: string;
  name: string;
  hoursAllocated: number;
  status?: SubjectStatus;
  priority?: Priority;
  difficulty?: 'easy' | 'medium' | 'hard';
  completed?: boolean;
  progressPercent?: number;
  estimatedTime?: number;
  conceptsCount?: number;
  confidenceLevel?: number;
  lastRevised?: string;
}

export interface StudyPlanSubject {
  id: string;
  name: string;
  color: string;
  hoursPerWeek: number;
  weeklyHours: number;
  progress: number;
  priority: Priority;
  proficiency: Proficiency;
  completed: boolean;
  isWeakSubject?: boolean;
  topics?: StudyPlanTopic[];
  difficulty?: 'easy' | 'medium' | 'hard';
  status?: SubjectStatus;
  confidenceLevel?: number;
}

export interface StudyPlan {
  id: string;
  name: string;
  title: string;
  description: string;
  exam: string;
  examDate: string;
  examGoal: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  status: StudyPlanStatus;
  hoursPerWeek: number;
  totalHours: number;
  progress: number;
  progressPercent: number;
  progressPercentage?: number;
  subjects: StudyPlanSubject[];
  studyHoursPerDay: number;
  preferredStudyTime: PreferredStudyTime;
  learningPace: LearningPace;
  weeklyHours?: number;
  daysLeft?: number;
  availableDaysPerWeek?: number;
  preferredSubjectsPerDay?: number;
  weekendOff?: boolean;
}

export interface NewStudyPlan {
  name: string;
  description: string;
  exam: string;
  examDate: string;
  examGoal: string;
  startDate: string;
  endDate: string;
  subjects: StudyPlanSubject[];
  hoursPerWeek?: number;
  totalHours: number;
  studyHoursPerDay: number;
  preferredStudyTime: PreferredStudyTime;
  learningPace: LearningPace;
  availableDaysPerWeek?: number;
  preferredSubjectsPerDay?: number;
  weekendOff?: boolean;
}

export interface CreditPack {
  id: string;
  name: string;
  credits: number;
  price: number;
  description: string;
  features: string[];
  bestValue?: boolean;
  isExamCredits?: boolean;
}

export type NewStudyPlanSubject = StudyPlanSubject;

export interface DailyPlanItem {
  id: string;
  date: string;
  subject: string;
  topics: string[];
  studyHours: number;
  timeOfStudy: string;
  focusLevel: 'high' | 'medium' | 'low';
  status: 'done' | 'skipped' | 'pending';
  actualTimeSpent?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface WeeklyProgress {
  week: string;
  physics: number;
  chemistry: number;
  biology: number;
  overallProgress: number;
}

export interface MockTest {
  id: string;
  name: string;
  date: string;
  syllabus: string[];
  duration: number;
  totalQuestions: number;
  score?: number;
  accuracy?: number;
  status: 'upcoming' | 'completed' | 'missed';
}

export interface AIRecommendation {
  id: string;
  type: 'focus' | 'time-allocation' | 'strategy' | 'revision';
  title: string;
  description: string;
  priority: Priority;
  actionable: boolean;
}

export interface StudyResource {
  id: string;
  title: string;
  type: 'video' | 'pdf' | 'notes' | 'practice';
  subject: string;
  topic: string;
  url?: string;
  isBookmarked?: boolean;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface DoubtEntry {
  id: string;
  subject: string;
  topic: string;
  question: string;
  status: 'open' | 'resolved';
  createdAt: string;
  resolvedAt?: string;
}
