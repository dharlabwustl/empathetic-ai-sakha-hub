import { SubjectProgress, StudyStreak } from "@/types/dashboard";

// Mock data for subject progress
export const mockSubjectProgress: SubjectProgress[] = [
  {
    subject: "Mathematics",
    completedTopics: 75,
    totalTopics: 100,
    currentStreak: 15,
    highestStreak: 30,
    averageScore: 82,
    timeSpent: 24,
  },
  {
    subject: "Physics",
    completedTopics: 60,
    totalTopics: 90,
    currentStreak: 10,
    highestStreak: 25,
    averageScore: 78,
    timeSpent: 20,
  },
  {
    subject: "Chemistry",
    completedTopics: 80,
    totalTopics: 110,
    currentStreak: 20,
    highestStreak: 40,
    averageScore: 85,
    timeSpent: 28,
  },
];

// Mock data for study streak
export const mockStudyStreak: StudyStreak = {
  currentStreak: 25,
  longestStreak: 50,
  startDate: "2023-01-01",
  endDate: "2023-12-31",
  totalDaysStudied: 300,
  weeklyConsistency: 90,
  monthlyConsistency: 85,
};
