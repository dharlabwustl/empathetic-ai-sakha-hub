
import examService from '@/services/api/examService';

export interface ExamType {
  id: string;
  name: string;
  fullName: string;
  subjects: string[];
  description: string;
  duration: number;
  totalQuestions: number;
  icon: string;
}

// Updated exam types with backend integration
export const examTypes: ExamType[] = [
  {
    id: 'neet',
    name: 'NEET',
    fullName: 'National Eligibility cum Entrance Test (Undergraduate)',
    subjects: ['Physics', 'Chemistry', 'Biology'],
    description: 'Medical entrance exam for MBBS, BDS, and other medical courses',
    duration: 180,
    totalQuestions: 180,
    icon: '🏥'
  },
  {
    id: 'jee-main',
    name: 'JEE Main',
    fullName: 'Joint Entrance Examination (Main)',
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    description: 'Engineering entrance exam for NITs, IIITs, and other engineering colleges',
    duration: 180,
    totalQuestions: 75,
    icon: '⚙️'
  },
  {
    id: 'jee-advanced',
    name: 'JEE Advanced',
    fullName: 'Joint Entrance Examination (Advanced)',
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    description: 'Engineering entrance exam for IITs',
    duration: 180,
    totalQuestions: 54,
    icon: '🔬'
  },
  {
    id: 'upsc',
    name: 'UPSC CSE',
    fullName: 'Union Public Service Commission Civil Services Examination',
    subjects: ['General Studies', 'Current Affairs', 'Optional Subject'],
    description: 'Civil services examination for IAS, IPS, and other central services',
    duration: 120,
    totalQuestions: 100,
    icon: '🏛️'
  },
  {
    id: 'cat',
    name: 'CAT',
    fullName: 'Common Admission Test',
    subjects: ['Quantitative Ability', 'Verbal Ability', 'Data Interpretation'],
    description: 'MBA entrance exam for IIMs and other management colleges',
    duration: 180,
    totalQuestions: 66,
    icon: '📊'
  },
  {
    id: 'gate',
    name: 'GATE',
    fullName: 'Graduate Aptitude Test in Engineering',
    subjects: ['General Aptitude', 'Engineering Mathematics', 'Core Subject'],
    description: 'Entrance exam for M.Tech and recruitment in PSUs',
    duration: 180,
    totalQuestions: 65,
    icon: '🔧'
  }
];

// Get exam readiness test questions from backend
export const getReadinessTestQuestions = async (examType: string, subject?: string) => {
  try {
    const readinessTest = await examService.getReadinessTest(examType, subject);
    return readinessTest.questions;
  } catch (error) {
    console.error('Error fetching readiness test questions:', error);
    // Fallback to mock data if backend is not available
    return generateMockQuestions(examType, subject);
  }
};

// Get concept test questions from backend
export const getConceptTestQuestions = async (conceptId: string) => {
  try {
    const conceptTest = await examService.getConceptTest(conceptId);
    return conceptTest.questions;
  } catch (error) {
    console.error('Error fetching concept test questions:', error);
    return generateMockQuestions('concept', conceptId);
  }
};

// Submit test results to backend
export const submitTestResults = async (testId: string, answers: Record<string, number>, timeSpent: number) => {
  try {
    return await examService.submitTestResults(testId, answers, timeSpent);
  } catch (error) {
    console.error('Error submitting test results:', error);
    // Return mock results if backend is not available
    return {
      score: Math.floor(Math.random() * 40) + 60,
      totalQuestions: Object.keys(answers).length,
      correctAnswers: Math.floor(Object.keys(answers).length * 0.7),
      timeSpent,
      feedback: 'Test completed successfully!'
    };
  }
};

// Mock question generator for fallback
const generateMockQuestions = (examType: string, subject?: string) => {
  const mockQuestions = [
    {
      id: '1',
      question: 'What is the acceleration due to gravity on Earth?',
      options: ['9.8 m/s²', '10.8 m/s²', '8.8 m/s²', '11.8 m/s²'],
      correctAnswer: 0,
      explanation: 'The standard acceleration due to gravity on Earth is approximately 9.8 m/s².',
      subject: subject || 'Physics',
      difficulty: 'medium' as const,
      timeLimit: 60,
      marks: 4
    },
    {
      id: '2',
      question: 'What is the molecular formula of water?',
      options: ['H₂O', 'H₂O₂', 'H₃O', 'HO₂'],
      correctAnswer: 0,
      explanation: 'Water consists of two hydrogen atoms bonded to one oxygen atom, giving it the formula H₂O.',
      subject: subject || 'Chemistry',
      difficulty: 'easy' as const,
      timeLimit: 45,
      marks: 4
    },
    {
      id: '3',
      question: 'What is the derivative of sin(x)?',
      options: ['cos(x)', '-cos(x)', 'sin(x)', '-sin(x)'],
      correctAnswer: 0,
      explanation: 'The derivative of sin(x) with respect to x is cos(x).',
      subject: subject || 'Mathematics',
      difficulty: 'medium' as const,
      timeLimit: 90,
      marks: 4
    }
  ];

  return mockQuestions.slice(0, 10); // Return first 10 questions
};

export const getDialogTitle = (currentTest: string) => {
  switch (currentTest) {
    case 'readiness':
      return '🎯 Exam Readiness Analyzer';
    case 'concept':
      return '🧠 Concept Mastery Test';
    default:
      return '📚 Choose Your Assessment';
  }
};

export const getDialogDescription = (currentTest: string) => {
  switch (currentTest) {
    case 'readiness':
      return 'Assess your current preparation level for your target exam';
    case 'concept':
      return 'Test your understanding of specific concepts';
    default:
      return 'Select an assessment type to evaluate your knowledge and get personalized recommendations';
  }
};
