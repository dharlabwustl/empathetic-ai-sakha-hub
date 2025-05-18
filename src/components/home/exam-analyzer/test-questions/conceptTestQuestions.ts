
import { TestQuestion } from '../types';

// NEET-specific concept test questions
export const getNEETConceptQuestions = (conceptName: string): TestQuestion[] => {
  const questions: TestQuestion[] = [
    // Biology Questions
    {
      id: 'neet-bio-1',
      question: 'The active form of Vitamin D synthesized in the human body is:',
      options: [
        'Cholecalciferol',
        'Calcitriol',
        'Ergocalciferol',
        'Calcitonin'
      ],
      correctAnswer: 'Calcitriol',
      explanation: 'Calcitriol (1,25-dihydroxycholecalciferol) is the active form of Vitamin D synthesized in the body through a multi-step process involving the skin, liver and kidneys.',
      difficulty: 'medium',
      category: 'Biology',
      subcategory: 'Human Physiology'
    },
    {
      id: 'neet-bio-2',
      question: 'Which of the following is NOT a function of the liver?',
      options: [
        'Detoxification of drugs',
        'Production of insulin',
        'Storage of glycogen',
        'Synthesis of bile'
      ],
      correctAnswer: 'Production of insulin',
      explanation: 'Insulin is produced by beta cells of the Islets of Langerhans in the pancreas, not by the liver.',
      difficulty: 'medium',
      category: 'Biology',
      subcategory: 'Human Physiology'
    },
    {
      id: 'neet-bio-3',
      question: 'Which of the following plant tissues consists of living cells with cellulose cell walls and provides mechanical support?',
      options: [
        'Sclerenchyma',
        'Collenchyma',
        'Parenchyma',
        'Xylem'
      ],
      correctAnswer: 'Collenchyma',
      explanation: 'Collenchyma is a living mechanical tissue with unevenly thickened cell walls containing cellulose and pectin. Unlike sclerenchyma, its cells are living at maturity.',
      difficulty: 'hard',
      category: 'Biology',
      subcategory: 'Plant Physiology'
    },
    // Chemistry Questions
    {
      id: 'neet-chem-1',
      question: 'Which of the following is a secondary amine?',
      options: [
        'CH₃NH₂',
        'CH₃NHCH₃',
        '(CH₃)₃N',
        'C₆H₅NH₂'
      ],
      correctAnswer: 'CH₃NHCH₃',
      explanation: 'Dimethylamine (CH₃NHCH₃) is a secondary amine because the nitrogen atom is bonded to two carbon atoms and one hydrogen atom.',
      difficulty: 'medium',
      category: 'Chemistry',
      subcategory: 'Organic Chemistry'
    },
    {
      id: 'neet-chem-2',
      question: 'Which of the following reactions is a redox reaction?',
      options: [
        'NaOH + HCl → NaCl + H₂O',
        'NH₃ + H₂O → NH₄OH',
        'CuO + H₂ → Cu + H₂O',
        'H₂O + CO₂ → H₂CO₃'
      ],
      correctAnswer: 'CuO + H₂ → Cu + H₂O',
      explanation: 'In the reaction CuO + H₂ → Cu + H₂O, copper is reduced (from +2 to 0 oxidation state) and hydrogen is oxidized (from 0 to +1 oxidation state), making it a redox reaction.',
      difficulty: 'medium',
      category: 'Chemistry',
      subcategory: 'General Chemistry'
    },
    // Physics Questions
    {
      id: 'neet-phy-1',
      question: 'According to Einstein\'s photoelectric equation, the maximum kinetic energy of emitted photoelectrons depends on:',
      options: [
        'Only the frequency of incident radiation',
        'Only the intensity of incident radiation',
        'Both frequency and intensity of incident radiation',
        'Neither frequency nor intensity of incident radiation'
      ],
      correctAnswer: 'Only the frequency of incident radiation',
      explanation: 'In the photoelectric effect, the maximum kinetic energy of emitted electrons depends on the frequency of incident radiation and not on its intensity. This is expressed by Einstein\'s equation: KE(max) = hf - φ, where h is Planck\'s constant, f is frequency, and φ is the work function.',
      difficulty: 'hard',
      category: 'Physics',
      subcategory: 'Modern Physics'
    },
    {
      id: 'neet-phy-2',
      question: 'A lens of focal length 50 cm produces a virtual image of magnification 1.5. The object distance is:',
      options: [
        '75 cm',
        '125 cm',
        '100 cm',
        '150 cm'
      ],
      correctAnswer: '125 cm',
      explanation: 'Using the lens formula (1/f = 1/v + 1/u) and magnification (m = v/u) for virtual image (m = 1.5): Since m = v/u = 1.5, and v = 1.5u. From lens equation, 1/50 = 1/(1.5u) + 1/u. Solving gives u = 125 cm.',
      difficulty: 'medium',
      category: 'Physics',
      subcategory: 'Optics',
      diagram: '<svg width="280" height="120" xmlns="http://www.w3.org/2000/svg"><line x1="140" y1="20" x2="140" y2="100" stroke="black" stroke-width="2"/><line x1="280" y1="60" x2="0" y2="60" stroke="black" stroke-width="1"/><circle cx="140" cy="60" r="3" fill="black"/><text x="142" y="55" font-size="10">Lens</text><line x1="40" y1="40" x2="40" y2="80" stroke="blue" stroke-width="2"/><text x="30" y="90" font-size="10" fill="blue">Object</text><line x1="210" y1="30" x2="210" y2="90" stroke="red" stroke-width="2" stroke-dasharray="4"/><text x="200" y="100" font-size="10" fill="red">Image</text></svg>'
    },
    {
      id: 'neet-phy-3',
      question: 'A 5.0 kg mass is moving with a speed of 10.0 m/s along a straight line. The de Broglie wavelength associated with it is: (h = 6.63 × 10⁻³⁴ Js)',
      options: [
        '1.326 × 10⁻³⁵ m',
        '1.326 × 10⁻³⁷ m',
        '1.326 × 10⁻³⁶ m',
        '1.326 × 10⁻³⁸ m'
      ],
      correctAnswer: '1.326 × 10⁻³⁵ m',
      explanation: 'The de Broglie wavelength λ = h/p = h/(m·v) = 6.63 × 10⁻³⁴ / (5 × 10) = 6.63 × 10⁻³⁴ / 50 = 1.326 × 10⁻³⁵ m',
      difficulty: 'hard',
      category: 'Physics',
      subcategory: 'Modern Physics'
    }
  ];
  
  // Return all questions for now, but could filter based on conceptName if needed
  return questions;
};

export const getConceptTestQuestions = (examType: string, conceptName: string): TestQuestion[] => {
  // Currently we only support NEET questions, but this could be expanded later
  return getNEETConceptQuestions(conceptName);
};
