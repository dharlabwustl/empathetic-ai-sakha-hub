
export interface ExamType {
  id: string;
  name: string;
  description: string;
  duration: number;
  questionCount: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export const examTypes: ExamType[] = [
  {
    id: 'neet',
    name: 'NEET',
    description: 'National Eligibility cum Entrance Test for medical courses',
    duration: 180,
    questionCount: 180,
    difficulty: 'Hard'
  },
  {
    id: 'jee-main',
    name: 'JEE Main',
    description: 'Joint Entrance Examination for engineering courses',
    duration: 180,
    questionCount: 90,
    difficulty: 'Hard'
  },
  {
    id: 'jee-advanced',
    name: 'JEE Advanced',
    description: 'Advanced level exam for IITs',
    duration: 180,
    questionCount: 54,
    difficulty: 'Hard'
  }
];

export const getDialogTitle = (currentTest: string | null) => {
  switch (currentTest) {
    case 'readiness':
      return 'Exam Readiness Analyzer';
    case 'scholar':
      return 'Scholar Test - Get 1 Month Free!';
    case 'concept':
      return 'Concept Understanding Test';
    default:
      return 'Choose Your Assessment';
  }
};

export const getDialogDescription = (currentTest: string | null) => {
  switch (currentTest) {
    case 'readiness':
      return 'Discover your preparation level and get personalized study recommendations';
    case 'scholar':
      return 'Score above 90% and unlock 1 month of free premium access to our platform!';
    case 'concept':
      return 'Test your understanding of key concepts across subjects';
    default:
      return 'Select an assessment type to begin your personalized learning journey';
  }
};
