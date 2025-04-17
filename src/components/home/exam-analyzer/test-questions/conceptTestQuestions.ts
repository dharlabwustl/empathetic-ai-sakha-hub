
import { TestQuestion } from '../types';
import { ExamGoal } from '@/types/user/exam';

// Subject data mapping for each exam goal
const examSubjectsMap: Record<string, string[]> = {
  'IIT JEE': ['Physics', 'Chemistry', 'Mathematics'],
  'NEET': ['Physics', 'Chemistry', 'Biology'],
  'UPSC': ['History', 'Geography', 'Polity', 'Economy', 'Environment'],
  'CLAT': ['Legal Reasoning', 'Logical Reasoning', 'English', 'Current Affairs'],
  'BANK PO': ['Quantitative Aptitude', 'Reasoning', 'English', 'General Awareness'],
  'MBA': ['Quantitative Ability', 'Verbal Ability', 'Data Interpretation', 'Logical Reasoning'],
  'CUET UG': ['Language', 'Domain Knowledge', 'General Test']
};

// Function to get available subjects for a specific exam
export const getAvailableSubjects = (examType: string): string[] => {
  return examSubjectsMap[examType] || [];
};

// Sample concept test questions for each subject
const generateConceptQuestions = (subject: string, count: number = 5, setNumber: number = 1): TestQuestion[] => {
  const baseQuestions: Record<string, TestQuestion[]> = {
    'Physics': [
      {
        id: `physics_1_${setNumber}`,
        question: 'Which principle explains why objects in motion tend to stay in motion?',
        options: ['Newton\'s First Law', 'Newton\'s Second Law', 'Newton\'s Third Law', 'Law of Conservation of Energy'],
        correctAnswer: 'Newton\'s First Law',
        explanation: 'Newton\'s First Law states that an object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force.',
        timeLimit: 30,
        type: 'multiple-choice',
        category: 'Mechanics',
        difficulty: 'medium',
        complexityLevel: 2
      },
      {
        id: `physics_2_${setNumber}`,
        question: 'What is the SI unit of electric current?',
        options: ['Volt', 'Watt', 'Ampere', 'Ohm'],
        correctAnswer: 'Ampere',
        explanation: 'The ampere is the SI base unit of electric current.',
        timeLimit: 20,
        type: 'multiple-choice',
        category: 'Electricity',
        difficulty: 'easy',
        complexityLevel: 1
      },
      // Add more physics questions as needed
    ],
    'Chemistry': [
      {
        id: `chem_1_${setNumber}`,
        question: 'What is the pH of a neutral solution?',
        options: ['0', '7', '14', 'Depends on temperature'],
        correctAnswer: '7',
        explanation: 'On the pH scale, 7 is considered neutral, below 7 is acidic, and above 7 is basic.',
        timeLimit: 25,
        type: 'multiple-choice',
        category: 'Acid-Base Chemistry',
        difficulty: 'easy',
        complexityLevel: 1
      },
      {
        id: `chem_2_${setNumber}`,
        question: 'Which orbital has the lowest energy?',
        options: ['1s', '2s', '2p', '3s'],
        correctAnswer: '1s',
        explanation: 'According to the Aufbau principle, the 1s orbital has the lowest energy level.',
        timeLimit: 30,
        type: 'multiple-choice',
        category: 'Atomic Structure',
        difficulty: 'medium',
        complexityLevel: 2
      },
      // Add more chemistry questions as needed
    ],
    'Mathematics': [
      {
        id: `math_1_${setNumber}`,
        question: 'What is the derivative of e^x?',
        options: ['e^x', 'xe^(x-1)', '0', 'e^(-x)'],
        correctAnswer: 'e^x',
        explanation: 'The derivative of e^x is e^x, which makes it a unique function in calculus.',
        timeLimit: 25,
        type: 'multiple-choice',
        category: 'Calculus',
        difficulty: 'medium',
        complexityLevel: 2
      },
      {
        id: `math_2_${setNumber}`,
        question: 'What is the value of sin(π/2)?',
        options: ['0', '1', '-1', '1/2'],
        correctAnswer: '1',
        explanation: 'sin(π/2) = 1 is one of the fundamental values in trigonometry.',
        timeLimit: 20,
        type: 'multiple-choice',
        category: 'Trigonometry',
        difficulty: 'easy',
        complexityLevel: 1
      },
      // Add more math questions as needed
    ],
    'Biology': [
      {
        id: `bio_1_${setNumber}`,
        question: 'Which organelle is known as the "powerhouse of the cell"?',
        options: ['Nucleus', 'Mitochondria', 'Golgi apparatus', 'Endoplasmic reticulum'],
        correctAnswer: 'Mitochondria',
        explanation: 'Mitochondria generate most of the cell\'s supply of ATP, used as a source of chemical energy.',
        timeLimit: 20,
        type: 'multiple-choice',
        category: 'Cell Biology',
        difficulty: 'easy',
        complexityLevel: 1
      },
      {
        id: `bio_2_${setNumber}`,
        question: 'Which of the following is not a nucleotide base found in DNA?',
        options: ['Adenine', 'Cytosine', 'Uracil', 'Guanine'],
        correctAnswer: 'Uracil',
        explanation: 'Uracil is found in RNA, while DNA contains adenine, thymine, guanine, and cytosine.',
        timeLimit: 25,
        type: 'multiple-choice',
        category: 'Molecular Biology',
        difficulty: 'medium',
        complexityLevel: 2
      },
      // Add more biology questions as needed
    ],
    // Add more subjects with their questions as needed
  };

  // Modify the base questions based on set number to create variety
  const questions = baseQuestions[subject] || [];
  
  return questions.map(q => {
    const newQuestion = { ...q };
    
    if (setNumber === 2) {
      newQuestion.question = `Level 2: ${newQuestion.question}`;
      if (newQuestion.complexityLevel) {
        newQuestion.complexityLevel = Math.min(5, (newQuestion.complexityLevel + 1));
      }
    } else if (setNumber === 3) {
      newQuestion.question = `Advanced: ${newQuestion.question}`;
      if (newQuestion.complexityLevel) {
        newQuestion.complexityLevel = Math.min(5, (newQuestion.complexityLevel + 2));
      }
      if (newQuestion.difficulty === 'easy') newQuestion.difficulty = 'medium';
      else if (newQuestion.difficulty === 'medium') newQuestion.difficulty = 'hard';
    }
    
    return newQuestion;
  });
};

// Function to get concept test questions by exam and subject
export const getConceptTestQuestionsByExam = (examType: string, subject: string, setNumber: number = 1): TestQuestion[] => {
  return generateConceptQuestions(subject, 5, setNumber);
};

// Default function to generate concept test questions (used by other parts of the app)
export const getConceptTestQuestions = (count: number = 5): TestQuestion[] => {
  return generateConceptQuestions('Mathematics', count);
};
