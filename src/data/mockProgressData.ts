
export interface SubjectProgress {
  id: string;
  name: string;
  progress: number;
  topics: TopicProgress[];
  recentActivity?: {
    date: string;
    minutesStudied: number;
    topicsCompleted: number;
  };
  timeSpent: {
    total: number; // in minutes
    byDay: { [key: string]: number }; // date: minutes
  };
}

export interface TopicProgress {
  id: string;
  name: string;
  progress: number;
  lastStudied?: string;
  timeSpent: number; // in minutes
}

export interface StudyStreak {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
  streakByDate: {
    [date: string]: {
      isActive: boolean;
      minutesStudied: number;
    }
  };
}

const getAllSubjectsProgress = (): SubjectProgress[] => {
  return [
    {
      id: "physics",
      name: "Physics",
      progress: 65,
      topics: [
        { id: "mechanics", name: "Mechanics", progress: 80, timeSpent: 320 },
        { id: "thermodynamics", name: "Thermodynamics", progress: 60, timeSpent: 240 },
        { id: "optics", name: "Optics", progress: 75, timeSpent: 180 },
        { id: "electromagnetism", name: "Electromagnetism", progress: 40, timeSpent: 120 }
      ],
      recentActivity: {
        date: new Date().toISOString(),
        minutesStudied: 45,
        topicsCompleted: 1
      },
      timeSpent: {
        total: 860,
        byDay: {
          "2023-08-01": 30,
          "2023-08-02": 45,
          "2023-08-03": 0,
          "2023-08-04": 60,
          "2023-08-05": 30,
          "2023-08-06": 50,
          "2023-08-07": 40
        }
      }
    },
    {
      id: "chemistry",
      name: "Chemistry",
      progress: 45,
      topics: [
        { id: "organic", name: "Organic Chemistry", progress: 50, timeSpent: 220 },
        { id: "inorganic", name: "Inorganic Chemistry", progress: 40, timeSpent: 180 },
        { id: "physical", name: "Physical Chemistry", progress: 45, timeSpent: 200 }
      ],
      recentActivity: {
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        minutesStudied: 30,
        topicsCompleted: 0
      },
      timeSpent: {
        total: 600,
        byDay: {
          "2023-08-01": 30,
          "2023-08-02": 0,
          "2023-08-03": 45,
          "2023-08-04": 0,
          "2023-08-05": 30,
          "2023-08-06": 20,
          "2023-08-07": 0
        }
      }
    },
    {
      id: "biology",
      name: "Biology",
      progress: 75,
      topics: [
        { id: "cell-biology", name: "Cell Biology", progress: 90, timeSpent: 280 },
        { id: "genetics", name: "Genetics", progress: 85, timeSpent: 260 },
        { id: "human-physiology", name: "Human Physiology", progress: 70, timeSpent: 320 },
        { id: "ecology", name: "Ecology", progress: 60, timeSpent: 180 }
      ],
      recentActivity: {
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        minutesStudied: 60,
        topicsCompleted: 1
      },
      timeSpent: {
        total: 1040,
        byDay: {
          "2023-08-01": 60,
          "2023-08-02": 45,
          "2023-08-03": 30,
          "2023-08-04": 60,
          "2023-08-05": 30,
          "2023-08-06": 40,
          "2023-08-07": 60
        }
      }
    },
    {
      id: "mathematics",
      name: "Mathematics",
      progress: 55,
      topics: [
        { id: "algebra", name: "Algebra", progress: 65, timeSpent: 240 },
        { id: "calculus", name: "Calculus", progress: 50, timeSpent: 280 },
        { id: "trigonometry", name: "Trigonometry", progress: 70, timeSpent: 200 },
        { id: "statistics", name: "Statistics", progress: 40, timeSpent: 160 }
      ],
      recentActivity: {
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        minutesStudied: 40,
        topicsCompleted: 0
      },
      timeSpent: {
        total: 880,
        byDay: {
          "2023-08-01": 40,
          "2023-08-02": 30,
          "2023-08-03": 45,
          "2023-08-04": 0,
          "2023-08-05": 30,
          "2023-08-06": 0,
          "2023-08-07": 30
        }
      }
    }
  ];
};

const getStudyStreak = (): StudyStreak => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  
  return {
    currentStreak: 5,
    longestStreak: 14,
    lastActiveDate: today.toISOString(),
    streakByDate: {
      [today.toISOString().split('T')[0]]: { isActive: true, minutesStudied: 45 },
      [yesterday.toISOString().split('T')[0]]: { isActive: true, minutesStudied: 60 },
      // Add more historical data here
    }
  };
};

export default { getAllSubjectsProgress, getStudyStreak };
