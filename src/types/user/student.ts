
import { UserProfileType, UserRole } from "./base";

export interface StudentProfile extends UserProfileType {
  role: UserRole.Student;
  studyHours?: number;
  studyPace?: string;
  preferredStudyTime?: string;
  schoolName?: string;
  grade?: string;
  parentContact?: string;
  lastExamScore?: number;
  targetExam?: string;
  examDate?: string;
  strengths?: string[];
  weaknesses?: string[];
  preferredLearningStyle?: string;
  lastActive?: string;
}
