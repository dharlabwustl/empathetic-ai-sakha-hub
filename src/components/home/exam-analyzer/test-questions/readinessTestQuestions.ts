
import { TestQuestion } from '../types';

export const readinessTestQuestions: Record<string, TestQuestion[]> = {
  default: [
    {
      id: 'rt1',
      question: 'How many hours do you study per day on average?',
      options: ['Less than 1 hour', '1-2 hours', '3-4 hours', 'More than 4 hours'],
      timeLimit: 30,
      type: 'self-assessment'
    },
    {
      id: 'rt2',
      question: 'Have you completed going through the entire syllabus at least once?',
      options: ['Not started yet', 'Less than 25% complete', '25-75% complete', 'More than 75% complete'],
      timeLimit: 30,
      type: 'self-assessment'
    },
    {
      id: 'rt3',
      question: 'How many practice tests have you taken so far?',
      options: ['None', '1-5 tests', '6-15 tests', 'More than 15 tests'],
      timeLimit: 30,
      type: 'self-assessment'
    },
    {
      id: 'rt4',
      question: 'How do you track your progress and weak areas?',
      options: ['I don\'t track systematically', 'I keep mental notes', 'I use a simple diary/spreadsheet', 'I use specialized apps/tools'],
      timeLimit: 30,
      type: 'self-assessment'
    },
    {
      id: 'rt5',
      question: 'How often do you revise previously studied topics?',
      options: ['Rarely or never', 'Only before tests', 'Weekly', 'Daily'],
      timeLimit: 30,
      type: 'self-assessment'
    },
    {
      id: 'rt6',
      question: 'How confident are you about your time management during the actual exam?',
      options: ['Not confident', 'Somewhat confident', 'Confident', 'Very confident'],
      timeLimit: 30,
      type: 'self-assessment'
    },
    {
      id: 'rt7',
      question: 'Do you have a structured study plan?',
      options: ['No plan', 'Basic outline', 'Detailed weekly plan', 'Comprehensive daily plan with goals'],
      timeLimit: 30,
      type: 'self-assessment'
    },
    {
      id: 'rt8',
      question: 'How familiar are you with the exam pattern and marking scheme?',
      options: ['Not familiar', 'Somewhat familiar', 'Familiar', 'Very familiar'],
      timeLimit: 30,
      type: 'self-assessment'
    },
    {
      id: 'rt9',
      question: 'How do you handle topics you find difficult?',
      options: ['Skip them', 'Try once and move on if difficult', 'Spend extra time but move on eventually', 'Work until mastered before moving on'],
      timeLimit: 30,
      type: 'self-assessment'
    },
    {
      id: 'rt10',
      question: 'How often do you seek help when stuck on a topic?',
      options: ['Never', 'Rarely', 'Sometimes', 'Frequently'],
      timeLimit: 30,
      type: 'self-assessment'
    },
  ],
  
  // IIT-JEE specific questions
  iit: [
    {
      id: 'rt-iit1',
      question: 'How confident are you in solving JEE Advanced level problems in Physics?',
      options: ['Not confident', 'Somewhat confident', 'Confident', 'Very confident'],
      timeLimit: 30,
      type: 'self-assessment'
    },
    {
      id: 'rt-iit2',
      question: 'Have you practiced previous years\' JEE papers?',
      options: ['None', '1-5 papers', '6-15 papers', 'More than 15 papers'],
      timeLimit: 30,
      type: 'self-assessment'
    },
    // ... more IIT questions
  ],
  
  // NEET specific questions
  neet: [
    {
      id: 'rt-neet1',
      question: 'How familiar are you with NCERT Biology concepts?',
      options: ['Not familiar', 'Somewhat familiar', 'Familiar', 'Very familiar'],
      timeLimit: 30,
      type: 'self-assessment'
    },
    // ... more NEET questions
  ],
  
  // Add more exam-specific question sets as needed
};

export const getReadinessTestQuestions = (examType: string): TestQuestion[] => {
  return readinessTestQuestions[examType] || readinessTestQuestions.default;
};
