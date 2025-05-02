
import { UserRole } from './base';
import { MoodType, PersonalityType } from './base';

export interface OnboardingData {
  role: UserRole;
  age?: number;
  grade?: string;
  location?: string;
  examGoal?: string;
  examDate?: string; // Target exam date
  jobTitle?: string;
  experience?: string;
  industry?: string;
  skills?: string[];
  specialization?: string;
  institution?: string;
  researchTopic?: string;
  startupStage?: string;
  teamSize?: number;
  startupGoal?: string;
  personalityType?: PersonalityType;
  mood?: MoodType;
  sleepSchedule?: string;
  focusHours?: number;
  stressManagement?: string;
  breakRoutine?: string;
  studyEnvironment?: string;
  preferredStudyTime?: "morning" | "afternoon" | "evening" | "night";
  studyPace?: "aggressive" | "balanced" | "relaxed";
  dailyStudyHours?: number;
  interests?: string[];
  name?: string;
  phoneNumber?: string;
  institute?: string;
  password?: string; 
  preferredSubjects?: string[];
  weakSubjects?: string[];
  learningStyle?: "visual" | "auditory" | "reading" | "kinesthetic";
  studyGoal?: string;
  targetScore?: number;
}
