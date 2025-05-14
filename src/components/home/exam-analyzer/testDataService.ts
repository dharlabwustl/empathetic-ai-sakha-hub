import { 
  ReadinessResult, 
  ReadinessQuestion, 
  ConceptQuestion, 
  TestStep, 
  ExamType, 
  ConceptResult 
} from './types';

// Define exam types with proper engineering properties
export const examTypes: ExamType[] = [
  { id: 'neet', name: 'NEET Medical', icon: '🔬', color: 'from-purple-500 to-indigo-500', description: 'National Eligibility cum Entrance Test for medical college admissions in India' },
  { id: 'jee', name: 'JEE Main', icon: '🧪', color: 'from-blue-500 to-cyan-500', description: 'Joint Entrance Examination for engineering college admissions' },
  { id: 'cat', name: 'CAT', icon: '📊', color: 'from-amber-500 to-orange-500', description: 'Common Admission Test for business school admissions' },
  { id: 'upsc', name: 'UPSC CSE', icon: '📚', color: 'from-emerald-500 to-green-500', description: 'Civil Services Examination for government positions' },
];

// Helper functions for the dialog title and description
export const getDialogTitle = (step: TestStep): string => {
  switch (step) {
    case TestStep.EXAM_SELECT:
      return 'Exam Readiness Analyzer';
    case TestStep.READINESS_TEST:
      return 'Readiness Assessment';
    case TestStep.READINESS_RESULT:
      return 'Your Readiness Score';
    case TestStep.CONCEPT_TEST:
      return 'Concept Knowledge Test';
    case TestStep.CONCEPT_RESULT:
      return 'Concept Knowledge Results';
    default:
      return 'Exam Readiness Analyzer';
  }
};

export const getDialogDescription = (step: TestStep): string => {
  switch (step) {
    case TestStep.EXAM_SELECT:
      return 'Select your target examination to assess your readiness and identify knowledge gaps';
    case TestStep.READINESS_TEST:
      return 'Answer these questions to evaluate your preparation level';
    case TestStep.READINESS_RESULT:
      return 'Based on your responses, here\'s an assessment of your exam readiness';
    case TestStep.CONCEPT_TEST:
      return 'Let\'s test your understanding of core concepts';
    case TestStep.CONCEPT_RESULT:
      return 'Here\'s a detailed breakdown of your concept knowledge';
    default:
      return 'Evaluate your preparation and identify areas for improvement';
  }
};

// NEET readiness questions focused on preparation aspects
export const neetReadinessQuestions: ReadinessQuestion[] = [
  {
    id: 'neet-readiness-1',
    question: 'How many hours per week are you currently studying for NEET?',
    options: [
      { id: 'a', text: 'Less than 10 hours', value: 1 },
      { id: 'b', text: '10-20 hours', value: 2 },
      { id: 'c', text: '20-30 hours', value: 3 },
      { id: 'd', text: '30+ hours', value: 4 },
    ],
  },
  {
    id: 'neet-readiness-2',
    question: 'Have you completed the full NCERT syllabus for Physics, Chemistry and Biology?',
    options: [
      { id: 'a', text: 'No, less than 50% complete', value: 1 },
      { id: 'b', text: 'Partially, 50-75% complete', value: 2 },
      { id: 'c', text: 'Mostly, 75-90% complete', value: 3 },
      { id: 'd', text: 'Yes, fully completed', value: 4 },
    ],
  },
  {
    id: 'neet-readiness-3',
    question: 'How many full-length NEET practice tests have you taken in the last 3 months?',
    options: [
      { id: 'a', text: 'None', value: 1 },
      { id: 'b', text: '1-3 tests', value: 2 },
      { id: 'c', text: '4-10 tests', value: 3 },
      { id: 'd', text: 'More than 10 tests', value: 4 },
    ],
  },
  {
    id: 'neet-readiness-4',
    question: 'What is your average score in NEET practice tests?',
    options: [
      { id: 'a', text: 'Below 300', value: 1 },
      { id: 'b', text: '300-450', value: 2 },
      { id: 'c', text: '450-600', value: 3 },
      { id: 'd', text: 'Above 600', value: 4 },
    ],
  },
  {
    id: 'neet-readiness-5',
    question: 'Have you analyzed and reviewed your mistakes after each practice test?',
    options: [
      { id: 'a', text: 'Never', value: 1 },
      { id: 'b', text: 'Sometimes', value: 2 },
      { id: 'c', text: 'Most of the time', value: 3 },
      { id: 'd', text: 'Always, with detailed error analysis', value: 4 },
    ],
  },
];

// Enhanced NEET concept questions matching NTA pattern for Physics, Chemistry, and Biology
export const neetConceptQuestions: { [key: string]: ConceptQuestion[] } = {
  physics: [
    {
      id: 'neet-physics-1',
      question: 'A body of mass m is projected with velocity v at an angle θ with the horizontal. The magnitude of angular momentum of the body about the point of projection when the body is at its maximum height h is:',
      options: [
        { id: 'a', text: 'mvh', correct: true },
        { id: 'b', text: 'zero', correct: false },
        { id: 'c', text: '2mvh', correct: false },
        { id: 'd', text: 'mv²/g', correct: false },
      ],
      explanation: 'At maximum height, the velocity is horizontal. The angular momentum is L = mvh, where h is the perpendicular distance from the point of projection to the line of motion at maximum height.',
    },
    {
      id: 'neet-physics-2',
      question: 'A wire of uniform cross-section and length L has resistance R. If it is stretched uniformly to length 2L, its new resistance will be:',
      options: [
        { id: 'a', text: 'R', correct: false },
        { id: 'b', text: '2R', correct: false },
        { id: 'c', text: '4R', correct: true },
        { id: 'd', text: 'R/4', correct: false },
      ],
      explanation: 'When a wire is stretched, its volume remains constant. If length doubles, area reduces to half. R = ρL/A, so the new resistance becomes 4R as L doubles and A becomes A/2.',
    },
    {
      id: 'neet-physics-3',
      question: 'In Young's double slit experiment, the path difference between the interfering waves at the point where intensity is half of the maximum intensity, is:',
      options: [
        { id: 'a', text: 'λ/4', correct: false },
        { id: 'b', text: 'λ/3', correct: true },
        { id: 'c', text: 'λ/2', correct: false },
        { id: 'd', text: '2λ/3', correct: false },
      ],
      explanation: 'For intensity to be half of maximum, cos²(πΔx/λ) = 1/2, which gives Δx = λ/3 or 2λ/3. Here, Δx is the path difference.',
    },
    {
      id: 'neet-physics-4',
      question: 'A nuclear reactor produces energy at the rate of 3 × 10⁹ W. Considering that each fission of ²³⁵U releases 200 MeV of energy, the number of fissions taking place per second in the reactor is approximately:',
      options: [
        { id: 'a', text: '9.4 × 10¹⁶', correct: true },
        { id: 'b', text: '1.6 × 10²²', correct: false },
        { id: 'c', text: '6.0 × 10²³', correct: false },
        { id: 'd', text: '3.0 × 10¹⁰', correct: false },
      ],
      explanation: 'Number of fissions per second = (3 × 10⁹ W) / (200 × 10⁶ eV × 1.6 × 10⁻¹⁹ J/eV) = 9.4 × 10¹⁶',
    },
    {
      id: 'neet-physics-5',
      question: 'An inductor of inductance L, a capacitor of capacitance C and a resistor of resistance R are connected in series with an AC source of voltage V = V₀ sin(ωt). The power dissipated in the circuit is:',
      options: [
        { id: 'a', text: 'V₀²/2R', correct: false },
        { id: 'b', text: 'V₀²R/2(R² + (ωL - 1/ωC)²)', correct: true },
        { id: 'c', text: 'V₀²/2Z', correct: false },
        { id: 'd', text: 'V₀²R', correct: false },
      ],
      explanation: 'Power dissipated in AC circuit = V₀²R/2Z² = V₀²R/2(R² + (ωL - 1/ωC)²), where Z is the impedance.',
    },
  ],
  chemistry: [
    {
      id: 'neet-chemistry-1',
      question: 'The hybridization of atomic orbitals of nitrogen in NO₂⁺, NO₃⁻ and NH₄⁺ are respectively:',
      options: [
        { id: 'a', text: 'sp, sp² and sp³', correct: true },
        { id: 'b', text: 'sp², sp and sp³', correct: false },
        { id: 'c', text: 'sp, sp³ and sp²', correct: false },
        { id: 'd', text: 'sp², sp³ and sp', correct: false },
      ],
      explanation: 'In NO₂⁺, nitrogen has 2 bonds (linear) so sp hybridization; in NO₃⁻, nitrogen has 3 bonds (trigonal planar) so sp² hybridization; in NH₄⁺, nitrogen has 4 bonds (tetrahedral) so sp³ hybridization.',
    },
    {
      id: 'neet-chemistry-2',
      question: 'Which of the following aqueous solutions will have the lowest freezing point?',
      options: [
        { id: 'a', text: '0.1 M NaCl', correct: false },
        { id: 'b', text: '0.1 M BaCl₂', correct: false },
        { id: 'c', text: '0.1 M Al₂(SO₄)₃', correct: true },
        { id: 'd', text: '0.1 M C₆H₁₂O₆', correct: false },
      ],
      explanation: 'Al₂(SO₄)₃ dissociates to give 5 ions per formula unit (2 Al³⁺ and 3 SO₄²⁻). The freezing point depression is proportional to the number of particles in solution.',
    },
    {
      id: 'neet-chemistry-3',
      question: 'For the reaction 2NO(g) + O₂(g) → 2NO₂(g), the rate = k[NO]²[O₂]. The overall order of the reaction is:',
      options: [
        { id: 'a', text: '1', correct: false },
        { id: 'b', text: '2', correct: false },
        { id: 'c', text: '3', correct: true },
        { id: 'd', text: '4', correct: false },
      ],
      explanation: 'The overall order is the sum of the powers of the concentration terms: 2 (for NO) + 1 (for O₂) = 3.',
    },
    {
      id: 'neet-chemistry-4',
      question: 'Which of the following compounds will show optical isomerism?',
      options: [
        { id: 'a', text: '[Ni(NH₃)₄]²⁺', correct: false },
        { id: 'b', text: '[Ni(NH₃)₃Cl]⁺', correct: false },
        { id: 'c', text: '[Ni(en)₃]²⁺', correct: true },
        { id: 'd', text: '[Ni(CN)₄]²⁻', correct: false },
      ],
      explanation: '[Ni(en)₃]²⁺ (tris-ethylenediaminenickel(II)) forms an octahedral complex with three bidentate ethylenediamine ligands, creating a chiral structure that exhibits optical isomerism.',
    },
    {
      id: 'neet-chemistry-5',
      question: 'Which of the following statements about enzymes is NOT correct?',
      options: [
        { id: 'a', text: 'Enzymes are highly specific catalysts', correct: false },
        { id: 'b', text: 'Enzymes require high temperatures for optimal activity', correct: true },
        { id: 'c', text: 'Enzymes are denatured by heat and strong acids/bases', correct: false },
        { id: 'd', text: 'Enzymes are mostly proteins', correct: false },
      ],
      explanation: 'Enzymes generally have optimal activity at physiological temperatures (around 37°C for human enzymes). High temperatures typically denature enzymes, causing them to lose their catalytic activity.',
    },
  ],
  biology: [
    {
      id: 'neet-biology-1',
      question: 'During DNA replication, Okazaki fragments are formed on:',
      options: [
        { id: 'a', text: 'Leading strand only', correct: false },
        { id: 'b', text: 'Lagging strand only', correct: true },
        { id: 'c', text: 'Both leading and lagging strands', correct: false },
        { id: 'd', text: 'Neither leading nor lagging strand', correct: false },
      ],
      explanation: 'Okazaki fragments are short, newly synthesized DNA fragments that are formed on the lagging strand during DNA replication, due to the 5\' to 3\' direction of DNA polymerase activity.',
    },
    {
      id: 'neet-biology-2',
      question: 'In a dihybrid cross between AABB × aabb, the ratio of genotypes in F₂ generation will be:',
      options: [
        { id: 'a', text: '9:3:3:1', correct: false },
        { id: 'b', text: '1:2:1:2:4:2:1:2:1', correct: true },
        { id: 'c', text: '1:1:1:1', correct: false },
        { id: 'd', text: '3:1', correct: false },
      ],
      explanation: 'In a dihybrid cross followed through F₂ generation, 9 different genotypes appear in a ratio of 1:2:1:2:4:2:1:2:1, representing all combinations of AA, Aa, aa with BB, Bb, bb.',
    },
    {
      id: 'neet-biology-3',
      question: 'Which of the following structures is INCORRECTLY paired with its function?',
      options: [
        { id: 'a', text: 'Thylakoids - Sites of photosynthesis', correct: false },
        { id: 'b', text: 'Cristae - ATP generation', correct: false },
        { id: 'c', text: 'Ribosomes - Lipid synthesis', correct: true },
        { id: 'd', text: 'Central vacuole - Storage', correct: false },
      ],
      explanation: 'Ribosomes are the site of protein synthesis, not lipid synthesis. Lipids are primarily synthesized in the smooth endoplasmic reticulum.',
    },
    {
      id: 'neet-biology-4',
      question: 'Which hormone stimulates the production of pancreatic juice and bile?',
      options: [
        { id: 'a', text: 'Gastrin', correct: false },
        { id: 'b', text: 'Insulin', correct: false },
        { id: 'c', text: 'Cholecystokinin', correct: true },
        { id: 'd', text: 'Enterokinase', correct: false },
      ],
      explanation: 'Cholecystokinin (CCK) is released from the small intestine and stimulates the release of digestive enzymes from the pancreas and bile from the gallbladder.',
    },
    {
      id: 'neet-biology-5',
      question: 'The oxygen carrying capacity of blood will decrease in:',
      options: [
        { id: 'a', text: 'Polycythemia', correct: false },
        { id: 'b', text: 'Carbon monoxide poisoning', correct: true },
        { id: 'c', text: 'High altitude adaptation', correct: false },
        { id: 'd', text: 'Increased RBC production', correct: false },
      ],
      explanation: 'Carbon monoxide has approximately 210 times greater affinity for hemoglobin than oxygen, forming carboxyhemoglobin which prevents oxygen binding and reduces oxygen-carrying capacity of blood.',
    },
  ],
};

// Other exam concept questions would follow the same pattern but tailored to that exam's syllabus

// ... keep other existing code (JEE, CAT, UPSC questions)

// Mock analysis function for readiness score
export const analyzeReadinessScore = (score: number, totalPoints: number): ReadinessResult => {
  const percentage = (score / totalPoints) * 100;
  
  if (percentage >= 80) {
    return {
      score,
      totalPoints,
      readinessLevel: 'Excellent',
      description: 'You are well-prepared and on track for success in your exam.',
      recommendedActions: [
        'Continue with full-length practice tests',
        'Focus on timed sectional tests for any weaker areas',
        'Review your mistake log regularly',
        'Develop exam-day strategies'
      ],
      readyToTakeExam: true
    };
  } else if (percentage >= 60) {
    return {
      score,
      totalPoints,
      readinessLevel: 'Good',
      description: 'You have a solid foundation but need to strengthen certain areas.',
      recommendedActions: [
        'Increase practice test frequency',
        'Focus on your weak areas with targeted study',
        'Create and follow a strict study schedule',
        'Consider joining a test series'
      ],
      readyToTakeExam: false
    };
  } else if (percentage >= 40) {
    return {
      score,
      totalPoints,
      readinessLevel: 'Average',
      description: 'You need significant preparation to improve your chances of success.',
      recommendedActions: [
        'Create a comprehensive study plan',
        'Master foundational concepts first',
        'Seek guidance on study techniques',
        'Start regular practice with easier questions'
      ],
      readyToTakeExam: false
    };
  } else {
    return {
      score,
      totalPoints,
      readinessLevel: 'Needs Improvement',
      description: 'Your preparation requires a structured approach from the basics.',
      recommendedActions: [
        'Begin with NCERT textbooks for core concepts',
        'Set small, achievable study goals',
        'Consider getting a mentor or joining coaching',
        'Focus on understanding rather than memorizing'
      ],
      readyToTakeExam: false
    };
  }
};

// Mock analysis function for concept test results
export const analyzeConceptTestResults = (
  correct: number,
  total: number,
  subject: string
): ConceptResult => {
  const percentage = (correct / total) * 100;
  const strength = percentage >= 70;
  
  let description, recommendedActions;
  
  if (subject === 'physics') {
    description = strength 
      ? 'You demonstrate strong understanding of core Physics concepts.'
      : 'You need to strengthen your understanding of fundamental Physics principles.';
    recommendedActions = strength
      ? [
          'Challenge yourself with advanced numerical problems',
          'Practice application-based questions',
          'Review derivations of important formulas',
        ]
      : [
          'Focus on NCERT Physics textbook thoroughly',
          'Practice basic numerical problems daily',
          'Create formula flash cards for quick revision',
          'Watch video lectures on challenging topics',
        ];
  } else if (subject === 'chemistry') {
    description = strength 
      ? 'You have a good grasp of Chemistry concepts and reactions.'
      : 'Your Chemistry foundation needs improvement.';
    recommendedActions = strength
      ? [
          'Practice more organic chemistry mechanisms',
          'Focus on complex equilibrium problems',
          'Memorize important named reactions',
        ]
      : [
          'Study NCERT Chemistry thoroughly',
          'Create reaction charts for inorganic chemistry',
          'Focus on understanding mole concept and stoichiometry',
          'Practice regular naming and structure drawing',
        ];
  } else if (subject === 'biology') {
    description = strength 
      ? 'You show excellent understanding of biological concepts and processes.'
      : 'Your Biology knowledge requires more attention.';
    recommendedActions = strength
      ? [
          'Practice diagram-based questions',
          'Study advanced physiological processes',
          'Review genetics problems',
        ]
      : [
          'Study NCERT Biology line by line',
          'Draw and label biological diagrams regularly',
          'Create flashcards for terminology',
          'Watch animation videos for complex processes',
        ];
  } else {
    description = strength 
      ? 'You show good understanding in this subject area.'
      : 'This subject area needs improvement.';
    recommendedActions = strength
      ? [
          'Practice advanced problems',
          'Focus on application questions',
        ]
      : [
          'Review fundamental concepts',
          'Practice basic questions daily',
          'Seek additional learning resources',
        ];
  }
  
  return {
    subject,
    correct,
    total,
    percentage,
    isStrength: strength,
    description,
    recommendedActions,
  };
};
