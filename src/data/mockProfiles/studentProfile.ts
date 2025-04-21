
import { StudentProfile } from "@/types/user";
import { UserRole, MoodType } from "@/types/user/base";

export const mockStudentProfile: StudentProfile = {
  id: "1",
  name: "Rahul Singh",
  phoneNumber: "9876543210",
  email: "rahul.singh@example.com",
  role: UserRole.Student,
  personalityType: "Strategic Thinker",
  subscription: {
    id: "sub-student-1",
    plan: "basic",
    expiresAt: "2025-12-31",
    status: "active"
  },
  joinDate: "2025-03-01",
  lastActive: "2025-05-12",
  areasOfInterest: [
    { id: "i1", name: "Physics", level: "Advanced" },
    { id: "i2", name: "Mathematics", level: "Intermediate" },
    { id: "i3", name: "Chemistry", level: "Intermediate" }
  ],
  goals: [
    {
      id: "goal-1",
      title: "IIT-JEE Advanced",
      description: "Score above 250 in JEE Advanced",
      examDate: "May 25, 2025",
      progress: 45,
      status: "in_progress"
    },
    {
      id: "goal-2",
      title: "Complete Physics revision",
      description: "Revise all mechanics concepts",
      progress: 30,
      status: "not_started"
    }
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
  mood: "focused" as MoodType,
  syllabusCoverage: 65,
  strongSubjects: ["Physics", "Mathematics"],
  weakSubjects: ["Chemistry", "Biology"],
  studyGoals: [
    "Score 250+ in JEE Advanced",
    "Complete all Physics topics by March",
    "Improve accuracy in mock tests",
    "Master calculus problems"
  ]
};
