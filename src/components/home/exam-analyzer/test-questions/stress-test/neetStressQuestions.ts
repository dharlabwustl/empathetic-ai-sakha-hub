
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
  
  // NEET 2023 Physics Questions
  {
    id: 'st-neet2023-physics1',
    question: 'A charged particle with charge q is moving in a circular path of radius r with angular frequency ω. The magnetic moment of the equivalent current loop is:',
    options: ['qωr²/2', 'qωr²', 'qωr/2', 'qωr'],
    correctAnswer: 'qωr²/2',
    timeLimit: 60,
    explanation: 'Magnetic moment of a current loop is given by μ = IA, where I is current and A is area. For a charged particle, I = qω/2π and A = πr², so μ = qωr²/2.',
    category: 'Physics',
    subject: 'Physics',
    difficulty: 'hard',
    chapter: 'Magnetism and Matter'
  },
  {
    id: 'st-neet2023-physics2',
    question: 'The power of a convex lens is 5 diopters. The focal length of the lens is:',
    options: ['5 m', '0.5 m', '0.2 m', '5 cm'],
    correctAnswer: '0.2 m',
    timeLimit: 60,
    explanation: 'The focal length f is related to the power P by the equation P = 1/f, where f is in meters. So f = 1/P = 1/5 = 0.2 m.',
    category: 'Physics',
    subject: 'Physics',
    difficulty: 'medium',
    chapter: 'Ray Optics'
  },
  
  // NEET 2024 Physics Questions
  {
    id: 'st-neet2024-physics1',
    question: 'An EM wave is propagating along the z-direction. The possible directions of the electric field vector are:',
    options: ['Along the y-direction only', 'Along the x-direction only', 'Along the z-direction only', 'Along the x or y-direction'],
    correctAnswer: 'Along the x or y-direction',
    timeLimit: 60,
    explanation: 'Electromagnetic waves are transverse in nature. The electric field vector is perpendicular to the direction of propagation. Since propagation is along z-axis, the electric field can be along x or y-axis.',
    category: 'Physics',
    subject: 'Physics',
    difficulty: 'medium',
    chapter: 'Electromagnetic Waves'
  },
  {
    id: 'st-neet2024-physics2',
    question: 'A particle executes simple harmonic motion with a time period of 4 s. The time taken by the particle to move from mean position to half of its amplitude is:',
    options: ['1/6 s', '1/3 s', '2/3 s', '1 s'],
    correctAnswer: '1/3 s',
    timeLimit: 60,
    explanation: 'For SHM, position x = A·sin(ωt). At mean position, x = 0, and at half amplitude, x = A/2. Solving for time, we get t = (1/ω)·sin⁻¹(1/2) = (T/2π)·π/6 = T/12 = 4/12 = 1/3 s.',
    category: 'Physics',
    subject: 'Physics',
    difficulty: 'hard',
    chapter: 'Oscillations'
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
  
  // NEET 2023 Chemistry Questions
  {
    id: 'st-neet2023-chem1',
    question: 'Which of the following statements about the periodic table is incorrect?',
    options: ['Electronegativity increases across a period', 'Electron affinity generally decreases down a group', 'Ionization energy generally increases across a period', 'Atomic radius increases down a group'],
    correctAnswer: 'Electron affinity generally decreases down a group',
    timeLimit: 60,
    explanation: 'Electron affinity generally decreases down a group because the incoming electron is farther from the nucleus and experiences more shielding from inner electrons.',
    category: 'Chemistry',
    subject: 'Chemistry',
    difficulty: 'medium',
    chapter: 'Periodic Table'
  },
  {
    id: 'st-neet2023-chem2',
    question: 'The IUPAC name of CH₃-CH=CH-CHO is:',
    options: ['But-2-enal', 'But-2-en-1-al', 'But-3-en-1-al', 'But-1-en-3-al'],
    correctAnswer: 'But-2-enal',
    timeLimit: 60,
    explanation: 'The longest carbon chain has 4 carbons (but-), with a double bond at C2 (-2-en-) and an aldehyde group (-al). According to IUPAC naming rules, it is but-2-enal.',
    category: 'Chemistry',
    subject: 'Chemistry',
    difficulty: 'medium',
    chapter: 'Organic Chemistry'
  },
  
  // NEET 2024 Chemistry Questions
  {
    id: 'st-neet2024-chem1',
    question: 'The correct order of increasing basic strength of the following compounds is:\nI. CH₃NH₂\nII. (CH₃)₂NH\nIII. (CH₃)₃N\nIV. NH₃',
    options: ['IV < I < II < III', 'IV < I < III < II', 'II < I < IV < III', 'III < II < I < IV'],
    correctAnswer: 'IV < I < III < II',
    timeLimit: 60,
    explanation: 'The order is NH₃ < CH₃NH₂ < (CH₃)₃N < (CH₃)₂NH. This is based on +I effect of methyl groups. (CH₃)₂NH is more basic than (CH₃)₃N due to steric hindrance in the latter.',
    category: 'Chemistry',
    subject: 'Chemistry',
    difficulty: 'hard',
    chapter: 'Organic Chemistry'
  },
  {
    id: 'st-neet2024-chem2',
    question: 'Which of the following complexes shows both geometric and optical isomerism?',
    options: ['[Cr(NH₃)₄Cl₂]⁺', '[Co(en)₂Cl₂]⁺', '[Co(NH₃)₅Cl]²⁺', '[Pt(NH₃)₃Cl]⁺'],
    correctAnswer: '[Co(en)₂Cl₂]⁺',
    timeLimit: 60,
    explanation: '[Co(en)₂Cl₂]⁺ shows both geometric isomerism (cis-trans) and optical isomerism (in the cis form due to the chelating ethylenediamine ligands creating a non-superimposable mirror image).',
    category: 'Chemistry',
    subject: 'Chemistry',
    difficulty: 'hard',
    chapter: 'Coordination Compounds'
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
  },
  
  // NEET 2023 Biology Questions
  {
    id: 'st-neet2023-bio1',
    question: 'Glycosomes are characteristic organelles of:',
    options: ['Diatoms', 'Dinoflagellates', 'Trypanosomes', 'Slime molds'],
    correctAnswer: 'Trypanosomes',
    timeLimit: 60,
    explanation: 'Glycosomes are membrane-bound organelles found in Trypanosomes (protozoan parasites) that contain glycolytic enzymes and are essential for their energy metabolism.',
    category: 'Biology',
    subject: 'Biology',
    difficulty: 'hard',
    chapter: 'Cell Biology'
  },
  {
    id: 'st-neet2023-bio2',
    question: 'Which of the following statements regarding mitochondria is incorrect?',
    options: [
      'Inner membrane is convoluted forming cristae', 
      'Mitochondrial matrix contains single circular DNA molecule and ribosomes', 
      'Outer membrane is permeable to mRNA, tRNA and ribosomes', 
      'Enzymes of electron transport are embedded in outer membrane'
    ],
    correctAnswer: 'Enzymes of electron transport are embedded in outer membrane',
    timeLimit: 60,
    explanation: 'The enzymes of the electron transport chain are embedded in the inner membrane of mitochondria, not the outer membrane.',
    category: 'Biology',
    subject: 'Biology',
    difficulty: 'medium',
    chapter: 'Cell Biology'
  },
  
  // NEET 2024 Biology Questions
  {
    id: 'st-neet2024-bio1',
    question: 'In a cross between AABB × aabb, the genotype of F2 generation having phenotype same as recessive parent is:',
    options: ['aaBB', 'AAbb', 'AaBb', 'aabb'],
    correctAnswer: 'aabb',
    timeLimit: 60,
    explanation: 'In a cross between AABB and aabb, the F1 generation will be AaBb. When F1 individuals self-pollinate, 1/16 of the F2 will have the genotype aabb, which will express the same phenotype as the recessive parent.',
    category: 'Biology',
    subject: 'Biology',
    difficulty: 'medium',
    chapter: 'Genetics'
  },
  {
    id: 'st-neet2024-bio2',
    question: 'The cells responsible for antibody-mediated immunity are:',
    options: ['T-helper cells', 'B-lymphocytes', 'T-killer cells', 'Macrophages'],
    correctAnswer: 'B-lymphocytes',
    timeLimit: 60,
    explanation: 'B-lymphocytes are responsible for antibody-mediated immunity (humoral immunity). They differentiate into plasma cells that secrete antibodies into the bloodstream.',
    category: 'Biology',
    subject: 'Biology',
    difficulty: 'medium',
    chapter: 'Human Health and Diseases'
  }
];
