
export enum MoodType {
  MOTIVATED = 'motivated',
  FOCUSED = 'focused',
  STRESSED = 'stressed',
  CONFIDENT = 'confident',
  OVERWHELMED = 'overwhelmed',
  EXCITED = 'excited',
  TIRED = 'tired',
  ANXIOUS = 'anxious'
}

export enum UserGoal {
  NEET = 'NEET',
  JEE = 'JEE',
  UPSC = 'UPSC',
  CAT = 'CAT',
  GATE = 'GATE'
}

export enum LearningStyle {
  VISUAL = 'visual',
  AUDITORY = 'auditory',
  KINESTHETIC = 'kinesthetic',
  READING_WRITING = 'reading_writing'
}

export enum StudyStyle {
  INTENSIVE = 'intensive',
  GRADUAL = 'gradual',
  SPACED = 'spaced',
  CRAMMING = 'cramming'
}

export interface UserProfileBase {
  id: string;
  name: string;
  firstName?: string;
  email: string;
  avatar?: string;
  photoURL?: string;
  goals?: Array<{ title: string; id: string }>;
  loginCount?: number;
  examGoal?: UserGoal;
  examDate?: string;
  learningStyle?: LearningStyle;
  studyStyle?: StudyStyle;
  currentMood?: MoodType;
  weakSubjects?: string[];
  strongSubjects?: string[];
  performanceLevel?: 'beginner' | 'intermediate' | 'advanced';
  subscription?: any;
}

export type UserProfileType = UserProfileBase;
