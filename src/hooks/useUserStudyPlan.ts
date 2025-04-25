
import { useState, useEffect } from 'react';

export type ConceptCard = {
  id: string;
  title: string;
  subject: string;
  chapter: string;
  difficulty: string;
  content: string;
  completed: boolean;
  estimatedTime: number;
  scheduledFor: 'today' | 'week' | 'month';
  examRelevance: string;
  examples: string[];
  commonMistakes: string[];
  relatedConcepts: string[];
};

// Mock data for concept cards
const mockConceptCards: ConceptCard[] = [
  {
    id: 'c1',
    title: "Newton's Second Law of Motion",
    subject: "Physics",
    chapter: "Laws of Motion",
    difficulty: "Medium",
    content: "Newton's second law of motion states that the acceleration of an object is directly proportional to the net force acting upon it and inversely proportional to its mass. Mathematically, it is expressed as F = ma, where F is the net force, m is the mass, and a is the acceleration. This law forms the foundation of classical mechanics and is extensively used in solving problems involving forces and motion. When multiple forces act on an object, we can find the net force by vector addition of all individual forces.",
    completed: false,
    estimatedTime: 30,
    scheduledFor: 'today',
    examRelevance: "This concept appears in 30-40% of JEE mechanics problems. Questions often involve calculating acceleration, force, or mass when the other two quantities are given. Multiple-choice questions may require identifying scenarios where the law applies correctly.",
    examples: [
      "A car accelerating on a straight road demonstrates Newton's Second Law - the engine applies force, causing acceleration proportional to the car's mass.",
      "When you push a shopping cart, the acceleration you create depends on both how hard you push and the mass of items in the cart.",
      "A rocket launching into space accelerates as the engines exert force, with the acceleration determined by the ratio of thrust to the rocket's mass."
    ],
    commonMistakes: [
      "Forgetting that force is a vector quantity, so direction matters when calculating net force.",
      "Not accounting for all forces acting on the object, especially friction or normal forces.",
      "Confusing mass with weight (weight is a force, mass is not).",
      "Incorrectly assuming that constant force means constant velocity (it actually means constant acceleration)."
    ],
    relatedConcepts: ['c2', 'c3']
  },
  {
    id: 'c2',
    title: "Circular Motion",
    subject: "Physics",
    chapter: "Rotation and Revolution",
    difficulty: "Hard",
    content: "Circular motion is the movement of an object along a circular path. In uniform circular motion, an object moves at a constant speed along a circular path. The direction of motion changes continuously, which means there is acceleration, called centripetal acceleration. This acceleration is directed toward the center of the circle. The centripetal force is the force that makes an object follow a curved path, and it's always pointed toward the center of rotation.",
    completed: false,
    estimatedTime: 45,
    scheduledFor: 'today',
    examRelevance: "Circular motion problems appear in about 15-20% of JEE Physics questions. They often integrate concepts of Newton's laws with rotational dynamics. Expect questions on centripetal forces, angular velocity, and problems involving banked curves or conical pendulums.",
    examples: [
      "A car turning on a curved road experiences centripetal force provided by friction between the tires and the road.",
      "Satellites orbiting Earth stay in orbit because of the centripetal force provided by gravity.",
      "When you swing a ball on a string, the tension in the string provides the centripetal force keeping the ball moving in a circle."
    ],
    commonMistakes: [
      "Confusing centripetal force with centrifugal force (which is a fictitious force).",
      "Forgetting that centripetal acceleration exists even when speed is constant in circular motion.",
      "Incorrectly identifying the direction of centripetal force or acceleration.",
      "Not realizing that the centripetal force must be provided by a real force (tension, friction, gravity, etc.)."
    ],
    relatedConcepts: ['c1', 'c3']
  },
  {
    id: 'c3',
    title: "Conservation of Momentum",
    subject: "Physics",
    chapter: "Collisions",
    difficulty: "Medium",
    content: "The law of conservation of momentum states that the total momentum of an isolated system remains constant if no external forces act on the system. Momentum is defined as the product of mass and velocity. In collisions, momentum is always conserved, whether the collision is elastic or inelastic. In an elastic collision, both momentum and kinetic energy are conserved, while in an inelastic collision, only momentum is conserved.",
    completed: true,
    estimatedTime: 25,
    scheduledFor: 'today',
    examRelevance: "Conservation of momentum appears in approximately 25% of JEE dynamics questions. It's particularly important for collision problems, explosion scenarios, and questions involving systems with changing mass. This concept is often combined with energy conservation in advanced problems.",
    examples: [
      "In a game of billiards, when the cue ball strikes another ball, the momentum of the system before and after collision is the same.",
      "When a gun is fired, the momentum of the bullet going forward equals the momentum of the gun's recoil backward.",
      "In rocket propulsion, as the rocket expels gas backwards, the rocket moves forward to conserve the total momentum of the system."
    ],
    commonMistakes: [
      "Not treating momentum as a vector quantity and failing to account for direction.",
      "Confusing elastic and inelastic collisions and incorrectly applying conservation of kinetic energy.",
      "Forgetting to include all objects in the system when calculating total momentum.",
      "Assuming that individual objects' momentum is conserved rather than the total system momentum."
    ],
    relatedConcepts: ['c1', 'c2']
  },
  {
    id: 'c4',
    title: "Cell Structure and Function",
    subject: "Biology",
    chapter: "Cell Biology",
    difficulty: "Easy",
    content: "The cell is the basic structural and functional unit of all living organisms. Eukaryotic cells contain membrane-bound organelles like the nucleus, mitochondria, endoplasmic reticulum, Golgi apparatus, lysosomes, and vacuoles. Each organelle has specific functions: the nucleus contains genetic material, mitochondria generate energy, the endoplasmic reticulum is involved in protein synthesis and lipid metabolism, the Golgi apparatus processes and packages proteins, lysosomes contain digestive enzymes, and vacuoles store materials.",
    completed: false,
    estimatedTime: 35,
    scheduledFor: 'week',
    examRelevance: "Cell biology constitutes 12-15% of NEET biology questions. Expect direct questions about organelle functions, differences between plant and animal cells, and cell processes. Questions often include diagrams requiring identification of structures and their functions.",
    examples: [
      "Red blood cells lack a nucleus to maximize space for hemoglobin, showing how cell structure relates to function.",
      "Muscle cells contain numerous mitochondria to supply the energy needed for contraction.",
      "Plant cells have a cell wall and chloroplasts, adaptations that support photosynthesis and structural rigidity."
    ],
    commonMistakes: [
      "Confusing prokaryotic and eukaryotic cell features.",
      "Mixing up the functions of different organelles (especially ER and Golgi apparatus).",
      "Forgetting key differences between plant and animal cells.",
      "Not understanding the relationship between cell structure and specialized functions."
    ],
    relatedConcepts: ['c5', 'c7']
  },
  {
    id: 'c5',
    title: "Mole Concept",
    subject: "Chemistry",
    chapter: "Stoichiometry",
    difficulty: "Hard",
    content: "The mole is a fundamental unit in chemistry that represents 6.022 × 10^23 particles (atoms, molecules, ions, or electrons), known as Avogadro's number. One mole of any substance contains exactly this number of particles. The mole concept allows chemists to convert between the microscopic world of atoms and molecules and the macroscopic world of grams and liters. It serves as a bridge between the atomic scale and laboratory measurements.",
    completed: false,
    estimatedTime: 40,
    scheduledFor: 'week',
    examRelevance: "The mole concept appears in approximately 20% of JEE Chemistry questions, particularly in stoichiometry, gases, and solutions. Expect calculation-intensive problems involving molar mass, limiting reagents, and percentage yield. Questions often require multi-step calculations and strong mathematical skills.",
    examples: [
      "When baking, recipes specify amounts in grams rather than molecule counts - similarly, chemists work with moles rather than counting individual atoms.",
      "In a chemical reaction, we use moles to ensure we have the right proportion of reactants, just as a recipe requires the correct ratio of ingredients.",
      "The amount of gas in a balloon can be expressed in moles, regardless of whether it's helium, oxygen, or another gas."
    ],
    commonMistakes: [
      "Confusing moles with molecules or atoms.",
      "Incorrectly converting between mass, moles, and number of particles.",
      "Not properly accounting for coefficients in chemical equations when calculating mole ratios.",
      "Forgetting to consider the molecular formula when calculating molar mass."
    ],
    relatedConcepts: ['c6']
  },
  {
    id: 'c6',
    title: "Chemical Bonding",
    subject: "Chemistry",
    chapter: "Atomic Structure",
    difficulty: "Medium",
    content: "Chemical bonding involves the attraction between atoms or ions that allows the formation of chemical substances containing two or more atoms. The primary types are ionic bonds (electron transfer between metals and non-metals), covalent bonds (electron sharing between non-metals), and metallic bonds (electron sea model in metals). Bond types influence physical properties like melting points, boiling points, and solubility.",
    completed: true,
    estimatedTime: 30,
    scheduledFor: 'week',
    examRelevance: "Chemical bonding constitutes about 15% of JEE Chemistry questions. Questions often test the ability to predict bond types, molecular geometry, and related properties. This concept connects fundamental atomic theory with practical applications in materials science and biology.",
    examples: [
      "Table salt (NaCl) forms through ionic bonding, with sodium donating an electron to chlorine.",
      "Water molecules are held together by covalent bonds between oxygen and hydrogen atoms, with hydrogen bonds between molecules.",
      "The conductivity and malleability of copper are due to metallic bonding, where electrons move freely between atoms."
    ],
    commonMistakes: [
      "Incorrectly identifying bond types based on electronegativity differences.",
      "Confusing intermolecular forces with chemical bonds.",
      "Forgetting that many compounds contain multiple types of bonds.",
      "Not understanding how bond polarity affects molecular properties."
    ],
    relatedConcepts: ['c5']
  },
  {
    id: 'c7',
    title: "Differentiation",
    subject: "Mathematics",
    chapter: "Calculus",
    difficulty: "Hard",
    content: "Differentiation is a fundamental operation in calculus that measures the rate at which a quantity changes with respect to another quantity. The derivative of a function represents its instantaneous rate of change or slope at any given point. Key differentiation rules include the power rule, product rule, quotient rule, and chain rule. These rules allow us to find derivatives of complex functions by breaking them down into simpler operations.",
    completed: false,
    estimatedTime: 50,
    scheduledFor: 'month',
    examRelevance: "Calculus problems constitute about 30% of JEE Mathematics questions, with differentiation being a major component. Expect questions on finding derivatives, applications in optimization, and related rates. This concept is essential for solving problems in physics and maximization/minimization scenarios.",
    examples: [
      "The speed of a car is the derivative of its position with respect to time.",
      "In economics, marginal cost is the derivative of the total cost function.",
      "The slope of a curve at any point is given by the derivative of the function at that point."
    ],
    commonMistakes: [
      "Applying differentiation rules incorrectly, especially the chain rule and product rule.",
      "Forgetting special cases like trigonometric functions, logarithms, and exponentials.",
      "Not identifying implicit differentiation scenarios.",
      "Confusion between the derivative notation methods (f'(x), dy/dx, etc.)."
    ],
    relatedConcepts: ['c8']
  },
  {
    id: 'c8',
    title: "Quadratic Equations",
    subject: "Mathematics",
    chapter: "Algebra",
    difficulty: "Easy",
    content: "A quadratic equation is a second-degree polynomial equation of the form ax² + bx + c = 0, where a ≠ 0. Such equations can be solved using the quadratic formula: x = (-b ± √(b² - 4ac)) / 2a. The quantity b² - 4ac, called the discriminant, determines the nature of the roots: if it's positive, there are two distinct real roots; if it's zero, there's one repeated real root; if it's negative, there are two complex conjugate roots.",
    completed: true,
    estimatedTime: 25,
    scheduledFor: 'month',
    examRelevance: "Quadratic equations appear in approximately 10-15% of JEE Mathematics questions. These concepts are often combined with other topics like functions, inequalities, and coordinate geometry. Questions may involve finding relationships between coefficients and roots or applying quadratics to optimization problems.",
    examples: [
      "The height of a ball thrown upward follows a quadratic equation, with the highest point determined by finding where the derivative equals zero.",
      "The area of a rectangle with fixed perimeter can be expressed as a quadratic function, useful for maximization problems.",
      "In physics, projectile motion equations are quadratic, allowing us to calculate when and where an object will land."
    ],
    commonMistakes: [
      "Misapplying the quadratic formula or making arithmetic errors.",
      "Incorrectly factoring quadratic expressions.",
      "Not checking solutions in the original equation, especially with rational expressions.",
      "Confusing the relationship between the discriminant and the nature of roots."
    ],
    relatedConcepts: ['c7']
  }
];

export function useUserStudyPlan() {
  const [conceptCards, setConceptCards] = useState<ConceptCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchConceptCards = async () => {
      setLoading(true);
      
      // Simulate network delay
      setTimeout(() => {
        setConceptCards(mockConceptCards);
        setLoading(false);
      }, 800);
    };

    fetchConceptCards();
  }, []);

  return { conceptCards, loading };
}

export function useConceptCardDetails(conceptId: string) {
  const [conceptCard, setConceptCard] = useState<ConceptCard | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchConceptCardDetails = async () => {
      setLoading(true);
      
      // Simulate network delay
      setTimeout(() => {
        const foundCard = mockConceptCards.find(card => card.id === conceptId) || null;
        setConceptCard(foundCard);
        setLoading(false);
      }, 800);
    };

    fetchConceptCardDetails();
  }, [conceptId]);

  return { conceptCard, loading };
}
