// Update the mock data to match the SubjectProgress type
// This is just a small section of the file to show the pattern for fixing
const mockSubjects = [
  {
    id: "math",
    name: "Mathematics",
    progress: 75,
    totalTopics: 24,
    completedTopics: 18,
    weakAreas: ["Calculus", "Vectors"],
    strongAreas: ["Algebra", "Geometry"],
    lastStudied: "2023-04-18",
    averageScore: 85,
    color: "#3b82f6",
    topics: [
      {
        id: "algebra",
        name: "Algebra",
        progress: 90,
        status: "completed",
        lastPracticed: "2023-04-16",
        score: 92,
        completed: true,
        masteryLevel: 4
      },
      {
        id: "geometry",
        name: "Geometry",
        progress: 85,
        status: "completed",
        lastPracticed: "2023-04-14",
        score: 88,
        completed: true,
        masteryLevel: 4
      },
      {
        id: "calculus",
        name: "Calculus",
        progress: 40,
        status: "in-progress",
        lastPracticed: "2023-04-10",
        score: 65,
        completed: false,
        masteryLevel: 2
      },
      {
        id: "vectors",
        name: "Vectors & Matrices",
        progress: 30,
        status: "in-progress",
        lastPracticed: "2023-04-05",
        score: 55,
        completed: false,
        masteryLevel: 2
      },
      {
        id: "statistics",
        name: "Statistics & Probability",
        progress: 20,
        status: "not-started",
        lastPracticed: "2023-04-01",
        score: 42,
        completed: false,
        masteryLevel: 1
      }
    ],
    quizzes: [
      {
        id: "q1-math",
        name: "Algebra Quiz",
        score: 90,
        date: "2023-04-12",
        timeSpent: 25,
        totalQuestions: 10,
        correctAnswers: 9
      },
      {
        id: "q2-math",
        name: "Geometry Quiz",
        score: 85,
        date: "2023-04-08",
        timeSpent: 30,
        totalQuestions: 10,
        correctAnswers: 8.5
      },
      {
        id: "q3-math",
        name: "Basic Calculus",
        score: 70,
        date: "2023-04-02",
        timeSpent: 35,
        totalQuestions: 10,
        correctAnswers: 7
      },
    ],
    quizScores: [
      {
        id: "qs1-math",
        title: "Weekly Assessment",
        score: 42,
        maxScore: 50,
        date: "2023-04-15",
        timeTaken: "25 min"
      },
      {
        id: "qs2-math",
        title: "Monthly Progress",
        score: 85,
        maxScore: 100,
        date: "2023-04-01",
        timeTaken: "60 min"
      }
    ],
    studyHours: [
      {
        date: "2023-04-12",
        hours: 2.5
      },
      {
        date: "2023-04-13",
        hours: 1.8
      },
      {
        date: "2023-04-14",
        hours: 3.2
      }
    ]
  },
  {
    id: "physics",
    name: "Physics",
    progress: 60,
    totalTopics: 20,
    completedTopics: 12,
    weakAreas: ["Electromagnetism", "Optics"],
    strongAreas: ["Mechanics", "Thermodynamics"],
    lastStudied: "2023-04-17",
    averageScore: 78,
    color: "#ef4444",
    topics: [
      {
        id: "mechanics",
        name: "Mechanics",
        progress: 95,
        status: "completed",
        lastPracticed: "2023-04-15",
        score: 95,
        completed: true,
        masteryLevel: 5
      },
      {
        id: "thermodynamics",
        name: "Thermodynamics",
        progress: 80,
        status: "completed",
        lastPracticed: "2023-04-12",
        score: 82,
        completed: true,
        masteryLevel: 4
      },
      {
        id: "electromagnetism",
        name: "Electromagnetism",
        progress: 45,
        status: "in-progress",
        lastPracticed: "2023-04-08",
        score: 60,
        completed: false,
        masteryLevel: 2
      },
      {
        id: "optics",
        name: "Optics",
        progress: 35,
        status: "in-progress",
        lastPracticed: "2023-04-05",
        score: 50,
        completed: false,
        masteryLevel: 2
      },
      {
        id: "modern-physics",
        name: "Modern Physics",
        progress: 10,
        status: "not-started",
        lastPracticed: "2023-03-28",
        score: 30,
        completed: false,
        masteryLevel: 1
      }
    ],
    quizzes: [
      {
        id: "q1-physics",
        name: "Mechanics Quiz",
        score: 95,
        date: "2023-04-14",
        timeSpent: 22,
        totalQuestions: 10,
        correctAnswers: 9.5
      },
      {
        id: "q2-physics",
        name: "Thermodynamics Quiz",
        score: 80,
        date: "2023-04-10",
        timeSpent: 28,
        totalQuestions: 10,
        correctAnswers: 8
      },
      {
        id: "q3-physics",
        name: "Basic Electromagnetism",
        score: 65,
        date: "2023-04-05",
        timeSpent: 32,
        totalQuestions: 10,
        correctAnswers: 6.5
      },
    ],
    quizScores: [
      {
        id: "qs1-physics",
        title: "Weekly Assessment",
        score: 38,
        maxScore: 50,
        date: "2023-04-15",
        timeTaken: "28 min"
      },
      {
        id: "qs2-physics",
        title: "Monthly Progress",
        score: 78,
        maxScore: 100,
        date: "2023-04-01",
        timeTaken: "65 min"
      }
    ],
    studyHours: [
      {
        date: "2023-04-12",
        hours: 1.5
      },
      {
        date: "2023-04-13",
        hours: 2.0
      },
      {
        date: "2023-04-14",
        hours: 2.5
      }
    ]
  },
  {
    id: "chemistry",
    name: "Chemistry",
    progress: 45,
    totalTopics: 18,
    completedTopics: 8,
    weakAreas: ["Organic Chemistry", "Chemical Bonding"],
    strongAreas: ["Physical Chemistry", "Periodic Table"],
    lastStudied: "2023-04-16",
    averageScore: 72,
    color: "#22c55e",
    topics: [
      {
        id: "physical-chemistry",
        name: "Physical Chemistry",
        progress: 85,
        status: "completed",
        lastPracticed: "2023-04-14",
        score: 88,
        completed: true,
        masteryLevel: 4
      },
      {
        id: "periodic-table",
        name: "Periodic Table",
        progress: 75,
        status: "completed",
        lastPracticed: "2023-04-11",
        score: 78,
        completed: true,
        masteryLevel: 3
      },
      {
        id: "organic-chemistry",
        name: "Organic Chemistry",
        progress: 30,
        status: "in-progress",
        lastPracticed: "2023-04-07",
        score: 45,
        completed: false,
        masteryLevel: 2
      },
      {
        id: "chemical-bonding",
        name: "Chemical Bonding",
        progress: 25,
        status: "in-progress",
        lastPracticed: "2023-04-04",
        score: 40,
        completed: false,
        masteryLevel: 1
      },
      {
        id: "coordination-compounds",
        name: "Coordination Compounds",
        progress: 5,
        status: "not-started",
        lastPracticed: "2023-03-25",
        score: 20,
        completed: false,
        masteryLevel: 1
      }
    ],
    quizzes: [
      {
        id: "q1-chemistry",
        name: "Physical Chemistry Quiz",
        score: 85,
        date: "2023-04-13",
        timeSpent: 26,
        totalQuestions: 10,
        correctAnswers: 8.5
      },
      {
        id: "q2-chemistry",
        name: "Periodic Table Quiz",
        score: 75,
        date: "2023-04-09",
        timeSpent: 30,
        totalQuestions: 10,
        correctAnswers: 7.5
      },
      {
        id: "q3-chemistry",
        name: "Basic Organic Chemistry",
        score: 55,
        date: "2023-04-04",
        timeSpent: 35,
        totalQuestions: 10,
        correctAnswers: 5.5
      },
    ],
    quizScores: [
      {
        id: "qs1-chemistry",
        title: "Weekly Assessment",
        score: 35,
        maxScore: 50,
        date: "2023-04-15",
        timeTaken: "30 min"
      },
      {
        id: "qs2-chemistry",
        title: "Monthly Progress",
        score: 72,
        maxScore: 100,
        date: "2023-04-01",
        timeTaken: "68 min"
      }
    ],
    studyHours: [
      {
        date: "2023-04-12",
        hours: 1.0
      },
      {
        date: "2023-04-13",
        hours: 1.5
      },
      {
        date: "2023-04-14",
        hours: 2.0
      }
    ]
  }
];

// Export the mock data
export const mockStudyStreak = {
  current: 5,
  longest: 12,
  lastStudyDate: "2023-04-18",
  weeklyData: [
    { date: "2023-04-12", minutes: 45 },
    { date: "2023-04-13", minutes: 60 },
    { date: "2023-04-14", minutes: 30 },
    { date: "2023-04-15", minutes: 0 },
    { date: "2023-04-16", minutes: 90 },
    { date: "2023-04-17", minutes: 120 },
    { date: "2023-04-18", minutes: 75 }
  ],
  monthlyData: [
    { date: "2023-03-18", minutes: 1200 },
    { date: "2023-03-25", minutes: 1400 },
    { date: "2023-04-01", minutes: 1100 },
    { date: "2023-04-08", minutes: 1600 },
    { date: "2023-04-15", minutes: 1800 }
  ],
  thisWeek: [45, 60, 30, 0, 90, 120, 75] // Array of minutes for current week
};

// Export the subjects array
export default mockSubjects;
