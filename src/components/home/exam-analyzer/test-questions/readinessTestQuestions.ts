
import { TestQuestion } from '../types';

// NEET-specific readiness assessment questions based on 2023-2024 NEET exam topics
const neetReadinessQuestions: TestQuestion[] = [
  {
    id: 'rt-neet1',
    question: 'How well can you answer 2023/2024 NEET questions on Molecular Biology including DNA replication, transcription, and translation?',
    options: [
      'Cannot recall basic concepts', 
      'Understand basic processes but struggle with details', 
      'Can solve moderate difficulty questions', 
      'Can solve complex molecular biology problems including mutations and regulation'
    ],
    timeLimit: 30,
    type: 'self-assessment',
    category: 'Concept Completion',
    subject: 'Biology',
    year: 2024
  },
  {
    id: 'rt-neet2',
    question: 'Rate your ability to solve numerical problems from Thermodynamics and Thermochemistry sections that appeared in 2023 NEET:',
    options: [
      'Struggle with basic equations', 
      'Can solve direct application problems', 
      'Can handle moderate calculations with multiple concepts', 
      'Can solve complex problems involving Hess\'s law and Born-Haber cycle'
    ],
    timeLimit: 30,
    type: 'self-assessment',
    category: 'Practice Performance',
    subject: 'Chemistry',
    year: 2023
  },
  {
    id: 'rt-neet3',
    question: 'How many full-length NEET mock tests based on the 2024 pattern have you completed?',
    options: [
      'None', 
      '1-3 tests', 
      '4-10 tests', 
      'More than 10 tests with thorough analysis'
    ],
    timeLimit: 30,
    type: 'self-assessment',
    category: 'Practice Performance',
    subject: 'General',
    year: 2024
  },
  {
    id: 'rt-neet4',
    question: 'How well can you solve questions on Modern Physics (including photoelectric effect and dual nature) from recent 2023-24 NEET papers?',
    options: [
      'Cannot apply basic formulas', 
      'Can solve basic numerical problems', 
      'Can solve moderate problems with multiple concepts', 
      'Can solve all complex problems including those with experimental setups'
    ],
    timeLimit: 30,
    type: 'self-assessment',
    category: 'Concept Completion',
    subject: 'Physics',
    year: 2023
  },
  {
    id: 'rt-neet5',
    question: 'Rate your preparation for Organic Chemistry reaction mechanisms as tested in the 2023-2024 NEET exams:',
    options: [
      'Cannot recall basic reactions', 
      'Know common named reactions but struggle with mechanisms', 
      'Can predict products of most reactions', 
      'Can draw complete mechanisms and predict multi-step reaction products'
    ],
    timeLimit: 30,
    type: 'self-assessment',
    category: 'Concept Completion',
    subject: 'Chemistry',
    year: 2024
  },
  {
    id: 'rt-neet6',
    question: 'How well can you answer questions on Human Physiology (including neural control, excretion, and reproduction) from the last two years of NEET?',
    options: [
      'Struggle with basic concepts', 
      'Understand organ systems but not molecular mechanisms', 
      'Can solve most standard questions', 
      'Can solve all complex physiology questions with clinical correlations'
    ],
    timeLimit: 30,
    type: 'self-assessment',
    category: 'Concept Completion',
    subject: 'Biology',
    year: 2023
  },
  {
    id: 'rt-neet7',
    question: 'How do you approach difficult Electrochemistry and Chemical Kinetics questions from 2023-2024 NEET papers?',
    options: [
      'Skip them entirely', 
      'Attempt basic problems but avoid complex calculations', 
      'Can solve most problems with standard approaches', 
      'Can solve all types including graphical interpretation and complex numerical problems'
    ],
    timeLimit: 30,
    type: 'self-assessment',
    category: 'Practice Performance',
    subject: 'Chemistry',
    year: 2024
  },
  {
    id: 'rt-neet8',
    question: 'How familiar are you with the 2024 NEET exam pattern, including new question types and weightage changes?',
    options: [
      'Not familiar with current pattern', 
      'Know basic structure but not detailed changes', 
      'Understand most aspects of the new pattern', 
      'Fully prepared with specific strategies for all sections and question types'
    ],
    timeLimit: 30,
    type: 'self-assessment',
    category: 'Test Strategy',
    subject: 'General',
    year: 2024
  },
  {
    id: 'rt-neet9',
    question: 'How effective is your revision strategy for Genetics and Biotechnology topics from recent NEET exams?',
    options: [
      'No structured revision plan', 
      'Occasional rereading of notes', 
      'Regular practice with previous years\' questions', 
      'Spaced repetition with concept mapping and regular mock tests'
    ],
    timeLimit: 30,
    type: 'self-assessment',
    category: 'Time Management',
    subject: 'Biology',
    year: 2023
  },
  {
    id: 'rt-neet10',
    question: 'Rate your confidence on Mechanics problems from the 2023 and 2024 NEET papers:',
    options: [
      'Very low confidence, many gaps', 
      'Can solve basic problems but struggle with complex ones', 
      'Can solve most problems with some difficulty', 
      'Highly confident across all types of mechanics problems'
    ],
    timeLimit: 30,
    type: 'self-assessment',
    category: 'Overall Confidence',
    subject: 'Physics',
    year: 2024
  }
];

export const getReadinessTestQuestions = (examType: string): TestQuestion[] => {
  // Since we only have NEET now, we'll always return the NEET questions
  return neetReadinessQuestions;
};
