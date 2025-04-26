
import { BaseUserProfile, UserRole, SubscriptionType } from "./base";

export interface Subject {
  id: string;
  name: string;
  progress: number;
}

export interface StudentProfile extends BaseUserProfile {
  role: UserRole.Student;
  subjects: Subject[];
  studyStreak: number;
  quizzesTaken: number;
  flashcardsCreated: number;
  examPreparation: string;
  studyHoursToday: number;
  subjectsCovered: number;
  quizPerformance: number;
  syllabusCoverage: number;
  strongSubjects: string[];
  weakSubjects: string[];
  educationLevel: string;
}

export interface TeacherProfile extends BaseUserProfile {
  role: UserRole.Teacher;
  subjects: string[];
  school?: string;
  grades: string[];
  teachingExperience: number;
  certifications?: string[];
  specializations?: string[];
}
