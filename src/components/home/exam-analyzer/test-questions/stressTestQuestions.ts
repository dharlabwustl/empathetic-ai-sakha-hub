
import { TestQuestion } from '../types';

// Map of exam goals to their specific stress test questions
export const stressTestQuestions: Record<string, TestQuestion[]> = {
  // Default questions used when no specific exam questions are available
  default: [
    {
      id: 'st1',
      question: 'Identify the next pattern in the sequence: 2, 4, 8, 16, ...',
      options: ['24', '32', '30', '64'],
      correctAnswer: '32',
      timeLimit: 15,
      explanation: 'Each number is doubled to get the next number in the sequence.'
    },
    {
      id: 'st2',
      question: 'Which shape continues the pattern? △ □ ○ △ □ ...',
      options: ['△', '□', '○', '⬠'],
      correctAnswer: '○',
      timeLimit: 15,
      explanation: 'The pattern repeats every 3 shapes: triangle, square, circle.'
    },
    {
      id: 'st3',
      question: 'Complete the analogy: Hand is to Glove as Foot is to...',
      options: ['Leg', 'Shoe', 'Toe', 'Sock'],
      correctAnswer: 'Shoe',
      timeLimit: 15,
      explanation: 'A glove covers a hand, and a shoe covers a foot.'
    },
    {
      id: 'st4',
      question: 'Find the odd one out: Apple, Orange, Carrot, Banana',
      options: ['Apple', 'Orange', 'Carrot', 'Banana'],
      correctAnswer: 'Carrot',
      timeLimit: 15,
      explanation: 'Carrot is a vegetable, while the others are fruits.'
    },
    {
      id: 'st5',
      question: 'If A = 1, B = 2, C = 3, what does CAB equal?',
      options: ['123', '312', '213', '321'],
      correctAnswer: '312',
      timeLimit: 15,
      explanation: 'C = 3, A = 1, B = 2, so CAB = 312'
    },
    {
      id: 'st6',
      question: 'What comes next in the sequence: A, C, E, G, ...?',
      options: ['H', 'I', 'J', 'K'],
      correctAnswer: 'I',
      timeLimit: 15,
      explanation: 'The sequence is every other letter in the alphabet.'
    },
    {
      id: 'st7',
      question: 'Solve: 17 + 23 - 15 + 8 = ?',
      options: ['31', '33', '35', '37'],
      correctAnswer: '33',
      timeLimit: 15,
      explanation: '17 + 23 = 40, 40 - 15 = 25, 25 + 8 = 33'
    },
    {
      id: 'st8',
      question: 'Which image completes the pattern?',
      imageUrl: '/lovable-uploads/pattern-test.png', // Placeholder - would need a real image
      options: ['Image A', 'Image B', 'Image C', 'Image D'],
      correctAnswer: 'Image B',
      timeLimit: 15,
      explanation: 'The pattern rotates 90° clockwise each time.'
    }
  ],
  
  // IIT-JEE specific questions
  iit: [
    {
      id: 'st-iit1',
      question: 'Solve quickly: log₁₀(100) + log₁₀(10) = ?',
      options: ['2', '3', '10', '20'],
      correctAnswer: '3',
      timeLimit: 15,
      explanation: 'log₁₀(100) = 2, log₁₀(10) = 1, 2 + 1 = 3'
    },
    {
      id: 'st-iit2',
      question: 'What is the derivative of e^x?',
      options: ['e^x', '1/x', 'e^(x-1)', '0'],
      correctAnswer: 'e^x',
      timeLimit: 15,
      explanation: 'The derivative of e^x is e^x.'
    },
    // ... more IIT questions
  ],
  
  // NEET specific questions
  neet: [
    {
      id: 'st-neet1',
      question: 'What is the normal heart rate (beats per minute) in adults?',
      options: ['40-60', '60-100', '100-140', '140-180'],
      correctAnswer: '60-100',
      timeLimit: 15,
      explanation: 'Normal resting heart rate in adults is 60-100 beats per minute.'
    },
    // ... more NEET questions
  ],
  
  // Add more exam-specific question sets as needed
};

// Function to get questions based on exam type
export const getStressTestQuestions = (examType: string): TestQuestion[] => {
  return stressTestQuestions[examType] || stressTestQuestions.default;
};
