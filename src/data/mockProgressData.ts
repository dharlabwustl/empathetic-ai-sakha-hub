
import { SubjectProgress, StudyStreak } from "@/types/user/student";

// Mock progress data generator
export const getMockProgressData = (userId: string): SubjectProgress[] => {
  return [
    {
      id: "sub1",
      name: "Physics",
      progress: 78,
      lastWeekProgress: 65,
      color: "#3b82f6",
      topics: [
        {
          id: "top1",
          name: "Kinematics",
          completed: true,
          masteryLevel: 85,
          lastPracticed: "2025-05-08"
        },
        {
          id: "top2",
          name: "Newton's Laws",
          completed: true,
          masteryLevel: 90,
          lastPracticed: "2025-05-10"
        },
        {
          id: "top3",
          name: "Work and Energy",
          completed: false,
          masteryLevel: 60,
          lastPracticed: "2025-05-05"
        }
      ],
      quizScores: [
        {
          id: "q1",
          title: "Mechanics Quiz 1",
          score: 18,
          maxScore: 20,
          date: "2025-05-09",
          timeTaken: 25
        },
        {
          id: "q2",
          title: "Waves and Optics",
          score: 15,
          maxScore: 20,
          date: "2025-05-02",
          timeTaken: 30
        }
      ],
      studyHours: [
        { date: "Mon", hours: 2 },
        { date: "Tue", hours: 1.5 },
        { date: "Wed", hours: 2 },
        { date: "Thu", hours: 1 },
        { date: "Fri", hours: 3 },
        { date: "Sat", hours: 2.5 },
        { date: "Sun", hours: 1 }
      ]
    },
    {
      id: "sub2",
      name: "Chemistry",
      progress: 65,
      lastWeekProgress: 58,
      color: "#10b981",
      topics: [
        {
          id: "top4",
          name: "Periodic Table",
          completed: true,
          masteryLevel: 95,
          lastPracticed: "2025-05-11"
        },
        {
          id: "top5",
          name: "Chemical Bonding",
          completed: true,
          masteryLevel: 75,
          lastPracticed: "2025-05-09"
        },
        {
          id: "top6",
          name: "Organic Chemistry",
          completed: false,
          masteryLevel: 40,
          lastPracticed: "2025-05-03"
        }
      ],
      quizScores: [
        {
          id: "q3",
          title: "Inorganic Chemistry",
          score: 14,
          maxScore: 20,
          date: "2025-05-10",
          timeTaken: 28
        },
        {
          id: "q4",
          title: "Organic Compounds",
          score: 12,
          maxScore: 20,
          date: "2025-05-04",
          timeTaken: 32
        }
      ],
      studyHours: [
        { date: "Mon", hours: 1 },
        { date: "Tue", hours: 2 },
        { date: "Wed", hours: 1 },
        { date: "Thu", hours: 1.5 },
        { date: "Fri", hours: 2 },
        { date: "Sat", hours: 1.5 },
        { date: "Sun", hours: 0.5 }
      ]
    },
    {
      id: "sub3",
      name: "Mathematics",
      progress: 82,
      lastWeekProgress: 75,
      color: "#6366f1",
      topics: [
        {
          id: "top7",
          name: "Calculus",
          completed: true,
          masteryLevel: 90,
          lastPracticed: "2025-05-12"
        },
        {
          id: "top8",
          name: "Linear Algebra",
          completed: true,
          masteryLevel: 85,
          lastPracticed: "2025-05-10"
        },
        {
          id: "top9",
          name: "Probability",
          completed: true,
          masteryLevel: 75,
          lastPracticed: "2025-05-07"
        }
      ],
      quizScores: [
        {
          id: "q5",
          title: "Integral Calculus",
          score: 19,
          maxScore: 20,
          date: "2025-05-11",
          timeTaken: 25
        },
        {
          id: "q6",
          title: "Matrices and Determinants",
          score: 16,
          maxScore: 20,
          date: "2025-05-06",
          timeTaken: 30
        }
      ],
      studyHours: [
        { date: "Mon", hours: 2.5 },
        { date: "Tue", hours: 2 },
        { date: "Wed", hours: 3 },
        { date: "Thu", hours: 2 },
        { date: "Fri", hours: 2.5 },
        { date: "Sat", hours: 3 },
        { date: "Sun", hours: 2 }
      ]
    },
    {
      id: "sub4",
      name: "Biology",
      progress: 50,
      lastWeekProgress: 40,
      color: "#ec4899",
      topics: [
        {
          id: "top10",
          name: "Cell Biology",
          completed: true,
          masteryLevel: 65,
          lastPracticed: "2025-05-09"
        },
        {
          id: "top11",
          name: "Human Physiology",
          completed: false,
          masteryLevel: 45,
          lastPracticed: "2025-05-05"
        },
        {
          id: "top12",
          name: "Genetics",
          completed: false,
          masteryLevel: 30,
          lastPracticed: "2025-05-01"
        }
      ],
      quizScores: [
        {
          id: "q7",
          title: "Cell Structure and Function",
          score: 13,
          maxScore: 20,
          date: "2025-05-08",
          timeTaken: 32
        },
        {
          id: "q8",
          title: "Circulatory System",
          score: 10,
          maxScore: 20,
          date: "2025-05-02",
          timeTaken: 28
        }
      ],
      studyHours: [
        { date: "Mon", hours: 1 },
        { date: "Tue", hours: 0.5 },
        { date: "Wed", hours: 1 },
        { date: "Thu", hours: 0.5 },
        { date: "Fri", hours: 1.5 },
        { date: "Sat", hours: 1 },
        { date: "Sun", hours: 0.5 }
      ]
    }
  ];
};

// Mock study streak data
export const getMockStudyStreak = (userId: string): StudyStreak => {
  return {
    current: 5,
    longest: 12,
    thisWeek: [1.5, 2, 3, 2.5, 4, 0, 0],
    lastMonth: [3, 4, 5, 6, 5, 2, 3, 4, 3, 5, 6, 7, 5, 4, 3, 2, 0, 1, 2, 3, 2, 1, 3, 1, 2, 3, 4, 5]
  };
};
