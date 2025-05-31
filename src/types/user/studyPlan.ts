
import { z } from "zod";

export const studyPlanSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  exam: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  subjects: z.array(z.string()),
  hoursPerWeek: z.number(),
  totalHours: z.number(),
  completedHours: z.number(),
  progress: z.number(),
  userId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type StudyPlanType = z.infer<typeof studyPlanSchema>;

export type LearningPace = 'slow' | 'medium' | 'fast';
export type PreferredStudyTime = 'morning' | 'afternoon' | 'evening';
export type StudyPlanStatus = 'active' | 'completed' | 'paused';
export type SubjectStatus = 'completed' | 'in-progress' | 'not-started';

export interface StudyPlanSubject {
  id: string;
  name: string;
  color: string;
  weeklyHours: number;
  progress: number;
  hoursPerWeek?: number;
  priority?: 'high' | 'medium' | 'low';
  proficiency?: 'strong' | 'medium' | 'weak';
  completed?: boolean;
  status?: SubjectStatus;
  topics?: string[];
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface StudyPlanEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  resourceId: string;
  extendedProps: {
    subject: string;
    topic: string;
    type: 'study' | 'practice' | 'exam';
    description: string;
  };
}

export interface AcademicGoal {
  id: string;
  title: string;
  description: string;
  exam: string;
  targetScore: number;
  currentScore: number;
  startDate: string;
  endDate: string;
  progress: number;
  status: 'active' | 'completed' | 'paused';
  userId: string;
}

export interface StudyPlan {
  id: string;
  name: string;
  description: string;
  exam: string;
  startDate: string;
  endDate: string;
  subjects: StudyPlanSubject[];
  hoursPerWeek: number;
  totalHours: number;
  completedHours: number;
  progress: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
  progressPercent?: number;
  progressPercentage?: number;
  status?: StudyPlanStatus;
  examGoal?: string;
  examDate?: string;
  daysLeft?: number;
  studyHoursPerDay?: number;
  weeklyHours?: number;
  title?: string;
  learningPace?: LearningPace;
  preferredStudyTime?: PreferredStudyTime;
}

export interface NewStudyPlan {
  name: string;
  description: string;
  exam: string;
  startDate: string;
  endDate: string;
  subjects: StudyPlanSubject[];
  hoursPerWeek: number;
  totalHours: number;
  completedHours: number;
  progress: number;
  userId: string;
  examDate?: string;
  examGoal?: string;
  studyHoursPerDay?: number;
  learningPace?: LearningPace;
  preferredStudyTime?: PreferredStudyTime;
}
