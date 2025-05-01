
export type UserRole = 'student' | 'admin' | 'teacher' | 'parent';

export type Proficiency = 'strong' | 'moderate' | 'weak' | 'medium';

export interface BaseUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface AdminUser extends BaseUser {
  role: 'admin';
}

export interface StudentUser extends BaseUser {
  role: 'student';
  profileCompleted?: boolean;
  grade?: string;
  school?: string;
  examTarget?: string;
  studyPreferences?: {
    preferredTime: string[];
    hoursPerDay: number;
    studyStyle: string[];
  };
  subjects?: string[];
}

export interface TeacherUser extends BaseUser {
  role: 'teacher';
  subjects: string[];
  experience: number;
  qualification: string;
  specialization?: string[];
}

export interface ParentUser extends BaseUser {
  role: 'parent';
  children: {
    id: string;
    name: string;
  }[];
}

export type User = StudentUser | AdminUser | TeacherUser | ParentUser;
