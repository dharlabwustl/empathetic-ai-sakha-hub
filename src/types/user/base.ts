
export enum UserRole {
  Student = 'student',
  Teacher = 'teacher',
  Admin = 'admin'
}

export enum MoodType {
  Happy = 'happy',
  Focused = 'focused',
  Tired = 'tired',
  Stressed = 'stressed',
  Curious = 'curious',
  Okay = 'okay',
  Overwhelmed = 'overwhelmed',
  Anxious = 'anxious',
  Motivated = 'motivated',
  Confused = 'confused'
}

export enum PersonalityType {
  Visual = 'visual',
  Auditory = 'auditory',
  ReadWrite = 'readWrite',
  Kinesthetic = 'kinesthetic',
  Logical = 'logical',
  Social = 'social',
  Solitary = 'solitary'
}

export interface UserProfileBase {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  lastActive?: Date | string;
  avatarUrl?: string;
  avatar?: string;
  streak?: number;
  studyHours?: number;
  conceptsLearned?: number;
  testsCompleted?: number;
  personality?: PersonalityType;
  mood?: MoodType;
}
