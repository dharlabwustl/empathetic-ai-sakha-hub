
import { TestQuestion, TestDescription } from '../types';

// Test descriptions for each test type
export const stressTestDescriptions: TestDescription = {
  title: "Stress Level Test",
  description: "Measure how well you perform under time pressure",
  instructions: [
    "Face 8 pattern recognition challenges",
    "Each question has a 15-second time limit",
    "Try to maintain focus despite distractions",
    "Answer as quickly and accurately as possible"
  ],
  duration: "2-3 minutes",
  questionCount: 8
};

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
      explanation: 'Each number is doubled to get the next number in the sequence.',
      category: 'Pattern Recognition'
    },
    {
      id: 'st2',
      question: 'Which shape continues the pattern? △ □ ○ △ □ ...',
      options: ['△', '□', '○', '⬠'],
      correctAnswer: '○',
      timeLimit: 15,
      explanation: 'The pattern repeats every 3 shapes: triangle, square, circle.',
      category: 'Visual Pattern'
    },
    {
      id: 'st3',
      question: 'Complete the analogy: Hand is to Glove as Foot is to...',
      options: ['Leg', 'Shoe', 'Toe', 'Sock'],
      correctAnswer: 'Shoe',
      timeLimit: 15,
      explanation: 'A glove covers a hand, and a shoe covers a foot.',
      category: 'Verbal Reasoning'
    },
    {
      id: 'st4',
      question: 'Find the odd one out: Apple, Orange, Carrot, Banana',
      options: ['Apple', 'Orange', 'Carrot', 'Banana'],
      correctAnswer: 'Carrot',
      timeLimit: 15,
      explanation: 'Carrot is a vegetable, while the others are fruits.',
      category: 'Classification'
    },
    {
      id: 'st5',
      question: 'If A = 1, B = 2, C = 3, what does CAB equal?',
      options: ['123', '312', '213', '321'],
      correctAnswer: '312',
      timeLimit: 15,
      explanation: 'C = 3, A = 1, B = 2, so CAB = 312',
      category: 'Logical Reasoning'
    },
    {
      id: 'st6',
      question: 'What comes next in the sequence: A, C, E, G, ...?',
      options: ['H', 'I', 'J', 'K'],
      correctAnswer: 'I',
      timeLimit: 15,
      explanation: 'The sequence is every other letter in the alphabet.',
      category: 'Pattern Recognition'
    },
    {
      id: 'st7',
      question: 'Solve: 17 + 23 - 15 + 8 = ?',
      options: ['31', '33', '35', '37'],
      correctAnswer: '33',
      timeLimit: 15,
      explanation: '17 + 23 = 40, 40 - 15 = 25, 25 + 8 = 33',
      category: 'Mental Math'
    },
    {
      id: 'st8',
      question: 'Which image completes the pattern?',
      imageUrl: '/lovable-uploads/pattern-test.png',
      options: ['Image A', 'Image B', 'Image C', 'Image D'],
      correctAnswer: 'Image B',
      timeLimit: 15,
      explanation: 'The pattern rotates 90° clockwise each time.',
      category: 'Visual Pattern'
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
      explanation: 'log₁₀(100) = 2, log₁₀(10) = 1, 2 + 1 = 3',
      category: 'Mathematics',
      difficulty: 'medium'
    },
    {
      id: 'st-iit2',
      question: 'What is the derivative of e^x?',
      options: ['e^x', '1/x', 'e^(x-1)', '0'],
      correctAnswer: 'e^x',
      timeLimit: 15,
      explanation: 'The derivative of e^x is e^x.',
      category: 'Calculus',
      difficulty: 'medium'
    },
    {
      id: 'st-iit3',
      question: 'The pH of a solution with [H⁺] = 10^-9 M is:',
      options: ['9', '7', '5', '-9'],
      correctAnswer: '9',
      timeLimit: 15,
      explanation: 'pH = -log[H⁺] = -log(10^-9) = 9',
      category: 'Chemistry',
      difficulty: 'medium'
    },
    {
      id: 'st-iit4',
      question: 'If vectors A and B are perpendicular, then A·B equals:',
      options: ['0', '1', 'AB', '-1'],
      correctAnswer: '0',
      timeLimit: 15,
      explanation: 'When vectors are perpendicular, their dot product is zero.',
      category: 'Physics',
      difficulty: 'easy'
    },
    {
      id: 'st-iit5',
      question: 'Find the value of k if 3x² + kx + 3 has equal roots.',
      options: ['6', '-6', '3', '-3'],
      correctAnswer: '6',
      timeLimit: 15,
      explanation: 'For equal roots, discriminant = 0, so k² - 4(3)(3) = 0, k² = 36, k = 6',
      category: 'Mathematics',
      difficulty: 'hard'
    },
    {
      id: 'st-iit6',
      question: 'A body starts from rest with acceleration 2 m/s². Distance covered in 5 seconds is:',
      options: ['25m', '50m', '10m', '5m'],
      correctAnswer: '25m',
      timeLimit: 15,
      explanation: 's = (1/2)at² = 0.5 × 2 × 5² = 25m',
      category: 'Physics',
      difficulty: 'medium'
    },
    {
      id: 'st-iit7',
      question: 'The hybridization in BeCl₂ is:',
      options: ['sp', 'sp²', 'sp³', 'dsp²'],
      correctAnswer: 'sp',
      timeLimit: 15,
      explanation: 'BeCl₂ has linear geometry with sp hybridization.',
      category: 'Chemistry',
      difficulty: 'medium'
    },
    {
      id: 'st-iit8',
      question: 'Find the value of sin(30°) × cos(60°) + cos(30°) × sin(60°)',
      options: ['0', '0.5', '1', '1.5'],
      correctAnswer: '1',
      timeLimit: 15,
      explanation: 'sin(A)cos(B) + cos(A)sin(B) = sin(A+B), so sin(30°+60°) = sin(90°) = 1',
      category: 'Mathematics',
      difficulty: 'hard'
    }
  ],
  
  // NEET specific questions
  neet: [
    {
      id: 'st-neet1',
      question: 'What is the normal heart rate (beats per minute) in adults?',
      options: ['40-60', '60-100', '100-140', '140-180'],
      correctAnswer: '60-100',
      timeLimit: 15,
      explanation: 'Normal resting heart rate in adults is 60-100 beats per minute.',
      category: 'Physiology',
      difficulty: 'easy'
    },
    {
      id: 'st-neet2',
      question: 'Which of these is NOT a nitrogenous base in DNA?',
      options: ['Adenine', 'Uracil', 'Guanine', 'Cytosine'],
      correctAnswer: 'Uracil',
      timeLimit: 15,
      explanation: 'Uracil is found in RNA, not DNA. DNA contains Adenine, Thymine, Guanine, and Cytosine.',
      category: 'Biology',
      difficulty: 'medium'
    },
    {
      id: 'st-neet3',
      question: 'The functional unit of kidney is:',
      options: ['Neuron', 'Nephron', 'Axon', 'Alveolus'],
      correctAnswer: 'Nephron',
      timeLimit: 15,
      explanation: 'Nephron is the functional unit of kidney responsible for filtering blood.',
      category: 'Anatomy',
      difficulty: 'easy'
    },
    {
      id: 'st-neet4',
      question: 'Which vitamin deficiency causes night blindness?',
      options: ['Vitamin A', 'Vitamin B', 'Vitamin C', 'Vitamin D'],
      correctAnswer: 'Vitamin A',
      timeLimit: 15,
      explanation: 'Vitamin A deficiency leads to night blindness as it is essential for rhodopsin formation.',
      category: 'Physiology',
      difficulty: 'medium'
    },
    {
      id: 'st-neet5',
      question: 'The pH of human blood under normal conditions is:',
      options: ['6.4', '7.0', '7.4', '8.0'],
      correctAnswer: '7.4',
      timeLimit: 15,
      explanation: 'Normal blood pH is tightly regulated between 7.35-7.45, with 7.4 being the average.',
      category: 'Physiology',
      difficulty: 'medium'
    },
    {
      id: 'st-neet6',
      question: 'Which of these is the universal recipient blood group?',
      options: ['A', 'B', 'AB', 'O'],
      correctAnswer: 'AB',
      timeLimit: 15,
      explanation: 'AB blood group has no antibodies against A or B antigens, so can receive any blood type.',
      category: 'Physiology',
      difficulty: 'easy'
    },
    {
      id: 'st-neet7',
      question: 'The junction between two neurons is called:',
      options: ['Dendrite', 'Synapse', 'Axon', 'Myelin sheath'],
      correctAnswer: 'Synapse',
      timeLimit: 15,
      explanation: 'Synapse is the junction where neurons communicate with each other.',
      category: 'Neurology',
      difficulty: 'medium'
    },
    {
      id: 'st-neet8',
      question: 'Which organelle is known as the "powerhouse of the cell"?',
      options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Golgi apparatus'],
      correctAnswer: 'Mitochondria',
      timeLimit: 15,
      explanation: 'Mitochondria produce ATP through cellular respiration, providing energy for the cell.',
      category: 'Cell Biology',
      difficulty: 'easy'
    }
  ],
  
  // UPSC specific questions
  upsc: [
    {
      id: 'st-upsc1',
      question: 'Which Article of the Indian Constitution abolishes untouchability?',
      options: ['Article 14', 'Article 15', 'Article 17', 'Article 21'],
      correctAnswer: 'Article 17',
      timeLimit: 15,
      explanation: 'Article 17 abolishes untouchability and forbids its practice in any form.',
      category: 'Indian Constitution',
      difficulty: 'medium'
    },
    {
      id: 'st-upsc2',
      question: 'Who was the first Deputy Prime Minister of India?',
      options: ['Sardar Patel', 'Jawaharlal Nehru', 'Morarji Desai', 'C. Rajagopalachari'],
      correctAnswer: 'Sardar Patel',
      timeLimit: 15,
      explanation: 'Sardar Vallabhbhai Patel served as the first Deputy Prime Minister of India (1947-1950).',
      category: 'History',
      difficulty: 'medium'
    },
    {
      id: 'st-upsc3',
      question: 'Which river forms the Jog Falls?',
      options: ['Cauvery', 'Krishna', 'Sharavati', 'Godavari'],
      correctAnswer: 'Sharavati',
      timeLimit: 15,
      explanation: 'The Sharavati River forms the Jog Falls in Karnataka, the second-highest waterfall in India.',
      category: 'Geography',
      difficulty: 'medium'
    },
    {
      id: 'st-upsc4',
      question: 'The Dialectical Materialism is associated with:',
      options: ['Plato', 'Aristotle', 'Karl Marx', 'Hegel'],
      correctAnswer: 'Karl Marx',
      timeLimit: 15,
      explanation: 'Dialectical Materialism is a philosophy developed by Karl Marx and Friedrich Engels.',
      category: 'Philosophy',
      difficulty: 'hard'
    },
    {
      id: 'st-upsc5',
      question: 'Which committee recommended the three-tier Panchayati Raj System?',
      options: ['Balwant Rai Mehta Committee', 'Ashok Mehta Committee', 'Narasimham Committee', 'Sarkaria Commission'],
      correctAnswer: 'Balwant Rai Mehta Committee',
      timeLimit: 15,
      explanation: 'The Balwant Rai Mehta Committee (1957) recommended a three-tier Panchayati Raj system.',
      category: 'Polity',
      difficulty: 'hard'
    },
    {
      id: 'st-upsc6',
      question: 'The Asiatic Lion Sanctuary is located at:',
      options: ['Kaziranga', 'Gir', 'Jim Corbett', 'Ranthambore'],
      correctAnswer: 'Gir',
      timeLimit: 15,
      explanation: 'Gir Forest National Park in Gujarat is the only natural habitat of Asiatic lions.',
      category: 'Environment',
      difficulty: 'medium'
    },
    {
      id: 'st-upsc7',
      question: 'The term "Fourth Estate" refers to:',
      options: ['Judiciary', 'Parliament', 'Press', 'Opposition parties'],
      correctAnswer: 'Press',
      timeLimit: 15,
      explanation: 'Fourth Estate refers to the press/media, acknowledging its influence alongside the three branches of government.',
      category: 'Polity',
      difficulty: 'medium'
    },
    {
      id: 'st-upsc8',
      question: 'The "Mission Antyodaya" is related to:',
      options: ['Urban development', 'Rural development', 'Minority welfare', 'Women empowerment'],
      correctAnswer: 'Rural development',
      timeLimit: 15,
      explanation: 'Mission Antyodaya aims for poverty-free villages through convergence of government schemes and social mobilization.',
      category: 'Current Affairs',
      difficulty: 'medium'
    }
  ],
  
  // Add more exam-specific question sets as needed
  bank: [
    {
      id: 'st-bank1',
      question: 'Calculate: 17% of 350',
      options: ['59.5', '49.5', '69.5', '79.5'],
      correctAnswer: '59.5',
      timeLimit: 15,
      explanation: '17% of 350 = 0.17 × 350 = 59.5',
      category: 'Quantitative Aptitude',
      difficulty: 'medium'
    },
    // Add more Bank PO questions...
    {
      id: 'st-bank2',
      question: 'If A : B = 2 : 3 and B : C = 4 : 5, then A : C = ?',
      options: ['8 : 15', '2 : 5', '4 : 5', '3 : 5'],
      correctAnswer: '8 : 15',
      timeLimit: 15,
      explanation: 'A : B = 2 : 3 means A = 2x, B = 3x. B : C = 4 : 5 means B = 4y, C = 5y. So 3x = 4y, thus x = 4y/3. Therefore A : C = 2x : 5y = 2(4y/3) : 5y = 8y/3 : 5y = 8 : 15',
      category: 'Quantitative Aptitude',
      difficulty: 'hard'
    },
    // Complete the bank set with at least 8 questions
    {
      id: 'st-bank3',
      question: 'The difference between simple interest and compound interest on Rs. 5000 for 2 years at 10% per annum is:',
      options: ['Rs. 50', 'Rs. 100', 'Rs. 25', 'Rs. 75'],
      correctAnswer: 'Rs. 50',
      timeLimit: 15,
      explanation: 'SI = P×R×T/100 = 5000×10×2/100 = 1000. CI = P(1+R/100)^T - P = 5000(1.1)² - 5000 = 5000(1.21) - 5000 = 6050 - 5000 = 1050. Difference = 1050 - 1000 = 50',
      category: 'Quantitative Aptitude',
      difficulty: 'medium'
    },
    {
      id: 'st-bank4',
      question: 'Find the wrong term in the series: 2, 6, 12, 20, 30, 42, 56',
      options: ['12', '20', '30', '42'],
      correctAnswer: '42',
      timeLimit: 15,
      explanation: 'The pattern is +4, +6, +8, +10, +12... So after 30 should be 30+12=42, and then 42+14=56. The series is correct.',
      category: 'Reasoning',
      difficulty: 'hard'
    },
    {
      id: 'st-bank5',
      question: 'If in a code SERVANT is written as TFSWAOU, how is PRODUCT written in that code?',
      options: ['QSPEVDU', 'OSPCTDU', 'PSPCVDU', 'QSPCVDU'],
      correctAnswer: 'QSPCVDU',
      timeLimit: 15,
      explanation: 'Each letter is replaced by the letter that follows it in the alphabet. P→Q, R→S, O→P, D→C, U→V, C→D, T→U',
      category: 'Reasoning',
      difficulty: 'hard'
    },
    {
      id: 'st-bank6',
      question: 'The governor of the Reserve Bank of India is appointed by:',
      options: ['Prime Minister', 'Finance Minister', 'Central Government', 'RBI Board'],
      correctAnswer: 'Central Government',
      timeLimit: 15,
      explanation: 'The RBI Governor is appointed by the Central Government (Union Cabinet) for a term of 4 years.',
      category: 'Banking Awareness',
      difficulty: 'medium'
    },
    {
      id: 'st-bank7',
      question: 'If X = 2Y and Y = 3Z then X : Z = ?',
      options: ['6 : 1', '1 : 6', '3 : 2', '2 : 3'],
      correctAnswer: '6 : 1',
      timeLimit: 15,
      explanation: 'X = 2Y and Y = 3Z, so X = 2(3Z) = 6Z. Therefore, X : Z = 6Z : Z = 6 : 1',
      category: 'Quantitative Aptitude',
      difficulty: 'medium'
    },
    {
      id: 'st-bank8',
      question: 'RTGS in banking stands for:',
      options: ['Real Time Gross Settlement', 'Ready To Go Service', 'Rapid Transaction Guarantee System', 'Reserve Transfer Gateway System'],
      correctAnswer: 'Real Time Gross Settlement',
      timeLimit: 15,
      explanation: 'RTGS stands for Real Time Gross Settlement, which is used for large value transactions that need immediate clearing.',
      category: 'Banking Awareness',
      difficulty: 'easy'
    }
  ],
  
  cat: [
    // CAT/MBA Questions
    {
      id: 'st-cat1',
      question: 'If a, b, c are in AP, then 1/b, 1/a, 1/c are in:',
      options: ['GP', 'HP', 'AP', 'None of these'],
      correctAnswer: 'HP',
      timeLimit: 15,
      explanation: 'If a, b, c are in AP, then b = (a+c)/2. For 1/b, 1/a, 1/c to be in HP, we need 1/b = (1/a + 1/c)/2, which is true.',
      category: 'Quantitative Aptitude',
      difficulty: 'hard'
    },
    // Add more CAT questions...
    {
      id: 'st-cat2',
      question: 'What is the next number in the series: 2, 3, 5, 9, 17, ?',
      options: ['31', '33', '34', '35'],
      correctAnswer: '33',
      timeLimit: 15,
      explanation: 'The pattern is ×1+1, ×1+2, ×1+4, ×1+8, ×1+16. So 17×1+16 = 33',
      category: 'Logical Reasoning',
      difficulty: 'medium'
    },
    {
      id: 'st-cat3',
      question: 'Find the value of √16 + √25 + √36 + √49',
      options: ['24', '22', '20', '18'],
      timeLimit: 15,
      correctAnswer: '22',
      explanation: '√16 + √25 + √36 + √49 = 4 + 5 + 6 + 7 = 22',
      category: 'Quantitative Aptitude',
      difficulty: 'medium'
    },
    {
      id: 'st-cat4',
      question: 'The average age of 10 students is 15 years. If the teacher\'s age is included, the average increases by 3 years. What is the teacher\'s age?',
      options: ['48', '45', '50', '47'],
      timeLimit: 15,
      correctAnswer: '48',
      explanation: 'Let teacher\'s age be x. 10×15 + x = 11×18. Solving, x = 48.',
      category: 'Quantitative Aptitude',
      difficulty: 'medium'
    },
    {
      id: 'st-cat5',
      question: 'If 5/9 of a number exceeds 3/7 of the same number by 8, then the number is:',
      options: ['168', '126', '84', '63'],
      timeLimit: 15,
      correctAnswer: '84',
      explanation: '(5/9)x - (3/7)x = 8. Solving, (35-27)x/63 = 8. So 8x/63 = 8, which gives x = 63.',
      category: 'Quantitative Aptitude',
      difficulty: 'hard'
    },
    {
      id: 'st-cat6',
      question: 'The word EXAMINATION is coded as FYBNJOBUJPO. How is QUESTION coded?',
      options: ['RVFTUJPO', 'RTFVUJPO', 'RVFTUJPW', 'RVDTSJPO'],
      timeLimit: 15,
      correctAnswer: 'RVFTUJPO',
      explanation: 'Each letter is replaced by the next letter in the alphabet. Q→R, U→V, E→F, S→T, T→U, I→J, O→P, N→O',
      category: 'Verbal Ability',
      difficulty: 'medium'
    },
    {
      id: 'st-cat7',
      question: 'If the letters in PRABA are rearranged to form a word and the first letter of the word is A, then what is the last letter of the word?',
      options: ['A', 'B', 'P', 'R'],
      timeLimit: 15,
      correctAnswer: 'P',
      explanation: 'Rearranging PRABA with A as the first letter could give ABARB or ABARP. Since P is the only other option among the choices, the answer is P.',
      category: 'Verbal Ability',
      difficulty: 'medium'
    },
    {
      id: 'st-cat8',
      question: 'Which of the following is the correct descending order of fractions: 3/5, 7/9, 11/15, 13/20?',
      options: ['7/9, 11/15, 3/5, 13/20', '7/9, 3/5, 11/15, 13/20', '3/5, 7/9, 11/15, 13/20', '11/15, 7/9, 3/5, 13/20'],
      timeLimit: 15,
      correctAnswer: '7/9, 11/15, 3/5, 13/20',
      explanation: 'Converting to decimals: 3/5 = 0.6, 7/9 = 0.778, 11/15 = 0.733, 13/20 = 0.65. So in descending order: 7/9, 11/15, 3/5, 13/20',
      category: 'Quantitative Aptitude',
      difficulty: 'hard'
    }
  ],
  
  // Add more test categories as needed
};

// Function to get questions based on exam type
export const getStressTestQuestions = (examType: string): TestQuestion[] => {
  return stressTestQuestions[examType] || stressTestQuestions.default;
};
