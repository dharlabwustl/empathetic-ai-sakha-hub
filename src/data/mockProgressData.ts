
import { SubjectProgress, StudyStreak } from '@/types/user/student';

const mockSubjectsProgress: SubjectProgress[] = [
  {
    id: "physics",
    name: "Physics",
    progress: 75,
    lastWeekProgress: 70,
    color: "#3b82f6",
    topics: [
      { id: "mechanics", name: "Mechanics", completed: true, masteryLevel: 85, lastPracticed: "2025-05-10" },
      { id: "thermodynamics", name: "Thermodynamics", completed: true, masteryLevel: 78, lastPracticed: "2025-05-08" },
      { id: "waves", name: "Waves & Oscillations", completed: false, masteryLevel: 65, lastPracticed: "2025-05-05" },
      { id: "optics", name: "Optics", completed: false, masteryLevel: 60, lastPracticed: "2025-04-28" }
    ],
    quizScores: [
      { id: "quiz1", title: "Mechanics Quiz 1", score: 18, maxScore: 20, date: "2025-05-09", timeTaken: 15 },
      { id: "quiz2", title: "Thermodynamics Quiz", score: 16, maxScore: 20, date: "2025-05-06", timeTaken: 18 }
    ],
    studyHours: [
      { date: "2025-05-06", hours: 2.5 },
      { date: "2025-05-07", hours: 1.0 },
      { date: "2025-05-08", hours: 2.0 },
      { date: "2025-05-09", hours: 1.5 },
      { date: "2025-05-10", hours: 2.0 },
      { date: "2025-05-11", hours: 0.0 },
      { date: "2025-05-12", hours: 3.0 }
    ]
  },
  {
    id: "chemistry",
    name: "Chemistry",
    progress: 60,
    lastWeekProgress: 52,
    color: "#10b981",
    topics: [
      { id: "organic", name: "Organic Chemistry", completed: true, masteryLevel: 70, lastPracticed: "2025-05-11" },
      { id: "inorganic", name: "Inorganic Chemistry", completed: false, masteryLevel: 55, lastPracticed: "2025-05-07" },
      { id: "physical", name: "Physical Chemistry", completed: false, masteryLevel: 60, lastPracticed: "2025-04-30" }
    ],
    quizScores: [
      { id: "quiz3", title: "Organic Chemistry Quiz", score: 14, maxScore: 20, date: "2025-05-10", timeTaken: 20 }
    ],
    studyHours: [
      { date: "2025-05-06", hours: 1.0 },
      { date: "2025-05-07", hours: 1.5 },
      { date: "2025-05-08", hours: 0.0 },
      { date: "2025-05-09", hours: 1.0 },
      { date: "2025-05-10", hours: 2.5 },
      { date: "2025-05-11", hours: 1.0 },
      { date: "2025-05-12", hours: 1.5 }
    ]
  },
  {
    id: "mathematics",
    name: "Mathematics",
    progress: 80,
    lastWeekProgress: 75,
    color: "#f59e0b",
    topics: [
      { id: "calculus", name: "Calculus", completed: true, masteryLevel: 90, lastPracticed: "2025-05-12" },
      { id: "algebra", name: "Algebra", completed: true, masteryLevel: 85, lastPracticed: "2025-05-09" },
      { id: "statistics", name: "Statistics", completed: false, masteryLevel: 65, lastPracticed: "2025-05-04" }
    ],
    quizScores: [
      { id: "quiz4", title: "Calculus Quiz 1", score: 19, maxScore: 20, date: "2025-05-11", timeTaken: 14 },
      { id: "quiz5", title: "Algebra Quiz", score: 17, maxScore: 20, date: "2025-05-08", timeTaken: 16 }
    ],
    studyHours: [
      { date: "2025-05-06", hours: 2.0 },
      { date: "2025-05-07", hours: 1.0 },
      { date: "2025-05-08", hours: 1.5 },
      { date: "2025-05-09", hours: 2.0 },
      { date: "2025-05-10", hours: 0.0 },
      { date: "2025-05-11", hours: 2.0 },
      { date: "2025-05-12", hours: 2.5 }
    ]
  }
];

const mockStudyStreak: StudyStreak = {
  current: 5,
  longest: 12,
  thisWeek: [2, 1, 0, 3, 2, 0, 2],
  lastMonth: [
    1, 2, 0, 1, 2, 0, 2, 1, 2, 3,
    1, 0, 0, 1, 2, 2, 3, 1, 0, 2,
    1, 3, 2, 1, 2, 3, 0, 2, 1, 0
  ]
};

export const getMockProgressData = async () => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    subjects: mockSubjectsProgress,
    studyStreak: mockStudyStreak
  };
};
