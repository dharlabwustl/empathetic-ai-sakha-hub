
import { StudentProfile, UserRole, MoodType } from "@/types/user";

export const mockStudentProfile: StudentProfile = {
  id: "1",
  name: "Rahul Singh",
  phoneNumber: "9876543210",
  role: "Student" as UserRole,
  personalityType: "Strategic Thinker",
  goals: [
    {
      id: "g1",
      title: "Complete Physics Syllabus",
      description: "Finish all chapters in NCERT Physics",
      progress: 75,
      dueDate: "2025-05-30",
    },
    {
      id: "g2",
      title: "Score 90% in Math Test",
      description: "Practice integration problems",
      progress: 60,
      dueDate: "2025-05-15",
    },
  ],
  areasOfInterest: [
    {
      id: "i1",
      name: "Physics",
      level: "Advanced" as const,
    },
    {
      id: "i2",
      name: "Mathematics",
      level: "Intermediate" as const,
    },
    {
      id: "i3",
      name: "Chemistry",
      level: "Intermediate" as const,
    },
  ],
  subscription: "Basic" as const,
  joinDate: "2025-03-01",
  lastActive: "2025-05-12",
  educationLevel: "11th Grade",
  subjects: ["Physics", "Chemistry", "Mathematics", "Biology"],
  examPreparation: "IIT-JEE",
  studyHoursToday: 2.5,
  subjectsCovered: 3,
  quizPerformance: 82,
  mood: "Focused" as MoodType,
  syllabusCoverage: 65,
};
