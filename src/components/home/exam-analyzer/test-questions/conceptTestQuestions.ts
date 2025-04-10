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
      {
        id: 'ct-phys2',
        question: 'Which of the following is a vector quantity?',
        options: ['Energy', 'Mass', 'Velocity', 'Temperature'],
        correctAnswer: 'Velocity',
        timeLimit: 60,
        explanation: 'Velocity is a vector quantity because it has both magnitude and direction.'
      },
      {
        id: 'ct-phys3',
        question: 'According to Newton\'s Second Law, force equals:',
        options: ['mass × velocity', 'mass × acceleration', 'mass / acceleration', 'mass + velocity'],
        correctAnswer: 'mass × acceleration',
        timeLimit: 60,
        explanation: 'Newton\'s Second Law states that F = ma, where F is force, m is mass, and a is acceleration.'
      },
      {
        id: 'ct-phys4',
        question: 'What is the formula for kinetic energy?',
        options: ['mgh', '1/2 mv²', 'mv', 'ma'],
        correctAnswer: '1/2 mv²',
        timeLimit: 60,
        explanation: 'The kinetic energy of an object is given by KE = 1/2 mv², where m is mass and v is velocity.'
      },
      {
        id: 'ct-phys5',
        question: 'Which law of thermodynamics states that energy cannot be created or destroyed?',
        options: ['Zeroth law', 'First law', 'Second law', 'Third law'],
        correctAnswer: 'First law',
        timeLimit: 60,
        explanation: 'The First Law of Thermodynamics states that energy cannot be created or destroyed, only transformed from one form to another.'
      },
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
      {
        id: 'ct-chem2',
        question: 'Which of the following is NOT an element in Group 1 (alkali metals)?',
        options: ['Sodium', 'Potassium', 'Calcium', 'Lithium'],
        correctAnswer: 'Calcium',
        timeLimit: 60,
        explanation: 'Calcium is in Group 2 (alkaline earth metals). Sodium, Potassium, and Lithium are all alkali metals in Group 1.'
      },
      {
        id: 'ct-chem3',
        question: 'What is the molecular formula of glucose?',
        options: ['C₆H₁₂O₆', 'C₁₂H₂₂O₁₁', 'C₂H₆O', 'CH₃COOH'],
        correctAnswer: 'C₆H₁₂O₆',
        timeLimit: 60,
        explanation: 'Glucose has the molecular formula C₆H₁₂O₆.'
      },
      {
        id: 'ct-chem4',
        question: 'Which type of bond is formed by the sharing of electrons?',
        options: ['Ionic bond', 'Covalent bond', 'Metallic bond', 'Hydrogen bond'],
        correctAnswer: 'Covalent bond',
        timeLimit: 60,
        explanation: 'A covalent bond is formed by the sharing of electron pairs between atoms.'
      },
      {
        id: 'ct-chem5',
        question: 'What is the oxidation state of oxygen in H₂O?',
        options: ['+2', '-2', '0', '+1'],
        correctAnswer: '-2',
        timeLimit: 60,
        explanation: 'In most compounds including water, oxygen has an oxidation state of -2.'
      },
    ],
    "Biology": [
      {
        id: 'ct-bio1',
        question: 'Which organelle is known as the "powerhouse of the cell"?',
        options: ['Nucleus', 'Mitochondria', 'Golgi apparatus', 'Lysosome'],
        correctAnswer: 'Mitochondria',
        timeLimit: 60,
        explanation: 'Mitochondria are called the powerhouse of the cell because they produce ATP through cellular respiration.'
      },
      {
        id: 'ct-bio2',
        question: 'Which of the following is NOT a nucleotide base in DNA?',
        options: ['Adenine', 'Uracil', 'Guanine', 'Thymine'],
        correctAnswer: 'Uracil',
        timeLimit: 60,
        explanation: 'Uracil is found in RNA, not in DNA. DNA contains Adenine (A), Guanine (G), Cytosine (C), and Thymine (T).'
      },
      {
        id: 'ct-bio3',
        question: 'What is the function of stomata in plants?',
        options: ['Photosynthesis', 'Gas exchange', 'Water storage', 'Nutrient transport'],
        correctAnswer: 'Gas exchange',
        timeLimit: 60,
        explanation: 'Stomata are tiny pores in plant leaves that allow for gas exchange – taking in carbon dioxide and releasing oxygen.'
      },
      {
        id: 'ct-bio4',
        question: 'Which of the following is a function of the liver?',
        options: ['Hormone production', 'Urine formation', 'Bile production', 'Blood cell production'],
        correctAnswer: 'Bile production',
        timeLimit: 60,
        explanation: 'One of the main functions of the liver is to produce bile, which helps in digestion by breaking down fats.'
      },
      {
        id: 'ct-bio5',
        question: 'Which of these is NOT a stage of mitosis?',
        options: ['Prophase', 'Interphase', 'Metaphase', 'Telophase'],
        correctAnswer: 'Interphase',
        timeLimit: 60,
        explanation: 'Interphase is the period between cell divisions, not a stage of mitosis itself. The stages of mitosis are prophase, metaphase, anaphase, and telophase.'
      },
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
      {
        id: 'ct-iit-math2',
        question: 'The value of ∫(sin²x)dx is:',
        options: [
          'cosx + C',
          '-cosx + C',
          'x/2 - (sin2x)/4 + C',
          'sin2x/2 + C'
        ],
        correctAnswer: 'x/2 - (sin2x)/4 + C',
        timeLimit: 60,
        explanation: 'Using the identity sin²x = (1-cos2x)/2, we get ∫(sin²x)dx = ∫(1-cos2x)/2 dx = x/2 - sin2x/4 + C.'
      },
      {
        id: 'ct-iit-math3',
        question: 'If matrix A = [1 2; 3 4], what is det(A)?',
        options: [
          '2',
          '-2',
          '5',
          '10'
        ],
        correctAnswer: '-2',
        timeLimit: 60,
        explanation: 'For a 2×2 matrix [a b; c d], the determinant is ad-bc. So for A, det(A) = 1×4 - 2×3 = 4 - 6 = -2.'
      },
      {
        id: 'ct-iit-math4',
        question: 'The equation of the tangent to y = x² at the point (2, 4) is:',
        options: [
          'y = 4x - 4',
          'y = 4x - 8',
          'y = 2x',
          'y = 4x'
        ],
        correctAnswer: 'y = 4x - 4',
        timeLimit: 60,
        explanation: 'The derivative of y = x² is y\' = 2x. At x = 2, the slope is y\' = 4. The equation of the tangent is y - 4 = 4(x - 2), which simplifies to y = 4x - 4.'
      },
      {
        id: 'ct-iit-math5',
        question: 'If z = 1 + i, then |z|² equals:',
        options: [
          '1',
          '2',
          '√2',
          'i'
        ],
        correctAnswer: '2',
        timeLimit: 60,
        explanation: 'For a complex number z = a + bi, |z|² = a² + b². So for z = 1 + i, |z|² = 1² + 1² = 2.'
      },
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
      {
        id: 'ct-iit-phys2',
        question: 'A car accelerates uniformly from rest to 72 km/h in 10 seconds. The distance traveled is:',
        options: [
          '100 m',
          '200 m',
          '360 m',
          '720 m'
        ],
        correctAnswer: '100 m',
        timeLimit: 60,
        explanation: 'Converting 72 km/h to 20 m/s. For uniform acceleration from rest, distance = (1/2)at². The acceleration is a = 20/10 = 2 m/s². So distance = 0.5 × 2 × 10² = 100 m.'
      },
      {
        id: 'ct-iit-phys3',
        question: 'Which of the following is the correct expression for the de Broglie wavelength of a particle?',
        options: [
          'λ = h/p',
          'λ = h/E',
          'λ = p/h',
          'λ = E/h'
        ],
        correctAnswer: 'λ = h/p',
        timeLimit: 60,
        explanation: 'The de Broglie wavelength of a particle is given by λ = h/p, where h is Planck\'s constant and p is the momentum of the particle.'
      },
      {
        id: 'ct-iit-phys4',
        question: 'The electric field inside a charged conducting sphere is:',
        options: [
          'Zero',
          'Constant and non-zero',
          'Directly proportional to the distance from center',
          'Inversely proportional to the square of distance from center'
        ],
        correctAnswer: 'Zero',
        timeLimit: 60,
        explanation: 'The electric field inside a charged conductor is always zero in electrostatic equilibrium.'
      },
      {
        id: 'ct-iit-phys5',
        question: 'Two resistors with resistances R₁ and R₂ are connected in parallel. The equivalent resistance is:',
        options: [
          'R₁ + R₂',
          'R₁R₂',
          'R₁R₂/(R₁+R₂)',
          'R₁/R₂'
        ],
        correctAnswer: 'R₁R₂/(R₁+R₂)',
        timeLimit: 60,
        explanation: 'For resistors in parallel, the equivalent resistance R is given by 1/R = 1/R₁ + 1/R₂, which simplifies to R = R₁R₂/(R₁+R₂).'
      },
    ],
    "Chemistry": [
      {
        id: 'ct-iit-chem1',
        question: 'Which of the following has the highest lattice energy?',
        options: [
          'NaCl',
          'KCl',
          'MgO',
          'CaO'
        ],
        correctAnswer: 'MgO',
        timeLimit: 60,
        explanation: 'MgO has the highest lattice energy due to higher charges (+2 and -2) and smaller ionic radii compared to the other compounds.'
      },
      {
        id: 'ct-iit-chem2',
        question: 'The hybridization of carbon in acetylene (C₂H₂) is:',
        options: [
          'sp',
          'sp²',
          'sp³',
          'sp³d'
        ],
        correctAnswer: 'sp',
        timeLimit: 60,
        explanation: 'In acetylene (HC≡CH), each carbon atom has two regions of electron density (one triple bond and one single bond), resulting in sp hybridization.'
      },
      {
        id: 'ct-iit-chem3',
        question: 'Which mechanism is typically followed in the addition of HBr to propene?',
        options: [
          'Electrophilic addition',
          'Nucleophilic addition',
          'Free radical addition',
          'Coordination addition'
        ],
        correctAnswer: 'Electrophilic addition',
        timeLimit: 60,
        explanation: 'The addition of HBr to propene typically follows an electrophilic addition mechanism, where H⁺ acts as the electrophile and attacks the π bond.'
      },
      {
        id: 'ct-iit-chem4',
        question: 'According to VSEPR theory, the shape of SF₆ is:',
        options: [
          'Tetrahedral',
          'Octahedral',
          'Square planar',
          'Trigonal bipyramidal'
        ],
        correctAnswer: 'Octahedral',
        timeLimit: 60,
        explanation: 'SF₆ has six bonding pairs around the central sulfur atom with no lone pairs, resulting in an octahedral geometry according to VSEPR theory.'
      },
      {
        id: 'ct-iit-chem5',
        question: 'Which of these represents a conjugate acid-base pair?',
        options: [
          'HCl and NaOH',
          'HCl and Cl⁻',
          'H₂O and OH⁻',
          'NH₃ and NH₄⁺'
        ],
        correctAnswer: 'NH₃ and NH₄⁺',
        timeLimit: 60,
        explanation: 'A conjugate acid-base pair differs by a proton (H⁺). NH₄⁺ is the conjugate acid of the base NH₃ (NH₃ + H⁺ → NH₄⁺).'
      },
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
      {
        id: 'ct-neet-bio2',
        question: 'Which of these is NOT involved in the process of photosynthesis?',
        options: ['Chloroplast', 'Stomata', 'Mitochondria', 'Chlorophyll'],
        correctAnswer: 'Mitochondria',
        timeLimit: 60,
        explanation: 'Mitochondria are involved in cellular respiration, not photosynthesis. Chloroplasts, stomata, and chlorophyll all play roles in photosynthesis.'
      },
      {
        id: 'ct-neet-bio3',
        question: 'The enzyme that catalyzes CO₂ fixation in C₃ plants is:',
        options: ['Rubisco', 'PEP carboxylase', 'Pyruvate kinase', 'Hexokinase'],
        correctAnswer: 'Rubisco',
        timeLimit: 60,
        explanation: 'In C₃ plants, the enzyme Rubisco (Ribulose-1,5-bisphosphate carboxylase/oxygenase) catalyzes the first major step of carbon fixation.'
      },
      {
        id: 'ct-neet-bio4',
        question: 'Which of the following is NOT a function of the kidney?',
        options: ['Excretion of nitrogenous waste', 'Osmoregulation', 'Digestion of proteins', 'Maintaining blood pH'],
        correctAnswer: 'Digestion of proteins',
        timeLimit: 60,
        explanation: 'Protein digestion occurs in the digestive system, not in kidneys. Kidneys are responsible for excretion, osmoregulation, and maintaining blood pH and ion balance.'
      },
      {
        id: 'ct-neet-bio5',
        question: 'Which chamber of the heart receives oxygenated blood from the lungs?',
        options: ['Right atrium', 'Left atrium', 'Right ventricle', 'Left ventricle'],
        correctAnswer: 'Left atrium',
        timeLimit: 60,
        explanation: 'The left atrium receives oxygenated blood from the lungs via the pulmonary veins.'
      },
    ],
    "Physics": [
      {
        id: 'ct-neet-phys1',
        question: 'What is the SI unit of pressure?',
        options: ['Newton', 'Pascal', 'Joule', 'Watt'],
        correctAnswer: 'Pascal',
        timeLimit: 60,
        explanation: 'The SI unit of pressure is Pascal (Pa), which is equal to one newton per square meter (N/m²).'
      },
      {
        id: 'ct-neet-phys2',
        question: 'Which physical principle explains why a person standing in an elevator feels heavier when it accelerates upward?',
        options: ['Newton\'s First Law', 'Newton\'s Second Law', 'Newton\'s Third Law', 'Law of Conservation of Energy'],
        correctAnswer: 'Newton\'s Second Law',
        timeLimit: 60,
        explanation: 'Newton\'s Second Law explains this phenomenon. The apparent weight increases due to the additional force required to accelerate the body upward.'
      },
      {
        id: 'ct-neet-phys3',
        question: 'The refractive index of a medium is related to:',
        options: ['Speed of light in the medium', 'Density of the medium', 'Color of light', 'Temperature of the medium'],
        correctAnswer: 'Speed of light in the medium',
        timeLimit: 60,
        explanation: 'The refractive index of a medium is defined as the ratio of the speed of light in vacuum to the speed of light in that medium.'
      },
      {
        id: 'ct-neet-phys4',
        question: 'According to Bohr\'s model, the energy of an electron in the nth orbit of hydrogen atom is proportional to:',
        options: ['n', '1/n', 'n²', '1/n²'],
        correctAnswer: '1/n²',
        timeLimit: 60,
        explanation: 'According to Bohr\'s model, the energy of an electron in the nth orbit of hydrogen atom is proportional to -1/n², where n is the principal quantum number.'
      },
      {
        id: 'ct-neet-phys5',
        question: 'If the half-life of a radioactive substance is 30 days, how much of the original sample will remain after 90 days?',
        options: ['1/3', '1/8', '1/4', '1/6'],
        correctAnswer: '1/8',
        timeLimit: 60,
        explanation: 'After 90 days (3 half-lives), the fraction remaining is (1/2)³ = 1/8 of the original amount.'
      },
    ],
    "Chemistry": [
      {
        id: 'ct-neet-chem1',
        question: 'Which electronic configuration represents an excited state of an atom?',
        options: ['1s² 2s² 2p⁶', '1s² 2s² 2p⁵ 3s¹', '1s² 2s² 2p⁶ 3s²', '1s² 2s² 2p⁶ 3s¹'],
        correctAnswer: '1s² 2s² 2p⁵ 3s¹',
        timeLimit: 60,
        explanation: '1s² 2s² 2p⁵ 3s¹ is an excited state because an electron has moved from 2p to 3s before completely filling the 2p orbital.'
      },
      {
        id: 'ct-neet-chem2',
        question: 'Which class of organic compounds has the general formula CₙH₂ₙ₊₂?',
        options: ['Alkanes', 'Alkenes', 'Alkynes', 'Alcohols'],
        correctAnswer: 'Alkanes',
        timeLimit: 60,
        explanation: 'Alkanes have the general molecular formula CₙH₂ₙ₊₂ and contain only single bonds between carbon atoms.'
      },
      {
        id: 'ct-neet-chem3',
        question: 'Which of the following is a strong electrolyte?',
        options: ['Ethanol', 'Acetic acid', 'Hydrochloric acid', 'Glucose'],
        correctAnswer: 'Hydrochloric acid',
        timeLimit: 60,
        explanation: 'Hydrochloric acid is a strong electrolyte as it completely dissociates into ions in aqueous solution.'
      },
      {
        id: 'ct-neet-chem4',
        question: 'What is the hybridization of carbon in carbon dioxide (CO₂)?',
        options: ['sp', 'sp²', 'sp³', 'sp³d'],
        correctAnswer: 'sp',
        timeLimit: 60,
        explanation: 'In CO₂, the carbon atom forms two double bonds with oxygen atoms, resulting in a linear geometry with sp hybridization.'
      },
      {
        id: 'ct-neet-chem5',
        question: 'The pH of a 0.01 M NaOH solution is:',
        options: ['2', '7', '12', '10'],
        correctAnswer: '12',
        timeLimit: 60,
        explanation: 'For a strong base like NaOH, pOH = -log[OH⁻] = -log(0.01) = 2. Since pH + pOH = 14, pH = 14 - 2 = 12.'
      },
    ],
  },

  // Add more exam-specific question sets as needed
};

export const getConceptTopics = (examType: string): SubjectTopic[] => {
  const examQuestions = conceptTestQuestions[examType] || conceptTestQuestions.default;
  
  return Object.keys(examQuestions).map(subject => ({
    id: subject.toLowerCase().replace(/\s+/g, '-'),
    subject: subject,
    topics: 5 // Each subject has 5 questions
  }));
};

export const getConceptTestQuestions = (examType: string, subject: string): TestQuestion[] => {
  const examQuestions = conceptTestQuestions[examType] || conceptTestQuestions.default;
  return examQuestions[subject] || [];
};
