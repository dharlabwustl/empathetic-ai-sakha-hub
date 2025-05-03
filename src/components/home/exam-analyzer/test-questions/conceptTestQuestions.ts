
import { TestQuestion, SubjectTopic } from '../types';

// NEET-specific concept test questions
const neetConceptQuestions = {
  physics: [
    {
      id: 'ct-phy1',
      question: 'A particle executes simple harmonic motion with a period of 2 seconds. If the amplitude of motion is 10 cm, what is the maximum speed of the particle?',
      options: ['10π cm/s', '20π cm/s', 'π cm/s', '5π cm/s'],
      correctAnswer: '10π cm/s',
      timeLimit: 60,
      type: 'multiple-choice',
      explanation: 'For simple harmonic motion, vmax = A·ω where A is amplitude and ω is angular frequency. ω = 2π/T = 2π/2 = π rad/s. So vmax = 10 cm × π rad/s = 10π cm/s'
    },
    {
      id: 'ct-phy2',
      question: 'Which of the following is NOT a conservative force?',
      options: ['Gravitational force', 'Electrostatic force', 'Friction force', 'Magnetic force on a magnetic dipole'],
      correctAnswer: 'Friction force',
      timeLimit: 45,
      type: 'multiple-choice',
      explanation: 'Conservative forces are those where the work done in moving an object between two points is independent of the path taken. Friction is non-conservative because the work done depends on the path taken.'
    },
    {
      id: 'ct-phy3',
      question: 'In Young\'s double slit experiment, if the distance between the slits is halved and the distance between the screen and slits is doubled, then the fringe width will:',
      options: ['Remain the same', 'Become four times', 'Become double', 'Become half'],
      correctAnswer: 'Become four times',
      timeLimit: 60,
      type: 'multiple-choice',
      explanation: 'Fringe width β = Dλ/d, where D is the distance to screen, λ is wavelength, and d is slit separation. If d is halved and D is doubled, β becomes (2D)λ/(d/2) = 4 × original value.'
    },
    {
      id: 'ct-phy4',
      question: 'A body of mass 5 kg is moving with a velocity of 10 m/s. A force of 25 N is applied in the direction of motion for 2 seconds. What is the final velocity of the body?',
      options: ['15 m/s', '20 m/s', '25 m/s', '10 m/s'],
      correctAnswer: '20 m/s',
      timeLimit: 45,
      type: 'multiple-choice',
      explanation: 'Using v = u + at, where acceleration a = F/m = 25/5 = 5 m/s², we get v = 10 + (5 × 2) = 10 + 10 = 20 m/s.'
    },
    {
      id: 'ct-phy5',
      question: 'For a hydrogen atom in its ground state, the de Broglie wavelength of the electron is:',
      options: ['0.33 nm', '0.66 nm', '0.11 nm', '3.3 nm'],
      correctAnswer: '0.33 nm',
      timeLimit: 60,
      type: 'multiple-choice',
      explanation: 'For hydrogen in ground state, circumference of Bohr orbit = 2πr = 2π(0.053 nm) = 0.33 nm. For standing wave, this equals the de Broglie wavelength.'
    }
  ],
  chemistry: [
    {
      id: 'ct-chem1',
      question: 'Which of the following compounds will show geometrical isomerism?',
      options: ['1-butene', '2-butene', 'Propene', '2-methyl-propene'],
      correctAnswer: '2-butene',
      timeLimit: 45,
      type: 'multiple-choice',
      explanation: 'Geometrical isomerism requires a C=C double bond with two different groups on each carbon. Only 2-butene meets this criterion, showing cis-trans (E-Z) isomerism.'
    },
    {
      id: 'ct-chem2',
      question: 'The hybridization of carbon atoms in diamond is:',
      options: ['sp', 'sp²', 'sp³', 'dsp²'],
      correctAnswer: 'sp³',
      timeLimit: 30,
      type: 'multiple-choice',
      explanation: 'In diamond, each carbon atom is bonded to four other carbon atoms in a tetrahedral arrangement, which is characteristic of sp³ hybridization.'
    },
    {
      id: 'ct-chem3',
      question: 'Identify the reaction that does NOT represent an oxidation-reduction reaction:',
      options: [
        'Zn + H₂SO₄ → ZnSO₄ + H₂',
        'FeCl₃ + H₂O → Fe(OH)₃ + HCl',
        'HCl + NaOH → NaCl + H₂O',
        '4Fe + 3O₂ → 2Fe₂O₃'
      ],
      correctAnswer: 'HCl + NaOH → NaCl + H₂O',
      timeLimit: 45,
      type: 'multiple-choice',
      explanation: 'The reaction between HCl and NaOH is an acid-base neutralization reaction, not a redox reaction. No atoms change their oxidation states in this reaction.'
    },
    {
      id: 'ct-chem4',
      question: 'The IUPAC name of CH₃−CH=CH−CHO is:',
      options: ['But-2-enal', 'But-2-en-1-al', 'But-1-en-3-al', '3-Butenal'],
      correctAnswer: 'But-2-enal',
      timeLimit: 45,
      type: 'multiple-choice',
      explanation: 'The longest chain contains 4 carbon atoms (but-) with a C=C double bond at position 2 (-2-en-) and an aldehyde group (-al), making it but-2-enal.'
    },
    {
      id: 'ct-chem5',
      question: 'Which of the following has the highest boiling point?',
      options: ['CH₃CH₂OH', 'CH₃OCH₃', 'CH₃CH₂CH₃', 'CH₃CHO'],
      correctAnswer: 'CH₃CH₂OH',
      timeLimit: 30,
      type: 'multiple-choice',
      explanation: 'Ethanol (CH₃CH₂OH) has the highest boiling point due to hydrogen bonding, which creates stronger intermolecular forces than the dipole-dipole forces in CH₃CHO and CH₃OCH₃ or dispersion forces in CH₃CH₂CH₃.'
    }
  ],
  biology: [
    {
      id: 'ct-bio1',
      question: 'Which of the following is NOT a function of the liver?',
      options: ['Production of bile', 'Storage of glycogen', 'Synthesis of vitamin D', 'Detoxification of drugs'],
      correctAnswer: 'Synthesis of vitamin D',
      timeLimit: 45,
      type: 'multiple-choice',
      explanation: 'Vitamin D synthesis begins in the skin (not the liver) under UV exposure. The liver then converts it to 25-hydroxyvitamin D, but does not initiate synthesis.'
    },
    {
      id: 'ct-bio2',
      question: 'The enzyme that catalyzes the first step of CO₂ fixation in C4 plants is:',
      options: ['Rubisco', 'PEP carboxylase', 'ATP synthase', 'Carbonic anhydrase'],
      correctAnswer: 'PEP carboxylase',
      timeLimit: 45,
      type: 'multiple-choice',
      explanation: 'In C4 plants, the first step of CO₂ fixation is catalyzed by PEP carboxylase in mesophyll cells, which combines CO₂ with phosphoenolpyruvate (PEP) to form oxaloacetate.'
    },
    {
      id: 'ct-bio3',
      question: 'Which of the following is a secondary messenger in hormone action?',
      options: ['Insulin', 'Estrogen', 'Cyclic AMP', 'Thyroxine'],
      correctAnswer: 'Cyclic AMP',
      timeLimit: 30,
      type: 'multiple-choice',
      explanation: 'Cyclic AMP (cAMP) is a secondary messenger that is produced inside cells in response to binding of hormones (primary messengers) to cell surface receptors, amplifying the hormonal signal.'
    },
    {
      id: 'ct-bio4',
      question: 'The chromosomal disorder caused by trisomy of chromosome 21 is:',
      options: ['Turner syndrome', 'Klinefelter syndrome', 'Down syndrome', 'Patau syndrome'],
      correctAnswer: 'Down syndrome',
      timeLimit: 30,
      type: 'multiple-choice',
      explanation: 'Down syndrome is caused by trisomy of chromosome 21, resulting in three copies instead of the normal two copies of this chromosome.'
    },
    {
      id: 'ct-bio5',
      question: 'Which of the following is the correct sequence of events in mitosis?',
      options: [
        'Prophase, Metaphase, Anaphase, Telophase',
        'Prophase, Anaphase, Metaphase, Telophase',
        'Metaphase, Prophase, Anaphase, Telophase',
        'Prophase, Metaphase, Telophase, Anaphase'
      ],
      correctAnswer: 'Prophase, Metaphase, Anaphase, Telophase',
      timeLimit: 45,
      type: 'multiple-choice',
      explanation: 'The correct sequence of mitosis is Prophase (chromosome condensation), Metaphase (chromosomes align at the equator), Anaphase (chromatids separate), and Telophase (new nuclei form).'
    }
  ]
};

// Define the list of subjects and topics for test selection
export const getConceptTopics = (examType: string): SubjectTopic[] => {
  // For now, handle NEET only
  if (examType.toLowerCase().includes('neet')) {
    return [
      { id: 'physics-topic', subject: 'Physics', topics: 10 },
      { id: 'chemistry-topic', subject: 'Chemistry', topics: 10 },
      { id: 'biology-topic', subject: 'Biology', topics: 10 }
    ];
  }
  
  // Default subjects
  return [
    { id: 'general-topic', subject: 'General Knowledge', topics: 10 }
  ];
};

export const getConceptTestQuestions = (examType: string, subject?: string): TestQuestion[] => {
  // For NEET, return questions based on subject
  if (examType.toLowerCase().includes('neet')) {
    // If subject is specified, return questions for that subject
    if (subject === 'Physics') {
      return neetConceptQuestions.physics;
    }
    if (subject === 'Chemistry') {
      return neetConceptQuestions.chemistry;
    }
    if (subject === 'Biology') {
      return neetConceptQuestions.biology;
    }
    
    // If no specific subject, return a mix of questions
    return [
      ...neetConceptQuestions.physics.slice(0, 2),
      ...neetConceptQuestions.chemistry.slice(0, 2),
      ...neetConceptQuestions.biology.slice(0, 2)
    ];
  }
  
  // Default to physics questions for other exams
  return neetConceptQuestions.physics;
};
