
import { ExamType } from './types';

// Simplified to only include NEET
export const examTypes: ExamType[] = [
  { value: 'neet', label: 'NEET (National Eligibility cum Entrance Test)' }
];

export const getDialogTitle = (currentTest: string): string => {
  switch (currentTest) {
    case 'intro':
      return 'NEET Exam Readiness Analysis';
    case 'readiness':
      return 'NEET Readiness Assessment';
    case 'concept':
      return 'NEET Concept Mastery Test';
    case 'report':
      return 'Your NEET Readiness Analysis';
    default:
      return 'Exam Readiness Analysis';
  }
};

export const getDialogDescription = (currentTest: string): string => {
  switch (currentTest) {
    case 'intro':
      return 'Discover your NEET exam readiness with our comprehensive assessment';
    case 'readiness':
      return 'Answer questions about your preparation level for the NEET exam';
    case 'concept':
      return 'Test your knowledge in Physics, Chemistry, and Biology';
    case 'report':
      return 'Review your personalized results and recommendations';
    default:
      return 'Analyze your exam preparation';
  }
};

// NEET subject-specific questions
export const getNEETSubjectQuestions = () => {
  return {
    physics: [
      {
        id: 'neet-phy-1',
        question: 'A particle moves in a straight line with constant acceleration. It changes its velocity from 10 m/s to 20 m/s while passing through a distance of 150 m. The acceleration of the particle is:',
        options: ['1 m/s²', '1.5 m/s²', '2 m/s²', '2.5 m/s²'],
        correctAnswer: '1 m/s²',
        explanation: 'Using v² = u² + 2as, we get (20)² = (10)² + 2a(150), solving for a gives 1 m/s²',
        category: 'Mechanics',
        difficulty: 'medium'
      },
      {
        id: 'neet-phy-2',
        question: 'A lens of focal length 25 cm forms an image of magnification 0.5. The object distance is:',
        options: ['37.5 cm', '50 cm', '75 cm', '12.5 cm'],
        correctAnswer: '37.5 cm',
        explanation: 'Using magnification m = -v/u and 1/f = 1/v + 1/u, we get u = 37.5 cm',
        category: 'Optics',
        difficulty: 'medium'
      },
      {
        id: 'neet-phy-3',
        question: 'The work function of a metal is 4.0 eV. The threshold wavelength for photoelectric emission is:',
        options: ['210 nm', '310 nm', '410 nm', '510 nm'],
        correctAnswer: '310 nm',
        explanation: 'Using λ = hc/W, where W is work function, we get λ ≈ 310 nm',
        category: 'Modern Physics',
        difficulty: 'hard'
      }
    ],
    chemistry: [
      {
        id: 'neet-chem-1',
        question: 'Which of the following has the highest lattice energy?',
        options: ['NaCl', 'MgO', 'KCl', 'CaO'],
        correctAnswer: 'MgO',
        explanation: 'MgO has the highest lattice energy due to higher charges on both Mg²⁺ and O²⁻ ions',
        category: 'Inorganic Chemistry',
        difficulty: 'medium'
      },
      {
        id: 'neet-chem-2',
        question: 'The IUPAC name of the compound CH₃-CH=CH-CHO is:',
        options: ['But-2-enal', 'But-3-enal', 'But-2-en-1-al', 'Butanal'],
        correctAnswer: 'But-2-en-1-al',
        explanation: 'The compound has 4 carbon atoms with a C=C double bond at position 2 and an aldehyde group',
        category: 'Organic Chemistry',
        difficulty: 'medium'
      },
      {
        id: 'neet-chem-3',
        question: 'Which of the following oxides of nitrogen would be diamagnetic?',
        options: ['NO', 'NO₂', 'N₂O', 'N₂O₅'],
        correctAnswer: 'N₂O',
        explanation: 'N₂O has all paired electrons, making it diamagnetic',
        category: 'Physical Chemistry',
        difficulty: 'hard'
      }
    ],
    biology: [
      {
        id: 'neet-bio-1',
        question: 'Which cellular organelle is responsible for protein synthesis?',
        options: ['Mitochondria', 'Golgi apparatus', 'Ribosomes', 'Lysosomes'],
        correctAnswer: 'Ribosomes',
        explanation: 'Ribosomes are the cellular organelles that translate mRNA to synthesize proteins',
        category: 'Cell Biology',
        difficulty: 'easy'
      },
      {
        id: 'neet-bio-2',
        question: 'Which part of the nephron is responsible for selective reabsorption?',
        options: ['Bowman\'s capsule', 'Proximal convoluted tubule', 'Loop of Henle', 'Collecting duct'],
        correctAnswer: 'Proximal convoluted tubule',
        explanation: 'Proximal convoluted tubule reabsorbs about 65% of the filtrate including glucose, amino acids, and ions',
        category: 'Human Physiology',
        difficulty: 'medium'
      },
      {
        id: 'neet-bio-3',
        question: 'In a dihybrid cross involving two pairs of contrasting traits, what is the phenotypic ratio in F2 generation?',
        options: ['9:3:3:1', '3:1', '1:2:1', '1:1:1:1'],
        correctAnswer: '9:3:3:1',
        explanation: 'Dihybrid cross shows 9:3:3:1 phenotypic ratio in F2 generation due to independent assortment',
        category: 'Genetics',
        difficulty: 'medium'
      }
    ]
  };
};

