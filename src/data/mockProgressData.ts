
import { SubjectProgress, StudyStreak } from "@/types/dashboard";

export const subjectProgressData: SubjectProgress[] = [
  {
    subject: "Physics",
    completedTopics: 32,
    totalTopics: 45,
    currentStreak: 5,
    highestStreak: 12,
    averageScore: 85,
    timeSpent: 18.5,
    lastWeekProgress: 8
  },
  {
    subject: "Chemistry",
    completedTopics: 28,
    totalTopics: 50,
    currentStreak: 3,
    highestStreak: 8,
    averageScore: 78,
    timeSpent: 15.2,
    lastWeekProgress: 6
  },
  {
    subject: "Mathematics",
    completedTopics: 40,
    totalTopics: 60,
    currentStreak: 7,
    highestStreak: 15,
    averageScore: 90,
    timeSpent: 22.3,
    lastWeekProgress: 10
  },
  {
    subject: "Biology",
    completedTopics: 25,
    totalTopics: 55,
    currentStreak: 2,
    highestStreak: 9,
    averageScore: 72,
    timeSpent: 12.8,
    lastWeekProgress: 4
  }
];

export const studyStreakData: StudyStreak = {
  currentStreak: 5,
  longestStreak: 15,
  startDate: "2023-10-28",
  endDate: "2023-11-02",
  totalDaysStudied: 45,
  weeklyConsistency: 65,
  monthlyConsistency: 72,
  lastMonth: ["2023-10-02", "2023-10-05", "2023-10-06", "2023-10-08", "2023-10-10", "2023-10-11", "2023-10-15", "2023-10-18", "2023-10-20", "2023-10-22", "2023-10-24", "2023-10-26", "2023-10-28", "2023-10-29", "2023-10-30", "2023-10-31", "2023-11-01", "2023-11-02"]
};

export const getAllSubjectsProgress = () => subjectProgressData;
export const getStudyStreak = () => studyStreakData;
