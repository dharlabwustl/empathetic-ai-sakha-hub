
// Types and data for exam readiness analyzer
import { ExamType } from './types';

export const examTypes: ExamType[] = [
  { 
    id: 'neet', 
    name: 'NEET',
    description: 'National Eligibility cum Entrance Test',
    icon: '🧬',
    details: {
      pattern: '45 questions each from Physics, Chemistry, and Biology (Botany & Zoology)',
      marks: '4 marks per correct answer, -1 mark for incorrect answer',
      timePerQuestion: '1.06 minutes per question (approx.)',
      totalQuestions: 180,
      totalTime: '3 hours (180 minutes)',
      subjects: ['Physics', 'Chemistry', 'Biology']
    }
  },
  { 
    id: 'jee', 
    name: 'JEE Mains',
    description: 'Joint Entrance Examination',
    icon: '🧮',
    details: {
      pattern: 'MCQs and numerical value questions',
      marks: '4 marks per correct MCQ, -1 for incorrect',
      timePerQuestion: '1.8 minutes per question (approx.)',
      totalQuestions: 90,
      totalTime: '3 hours',
      subjects: ['Physics', 'Chemistry', 'Mathematics']
    }
  },
  { 
    id: 'upsc', 
    name: 'UPSC CSE',
    description: 'Civil Services Examination',
    icon: '📚',
    details: {
      pattern: 'Multiple stages: Prelims, Mains, and Interview',
      marks: 'Varies by section',
      totalQuestions: 'Prelims: 200',
      totalTime: 'Prelims: 4 hours',
      subjects: ['General Studies', 'CSAT', 'Optional Subjects']
    }
  }
];

export const getDialogTitle = (testType: string | null): string => {
  switch (testType) {
    case 'start':
      return 'Exam Readiness Analyzer';
    case 'readiness':
      return 'Readiness Assessment';
    case 'concept':
      return 'Concept Knowledge Test';
    case 'stress':
      return 'Stress Response Test';
    case 'results':
      return 'Your Test Results';
    default:
      return 'Exam Readiness Analyzer';
  }
};

export const getDialogDescription = (testType: string | null): string => {
  switch (testType) {
    case 'start':
      return 'Evaluate your preparation level and get personalized recommendations';
    case 'readiness':
      return 'Answer a few questions to help us assess your current preparation status';
    case 'concept':
      return 'Let\'s test your understanding of key concepts for your exam';
    case 'stress':
      return 'This test evaluates how you perform under time pressure';
    case 'results':
      return 'Based on your performance, here\'s our analysis of your exam readiness';
    default:
      return 'Select your target exam to begin the analysis';
  }
};

export const getExamDetailsForInstructions = (examId: string): string => {
  const exam = examTypes.find(e => e.id === examId);
  if (!exam) return '';
  
  return `
    Exam Pattern: ${exam.details.pattern}
    Scoring: ${exam.details.marks}
    Time: ${exam.details.timePerQuestion}
    Total Questions: ${exam.details.totalQuestions}
    Total Time: ${exam.details.totalTime}
  `;
};
