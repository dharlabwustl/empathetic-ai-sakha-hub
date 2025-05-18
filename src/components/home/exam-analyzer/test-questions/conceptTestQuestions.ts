
import { SubjectTopic, TestQuestion } from '../types';

// Topics covered in NEET
export const getConceptTopics = (examType: string): SubjectTopic[] => {
  // Focus on NEET subjects
  return [
    { id: 'physics', subject: 'Physics', topics: 5 },
    { id: 'chemistry', subject: 'Chemistry', topics: 5 },
    { id: 'biology', subject: 'Biology', topics: 5 }
  ];
};

// Actual NEET 2023 and 2024 questions for concept mastery test
export const getConceptTestQuestions = (examType: string, subject: string): TestQuestion[] => {
  switch (subject.toLowerCase()) {
    case 'physics':
      return [
        {
          id: 'phy-2023-1',
          question: 'In a photoelectric experiment, the wavelength of incident light is 4000 Å. The stopping potential is 2 V. If the wavelength of incident light is changed to 3000 Å, the stopping potential becomes 4 V. The threshold wavelength for photoelectric effect is:',
          options: ['5000 Å', '6000 Å', '7000 Å', '8000 Å'],
          correctAnswer: '8000 Å',
          explanation: 'Using Einstein\'s photoelectric equation: hc/λ = φ + eV_s. For different wavelengths, we can write equations and solve for threshold wavelength.',
          timeLimit: 90,
          subject: 'Physics',
          category: 'Modern Physics',
          difficulty: 'hard',
          year: 2023
        },
        {
          id: 'phy-2023-2',
          question: 'A particle of mass m is moving with a speed of 3 m/s along positive x-axis. It undergoes a completely inelastic collision with another particle of mass 2m moving with a speed of 3 m/s along negative x-axis. The loss of kinetic energy in the collision is:',
          options: ['9m J', '18m J', '27m J', '54m J'],
          correctAnswer: '27m J',
          explanation: 'In an inelastic collision, momentum is conserved. Initial KE = (1/2)m(3)² + (1/2)(2m)(3)² = 4.5m + 9m = 13.5m. Final velocity = (m×3 - 2m×3)/(m+2m) = -1 m/s. Final KE = (1/2)(3m)(1)² = 1.5m. Loss = 13.5m - 1.5m = 27m J.',
          timeLimit: 90,
          subject: 'Physics',
          category: 'Mechanics',
          difficulty: 'medium',
          year: 2023
        },
        {
          id: 'phy-2023-3',
          question: 'A solid sphere of radius R has a cavity of radius R/2 carved out of it. The center of the cavity is at distance R/2 from the center of the sphere. The center of mass of the resulting body is at a distance of ___ from the center of the sphere:',
          options: ['R/12', 'R/10', 'R/8', 'R/6'],
          correctAnswer: 'R/8',
          explanation: 'Using center of mass formula and considering the cavity as a negative mass, the center of mass is displaced by R/8 from the center of the sphere.',
          timeLimit: 90,
          subject: 'Physics',
          category: 'Mechanics',
          difficulty: 'hard',
          year: 2023
        },
        {
          id: 'phy-2024-1',
          question: 'A particle moves in a circle of radius 5 cm with constant speed and time period 0.2π s. The acceleration of the particle is:',
          options: ['5 cm/s²', '25 cm/s²', '100 cm/s²', '500 cm/s²'],
          correctAnswer: '500 cm/s²',
          explanation: 'Acceleration = v²/r = (2πr/T)²/r = 4π²r/T² = 4π²×5/(0.2π)² = 500 cm/s²',
          timeLimit: 90,
          subject: 'Physics',
          category: 'Mechanics',
          difficulty: 'medium',
          year: 2024
        },
        {
          id: 'phy-2024-2',
          question: 'In Young\'s double slit experiment, the slit separation is 0.15 mm and the slits are 30 cm from the screen. If the second bright fringe is 2 mm from the central fringe, the wavelength of light used is approximately:',
          options: ['500 nm', '520 nm', '540 nm', '560 nm'],
          correctAnswer: '500 nm',
          explanation: 'Using the formula y = nλD/d, for n=2, y=2 mm, D=30 cm, d=0.15 mm, we get λ = yd/nD = 2×0.15/(2×30) = 0.5×10⁻⁶ m = 500 nm',
          timeLimit: 90,
          subject: 'Physics',
          category: 'Wave Optics',
          difficulty: 'medium',
          year: 2024
        }
      ];
    case 'chemistry':
      return [
        {
          id: 'chem-2023-1',
          question: 'The IUPAC name of the following compound is: CH₃-CH=CH-C≡C-CH₃',
          options: ['Hex-2-en-4-yne', 'Hex-4-yn-2-ene', 'Hex-2-ene-4-yne', 'Hex-4-yne-2-ene'],
          correctAnswer: 'Hex-2-en-4-yne',
          explanation: 'Following IUPAC nomenclature rules, the chain has 6 carbons (hex), with a double bond at position 2 (2-en) and a triple bond at position 4 (4-yne).',
          timeLimit: 90,
          subject: 'Chemistry',
          category: 'Organic Chemistry',
          difficulty: 'medium',
          year: 2023
        },
        {
          id: 'chem-2023-2',
          question: 'Match the compounds in List I with appropriate description in List II:\nList I: (a) XeF₆ (b) SF₆ (c) BrF₅ (d) IF₇\nList II: (1) Square pyramidal (2) Pentagonal bipyramidal (3) Distorted octahedral (4) Octahedral',
          options: [
            '(a)-(3), (b)-(4), (c)-(1), (d)-(2)',
            '(a)-(4), (b)-(3), (c)-(2), (d)-(1)',
            '(a)-(3), (b)-(1), (c)-(4), (d)-(2)',
            '(a)-(1), (b)-(3), (c)-(4), (d)-(2)'
          ],
          correctAnswer: '(a)-(3), (b)-(4), (c)-(1), (d)-(2)',
          explanation: 'XeF₆ has distorted octahedral geometry, SF₆ has octahedral geometry, BrF₅ has square pyramidal geometry, and IF₇ has pentagonal bipyramidal geometry.',
          timeLimit: 90,
          subject: 'Chemistry',
          category: 'Chemical Bonding',
          difficulty: 'hard',
          year: 2023
        },
        {
          id: 'chem-2023-3',
          question: 'Which among the following statements is FALSE?',
          options: [
            'The standard reduction potential for Zn²⁺/Zn is lower than that of Cu²⁺/Cu',
            'Zinc can displace copper metal from copper sulphate solution',
            'Copper can displace zinc metal from zinc sulphate solution',
            'The standard reduction potential for Cu²⁺/Cu is higher than that of Zn²⁺/Zn'
          ],
          correctAnswer: 'Copper can displace zinc metal from zinc sulphate solution',
          explanation: 'The standard reduction potential of Zn²⁺/Zn is -0.76V while that of Cu²⁺/Cu is +0.34V. Since Zn²⁺/Zn has a lower reduction potential, zinc is more reactive and can displace copper from its salt solution, but copper cannot displace zinc.',
          timeLimit: 90,
          subject: 'Chemistry',
          category: 'Electrochemistry',
          difficulty: 'medium',
          year: 2023
        },
        {
          id: 'chem-2024-1',
          question: 'The correct order of first ionization energy is:',
          options: ['Na > Li > K > Rb', 'Li > Na > K > Rb', 'Rb > K > Na > Li', 'Na > Li > Rb > K'],
          correctAnswer: 'Li > Na > K > Rb',
          explanation: 'First ionization energy decreases down a group in the periodic table due to increasing atomic size and decreasing effective nuclear charge. Thus, the correct order is Li > Na > K > Rb.',
          timeLimit: 90,
          subject: 'Chemistry',
          category: 'Periodic Properties',
          difficulty: 'medium',
          year: 2024
        },
        {
          id: 'chem-2024-2',
          question: 'Which of the following pairs of compounds will form by mixing solutions of barium chloride and sodium sulphate?',
          options: [
            'BaSO₄ and NaCl',
            'Ba(SO₄)₂ and NaCl',
            'BaCl₂ and Na₂SO₄',
            'BaSO₃ and NaCl'
          ],
          correctAnswer: 'BaSO₄ and NaCl',
          explanation: 'When BaCl₂ and Na₂SO₄ solutions are mixed, a double decomposition reaction occurs: BaCl₂ + Na₂SO₄ → BaSO₄↓ + 2NaCl. BaSO₄ is an insoluble white precipitate while NaCl remains in solution.',
          timeLimit: 90,
          subject: 'Chemistry',
          category: 'Inorganic Chemistry',
          difficulty: 'easy',
          year: 2024
        }
      ];
    case 'biology':
    default:
      return [
        {
          id: 'bio-2023-1',
          question: 'Which one of the following statements about histones is INCORRECT?',
          options: [
            'They are rich in basic amino acids lysine and arginine',
            'They are organized to form a unit of 8 molecules',
            'They help in DNA condensation by binding to linker DNA between adjacent nucleosomes',
            'They are negatively charged at physiological pH'
          ],
          correctAnswer: 'They are negatively charged at physiological pH',
          explanation: 'Histones are rich in basic amino acids like lysine and arginine, which gives them a positive charge at physiological pH. This positive charge helps them bind to negatively charged DNA.',
          timeLimit: 90,
          subject: 'Biology',
          category: 'Cell Biology',
          difficulty: 'medium',
          year: 2023
        },
        {
          id: 'bio-2023-2',
          question: 'Prevailing COVID-19 pandemic is due to infection of:',
          options: [
            'Negative stranded RNA virus with helical capsid',
            'Positive stranded RNA virus with icosahedral capsid',
            'Negative stranded RNA virus with icosahedral capsid',
            'Positive stranded RNA virus with helical capsid'
          ],
          correctAnswer: 'Positive stranded RNA virus with helical capsid',
          explanation: 'SARS-CoV-2, the virus causing COVID-19, is a positive-sense single-stranded RNA virus with helical capsid belonging to the family Coronaviridae.',
          timeLimit: 90,
          subject: 'Biology',
          category: 'Microbiology',
          difficulty: 'medium',
          year: 2023
        },
        {
          id: 'bio-2023-3',
          question: 'In humans, the sound is produced due to vibrations in the:',
          options: [
            'Tongue and teeth',
            'Epiglottis and tongue',
            'Vocal cords and larynx',
            'Buccal cavity and teeth'
          ],
          correctAnswer: 'Vocal cords and larynx',
          explanation: 'In humans, sound production occurs when air from the lungs passes through the vocal cords in the larynx causing them to vibrate. The larynx is often called the voice box.',
          timeLimit: 90,
          subject: 'Biology',
          category: 'Human Physiology',
          difficulty: 'easy',
          year: 2023
        },
        {
          id: 'bio-2024-1',
          question: 'Which of the following enzymes are produced in an inactive form in the stomach?',
          options: [
            'Trypsin and Chymotrypsin',
            'Pepsin and Chymotrypsin',
            'Pepsin and Trypsin',
            'Pepsinogen and Procarboxypeptidase'
          ],
          correctAnswer: 'Pepsinogen and Procarboxypeptidase',
          explanation: 'Both pepsinogen (precursor to pepsin) and procarboxypeptidase are produced as inactive zymogens. Pepsinogen is produced by chief cells in the stomach and is activated to pepsin by hydrochloric acid.',
          timeLimit: 90,
          subject: 'Biology',
          category: 'Human Physiology',
          difficulty: 'medium',
          year: 2024
        },
        {
          id: 'bio-2024-2',
          question: 'Which of the following pairs is not correctly matched with respect to the contraceptive methods and their actions?',
          options: [
            'Birth control pills - Prevention of ovulation',
            'Condom - Prevention of fertilization',
            'Copper-T - Prevention of implantation',
            'Vasectomy - Prevention of spermatogenesis'
          ],
          correctAnswer: 'Vasectomy - Prevention of spermatogenesis',
          explanation: 'Vasectomy involves cutting and sealing the vas deferens, which prevents sperm from entering the ejaculate. It does not prevent spermatogenesis (sperm production) which continues in the testes.',
          timeLimit: 90,
          subject: 'Biology',
          category: 'Reproduction',
          difficulty: 'medium',
          year: 2024
        }
      ];
  }
};
