
import { TestQuestion } from '../types';

// NEET-specific readiness assessment questions following NTA standards
const neetReadinessQuestions: TestQuestion[] = [
  {
    id: 'rt-neet1',
    question: 'How thoroughly have you studied NCERT Biology textbooks (Class 11 & 12)?',
    options: [
      'Not started yet', 
      'Completed less than 50% of chapters', 
      'Completed once but need revision', 
      'Multiple revisions with practice questions completed'
    ],
    timeLimit: 30,
    type: 'self-assessment',
    category: 'Concept Completion',
    subject: 'Biology',
  },
  {
    id: 'rt-neet2',
    question: 'How well can you solve numerical problems in Physics section (mechanics, thermodynamics, etc.)?',
    options: [
      'Struggle with basic formulas', 
      'Can solve direct application problems', 
      'Can solve moderate complexity problems', 
      'Can solve complex multi-concept problems'
    ],
    timeLimit: 30,
    type: 'self-assessment',
    category: 'Practice Performance',
    subject: 'Physics',
  },
  {
    id: 'rt-neet3',
    question: 'How many full-length NEET mock tests have you completed so far?',
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
  },
  {
    id: 'rt-neet4',
    question: 'How consistent is your daily study schedule for NEET preparation?',
    options: [
      'Irregular/occasional study sessions', 
      '2-3 hours on most days', 
      '4-6 hours daily with breaks', 
      '6+ hours daily with structured time blocks per subject'
    ],
    timeLimit: 30,
    type: 'self-assessment',
    category: 'Time Management',
    subject: 'General',
  },
  {
    id: 'rt-neet5',
    question: 'How comfortable are you with organic reaction mechanisms in Chemistry?',
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
  },
  {
    id: 'rt-neet6',
    question: 'How well can you recall and apply Human Physiology concepts?',
    options: [
      'Struggle with basic structures', 
      'Know major organs but not detailed functions', 
      'Understand systems with some molecular details', 
      'Can explain integrated functions and pathophysiology'
    ],
    timeLimit: 30,
    type: 'self-assessment',
    category: 'Concept Completion',
    subject: 'Biology',
  },
  {
    id: 'rt-neet7',
    question: 'How do you approach difficult Physics concepts like Optics or Electrodynamics?',
    options: [
      'Skip them entirely', 
      'Read theory but avoid numerical problems', 
      'Practice until basic understanding is achieved', 
      'Master with conceptual clarity and varied problem-solving'
    ],
    timeLimit: 30,
    type: 'self-assessment',
    category: 'Time Management',
    subject: 'Physics',
  },
  {
    id: 'rt-neet8',
    question: 'How familiar are you with the latest NEET exam pattern, marking scheme, and negative marking?',
    options: [
      'Not familiar with current pattern', 
      'Know basic structure but not details', 
      'Understand all aspects of the exam pattern', 
      'Fully prepared with exam strategy tailored to current pattern'
    ],
    timeLimit: 30,
    type: 'self-assessment',
    category: 'Practice Performance',
    subject: 'General',
  },
  {
    id: 'rt-neet9',
    question: 'How effective is your method for revising previously studied Biology topics?',
    options: [
      'No structured revision plan', 
      'Occasional rereading of notes', 
      'Regular revision with flashcards/diagrams', 
      'Spaced repetition system with active recall testing'
    ],
    timeLimit: 30,
    type: 'self-assessment',
    category: 'Time Management',
    subject: 'Biology',
  },
  {
    id: 'rt-neet10',
    question: 'How confident do you feel about the Inorganic Chemistry portion of NEET?',
    options: [
      'Very low confidence, many gaps', 
      'Moderate confidence in basic concepts', 
      'Good grasp of most topics with few weak areas', 
      'Highly confident across all periodic trends and properties'
    ],
    timeLimit: 30,
    type: 'self-assessment',
    category: 'Overall Confidence',
    subject: 'Chemistry',
  }
];

export const getReadinessTestQuestions = (examType: string): TestQuestion[] => {
  // Since we only have NEET now, we'll always return the NEET questions
  return neetReadinessQuestions;
};
