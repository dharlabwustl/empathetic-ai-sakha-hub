
import { TestQuestion, SubjectTopic } from '../types';

export const conceptTestQuestions: Record<string, Record<string, TestQuestion[]>> = {
  default: {
    "Mathematics": [
      {
        id: 'ct-math1',
        question: 'If f(x) = 3x² + 2x - 5, what is f\'(x)?',
        options: ['6x + 2', '3x + 2', '6x', '6x - 2'],
        correctAnswer: '6x + 2',
        timeLimit: 60,
        explanation: 'The derivative of ax² is 2ax, so for 3x² we get 6x. The derivative of 2x is 2. The derivative of -5 is 0. So f\'(x) = 6x + 2.'
      },
      {
        id: 'ct-math2',
        question: 'What is the integral of 2x with respect to x?',
        options: ['x² + C', 'x² - C', 'x² - x + C', 'x + C'],
        correctAnswer: 'x² + C',
        timeLimit: 60,
        explanation: 'The integral of ax is (a/2)x² + C, so for 2x we get x² + C.'
      },
      {
        id: 'ct-math3',
        question: 'Solve the equation: 3x - 7 = 8',
        options: ['x = 5', 'x = 15/3', 'x = 3', 'x = 1'],
        correctAnswer: 'x = 5',
        timeLimit: 60,
        explanation: '3x - 7 = 8, 3x = 15, x = 5'
      },
      {
        id: 'ct-math4',
        question: 'What is the value of sin(30°)?',
        options: ['1/4', '1/2', '√3/2', '√2/2'],
        correctAnswer: '1/2',
        timeLimit: 60,
        explanation: 'sin(30°) = 1/2 is a standard trigonometric value.'
      },
      {
        id: 'ct-math5',
        question: 'What is the area of a circle with radius 5 units?',
        options: ['25π square units', '10π square units', '5π square units', '20π square units'],
        correctAnswer: '25π square units',
        timeLimit: 60,
        explanation: 'Area of a circle = πr², where r is the radius. So for r = 5, Area = π × 5² = 25π square units.'
      },
    ],
    "Physics": [
      {
        id: 'ct-phys1',
        question: 'What is the SI unit of force?',
        options: ['Watt', 'Newton', 'Joule', 'Pascal'],
        correctAnswer: 'Newton',
        timeLimit: 60,
        explanation: 'The SI unit of force is the Newton (N).'
      },
      // ... more physics questions
    ],
    "Chemistry": [
      {
        id: 'ct-chem1',
        question: 'What is the pH of a neutral solution at 25°C?',
        options: ['0', '7', '14', '1'],
        correctAnswer: '7',
        timeLimit: 60,
        explanation: 'A neutral solution has a pH of 7 at 25°C.'
      },
      // ... more chemistry questions
    ],
  },
  
  // IIT-JEE specific concept questions
  iit: {
    "Mathematics": [
      {
        id: 'ct-iit-math1',
        question: 'If the vectors a = 3i + 2j - k and b = i - j + k are perpendicular to vector c, then c is',
        options: [
          '5i - 3j + k',
          '5i - j - 5k',
          '2i + 5j + 3k',
          'i + 2j - 3k'
        ],
        correctAnswer: '2i + 5j + 3k',
        timeLimit: 60,
        explanation: 'For vectors to be perpendicular, their dot product is zero. So a·c = 0 and b·c = 0. Solving this system gives c = 2i + 5j + 3k.'
      },
      // ... more IIT math questions
    ],
    "Physics": [
      {
        id: 'ct-iit-phys1',
        question: 'A particle moves in a circle with constant speed. The acceleration of the particle is',
        options: [
          'Zero',
          'Directed along the tangent',
          'Directed toward the center',
          'Directed away from the center'
        ],
        correctAnswer: 'Directed toward the center',
        timeLimit: 60,
        explanation: 'For uniform circular motion, the acceleration is centripetal (toward the center) and equals v²/r.'
      },
      // ... more IIT physics questions
    ],
  },
  
  // NEET specific concept questions
  neet: {
    "Biology": [
      {
        id: 'ct-neet-bio1',
        question: 'Which of the following organelle is known as the powerhouse of the cell?',
        options: ['Nucleus', 'Mitochondria', 'Golgi apparatus', 'Lysosome'],
        correctAnswer: 'Mitochondria',
        timeLimit: 60,
        explanation: 'Mitochondria are called the powerhouse of the cell because they produce ATP through cellular respiration.'
      },
      // ... more NEET biology questions
    ],
  },
};

export const getConceptTopics = (examType: string): SubjectTopic[] => {
  const examQuestions = conceptTestQuestions[examType] || conceptTestQuestions.default;
  
  return Object.keys(examQuestions).map(subject => ({
    id: subject.toLowerCase().replace(/\s+/g, '-'),
    subject: subject,
    topics: Object.keys(examQuestions).length // Using subject count as topic count for simplicity
  }));
};

export const getConceptTestQuestions = (examType: string, subject: string): TestQuestion[] => {
  const examQuestions = conceptTestQuestions[examType] || conceptTestQuestions.default;
  return examQuestions[subject] || [];
};
