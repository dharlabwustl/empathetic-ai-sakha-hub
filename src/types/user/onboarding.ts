import { UserRole, MoodType, PersonalityType, StudyPace, StudyTimePreference, StudyEnvironmentPreference, StressManagementTechnique } from './base';

export interface OnboardingData {
  role: UserRole;
  // Demographics
  age?: number;
  grade?: string;
  educationLevel?: string;
  city?: string;
  examGoal?: string; 
  examDate?: string; // Exam target date
  
  // Professional fields (for tutors, etc)
  jobTitle?: string;
  experience?: string;
  industry?: string;
  skills?: string[];
  specialization?: string;
  institution?: string;
  researchTopic?: string;
  
  // Other fields
  startupStage?: string;
  teamSize?: number;
  startupGoal?: string;
  
  // Personality and mood
  personalityType?: PersonalityType;
  mood?: MoodType;
  
  // Study preferences
  sleepSchedule?: string;
  focusHours?: number;
  stressManagement?: StressManagementTechnique | string;
  stressManagementCustom?: string;
  breakRoutine?: string;
  breakFrequency?: string;
  studyTimePreference?: StudyTimePreference;
  studyPace?: StudyPace;
  dailyStudyHours?: number;
  studyEnvironment?: StudyEnvironmentPreference;
  studyEnvironmentCustom?: string;
  
  // Subjects
  interests?: string[];
  preferredSubjects?: string[]; 
  weakSubjects?: string[];
  
  // User info
  name?: string;
  phoneNumber?: string; // Mobile number for authentication
  institute?: string; 
  password?: string; 
}
