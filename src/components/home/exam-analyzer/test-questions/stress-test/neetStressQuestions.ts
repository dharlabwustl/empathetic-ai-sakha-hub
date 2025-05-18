
import { TestQuestion } from '../../types';

// NEET specific questions from 2023-2024 exams following NTA pattern and standards
export const neetStressQuestions: TestQuestion[] = [
  // Physics questions from NEET 2023-2024
  {
    id: 'st-neet1-physics',
    question: 'A rod of length L having linear mass density λ = λ₀(1 + x/L) where λ₀ is a constant and x is the distance measured from one end of the rod. The center of mass of the rod from the end x = 0 is:',
    options: ['L/3', '2L/3', '4L/7', 'L/2'],
    correctAnswer: '2L/3',
    timeLimit: 60,
    explanation: 'For a non-uniform rod, center of mass is given by xcm = ∫x·dm/M. For this rod with variable density, we get xcm = 2L/3.',
    category: 'Physics',
    subject: 'Physics',
    difficulty: 'hard',
    chapter: 'Mechanics',
    year: 2023
  },
  {
    id: 'st-neet2-physics',
    question: 'A nucleus with mass number A = 240 and binding energy per nucleon 7.6 MeV breaks into two fragments with mass numbers A₁ = 110 and A₂ = 130. The binding energy per nucleon of the fragments are 8.5 MeV and 8.2 MeV, respectively. The energy released in the process is:',
    options: ['170.2 MeV', '184.6 MeV', '200.8 MeV', '212.4 MeV'],
    correctAnswer: '200.8 MeV',
    timeLimit: 60,
    explanation: 'Energy released = [EB(A₁) + EB(A₂)] - EB(A) = [110 × 8.5 + 130 × 8.2] - [240 × 7.6] = 200.8 MeV',
    category: 'Physics',
    subject: 'Physics',
    difficulty: 'hard',
    chapter: 'Nuclear Physics',
    year: 2024
  },
  
  // Chemistry questions from NEET 2023-2024
  {
    id: 'st-neet1-chem',
    question: 'For the reaction: 2A + B → C + D, the rate is given by Rate = k[A]²[B]. If the concentration of A is increased by 3 times and that of B is doubled, then the rate of the reaction will increase by:',
    options: ['6 times', '9 times', '12 times', '18 times'],
    correctAnswer: '18 times',
    timeLimit: 60,
    explanation: 'New rate/Old rate = (3²×2)/(1²×1) = 18 times increase',
    category: 'Chemistry',
    subject: 'Chemistry',
    difficulty: 'medium',
    chapter: 'Chemical Kinetics',
    year: 2023
  },
  {
    id: 'st-neet2-chem',
    question: 'Which of the following molecules does not have any lone pair of electrons on the central atom?',
    options: ['SF₄', 'PF₃', 'BF₃', 'ClF₃'],
    correctAnswer: 'BF₃',
    timeLimit: 60,
    explanation: 'In BF₃, boron has no lone pair as it forms three bonds with fluorine atoms and has no additional electrons. The central atoms in SF₄, PF₃, and ClF₃ all have lone pairs.',
    category: 'Chemistry',
    subject: 'Chemistry',
    difficulty: 'medium',
    chapter: 'Chemical Bonding',
    year: 2024
  },
  
  // Biology questions from NEET 2023-2024
  {
    id: 'st-neet1-bio',
    question: 'Identify the correct sequence of structures through which urine passes from kidney to urethra.',
    options: [
      'Collecting duct → Renal pelvis → Ureter → Urinary bladder',
      'Distal convoluted tubule → Ureter → Collecting duct → Urinary bladder',
      'Proximal convoluted tubule → Distal convoluted tubule → Collecting duct → Renal pelvis',
      'Bowman\'s capsule → Loop of Henle → Ureter → Urinary bladder'
    ],
    correctAnswer: 'Collecting duct → Renal pelvis → Ureter → Urinary bladder',
    timeLimit: 60,
    explanation: 'The correct path of urine is: Collecting duct → Renal pelvis → Ureter → Urinary bladder → Urethra.',
    category: 'Biology',
    subject: 'Biology',
    difficulty: 'easy',
    chapter: 'Excretory System',
    year: 2023
  },
  {
    id: 'st-neet2-bio',
    question: 'In a cross between a red flowered (RR) plant and a white flowered (rr) plant in Antirrhinum sp., the F₁ plants are pink. If the F₁ plant is selfed, the phenotypic ratio of F₂ generation would be:',
    options: [
      '1 Red : 2 Pink : 1 White',
      '3 Red : 1 White',
      '3 Pink : 1 Red',
      '1 Red : 1 Pink'
    ],
    correctAnswer: '1 Red : 2 Pink : 1 White',
    timeLimit: 60,
    explanation: 'This is an example of incomplete dominance. In the F₂ generation, the genotypic ratio is 1RR : 2Rr : 1rr, which gives a phenotypic ratio of 1 Red : 2 Pink : 1 White.',
    category: 'Biology',
    subject: 'Biology',
    difficulty: 'medium',
    chapter: 'Genetics',
    year: 2023
  },
  {
    id: 'st-neet3-bio',
    question: 'Which of the following statements is incorrect about prokaryotic ribosomes?',
    options: [
      'They are 70S ribosomes with 50S and 30S subunits',
      'The larger subunit has 23S, 5S, and 5.8S rRNA',
      'The smaller subunit has 16S rRNA',
      'They are associated with cell membrane'
    ],
    correctAnswer: 'The larger subunit has 23S, 5S, and 5.8S rRNA',
    timeLimit: 60,
    explanation: 'In prokaryotes, the larger subunit (50S) contains 23S and 5S rRNA, but not 5.8S rRNA. The 5.8S rRNA is found only in eukaryotic ribosomes.',
    category: 'Biology',
    subject: 'Biology',
    difficulty: 'medium',
    chapter: 'Cell Biology',
    year: 2024
  },
  {
    id: 'st-neet4-bio',
    question: 'Which of the following is NOT a characteristic of facilitators in cell membrane transport?',
    options: [
      'They are proteins that expose hydrophilic passages',
      'They do not require ATP for functioning',
      'They always lead to net movement of molecules from higher to lower concentration',
      'They allow transport of molecules across concentration gradient'
    ],
    correctAnswer: 'They allow transport of molecules across concentration gradient',
    timeLimit: 60,
    explanation: 'Facilitators (carrier proteins) assist in passive transport, which cannot move molecules against a concentration gradient. That would require active transport with energy expenditure (ATP).',
    category: 'Biology',
    subject: 'Biology',
    difficulty: 'medium',
    chapter: 'Cell Biology',
    year: 2024
  }
];
