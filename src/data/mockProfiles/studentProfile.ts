
import { UserRole, MoodType } from '@/types/user';

export const mockStudentProfile = {
  id: "1",
  name: "Rahul Singh",
  phoneNumber: "9876543210",
  email: "rahul.singh@example.com",
  role: "student" as UserRole,
  personalityType: "Strategic Thinker",
  subscription: "Basic",
  joinDate: "2025-03-01",
  createdAt: "2025-03-01",
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
      type: "course",
      dueDate: "2025-05-30",
    },
    {
      id: "g2",
      title: "Score 90% in Math Test",
      description: "Practice integration problems",
      progress: 60,
      type: "exam",
      dueDate: "2025-05-15",
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
  mood: "Focused" as MoodType,
  syllabusCoverage: 65,
  strongSubjects: ["Physics", "Mathematics"],
  weakSubjects: ["Chemistry", "Biology"],
  completedOnboarding: true
};
