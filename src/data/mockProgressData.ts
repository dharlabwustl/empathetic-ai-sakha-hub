import { UserRole } from "@/types/user";
import { SubjectProgress, StudyStreak } from "@/types/user/student";

// Mock study progress data
export const getMockProgressData = (userId: string): SubjectProgress[] => {
  return [
    {
      id: 'physics',
      name: 'Physics',
      progress: 68,
      lastWeekProgress: 59,
      color: '#4c6ef5',
      topics: [
        { id: 't1', name: 'Mechanics', completed: true, masteryLevel: 85, lastPracticed: '2025-05-09' },
        { id: 't2', name: 'Electromagnetism', completed: false, masteryLevel: 60, lastPracticed: '2025-05-07' },
        { id: 't3', name: 'Optics', completed: true, masteryLevel: 78, lastPracticed: '2025-05-08' },
        { id: 't4', name: 'Modern Physics', completed: false, masteryLevel: 45, lastPracticed: '2025-05-05' }
      ],
      quizScores: [
        { id: 'q1', title: 'Mechanics Quiz 1', score: 8, maxScore: 10, date: '2025-05-02', timeTaken: 15 },
        { id: 'q2', title: 'Electromagnetism Quiz', score: 7, maxScore: 10, date: '2025-05-05', timeTaken: 18 },
        { id: 'q3', title: 'Optics Test', score: 18, maxScore: 20, date: '2025-05-08', timeTaken: 25 }
      ],
      studyHours: [
        { date: '2025-05-06', hours: 1.5 },
        { date: '2025-05-07', hours: 2 },
        { date: '2025-05-08', hours: 1 },
        { date: '2025-05-09', hours: 2.5 },
        { date: '2025-05-10', hours: 3 },
        { date: '2025-05-11', hours: 0.5 },
        { date: '2025-05-12', hours: 1.5 }
      ]
    },
    {
      id: 'chemistry',
      name: 'Chemistry',
      progress: 52,
      lastWeekProgress: 48,
      color: '#74b9ff',
      topics: [
        { id: 't5', name: 'Organic Chemistry', completed: false, masteryLevel: 55, lastPracticed: '2025-05-04' },
        { id: 't6', name: 'Inorganic Chemistry', completed: true, masteryLevel: 70, lastPracticed: '2025-05-10' },
        { id: 't7', name: 'Physical Chemistry', completed: false, masteryLevel: 40, lastPracticed: '2025-05-02' },
        { id: 't8', name: 'Biochemistry', completed: true, masteryLevel: 65, lastPracticed: '2025-05-08' }
      ],
      quizScores: [
        { id: 'q4', title: 'Organic Chem Quiz', score: 6, maxScore: 10, date: '2025-05-03', timeTaken: 20 },
        { id: 'q5', title: 'Inorganic Test', score: 9, maxScore: 10, date: '2025-05-09', timeTaken: 22 },
        { id: 'q6', title: 'Biochem Exam', score: 15, maxScore: 20, date: '2025-05-07', timeTaken: 30 }
      ],
      studyHours: [
        { date: '2025-05-06', hours: 1 },
        { date: '2025-05-07', hours: 1.5 },
        { date: '2025-05-08', hours: 2 },
        { date: '2025-05-09', hours: 1 },
        { date: '2025-05-10', hours: 2.5 },
        { date: '2025-05-11', hours: 1 },
        { date: '2025-05-12', hours: 0.5 }
      ]
    },
    {
      id: 'mathematics',
      name: 'Mathematics',
      progress: 75,
      lastWeekProgress: 69,
      color: '#fa5252',
      topics: [
        { id: 't9', name: 'Calculus', completed: true, masteryLevel: 80, lastPracticed: '2025-05-11' },
        { id: 't10', name: 'Algebra', completed: true, masteryLevel: 75, lastPracticed: '2025-05-10' },
        { id: 't11', name: 'Geometry', completed: false, masteryLevel: 60, lastPracticed: '2025-05-05' },
        { id: 't12', name: 'Statistics', completed: false, masteryLevel: 50, lastPracticed: '2025-05-03' }
      ],
      quizScores: [
        { id: 'q7', title: 'Calculus Quiz', score: 7, maxScore: 10, date: '2025-05-10', timeTaken: 18 },
        { id: 'q8', title: 'Algebra Test', score: 8, maxScore: 10, date: '2025-05-09', timeTaken: 20 },
        { id: 'q9', title: 'Geometry Exam', score: 16, maxScore: 20, date: '2025-05-06', timeTaken: 28 }
      ],
      studyHours: [
        { date: '2025-05-06', hours: 2 },
        { date: '2025-05-07', hours: 2.5 },
        { date: '2025-05-08', hours: 1.5 },
        { date: '2025-05-09', hours: 2 },
        { date: '2025-05-10', hours: 3 },
        { date: '2025-05-11', hours: 1 },
        { date: '2025-05-12', hours: 2 }
      ]
    },
    {
      id: 'biology',
      name: 'Biology',
      progress: 40,
      lastWeekProgress: 35,
      color: '#12b886',
      topics: [
        { id: 't13', name: 'Cell Biology', completed: false, masteryLevel: 45, lastPracticed: '2025-05-01' },
        { id: 't14', name: 'Genetics', completed: false, masteryLevel: 35, lastPracticed: '2025-04-28' },
        { id: 't15', name: 'Ecology', completed: true, masteryLevel: 55, lastPracticed: '2025-05-05' },
        { id: 't16', name: 'Evolution', completed: false, masteryLevel: 30, lastPracticed: '2025-04-25' }
      ],
      quizScores: [
        { id: 'q10', title: 'Cell Biology Quiz', score: 5, maxScore: 10, date: '2025-04-30', timeTaken: 22 },
        { id: 'q11', title: 'Ecology Test', score: 7, maxScore: 10, date: '2025-05-04', timeTaken: 25 }
      ],
      studyHours: [
        { date: '2025-05-06', hours: 0.5 },
        { date: '2025-05-07', hours: 1 },
        { date: '2025-05-08', hours: 0.5 },
        { date: '2025-05-09', hours: 1.5 },
        { date: '2025-05-10', hours: 2 },
        { date: '2025-05-11', hours: 0.5 },
        { date: '2025-05-12', hours: 1 }
      ]
    }
  ];
};

export const getMockStudyStreak = (userId: string): StudyStreak => {
  return {
    current: 5,
    longest: 12,
    thisWeek: [1.5, 2, 2.5, 1, 1.5, 3, 2],
    lastMonth: [
      0, 1, 2, 0, 1.5, 2, 1, 0, 0, 1.5, 2.5, 3,
      2, 1, 1.5, 0, 2, 2.5, 1.5, 1, 2, 0, 1.5, 2,
      1.5, 2, 2.5, 1, 1.5, 3, 2
    ]
  };
};
