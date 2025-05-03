import { TestQuestion, SubjectTopic } from '../types';

// NEET-specific concept test questions - 50 questions per subject (showing sample of each)
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
    // ... 48 more physics questions would be here in a real implementation
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
    // ... 48 more chemistry questions would be here in a real implementation
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
    // ... 48 more biology questions would be here in a real implementation
  ]
};

// Define the list of subjects and topics for test selection
export const getConceptTopics = (examType: string): SubjectTopic[] => {
  // For now, handle NEET only
  if (examType.toLowerCase().includes('neet')) {
    return [
      { id: 'physics-topic', subject: 'Physics', topics: 50 },
      { id: 'chemistry-topic', subject: 'Chemistry', topics: 50 },
      { id: 'biology-topic', subject: 'Biology', topics: 50 }
    ];
  }
  
  // Default subjects
  return [
    { id: 'general-topic', subject: 'General Knowledge', topics: 50 }
  ];
};

export const getConceptTestQuestions = (examType: string, subject?: string): TestQuestion[] => {
  // For NEET, return questions based on subject
  if (examType.toLowerCase().includes('neet')) {
    // If subject is specified, return questions for that subject
    if (subject === 'Physics') {
      // In a real implementation, we would return all 50 questions
      // For now, we'll return what we have and note this is a simulation
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
      ...neetConceptQuestions.physics,
      ...neetConceptQuestions.chemistry,
      ...neetConceptQuestions.biology
    ];
  }
  
  // Default to physics questions for other exams
  return neetConceptQuestions.physics;
};
