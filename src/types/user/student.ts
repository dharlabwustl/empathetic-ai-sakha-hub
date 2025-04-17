
import { UserBasicInfo, UserRole, MoodType } from "./base";

export interface StudentProfile extends UserBasicInfo {
  role: "student";
  grade?: string;
  subjects?: Array<string | { id: string; name: string; progress: number }>;
  goals?: any[];
  subscription?: string;
  personality?: string;
  achievements?: Array<string | { id: string; name: string; progress: number }>;
  educationLevel?: string;
  studyStreak?: number;
  quizzesTaken?: number;
  flashcardsCreated?: number;
  examPreparation?: string;
  studyHoursToday?: number;
  subjectsCovered?: number;
  quizPerformance?: number;
  mood?: MoodType;
  syllabusCoverage?: number;
  strongSubjects?: string[];
  weakSubjects?: string[];
}
