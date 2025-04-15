import { SubjectProgress, StudyStreak } from "@/types/user";

export const getMockProgressData = async (): Promise<{ subjects: SubjectProgress[]; studyStreak: StudyStreak }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockSubjects: SubjectProgress[] = [
        {
          id: "s1",
          name: "Mathematics",
          progress: 75,
          lastWeekProgress: 70,
          color: "#FFC107",
          topics: [
            { id: "t1", name: "Algebra", completed: true, masteryLevel: 80, lastPracticed: "2024-05-01" },
            { id: "t2", name: "Calculus", completed: false, masteryLevel: 50, lastPracticed: "2024-04-28" },
          ],
          quizScores: [
            { id: "q1", title: "Algebra Quiz", score: 85, maxScore: 100, date: "2024-05-05", timeTaken: 25 },
            { id: "q2", title: "Calculus Quiz", score: 60, maxScore: 100, date: "2024-05-03", timeTaken: 30 },
          ],
          studyHours: [
            { date: "2024-05-06", hours: 2 },
            { date: "2024-05-05", hours: 3 },
          ],
        },
        {
          id: "s2",
          name: "Physics",
          progress: 60,
          lastWeekProgress: 55,
          color: "#4CAF50",
          topics: [
            { id: "t3", name: "Mechanics", completed: true, masteryLevel: 90, lastPracticed: "2024-05-04" },
            { id: "t4", name: "Thermodynamics", completed: false, masteryLevel: 40, lastPracticed: "2024-04-30" },
          ],
          quizScores: [
            { id: "q3", title: "Mechanics Quiz", score: 90, maxScore: 100, date: "2024-05-07", timeTaken: 20 },
            { id: "q4", title: "Thermodynamics Quiz", score: 50, maxScore: 100, date: "2024-05-02", timeTaken: 35 },
          ],
          studyHours: [
            { date: "2024-05-07", hours: 1.5 },
            { date: "2024-05-06", hours: 2.5 },
          ],
        },
        {
          id: "s3",
          name: "Chemistry",
          progress: 80,
          lastWeekProgress: 75,
          color: "#2196F3",
          topics: [
            { id: "t5", name: "Organic Chemistry", completed: true, masteryLevel: 75, lastPracticed: "2024-05-02" },
            { id: "t6", name: "Inorganic Chemistry", completed: false, masteryLevel: 60, lastPracticed: "2024-05-01" },
          ],
          quizScores: [
            { id: "q5", title: "Organic Chemistry Quiz", score: 75, maxScore: 100, date: "2024-05-06", timeTaken: 28 },
            { id: "q6", title: "Inorganic Chemistry Quiz", score: 65, maxScore: 100, date: "2024-05-04", timeTaken: 32 },
          ],
          studyHours: [
            { date: "2024-05-05", hours: 3 },
            { date: "2024-05-04", hours: 2 },
          ],
        },
      ];

      const mockStudyStreak: StudyStreak = {
        current: 7,
        longest: 14,
        thisWeek: [5, 4, 6, 3, 5, 4, 7],
        lastMonth: [
          3, 2, 4, 5, 6, 7, 3, 4, 5, 6, 7, 8,
          3, 4, 5, 6, 2, 4, 5, 6, 7, 9, 3, 4,
          5, 6, 7, 2, 4, 1
        ],
      };

      resolve({ subjects: mockSubjects, studyStreak: mockStudyStreak });
    }, 500);
  });
};
