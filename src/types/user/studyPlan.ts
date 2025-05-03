
import { StudyPace } from './base';

// Subject proficiency levels
export type ProficiencyLevel = 'weak' | 'medium' | 'strong';
export type PriorityLevel = 'low' | 'medium' | 'high';

export interface StudyPlanSubject {
  id: string;
  name: string;
  proficiency: ProficiencyLevel;
  priority: PriorityLevel;
  color: string;
  hoursPerWeek: number;
  completed: boolean;
  isWeakSubject?: boolean; // Added field for tracking weak subjects
}

export interface StudyPlanTopic {
  id: string;
  name: string;
  completed: boolean;
  subjectId: string;
  scheduleDate?: Date;
  durationMinutes?: number;
}

export interface StudySession {
  id: string;
  date: Date;
  startTime: string;
  endTime?: string;
  subjectId: string;
  subjectName: string;
  topicId?: string;
  topicName?: string;
  completed: boolean;
  durationMinutes?: number;
  mood?: {
    before?: string;
    after?: string;
  };
}

// User demographics data
export interface UserDemographics {
  age?: number;
  educationLevel?: string;
  city?: string;
  examAppearingDate?: Date;
}

// Study preferences
export interface StudyPreferences {
  studyPace: 'slow' | 'moderate' | 'fast';
  dailyStudyHours?: number;
  preferredStudyTime: 'morning' | 'afternoon' | 'evening' | 'night';
  breakFrequency?: string;
  stressManagement?: string;
  studyEnvironment?: string;
  learningStyle?: 'visual' | 'auditory' | 'kinesthetic' | 'analytical' | 'creative' | 'practical';
  personalityType?: string;
  mood?: string;
}

export interface StudyPlan {
  id: string;
  title: string;
  examGoal: string;
  examDate: Date | string;
  subjects: StudyPlanSubject[];
  topics?: StudyPlanTopic[];
  sessions?: StudySession[];
  startDate?: Date | string;
  endDate?: Date | string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  status: 'active' | 'completed' | 'archived';
  progressPercent?: number;
  learningPace?: 'slow' | 'moderate' | 'fast';
  preferredStudyTime?: 'morning' | 'afternoon' | 'evening' | 'night';
  studyHoursPerDay?: number;
  weeklyHours?: number;
  // New fields
  userDemographics?: UserDemographics; // Added to store demographic information
  studyPreferences?: StudyPreferences; // Added to store study preferences
}

// Used for creating a new study plan
export type NewStudyPlan = Omit<StudyPlan, 'id' | 'createdAt' | 'updatedAt'>;
