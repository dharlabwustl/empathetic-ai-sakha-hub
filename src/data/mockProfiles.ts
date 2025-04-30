
import { UserProfileBase, MoodType } from "@/types/user/base";

export function getMockProfileByRole(role: string): UserProfileBase {
  switch (role.toLowerCase()) {
    case 'student':
      return generateStudentProfile();
    case 'teacher':
      return generateTeacherProfile();
    case 'parent':
      return generateParentProfile();
    case 'admin':
      return generateAdminProfile();
    default:
      return generateStudentProfile();
  }
}

function generateStudentProfile(): UserProfileBase {
  return {
    id: "student-1",
    name: "Aarav Singh",
    email: "aarav@sakha.ai",
    role: "student",
    avatar: "/avatars/student.png",
    goals: [
      {
        id: "g1",
        title: "IIT-JEE",
        progress: 65,
        description: "Score 95+ percentile in JEE Main"
      }
    ],
    interests: ["Physics", "Mathematics", "Computer Science"],
    streak: 7,
    loginCount: 15,
    lastLogin: new Date(Date.now() - 86400000).toISOString(),
    examPrep: "IIT-JEE",
    mood: MoodType.Motivated,
    personalityType: "Analytical Thinker",
    studyHabits: {
      preferredTime: "morning",
      focusDuration: 45,
      breakDuration: 10
    }
  };
}

function generateTeacherProfile(): UserProfileBase {
  return {
    id: "teacher-1",
    name: "Priya Sharma",
    email: "priya@sakha.ai",
    role: "teacher",
    avatar: "/avatars/teacher.png",
    specialization: ["Physics", "Mathematics"],
    interests: ["Education Technology", "Active Learning", "STEM"],
    loginCount: 8,
    lastLogin: new Date(Date.now() - 172800000).toISOString(),
    mood: MoodType.Focused,
    personalityType: "Guide & Mentor",
    classesCount: 4,
    studentsCount: 120
  };
}

function generateParentProfile(): UserProfileBase {
  return {
    id: "parent-1",
    name: "Rajesh Gupta",
    email: "rajesh@sakha.ai",
    role: "parent",
    avatar: "/avatars/parent.png",
    children: [
      {
        id: "student-7",
        name: "Anika Gupta",
        grade: "11th",
        examPrep: "NEET"
      }
    ],
    loginCount: 4,
    lastLogin: new Date(Date.now() - 259200000).toISOString(),
    mood: MoodType.Curious,
    interests: ["Child Development", "Education"]
  };
}

function generateAdminProfile(): UserProfileBase {
  return {
    id: "admin-1",
    name: "Vikram Malhotra",
    email: "vikram@sakha.ai",
    role: "admin",
    avatar: "/avatars/admin.png",
    loginCount: 22,
    lastLogin: new Date(Date.now() - 43200000).toISOString(),
    permissions: ["full-access"],
    mood: MoodType.Focused
  };
}
