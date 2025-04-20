
interface SubjectProgress {
  id: string;
  name: string;
  progress: number;
  recentActivity: string;
  topics: {
    id: string;
    name: string;
    progress: number;
    lastStudied?: string;
  }[];
}

interface StudyStreak {
  current: number;
  longest: number;
}

// Mock data for study progress
const mockSubjects: SubjectProgress[] = [
  {
    id: '1',
    name: 'Physics',
    progress: 65,
    recentActivity: '2023-08-14T09:30:00Z',
    topics: [
      { id: 'p1', name: 'Mechanics', progress: 80, lastStudied: '2023-08-14T09:30:00Z' },
      { id: 'p2', name: 'Electromagnetism', progress: 60, lastStudied: '2023-08-12T14:15:00Z' },
      { id: 'p3', name: 'Thermodynamics', progress: 45, lastStudied: '2023-08-10T11:00:00Z' },
      { id: 'p4', name: 'Modern Physics', progress: 30, lastStudied: '2023-08-08T16:45:00Z' }
    ]
  },
  {
    id: '2',
    name: 'Chemistry',
    progress: 72,
    recentActivity: '2023-08-13T15:45:00Z',
    topics: [
      { id: 'c1', name: 'Organic Chemistry', progress: 75, lastStudied: '2023-08-13T15:45:00Z' },
      { id: 'c2', name: 'Inorganic Chemistry', progress: 70, lastStudied: '2023-08-11T10:30:00Z' },
      { id: 'c3', name: 'Physical Chemistry', progress: 65, lastStudied: '2023-08-09T13:20:00Z' },
      { id: 'c4', name: 'Analytical Chemistry', progress: 50, lastStudied: '2023-08-07T09:15:00Z' }
    ]
  },
  {
    id: '3',
    name: 'Biology',
    progress: 58,
    recentActivity: '2023-08-12T11:20:00Z',
    topics: [
      { id: 'b1', name: 'Cell Biology', progress: 85, lastStudied: '2023-08-12T11:20:00Z' },
      { id: 'b2', name: 'Human Physiology', progress: 70, lastStudied: '2023-08-10T14:30:00Z' },
      { id: 'b3', name: 'Genetics', progress: 55, lastStudied: '2023-08-08T10:15:00Z' },
      { id: 'b4', name: 'Ecology', progress: 40, lastStudied: '2023-08-06T15:45:00Z' }
    ]
  },
  {
    id: '4',
    name: 'Mathematics',
    progress: 81,
    recentActivity: '2023-08-15T10:00:00Z',
    topics: [
      { id: 'm1', name: 'Calculus', progress: 90, lastStudied: '2023-08-15T10:00:00Z' },
      { id: 'm2', name: 'Algebra', progress: 85, lastStudied: '2023-08-13T13:45:00Z' },
      { id: 'm3', name: 'Geometry', progress: 75, lastStudied: '2023-08-11T09:30:00Z' },
      { id: 'm4', name: 'Statistics', progress: 60, lastStudied: '2023-08-09T16:20:00Z' }
    ]
  }
];

const mockStreak: StudyStreak = {
  current: 7,
  longest: 14
};

const getAllSubjectsProgress = () => {
  return mockSubjects;
};

const getStudyStreak = () => {
  return mockStreak;
};

const mockProgressData = {
  getAllSubjectsProgress,
  getStudyStreak
};

export default mockProgressData;
