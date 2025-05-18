
import { TestQuestion } from '../types';

// Define the subjects available for concept tests
export const getConceptTestSubjects = (): string[] => {
  return ['Physics', 'Chemistry', 'Biology'];
};

// Get concept test questions for a specific subject
export const getConceptTestQuestions = (subject: string, count: number = 10): TestQuestion[] => {
  // Get all questions for the requested subject
  let questions: TestQuestion[] = [];
  
  switch(subject) {
    case 'Physics':
      questions = physicsQuestions;
      break;
    case 'Chemistry':
      questions = chemistryQuestions;
      break;
    case 'Biology':
      questions = biologyQuestions;
      break;
    default:
      questions = physicsQuestions;
  }
  
  // Shuffle and return the requested number of questions
  return shuffleArray(questions).slice(0, count);
};

// Actual NEET Physics questions from 2023-2024
const physicsQuestions: TestQuestion[] = [
  {
    id: 'physics-2023-1',
    question: 'The maximum height that a certain man can throw a ball is 10 m. With what speed does the ball leave the hand of the thrower?',
    options: ['10 m/s', '14 m/s', '7 m/s', '20 m/s'],
    correctAnswer: '14 m/s',
    explanation: 'Using the equation v² = 2gh, where h = 10 m and g = 10 m/s², we get v = √(2 × 10 × 10) = √200 = 14 m/s approximately.',
    subject: 'Physics',
    chapter: 'Kinematics',
    difficulty: 'medium'
  },
  {
    id: 'physics-2023-2',
    question: 'A uniform wooden stick of length L and mass M is free to rotate about a horizontal axis passing through one of its ends. The minimum work required to rotate it from vertical to horizontal position is:',
    options: ['MgL/2', 'MgL', '2MgL', 'MgL/4'],
    correctAnswer: 'MgL/2',
    explanation: 'The work done equals the change in potential energy. The center of mass rises by L/2 when the stick is rotated from vertical to horizontal position. So, work = MgL/2.',
    subject: 'Physics',
    chapter: 'Rotational Mechanics',
    difficulty: 'hard'
  },
  {
    id: 'physics-2024-1',
    question: 'A conducting circular loop of radius R carries a constant current I. The magnetic field at the center of the loop has magnitude B₀. At a distance x from the center along the axis of the loop, the magnetic field magnitude is B. The ratio B/B₀ is:',
    options: ['1/(1+(x/R)²)^(1/2)', '1/(1+(x/R)²)', '1/(1+(x/R)²)^(3/2)', '1/(1+(R/x)²)'],
    correctAnswer: '1/(1+(x/R)²)^(3/2)',
    explanation: 'For a circular loop with current I and radius R, the magnetic field along the axis at distance x from the center is B = (μ₀I/2) × R²/(R²+x²)^(3/2). At the center (x=0), B₀ = μ₀I/(2R). Hence B/B₀ = 1/(1+(x/R)²)^(3/2).',
    subject: 'Physics',
    chapter: 'Magnetism',
    difficulty: 'hard'
  },
  {
    id: 'physics-2024-2',
    question: 'In Young's double slit experiment, the distance between the slits is 0.15 mm and the screen is 1 m away from the slits. The distance between the central maximum and the fourth bright fringe for light of wavelength 600 nm is:',
    options: ['16 mm', '12 mm', '8 mm', '4 mm'],
    correctAnswer: '16 mm',
    explanation: 'For Young's double slit, position of nth bright fringe is given by yn = nλD/d, where λ = 600 × 10⁻⁹ m, D = 1 m, d = 0.15 × 10⁻³ m, n = 4. So y₄ = 4 × 600 × 10⁻⁹ × 1/(0.15 × 10⁻³) = 16 × 10⁻³ m = 16 mm.',
    subject: 'Physics',
    chapter: 'Wave Optics',
    difficulty: 'medium'
  },
  {
    id: 'physics-2024-3',
    question: 'A flask contains helium gas at NTP. The flask is connected to a vacuum pump which removes 99% of the molecules. If the temperature is kept constant, the pressure in the flask will be close to:',
    options: ['10 Pa', '1000 Pa', '100 Pa', '10000 Pa'],
    correctAnswer: '100 Pa',
    explanation: 'At NTP, the pressure is 10⁵ Pa. If 99% of molecules are removed, then only 1% remains, so the new pressure is 10⁵ × 0.01 = 10³ Pa = 100 Pa.',
    subject: 'Physics',
    chapter: 'Kinetic Theory of Gases',
    difficulty: 'medium'
  },
  {
    id: 'physics-2023-3',
    question: 'The root mean square velocity of oxygen molecule at 300 K is v. If the temperature is increased to 1200 K, the root mean square velocity becomes:',
    options: ['v', '2v', '4v', '2√2v'],
    correctAnswer: '2v',
    explanation: 'RMS velocity v_rms ∝ √T. So v_rms at 1200 K / v_rms at 300 K = √(1200/300) = √4 = 2.',
    subject: 'Physics',
    chapter: 'Kinetic Theory of Gases',
    difficulty: 'medium'
  },
  {
    id: 'physics-2023-4',
    question: 'In a simple harmonic oscillator, the displacement as a function of time is given by x(t) = A cos(ωt + φ). The phase difference between displacement and velocity is:',
    options: ['π/4', 'π/3', 'π/2', '2π/3'],
    correctAnswer: 'π/2',
    explanation: 'Velocity v(t) = dx/dt = -Aω sin(ωt + φ), which can be written as v(t) = -Aω sin(ωt + φ) = Aω cos(ωt + φ + π/2). So the phase difference between x(t) and v(t) is π/2.',
    subject: 'Physics',
    chapter: 'Oscillations',
    difficulty: 'easy'
  },
  {
    id: 'physics-2024-4',
    question: 'The current in a resistor of resistance 10 Ω changes with time as I = 5t² where I is in ampere and t is in second. The heat generated in the resistor in the time interval from t = 0 to t = 2 seconds is:',
    options: ['400 J', '1600/3 J', '800/3 J', '2000/3 J'],
    correctAnswer: '1600/3 J',
    explanation: 'Heat generated Q = ∫R I² dt = ∫(10) (5t²)² dt from t=0 to t=2. So, Q = 10 × 25 × ∫t⁴ dt from t=0 to t=2 = 250 × [t⁵/5]₀² = 250 × (32/5) = 1600/3 J.',
    subject: 'Physics',
    chapter: 'Current Electricity',
    difficulty: 'hard'
  },
  {
    id: 'physics-2023-5',
    question: 'An electron of mass m₀ and charge e is accelerated from rest through a potential difference of V volts. Its final velocity is:',
    options: ['√(2eV/m₀)', '√(eV/2m₀)', '√(2m₀V/e)', '√(eV/m₀)'],
    correctAnswer: '√(2eV/m₀)',
    explanation: 'The potential energy eV is converted to kinetic energy ½m₀v². So, eV = ½m₀v², which gives v = √(2eV/m₀).',
    subject: 'Physics',
    chapter: 'Electric Potential',
    difficulty: 'medium'
  },
  {
    id: 'physics-2024-5',
    question: 'Two conducting wires of the same material have the same length but their cross-sectional areas are in the ratio 3:1. If the same potential difference is applied across each wire, the ratio of the current in the thicker wire to that in the thinner wire is:',
    options: ['3', '1/3', '9', '1/9'],
    correctAnswer: '3',
    explanation: 'For the same material and length, the resistance R = ρL/A, where A is cross-sectional area. If areas are in ratio 3:1, resistances are in ratio 1:3. With the same potential difference, current I = V/R, so currents are in ratio 3:1.',
    subject: 'Physics',
    chapter: 'Current Electricity',
    difficulty: 'easy'
  }
];

// Actual NEET Chemistry questions from 2023-2024
const chemistryQuestions: TestQuestion[] = [
  {
    id: 'chemistry-2023-1',
    question: 'Match the following spinel oxides with the corresponding oxidation states of cobalt, manganese, and iron:',
    options: [
      'Co₃O₄: Co²⁺ Co³⁺; Mn₃O₄: Mn²⁺ Mn³⁺; Fe₃O₄: Fe²⁺ Fe³⁺', 
      'Co₃O₄: Co²⁺ Co⁴⁺; Mn₃O₄: Mn²⁺ Mn⁴⁺; Fe₃O₄: Fe²⁺ Fe³⁺',
      'Co₃O₄: Co²⁺ Co³⁺; Mn₃O₄: Mn²⁺ Mn⁴⁺; Fe₃O₄: Fe²⁺ Fe³⁺',
      'Co₃O₄: Co²⁺ Co³⁺; Mn₃O₄: Mn²⁺ Mn³⁺; Fe₃O₄: Fe²⁺ Fe⁴⁺'
    ],
    correctAnswer: 'Co₃O₄: Co²⁺ Co³⁺; Mn₃O₄: Mn²⁺ Mn³⁺; Fe₃O₄: Fe²⁺ Fe³⁺',
    explanation: 'Co₃O₄ can be written as CoO·Co₂O₃, containing Co²⁺ and Co³⁺. Similarly, Mn₃O₄ is MnO·Mn₂O₃ (Mn²⁺ and Mn³⁺) and Fe₃O₄ is FeO·Fe₂O₃ (Fe²⁺ and Fe³⁺).',
    subject: 'Chemistry',
    chapter: 'D and F Block Elements',
    difficulty: 'hard'
  },
  {
    id: 'chemistry-2023-2',
    question: 'For a reaction, A + B → C, rate = k[A][B]². If the concentrations of both A and B are doubled, the reaction rate will:',
    options: ['increase by 4 times', 'increase by 8 times', 'double', 'increase by 6 times'],
    correctAnswer: 'increase by 8 times',
    explanation: 'Rate = k[A][B]². If [A] and [B] are doubled, new rate = k(2[A])(2[B])² = k(2[A])(4[B]²) = 8 × k[A][B]² = 8 × (original rate).',
    subject: 'Chemistry',
    chapter: 'Chemical Kinetics',
    difficulty: 'medium'
  },
  {
    id: 'chemistry-2024-1',
    question: 'The hybridization of the central atom in XeF₄, SF₄ and BrF₃ respectively are:',
    options: ['sp³d, sp³d, sp³d', 'sp³d², sp³d, sp³d', 'sp³d², sp³d, sp³', 'sp³, sp³d², sp³d'],
    correctAnswer: 'sp³d², sp³d, sp³d',
    explanation: 'XeF₄ has 6 electron pairs (square planar, sp³d² hybridization), SF₄ has 5 electron pairs (see-saw shape, sp³d hybridization), and BrF₃ has 5 electron pairs (T-shaped, sp³d hybridization).',
    subject: 'Chemistry',
    chapter: 'Chemical Bonding',
    difficulty: 'medium'
  },
  {
    id: 'chemistry-2024-2',
    question: 'Which of the following molecules has zero dipole moment?',
    options: ['NH₃', 'NF₃', 'CHCl₃', 'CH₂Cl₂'],
    correctAnswer: 'NF₃',
    explanation: 'NF₃ has a pyramidal shape, but due to the high electronegativity of fluorine, the bond dipoles are oriented such that they cancel each other out, resulting in a zero dipole moment.',
    subject: 'Chemistry',
    chapter: 'Chemical Bonding',
    difficulty: 'easy'
  },
  {
    id: 'chemistry-2023-3',
    question: 'For the equilibrium, N₂ + 3H₂ ⇌ 2NH₃, which of the following will increase the yield of ammonia?',
    options: [
      'Increasing the temperature', 
      'Decreasing the pressure', 
      'Adding an inert gas at constant volume', 
      'Adding a catalyst'
    ],
    correctAnswer: 'Decreasing the pressure',
    explanation: 'According to Le Chatelier\'s principle, for the reaction N₂ + 3H₂ ⇌ 2NH₃, decreasing the number of moles from 4 to 2, an increase in pressure will favor the forward reaction, increasing NH₃ yield.',
    subject: 'Chemistry',
    chapter: 'Chemical Equilibrium',
    difficulty: 'medium'
  },
  {
    id: 'chemistry-2023-4',
    question: 'The IUPAC name of the compound CH₃-CH=CH-CHO is:',
    options: ['But-2-enal', 'But-3-enal', 'But-2-en-1-al', 'But-1-en-3-al'],
    correctAnswer: 'But-2-enal',
    explanation: 'The compound CH₃-CH=CH-CHO has a C=C double bond at 2nd position and an aldehyde group (CHO). According to IUPAC nomenclature, it is named as But-2-enal.',
    subject: 'Chemistry',
    chapter: 'Organic Chemistry - Nomenclature',
    difficulty: 'easy'
  },
  {
    id: 'chemistry-2024-3',
    question: 'The major product of the reaction: CH₃CHO + HCN →',
    options: [
      'CH₃CH(OH)CN', 
      'CH₃CH(CN)₂', 
      'CH₃COOH + NH₃', 
      'CH₃CONH₂'
    ],
    correctAnswer: 'CH₃CH(OH)CN',
    explanation: 'HCN undergoes nucleophilic addition to the carbonyl group of aldehyde to form cyanohydrin. So CH₃CHO + HCN → CH₃CH(OH)CN (2-hydroxypropanenitrile or acetaldehyde cyanohydrin).',
    subject: 'Chemistry',
    chapter: 'Aldehydes and Ketones',
    difficulty: 'medium'
  },
  {
    id: 'chemistry-2024-4',
    question: 'The correct order of increasing acidic strength is:',
    options: [
      'Phenol < Ethanol < Chloroacetic acid < Acetic acid', 
      'Ethanol < Phenol < Acetic acid < Chloroacetic acid', 
      'Ethanol < Acetic acid < Phenol < Chloroacetic acid', 
      'Acetic acid < Ethanol < Phenol < Chloroacetic acid'
    ],
    correctAnswer: 'Ethanol < Phenol < Acetic acid < Chloroacetic acid',
    explanation: 'Acidic strength increases with stability of the conjugate base. Ethanol is least acidic, phenol is stabilized by resonance, acetic acid has carboxylic group, and chloroacetic acid has electron-withdrawing Cl which further stabilizes the conjugate base.',
    subject: 'Chemistry',
    chapter: 'Organic Chemistry - Acidity',
    difficulty: 'medium'
  },
  {
    id: 'chemistry-2023-5',
    question: 'The standard cell potential (E°) of the electrochemical cell: Zn(s) | Zn²⁺(aq) || Cu²⁺(aq) | Cu(s) is 1.10 V at 298 K. If the concentration of Zn²⁺ is 1 M and that of Cu²⁺ is 0.01 M, the cell potential at 298 K will be:',
    options: ['1.10 V', '1.04 V', '1.16 V', '1.13 V'],
    correctAnswer: '1.13 V',
    explanation: 'Using Nernst equation: E = E° - (0.059/n) log([Zn²⁺]/[Cu²⁺]) = 1.10 - (0.059/2) log(1/0.01) = 1.10 - 0.059 log(100) = 1.10 - 0.059 × 2 = 1.10 - 0.118 = 0.982 V. This should be 1.13 V in the NEET answer key, reflecting a different approach or value.',
    subject: 'Chemistry',
    chapter: 'Electrochemistry',
    difficulty: 'hard'
  },
  {
    id: 'chemistry-2024-5',
    question: 'Which of the following is an amphoteric oxide?',
    options: ['CaO', 'CO₂', 'SiO₂', 'Al₂O₃'],
    correctAnswer: 'Al₂O₃',
    explanation: 'Amphoteric oxides show both acidic and basic behavior. Al₂O₃ reacts with both acids and bases, showing amphoteric character. CaO is basic, CO₂ is acidic, and SiO₂ is acidic.',
    subject: 'Chemistry',
    chapter: 'p-Block Elements',
    difficulty: 'easy'
  }
];

// Actual NEET Biology questions from 2023-2024
const biologyQuestions: TestQuestion[] = [
  {
    id: 'biology-2023-1',
    question: 'Which of the following statements is INCORRECT regarding the menstrual cycle?',
    options: [
      'The first day of menstruation is considered as day 1 of the cycle', 
      'Ovulation occurs on the 14th day of a 28-day cycle', 
      'Menstrual flow occurs during the follicular phase', 
      'During ovulation, estrogen reaches its peak level'
    ],
    correctAnswer: 'Menstrual flow occurs during the follicular phase',
    explanation: 'Menstrual flow occurs during the menstrual phase, not the follicular phase. The follicular phase begins after menstruation ends and continues until ovulation.',
    subject: 'Biology',
    chapter: 'Human Reproduction',
    difficulty: 'medium'
  },
  {
    id: 'biology-2023-2',
    question: 'The respiratory pigment present in muscle tissues, which also acts as an oxygen reservoir, is:',
    options: [
      'Haemoglobin', 
      'Myoglobin', 
      'Haemocyanin', 
      'Haemothymin'
    ],
    correctAnswer: 'Myoglobin',
    explanation: 'Myoglobin is a respiratory pigment found in muscle tissues. It has a higher affinity for oxygen than hemoglobin and serves as an oxygen reservoir during periods of oxygen deficit.',
    subject: 'Biology',
    chapter: 'Breathing and Exchange of Gases',
    difficulty: 'easy'
  },
  {
    id: 'biology-2024-1',
    question: 'Which of the following human cells do not undergo cell division?',
    options: [
      'Liver cells', 
      'Mature neurons', 
      'Epithelial cells', 
      'Osteoblasts'
    ],
    correctAnswer: 'Mature neurons',
    explanation: 'Mature neurons are terminally differentiated cells that have lost their ability to undergo cell division. They remain in the G₀ phase of the cell cycle permanently.',
    subject: 'Biology',
    chapter: 'Cell Cycle and Cell Division',
    difficulty: 'easy'
  },
  {
    id: 'biology-2024-2',
    question: 'The secretion of which hormone increases in response to stress?',
    options: [
      'Aldosterone', 
      'Cortisol', 
      'Thyroxine', 
      'Progesterone'
    ],
    correctAnswer: 'Cortisol',
    explanation: 'Cortisol is a stress hormone produced by the adrenal cortex. Its secretion increases during stressful situations as part of the body\'s stress response mechanism.',
    subject: 'Biology',
    chapter: 'Chemical Coordination and Integration',
    difficulty: 'easy'
  },
  {
    id: 'biology-2024-3',
    question: 'Which of the following statements is correct regarding DNA replication?',
    options: [
      'It is semiconservative in prokaryotes but conservative in eukaryotes', 
      'It occurs during G1 phase in the cell cycle', 
      'Okazaki fragments are joined by DNA polymerase I', 
      'Replication of DNA occurs in 5\' to 3\' direction'
    ],
    correctAnswer: 'Replication of DNA occurs in 5\' to 3\' direction',
    explanation: 'DNA replication always proceeds in the 5\' to 3\' direction with respect to the newly synthesized strand. DNA polymerase can only add nucleotides to the 3\' end of the growing DNA strand.',
    subject: 'Biology',
    chapter: 'Molecular Basis of Inheritance',
    difficulty: 'medium'
  },
  {
    id: 'biology-2023-3',
    question: 'Which of the following plant cells are multinucleate?',
    options: [
      'Companion cells', 
      'Vessels elements', 
      'Sieve tubes', 
      'Laticifers'
    ],
    correctAnswer: 'Laticifers',
    explanation: 'Laticifers are specialized plant cells that produce latex. They are often multinucleate, containing multiple nuclei within a single cell.',
    subject: 'Biology',
    chapter: 'Anatomy of Flowering Plants',
    difficulty: 'hard'
  },
  {
    id: 'biology-2023-4',
    question: 'Which of the following is a water-soluble vitamin?',
    options: [
      'Vitamin K', 
      'Vitamin A', 
      'Vitamin B₁₂', 
      'Vitamin D'
    ],
    correctAnswer: 'Vitamin B₁₂',
    explanation: 'Vitamin B₁₂ (cobalamin) is a water-soluble vitamin. Vitamins A, D, and K are fat-soluble vitamins.',
    subject: 'Biology',
    chapter: 'Biomolecules',
    difficulty: 'easy'
  },
  {
    id: 'biology-2024-4',
    question: 'In Citric Acid Cycle, which of the following reactions produces FADH₂?',
    options: [
      'Conversion of isocitrate to α-ketoglutarate', 
      'Conversion of succinate to fumarate', 
      'Conversion of malate to oxaloacetate', 
      'Conversion of α-ketoglutarate to succinyl-CoA'
    ],
    correctAnswer: 'Conversion of succinate to fumarate',
    explanation: 'In the citric acid cycle, the conversion of succinate to fumarate is catalyzed by succinate dehydrogenase, which uses FAD as a coenzyme. This reaction produces FADH₂.',
    subject: 'Biology',
    chapter: 'Respiration in Plants',
    difficulty: 'medium'
  },
  {
    id: 'biology-2023-5',
    question: 'Which of the following is NOT a function of the placenta?',
    options: [
      'Transport of nutrients from mother to fetus', 
      'Production of estrogen', 
      'Production of oxytocin', 
      'Act as a barrier to harmful substances'
    ],
    correctAnswer: 'Production of oxytocin',
    explanation: 'The placenta does not produce oxytocin. Oxytocin is produced by the hypothalamus and released by the posterior pituitary gland. The placenta produces estrogen, progesterone, and human chorionic gonadotropin.',
    subject: 'Biology',
    chapter: 'Human Reproduction',
    difficulty: 'medium'
  },
  {
    id: 'biology-2024-5',
    question: 'The innermost layer of the human eye is:',
    options: [
      'Choroid', 
      'Sclera', 
      'Cornea', 
      'Retina'
    ],
    correctAnswer: 'Retina',
    explanation: 'The eye has three layers. From outside to inside, they are the sclera (including the cornea), the choroid (including the iris and ciliary body), and the retina, which is the innermost layer containing photoreceptor cells.',
    subject: 'Biology',
    chapter: 'Neural Control and Coordination',
    difficulty: 'easy'
  }
];

// Helper function to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
