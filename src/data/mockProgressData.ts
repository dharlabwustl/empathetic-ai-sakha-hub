
// Create the missing mockProgressData file
import { SubjectProgress, StudyStreak } from "@/types/user/student";

export const getMockProgressData = (): { 
  subjects: SubjectProgress[];
  studyStreak: StudyStreak;
} => {
  const subjects: SubjectProgress[] = [
    {
      id: "s1",
      name: "Physics",
      progress: 75,
      lastWeekProgress: 65,
      color: "#4F46E5",
      topics: [
        { id: "t1", name: "Mechanics", completed: true, masteryLevel: 85, lastPracticed: "2025-05-10" },
        { id: "t2", name: "Thermodynamics", completed: true, masteryLevel: 78, lastPracticed: "2025-05-09" },
        { id: "t3", name: "Electromagnetism", completed: false, masteryLevel: 45, lastPracticed: "2025-05-06" }
      ],
      quizScores: [
        { id: "q1", title: "Mechanics Quiz", score: 85, maxScore: 100, date: "2025-05-08", timeTaken: 25 },
        { id: "q2", title: "Thermodynamics Quiz", score: 78, maxScore: 100, date: "2025-05-05", timeTaken: 30 }
      ],
      studyHours: [
        { date: "2025-05-06", hours: 1.5 },
        { date: "2025-05-07", hours: 2 },
        { date: "2025-05-08", hours: 1 },
        { date: "2025-05-09", hours: 1.5 },
        { date: "2025-05-10", hours: 2.5 },
        { date: "2025-05-11", hours: 0 },
        { date: "2025-05-12", hours: 1.5 }
      ]
    },
    {
      id: "s2",
      name: "Mathematics",
      progress: 80,
      lastWeekProgress: 72,
      color: "#10B981",
      topics: [
        { id: "t1", name: "Calculus", completed: true, masteryLevel: 90, lastPracticed: "2025-05-11" },
        { id: "t2", name: "Algebra", completed: true, masteryLevel: 85, lastPracticed: "2025-05-10" },
        { id: "t3", name: "Trigonometry", completed: false, masteryLevel: 65, lastPracticed: "2025-05-08" }
      ],
      quizScores: [
        { id: "q1", title: "Calculus Quiz", score: 90, maxScore: 100, date: "2025-05-09", timeTaken: 20 },
        { id: "q2", title: "Algebra Quiz", score: 85, maxScore: 100, date: "2025-05-06", timeTaken: 25 }
      ],
      studyHours: [
        { date: "2025-05-06", hours: 2 },
        { date: "2025-05-07", hours: 1.5 },
        { date: "2025-05-08", hours: 1.5 },
        { date: "2025-05-09", hours: 2 },
        { date: "2025-05-10", hours: 1.5 },
        { date: "2025-05-11", hours: 2 },
        { date: "2025-05-12", hours: 1 }
      ]
    },
    {
      id: "s3",
      name: "Chemistry",
      progress: 60,
      lastWeekProgress: 55,
      color: "#EF4444",
      topics: [
        { id: "t1", name: "Organic Chemistry", completed: false, masteryLevel: 60, lastPracticed: "2025-05-10" },
        { id: "t2", name: "Inorganic Chemistry", completed: false, masteryLevel: 55, lastPracticed: "2025-05-09" },
        { id: "t3", name: "Physical Chemistry", completed: false, masteryLevel: 50, lastPracticed: "2025-05-07" }
      ],
      quizScores: [
        { id: "q1", title: "Organic Chemistry Quiz", score: 60, maxScore: 100, date: "2025-05-08", timeTaken: 35 },
        { id: "q2", title: "Inorganic Chemistry Quiz", score: 55, maxScore: 100, date: "2025-05-04", timeTaken: 30 }
      ],
      studyHours: [
        { date: "2025-05-06", hours: 1 },
        { date: "2025-05-07", hours: 1 },
        { date: "2025-05-08", hours: 1.5 },
        { date: "2025-05-09", hours: 1 },
        { date: "2025-05-10", hours: 1.5 },
        { date: "2025-05-11", hours: 0 },
        { date: "2025-05-12", hours: 1 }
      ]
    },
    {
      id: "s4",
      name: "Biology",
      progress: 45,
      lastWeekProgress: 40,
      color: "#F59E0B",
      topics: [
        { id: "t1", name: "Cell Biology", completed: false, masteryLevel: 50, lastPracticed: "2025-05-09" },
        { id: "t2", name: "Human Physiology", completed: false, masteryLevel: 45, lastPracticed: "2025-05-08" },
        { id: "t3", name: "Genetics", completed: false, masteryLevel: 40, lastPracticed: "2025-05-06" }
      ],
      quizScores: [
        { id: "q1", title: "Cell Biology Quiz", score: 50, maxScore: 100, date: "2025-05-07", timeTaken: 40 },
        { id: "q2", title: "Human Physiology Quiz", score: 45, maxScore: 100, date: "2025-05-03", timeTaken: 35 }
      ],
      studyHours: [
        { date: "2025-05-06", hours: 1 },
        { date: "2025-05-07", hours: 0.5 },
        { date: "2025-05-08", hours: 1 },
        { date: "2025-05-09", hours: 0.5 },
        { date: "2025-05-10", hours: 0 },
        { date: "2025-05-11", hours: 1 },
        { date: "2025-05-12", hours: 0.5 }
      ]
    }
  ];

  const studyStreak: StudyStreak = {
    current: 5,
    longest: 8,
    thisWeek: [1, 2, 3, 4, 5, 0, 0], // Representing days of the week (Monday to Sunday), 0 = no study, number = hours
    lastMonth: [3, 4, 5, 5, 3, 4, 2, 0, 0, 3, 2, 4, 5, 4, 3, 2, 0, 0, 1, 3, 4, 4, 5, 3, 2, 0, 0, 3, 2, 4]
  };

  return { subjects, studyStreak };
};
