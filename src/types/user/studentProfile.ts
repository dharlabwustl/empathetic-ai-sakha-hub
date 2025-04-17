import { UserProfileType, UserRole, MoodType, SubscriptionType, PersonalityType } from './base';

export interface StudentProfile extends UserProfileType {
  educationLevel: string;
  subjects: Array<{id: string; name: string; progress: number; lastStudied?: Date}>; // Changed from string[] to match UserProfileType
  studyStreak: number;
  quizzesTaken: number;
  flashcardsCreated: number;
  examPreparation: string;
  studyHoursToday: number;
  subjectsCovered: number;
  quizPerformance: number;
  mood: MoodType;
  syllabusCoverage: number;
  strongSubjects: string[];
  weakSubjects: string[];
  age?: number;
  location?: string;
  grade?: string;
  lastActive?: string;
}

export interface SubjectProgress {
  id: string;
  name: string;
  progress: number;
  lastWeekProgress: number;
  color: string;
  topics: TopicProgress[];
  quizScores: QuizScore[];
  studyHours: StudyHoursData[];
}

export interface TopicProgress {
  id: string;
  name: string;
  completed: boolean;
  masteryLevel: number;
  lastPracticed?: string;
}

export interface QuizScore {
  id: string;
  title: string;
  score: number;
  maxScore: number;
  date: string;
  timeTaken: number;
}

export interface StudyHoursData {
  date: string;
  hours: number;
}

export interface StudyStreak {
  current: number;
  longest: number;
  thisWeek: number[];
  lastMonth: number[];
}

export const mockStudentProfile: StudentProfile = {
  id: "1",
  name: "Rahul Singh",
  phoneNumber: "9876543210",
  email: "rahul.singh@example.com",
  role: UserRole.Student,
  personalityType: PersonalityType.StrategicThinker,
  subscription: SubscriptionType.Basic,
  joinDate: "2025-03-01",
  lastActive: "2025-05-12",
  areasOfInterest: [
    { id: "i1", name: "Physics", level: "Advanced" },
    { id: "i2", name: "Mathematics", level: "Intermediate" },
    { id: "i3", name: "Chemistry", level: "Intermediate" }
  ],
  goals: [
    {
      id: "g1",
      title: "Complete Physics Syllabus",
      description: "Finish all chapters in NCERT Physics",
      progress: 75,
      dueDate: "2025-05-30",
      status: "in-progress",
    },
    {
      id: "g2",
      title: "Score 90% in Math Test",
      description: "Practice integration problems",
      progress: 60,
      dueDate: "2025-05-15",
      status: "not-started",
    },
  ],
  educationLevel: "11th Grade",
  subjects: [
    { id: "s1", name: "Physics", progress: 75 },
    { id: "s2", name: "Chemistry", progress: 60 },
    { id: "s3", name: "Mathematics", progress: 80 },
    { id: "s4", name: "Biology", progress: 45 }
  ],
  studyStreak: 5,
  quizzesTaken: 12,
  flashcardsCreated: 35,
  examPreparation: "IIT-JEE",
  studyHoursToday: 2.5,
  subjectsCovered: 3,
  quizPerformance: 82,
  mood: MoodType.Focused,
  syllabusCoverage: 65,
  strongSubjects: ["Physics", "Mathematics"],
  weakSubjects: ["Chemistry", "Biology"]
};
