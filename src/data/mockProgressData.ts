
import { SubjectProgress, StudyStreak, TopicProgress, QuizScore, StudyHoursData } from '@/types/user/student';

const generateRandomHexColor = (): string => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const getMockProgressData = (): {
  subjectsProgress: SubjectProgress[],
  streak: StudyStreak,
  selectedSubject: SubjectProgress
} => {
  const subjectsProgress: SubjectProgress[] = [
    {
      id: 's1',
      name: 'Physics',
      progress: 75,
      lastWeekProgress: 65,
      color: '#4C1D95',
      topics: generateMockTopics('Physics'),
      quizScores: generateMockQuizScores('Physics'),
      studyHours: generateMockStudyHours()
    },
    {
      id: 's2',
      name: 'Chemistry',
      progress: 60,
      lastWeekProgress: 55,
      color: '#047857',
      topics: generateMockTopics('Chemistry'),
      quizScores: generateMockQuizScores('Chemistry'),
      studyHours: generateMockStudyHours()
    },
    {
      id: 's3',
      name: 'Mathematics',
      progress: 80,
      lastWeekProgress: 70,
      color: '#1E40AF',
      topics: generateMockTopics('Mathematics'),
      quizScores: generateMockQuizScores('Mathematics'),
      studyHours: generateMockStudyHours()
    },
    {
      id: 's4',
      name: 'Biology',
      progress: 45,
      lastWeekProgress: 40,
      color: '#B45309',
      topics: generateMockTopics('Biology'),
      quizScores: generateMockQuizScores('Biology'),
      studyHours: generateMockStudyHours()
    }
  ];

  const streak: StudyStreak = {
    current: 5,
    longest: 7,
    thisWeek: [1, 2, 3, 5, 7], // Days of the week (1 = Monday, 7 = Sunday)
    lastMonth: [1, 2, 3, 4, 5, 8, 9, 10, 12, 15, 18, 19, 21, 22, 25, 26, 29]
  };

  return {
    subjectsProgress,
    streak,
    selectedSubject: subjectsProgress[0]
  };
};

const generateMockTopics = (subject: string): TopicProgress[] => {
  const topics: { [key: string]: string[] } = {
    'Physics': ['Mechanics', 'Thermodynamics', 'Electromagnetism', 'Optics', 'Modern Physics'],
    'Chemistry': ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry', 'Analytical Chemistry'],
    'Mathematics': ['Algebra', 'Calculus', 'Geometry', 'Trigonometry', 'Statistics'],
    'Biology': ['Cell Biology', 'Genetics', 'Ecology', 'Human Physiology', 'Botany']
  };

  return (topics[subject] || []).map((topic, index) => ({
    id: `topic-${index}`,
    name: topic,
    completed: Math.random() > 0.5,
    masteryLevel: Math.floor(Math.random() * 5) + 1,
    lastPracticed: new Date(Date.now() - Math.floor(Math.random() * 7) * 86400000).toISOString()
  }));
};

const generateMockQuizScores = (subject: string): QuizScore[] => {
  return Array.from({ length: 5 }, (_, i) => {
    const score = Math.floor(Math.random() * 30) + 70; // Score between 70 and 100
    const maxScore = 100;
    const timeTaken = Math.floor(Math.random() * 20) + 10; // Time between 10 and 30 minutes
    const daysAgo = Math.floor(Math.random() * 30); // Within the last 30 days
    
    return {
      id: `quiz-${i}`,
      title: `${subject} Quiz ${i + 1}`,
      score,
      maxScore,
      date: new Date(Date.now() - daysAgo * 86400000).toISOString(),
      timeTaken
    };
  });
};

const generateMockStudyHours = (): StudyHoursData[] => {
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    
    return {
      date: date.toISOString().split('T')[0],
      hours: Math.random() * 4
    };
  });
};

export const mockSubjectColors: { [key: string]: string } = {
  'Physics': '#4C1D95',
  'Chemistry': '#047857',
  'Mathematics': '#1E40AF',
  'Biology': '#B45309',
  'Computer Science': '#7C3AED',
  'English': '#0369A1',
  'History': '#B91C1C',
  'Geography': '#15803D'
};
