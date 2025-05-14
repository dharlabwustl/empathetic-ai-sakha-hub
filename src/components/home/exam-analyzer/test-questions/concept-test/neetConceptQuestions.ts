
import { TestQuestion } from '../../types';

// NEET specific concept questions with emphasis on Physics, Chemistry, and Biology
export const neetConceptQuestions: TestQuestion[] = [
  // Physics questions
  {
    id: 'neet-phy1',
    question: 'If a radioactive sample initially contains N₀ nuclei, the number of nuclei remaining after time t = 2T₁/₂ is:',
    options: ['N₀/4', 'N₀/2', 'N₀/8', '2N₀'],
    correctAnswer: 'N₀/4',
    timeLimit: 30,
    explanation: 'After time t = 2T₁/₂ (two half-lives), the number of nuclei becomes N = N₀(1/2)² = N₀/4',
    category: 'Physics',
    difficulty: 'medium'
  },
  {
    id: 'neet-phy2',
    question: 'A spring with spring constant k is cut into two parts such that one part is double the length of the other. The spring constant of the shorter part will be:',
    options: ['k/3', '3k', '3k/2', '2k/3'],
    correctAnswer: '3k',
    timeLimit: 30,
    explanation: 'For a spring of length L and spring constant k, if cut into lengths L₁ = 2L/3 and L₂ = L/3, then k₁ = 3k/2 and k₂ = 3k. The shorter part has spring constant 3k.',
    category: 'Physics',
    difficulty: 'hard'
  },
  {
    id: 'neet-phy3',
    question: 'For a real gas, what is the correct relation between pressure (P), volume (V), and temperature (T)?',
    options: ['PV = nRT', 'P(V - nb) = nRT', '(P + an²/V²)(V - nb) = nRT', 'PV² = constant'],
    correctAnswer: '(P + an²/V²)(V - nb) = nRT',
    timeLimit: 30,
    explanation: 'The van der Waals equation for real gases is (P + an²/V²)(V - nb) = nRT, where a and b are constants specific to the gas.',
    category: 'Physics',
    difficulty: 'medium'
  },
  
  // Chemistry questions
  {
    id: 'neet-chem1',
    question: 'Which of the following is NOT an isomer of butane (C₄H₁₀)?',
    options: ['2-methylpropane', 'Cyclobutane', 'n-butane', '2,2-dimethylpropane'],
    correctAnswer: 'Cyclobutane',
    timeLimit: 30,
    explanation: 'Cyclobutane has formula C₄H₈, not C₄H₁₀, so it is not an isomer of butane.',
    category: 'Chemistry',
    difficulty: 'medium'
  },
  {
    id: 'neet-chem2',
    question: 'The IUPAC name for the compound CH₃-CH=CH-CO-CH₃ is:',
    options: ['3-penten-2-one', '2-pentene-4-one', '4-penten-2-one', 'Pent-3-en-2-one'],
    correctAnswer: 'Pent-3-en-2-one',
    timeLimit: 30,
    explanation: 'The compound has a ketone group at C-2 and a double bond between C-3 and C-4, making it pent-3-en-2-one per IUPAC naming rules.',
    category: 'Chemistry',
    difficulty: 'hard'
  },
  {
    id: 'neet-chem3',
    question: 'Which orbital has the highest energy in a multi-electron atom?',
    options: ['3d', '4s', '3p', '4p'],
    correctAnswer: '4p',
    timeLimit: 30,
    explanation: 'The energy of orbitals increases as: 4s < 3d < 4p. The 4p orbital has the highest energy among these options.',
    category: 'Chemistry',
    difficulty: 'medium'
  },
  
  // Biology questions
  {
    id: 'neet-bio1',
    question: 'Which of the following is the site for photorespiration?',
    options: ['Chloroplast only', 'Peroxisome only', 'Mitochondria only', 'Chloroplast, peroxisome and mitochondria'],
    correctAnswer: 'Chloroplast, peroxisome and mitochondria',
    timeLimit: 30,
    explanation: 'Photorespiration is a process that spans three organelles: chloroplast (where RuBP carboxylation/oxygenation occurs), peroxisomes (where glycolate oxidation occurs), and mitochondria (where glycine is converted to serine).',
    category: 'Biology',
    difficulty: 'medium'
  },
  {
    id: 'neet-bio2',
    question: 'Which structure connects the small intestine and the large intestine?',
    options: ['Ileum', 'Cecum', 'Ileocecal valve', 'Duodenum'],
    correctAnswer: 'Ileocecal valve',
    timeLimit: 30,
    explanation: 'The ileocecal valve is a sphincter muscle that separates the last part of the small intestine (ileum) from the first part of the large intestine (cecum).',
    category: 'Biology',
    difficulty: 'easy'
  },
  {
    id: 'neet-bio3',
    question: 'In a typical animal cell, DNA is found in:',
    options: ['Nucleus only', 'Mitochondria only', 'Nucleus and mitochondria', 'Nucleus, mitochondria, and chloroplasts'],
    correctAnswer: 'Nucleus and mitochondria',
    timeLimit: 30,
    explanation: 'In animal cells, DNA is found in the nucleus (nuclear DNA) and in mitochondria (mitochondrial DNA). Chloroplasts are not present in animal cells.',
    category: 'Biology',
    difficulty: 'easy'
  },
  
  // Additional biology questions
  {
    id: 'neet-bio4',
    question: 'Which of the following is NOT a function of the liver?',
    options: ['Detoxification', 'Protein synthesis', 'Storage of vitamin B12', 'Secretion of insulin'],
    correctAnswer: 'Secretion of insulin',
    timeLimit: 30,
    explanation: 'Insulin is produced and secreted by beta cells of the pancreas, not by the liver.',
    category: 'Biology',
    difficulty: 'medium'
  },
  {
    id: 'neet-bio5',
    question: 'Which of these is a site for exchange of gases in plants?',
    options: ['Lenticels', 'Guard cells', 'Stomata', 'All of these'],
    correctAnswer: 'All of these',
    timeLimit: 30,
    explanation: 'Gas exchange in plants occurs through stomata (mainly on leaves), lenticels (on woody stems), and guard cells regulate the opening and closing of stomata.',
    category: 'Biology',
    difficulty: 'medium'
  },
  
  // Additional physics questions
  {
    id: 'neet-phy4',
    question: 'If a moving electron enters a magnetic field at an angle of 90° to the field, it will:',
    options: ['Move in a straight line', 'Move in a circle', 'Move in a helix', 'Come to a stop'],
    correctAnswer: 'Move in a circle',
    timeLimit: 30,
    explanation: 'When an electron enters a magnetic field perpendicular to its direction, the magnetic force acts perpendicular to both velocity and magnetic field, resulting in circular motion.',
    category: 'Physics',
    difficulty: 'medium'
  },
  
  // Additional chemistry questions
  {
    id: 'neet-chem4',
    question: 'Which of the following elements is MOST likely to form ionic compounds?',
    options: ['Carbon', 'Sodium', 'Hydrogen', 'Nitrogen'],
    correctAnswer: 'Sodium',
    timeLimit: 30,
    explanation: 'Sodium (Na) is an alkali metal with low electronegativity and tends to lose its one valence electron easily to form a cation, resulting in ionic compounds.',
    category: 'Chemistry',
    difficulty: 'easy'
  }
];
