
import { UserRole, MoodType, PersonalityType } from './base';

export interface OnboardingData {
  role: UserRole;
  age?: number;
  grade?: string;
  location?: string;
  city?: string;
  educationLevel?: string;
  institute?: string; // Added institute field
  examGoal?: string;
  examAppearingDate?: Date; // Added field for exam appearing date
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
  learningStyle?: 'visual' | 'auditory' | 'kinesthetic' | 'analytical' | 'creative' | 'practical'; // Added learning styles
  mood?: MoodType;
  sleepSchedule?: string;
  focusHours?: number;
  stressManagement?: string;
  breakRoutine?: string;
  breakFrequency?: string; // Added break frequency
  studyEnvironment?: string; // Added study environment preference
  studyPace?: 'slow' | 'moderate' | 'fast'; // Study pace preference
  dailyStudyHours?: number; // Daily study hours target
  preferredStudyTime?: 'morning' | 'afternoon' | 'evening' | 'night'; // Added preferred study time
  interests?: string[];
  weakSubjects?: string[]; // Track specifically weak subjects
  name?: string;
  phoneNumber?: string;
  mobileNumber?: string; // Added mobile number for authentication
  institute?: string;
  password?: string;
  preferredSubjects?: string[];
}
