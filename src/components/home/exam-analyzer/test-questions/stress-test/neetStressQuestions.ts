
import { TestQuestion } from '../../types';

// NEET specific questions following NTA pattern and standards
export const neetStressQuestions: TestQuestion[] = [
  // Physics questions (following NEET/NTA format)
  {
    id: 'st-neet1-physics',
    question: 'The dimensional formula for electric field strength is:',
    options: ['MLT-3A-1', 'MLT-2A-1', 'MLT-3A-2', 'ML2T-3A-1'],
    correctAnswer: 'MLT-3A-1',
    timeLimit: 60, // NTA gives 60 seconds per question
    explanation: 'Electric field strength has units of Newton/Coulomb or Volt/meter, which has dimensional formula MLT-3A-1.',
    category: 'Physics',
    subject: 'Physics',
    difficulty: 'medium',
    chapter: 'Electrostatics'
  },
  {
    id: 'st-neet2-physics',
    question: 'In Young\'s double slit experiment, if the separation between the slits is halved and the distance between slits and screen is doubled, then fringe width will:',
    options: ['remain the same', 'be doubled', 'be halved', 'be quadrupled'],
    correctAnswer: 'be quadrupled',
    timeLimit: 60,
    explanation: 'Fringe width is directly proportional to wavelength and distance between slits and screen, and inversely proportional to slit separation.',
    category: 'Physics',
    subject: 'Physics',
    difficulty: 'hard',
    chapter: 'Wave Optics'
  },
  
  // Chemistry questions (following NEET/NTA format)
  {
    id: 'st-neet1-chem',
    question: 'Which of the following has the highest lattice energy?',
    options: ['NaCl', 'KCl', 'MgO', 'CaO'],
    correctAnswer: 'MgO',
    timeLimit: 60,
    explanation: 'MgO has the highest lattice energy due to its high charge density (Mg2+ and O2-) and smaller ionic radii.',
    category: 'Chemistry',
    subject: 'Chemistry',
    difficulty: 'medium',
    chapter: 'Chemical Bonding'
  },
  {
    id: 'st-neet2-chem',
    question: 'In the reaction: NH3 + O2 → NO + H2O, when 2 moles of ammonia react with 5 moles of O2, the limiting reagent is:',
    options: ['NH3', 'O2', 'Both are limiting', 'Neither is limiting'],
    correctAnswer: 'NH3',
    timeLimit: 60,
    explanation: 'Balanced equation is 4NH3 + 5O2 → 4NO + 6H2O. For 2 moles of NH3, 2.5 moles of O2 are required. Since 5 moles of O2 are available, NH3 is limiting.',
    category: 'Chemistry',
    subject: 'Chemistry',
    difficulty: 'medium',
    chapter: 'Stoichiometry'
  },
  
  // Biology questions (following NEET/NTA format)
  {
    id: 'st-neet1-bio',
    question: 'The functional unit of kidney is:',
    options: ['Neuron', 'Nephron', 'Nephridia', 'Alveolus'],
    correctAnswer: 'Nephron',
    timeLimit: 60,
    explanation: 'Nephron is the functional unit of kidney responsible for filtering blood and forming urine.',
    category: 'Biology',
    subject: 'Biology',
    difficulty: 'easy',
    chapter: 'Excretory System'
  },
  {
    id: 'st-neet2-bio',
    question: 'Which of the following is NOT a nitrogenous base in DNA?',
    options: ['Adenine', 'Uracil', 'Guanine', 'Cytosine'],
    correctAnswer: 'Uracil',
    timeLimit: 60,
    explanation: 'Uracil is found in RNA, not DNA. DNA contains Adenine, Thymine, Guanine, and Cytosine.',
    category: 'Biology',
    subject: 'Biology',
    difficulty: 'easy',
    chapter: 'Molecular Basis of Inheritance'
  },
  {
    id: 'st-neet3-bio',
    question: 'Which vitamin deficiency causes night blindness?',
    options: ['Vitamin A', 'Vitamin B1', 'Vitamin C', 'Vitamin D'],
    correctAnswer: 'Vitamin A',
    timeLimit: 60,
    explanation: 'Vitamin A deficiency leads to night blindness as it is essential for rhodopsin formation in rod cells of retina.',
    category: 'Biology',
    subject: 'Biology',
    difficulty: 'easy',
    chapter: 'Human Health and Diseases'
  },
  {
    id: 'st-neet4-bio',
    question: 'Which of these is the universal recipient blood group?',
    options: ['A', 'B', 'AB', 'O'],
    correctAnswer: 'AB',
    timeLimit: 60,
    explanation: 'AB blood group has no antibodies against A or B antigens, so can receive blood from any ABO blood group.',
    category: 'Biology',
    subject: 'Biology',
    difficulty: 'easy',
    chapter: 'Human Physiology'
  }
];
