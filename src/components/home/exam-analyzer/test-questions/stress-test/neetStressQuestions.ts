
import { TestQuestion } from '../../types';

// NEET specific questions following NTA pattern and standards
export const neetStressQuestions: TestQuestion[] = [
  // Physics questions (following NEET/NTA format - 2023-2024)
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
    question: 'A uniform rod of mass M and length L rotates in a horizontal plane about a vertical axis passing through one of its ends. The moment of inertia about this axis is:',
    options: ['ML2/2', 'ML2/3', 'ML2/4', 'ML2/6'],
    correctAnswer: 'ML2/3',
    timeLimit: 60,
    explanation: 'For a rod of mass M and length L rotating about an axis perpendicular to the rod and passing through one end, I = ML²/3.',
    category: 'Physics',
    subject: 'Physics',
    difficulty: 'medium',
    chapter: 'Rotational Mechanics'
  },
  {
    id: 'st-neet3-physics',
    question: 'A body of mass m is thrown vertically upward with an initial velocity v. The work done by the gravitational force during the ascent of the body is:',
    options: ['mgv', '-mgv', 'mgv²/2', '-mgv²/2'],
    correctAnswer: '-mgv²/2',
    timeLimit: 60,
    explanation: 'Work done by gravity = -mg × height = -mg × v²/(2g) = -mv²/2.',
    category: 'Physics',
    subject: 'Physics',
    difficulty: 'medium',
    chapter: 'Work, Energy and Power'
  },
  
  // Chemistry questions (following NEET/NTA format - 2023-2024)
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
    question: 'The IUPAC name of the compound CH₃-CH=CH-CHO is:',
    options: ['But-2-enal', 'But-3-enal', 'But-2-en-1-al', 'But-1-en-3-al'],
    correctAnswer: 'But-2-enal',
    timeLimit: 60,
    explanation: 'The compound CH₃-CH=CH-CHO has a C=C double bond at 2nd position and an aldehyde group (CHO). According to IUPAC nomenclature, it is named as But-2-enal.',
    category: 'Chemistry',
    subject: 'Chemistry',
    difficulty: 'easy',
    chapter: 'Organic Chemistry - Nomenclature'
  },
  {
    id: 'st-neet3-chem',
    question: 'Which of the following is an amphoteric oxide?',
    options: ['CaO', 'CO₂', 'SiO₂', 'Al₂O₃'],
    correctAnswer: 'Al₂O₃',
    timeLimit: 60,
    explanation: 'Amphoteric oxides show both acidic and basic behavior. Al₂O₃ reacts with both acids and bases, showing amphoteric character.',
    category: 'Chemistry',
    subject: 'Chemistry',
    difficulty: 'easy',
    chapter: 'p-Block Elements'
  },
  
  // Biology questions (following NEET/NTA format - 2023-2024)
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
    question: 'Which of the following human cells do not undergo cell division?',
    options: ['Liver cells', 'Mature neurons', 'Epithelial cells', 'Osteoblasts'],
    correctAnswer: 'Mature neurons',
    timeLimit: 60,
    explanation: 'Mature neurons are terminally differentiated cells that have lost their ability to undergo cell division. They remain in the G₀ phase of the cell cycle permanently.',
    category: 'Biology',
    subject: 'Biology',
    difficulty: 'easy',
    chapter: 'Cell Cycle and Cell Division'
  },
  {
    id: 'st-neet3-bio',
    question: 'The respiratory pigment present in muscle tissues, which also acts as an oxygen reservoir, is:',
    options: ['Haemoglobin', 'Myoglobin', 'Haemocyanin', 'Haemothymin'],
    correctAnswer: 'Myoglobin',
    timeLimit: 60,
    explanation: 'Myoglobin is a respiratory pigment found in muscle tissues. It has a higher affinity for oxygen than hemoglobin and serves as an oxygen reservoir during periods of oxygen deficit.',
    category: 'Biology',
    subject: 'Biology',
    difficulty: 'easy',
    chapter: 'Breathing and Exchange of Gases'
  },
  {
    id: 'st-neet4-bio',
    question: 'Which of the following is NOT a function of the placenta?',
    options: ['Transport of nutrients from mother to fetus', 'Production of estrogen', 'Production of oxytocin', 'Act as a barrier to harmful substances'],
    correctAnswer: 'Production of oxytocin',
    timeLimit: 60,
    explanation: 'The placenta does not produce oxytocin. Oxytocin is produced by the hypothalamus and released by the posterior pituitary gland.',
    category: 'Biology',
    subject: 'Biology',
    difficulty: 'medium',
    chapter: 'Human Reproduction'
  },
  {
    id: 'st-neet5-bio',
    question: 'In Citric Acid Cycle, which of the following reactions produces FADH₂?',
    options: ['Conversion of isocitrate to α-ketoglutarate', 'Conversion of succinate to fumarate', 'Conversion of malate to oxaloacetate', 'Conversion of α-ketoglutarate to succinyl-CoA'],
    correctAnswer: 'Conversion of succinate to fumarate',
    timeLimit: 60,
    explanation: 'In the citric acid cycle, the conversion of succinate to fumarate is catalyzed by succinate dehydrogenase, which uses FAD as a coenzyme. This reaction produces FADH₂.',
    category: 'Biology',
    subject: 'Biology',
    difficulty: 'medium',
    chapter: 'Respiration in Plants'
  }
];
