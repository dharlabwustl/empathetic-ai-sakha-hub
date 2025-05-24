
export enum MoodType {
  Happy = 'happy',
  Motivated = 'motivated',
  Focused = 'focused',
  Tired = 'tired',
  Stressed = 'stressed',
  Confused = 'confused',
  Anxious = 'anxious',
  Neutral = 'neutral',
  Okay = 'okay',
  Overwhelmed = 'overwhelmed',
  Curious = 'curious',
  Sad = 'sad',
  Calm = 'calm'
}

export interface UserProfileBase {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin' | 'parent';
  avatar?: string;
  loginCount?: number;
  studyStreak?: number;
  subscription?: string | { planType: string };
  mood?: MoodType;
  createdAt?: string;
  lastLogin?: string;
}

export interface SubjectProgress {
  subject: string;
  progress: number;
  totalTopics: number;
  completedTopics: number;
}

export interface StudyStreak {
  current: number;
  longest: number;
  lastStudyDate: string;
}
