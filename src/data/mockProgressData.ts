
import { SubjectProgress, StudyStreak } from "@/types/user/student";

export function getMockProgressData() {
  const subjectsProgress: SubjectProgress[] = [
    {
      id: "phys101",
      name: "Physics",
      progress: 75,
      lastWeekProgress: 65,
      color: "#0ea5e9",
      topics: [
        {
          id: "t1",
          name: "Kinematics",
          completed: true,
          masteryLevel: 85,
          lastPracticed: "2025-03-15"
        },
        {
          id: "t2",
          name: "Newton's Laws",
          completed: true,
          masteryLevel: 90,
          lastPracticed: "2025-03-10"
        },
        {
          id: "t3",
          name: "Thermodynamics",
          completed: false,
          masteryLevel: 60,
          lastPracticed: "2025-03-05"
        }
      ],
      quizScores: [
        {
          id: "q1",
          title: "Motion Quiz",
          score: 85,
          maxScore: 100,
          date: "2025-03-12",
          timeTaken: 35
        },
        {
          id: "q2",
          title: "Forces Quiz",
          score: 75,
          maxScore: 100,
          date: "2025-03-08",
          timeTaken: 40
        }
      ],
      studyHours: [
        { date: "2025-03-09", hours: 1.5 },
        { date: "2025-03-10", hours: 2 },
        { date: "2025-03-11", hours: 0 },
        { date: "2025-03-12", hours: 1 },
        { date: "2025-03-13", hours: 2.5 },
        { date: "2025-03-14", hours: 0 },
        { date: "2025-03-15", hours: 1 }
      ]
    },
    {
      id: "chem101",
      name: "Chemistry",
      progress: 60,
      lastWeekProgress: 45,
      color: "#10b981",
      topics: [
        {
          id: "t4",
          name: "Atomic Structure",
          completed: true,
          masteryLevel: 80,
          lastPracticed: "2025-03-14"
        },
        {
          id: "t5",
          name: "Periodic Table",
          completed: true,
          masteryLevel: 70,
          lastPracticed: "2025-03-08"
        },
        {
          id: "t6",
          name: "Chemical Bonding",
          completed: false,
          masteryLevel: 45,
          lastPracticed: "2025-03-04"
        }
      ],
      quizScores: [
        {
          id: "q3",
          title: "Elements Quiz",
          score: 70,
          maxScore: 100,
          date: "2025-03-10",
          timeTaken: 30
        }
      ],
      studyHours: [
        { date: "2025-03-09", hours: 1 },
        { date: "2025-03-10", hours: 1 },
        { date: "2025-03-11", hours: 2 },
        { date: "2025-03-12", hours: 0 },
        { date: "2025-03-13", hours: 1.5 },
        { date: "2025-03-14", hours: 1 },
        { date: "2025-03-15", hours: 0 }
      ]
    },
    {
      id: "math101",
      name: "Mathematics",
      progress: 80,
      lastWeekProgress: 75,
      color: "#6366f1",
      topics: [
        {
          id: "t7",
          name: "Calculus",
          completed: true,
          masteryLevel: 85,
          lastPracticed: "2025-03-15"
        },
        {
          id: "t8",
          name: "Algebra",
          completed: true,
          masteryLevel: 90,
          lastPracticed: "2025-03-12"
        },
        {
          id: "t9",
          name: "Statistics",
          completed: false,
          masteryLevel: 65,
          lastPracticed: "2025-03-07"
        }
      ],
      quizScores: [
        {
          id: "q4",
          title: "Integration Quiz",
          score: 90,
          maxScore: 100,
          date: "2025-03-14",
          timeTaken: 25
        },
        {
          id: "q5",
          title: "Matrices Quiz",
          score: 85,
          maxScore: 100,
          date: "2025-03-09",
          timeTaken: 30
        }
      ],
      studyHours: [
        { date: "2025-03-09", hours: 2 },
        { date: "2025-03-10", hours: 1.5 },
        { date: "2025-03-11", hours: 1 },
        { date: "2025-03-12", hours: 2 },
        { date: "2025-03-13", hours: 0 },
        { date: "2025-03-14", hours: 1.5 },
        { date: "2025-03-15", hours: 2 }
      ]
    }
  ];
  
  const streak: StudyStreak = {
    current: 5,
    longest: 14,
    thisWeek: [3, 2, 1, 4, 2, 0, 3],
    lastMonth: Array.from({ length: 30 }, () => Math.floor(Math.random() * 5))
  };
  
  const selectedSubject = subjectsProgress[0];
  
  return {
    subjectsProgress,
    streak,
    selectedSubject
  };
}
