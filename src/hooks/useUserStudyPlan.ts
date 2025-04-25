
import { useState, useEffect } from 'react';

export interface ConceptCard {
  id: string;
  title: string;
  description: string;
  content: {
    basic?: string;
    detailed?: string;
    simplified?: string;
    advanced?: string;
  };
  subject: string;
  chapter: string;
  difficulty: string;
  estimatedTime: number;
  completed: boolean;
  progress: number;
  scheduledFor: 'today' | 'week' | 'month';
  examples?: string[];
  commonMistakes?: string[];
  examRelevance?: string;
  relatedConcepts?: string[];
}

export const useUserStudyPlan = () => {
  const [loading, setLoading] = useState(true);
  const [conceptCards, setConceptCards] = useState<ConceptCard[]>([]);

  useEffect(() => {
    // Simulate API call with setTimeout
    const fetchData = () => {
      setLoading(true);
      setTimeout(() => {
        const mockCards: ConceptCard[] = [
          {
            id: 'c1',
            title: "Newton's Second Law of Motion",
            description: "Understand the relationship between force, mass, and acceleration.",
            content: {
              basic: "Newton's Second Law states that the rate of change of momentum of an object is directly proportional to the force applied, and occurs in the direction of the applied force. It can be mathematically expressed as F = ma.",
              detailed: "Newton's Second Law states that the rate of change of momentum of an object is directly proportional to the force applied, and occurs in the direction of the applied force. It can be mathematically expressed as F = ma, where F is the force, m is the mass, and a is the acceleration. This fundamental law is the basis for classical mechanics and has applications in various fields of science and engineering.",
              simplified: "When you push an object, it accelerates in the direction you push it. The heavier the object, the harder you need to push to get the same acceleration.",
              advanced: "In vector form, Newton's Second Law is ΣF = m·a, where ΣF is the vector sum of all forces acting on the object. For variable mass systems, the more general form dp/dt = F applies, where p is momentum."
            },
            subject: "Physics",
            chapter: "Laws of Motion",
            difficulty: "Medium",
            estimatedTime: 20,
            completed: false,
            progress: 0,
            scheduledFor: 'today',
            examples: [
              "When you push a shopping cart, the acceleration of the cart is directly proportional to the force you apply.",
              "A rocket accelerates as the engines exert force by expelling gas in the opposite direction.",
              "In a game of billiards, when the cue ball strikes another ball, the second ball accelerates in proportion to the force of impact."
            ],
            commonMistakes: [
              "Forgetting that both force and acceleration are vector quantities with direction.",
              "Confusing mass with weight, which is actually a force (weight = mass × gravity).",
              "Not accounting for all forces acting on an object when applying the equation F = ma."
            ],
            examRelevance: "Newton's Second Law is a critical concept in physics and frequently appears in IIT-JEE exams. You may encounter problems involving multiple forces, inclined planes, pulleys, or connected objects where you'll need to apply this law.",
            relatedConcepts: ["c4", "c7", "c2"]
          },
          {
            id: 'c2',
            title: "Cell Structure and Function",
            description: "Learn about the different organelles and their functions.",
            content: {
              basic: "Cells are the basic structural and functional units of all living organisms.",
              detailed: "Cells are the basic structural and functional units of all living organisms. Each cell contains various organelles with specific functions. The cell membrane controls what enters and leaves the cell. The nucleus contains DNA and controls cellular activities. Mitochondria are the powerhouse of the cell, generating ATP through cellular respiration. The endoplasmic reticulum is involved in protein and lipid synthesis, while the Golgi apparatus modifies, sorts, and packages proteins for secretion or use within the cell.",
              simplified: "Think of a cell as a tiny factory where each part (organelle) has a specific job. The cell membrane is like a security guard, the nucleus is the control center, and mitochondria are power plants.",
              advanced: "Cellular functions are regulated through complex signaling pathways and genetic regulatory networks. Post-translational modifications, compartmentalization, and targeted protein degradation provide additional layers of control over cellular processes."
            },
            subject: "Biology",
            chapter: "Cell Biology",
            difficulty: "Easy",
            estimatedTime: 15,
            completed: true,
            progress: 100,
            scheduledFor: 'today',
            examples: [
              "Red blood cells transport oxygen throughout the body.",
              "Neurons transmit electrical signals in the nervous system.",
              "Muscle cells contract to facilitate movement."
            ],
            commonMistakes: [
              "Confusing prokaryotic and eukaryotic cells.",
              "Mixing up the functions of different organelles.",
              "Not understanding the relationship between cell structure and function."
            ],
            examRelevance: "Cell biology is fundamental to understanding more complex biological processes. In NEET/IIT-JEE, you'll encounter questions on organelles, cellular processes, and differences between plant and animal cells.",
            relatedConcepts: ["c3", "c5", "c8"]
          },
          {
            id: 'c3',
            title: "Periodic Table and Element Properties",
            description: "Explore the patterns and trends in the periodic table.",
            content: {
              basic: "The periodic table organizes elements based on their atomic number and electron configuration.",
              detailed: "The periodic table organizes elements based on their atomic number and electron configuration, revealing patterns in their properties. Elements in the same group (vertical column) have similar chemical properties due to having the same number of valence electrons. As you move from left to right across a period (horizontal row), elements become more metallic to non-metallic. Atomic radius generally decreases across a period and increases down a group. Ionization energy tends to increase across a period and decrease down a group.",
              simplified: "The periodic table is like a map that organizes chemical elements. Elements in the same column behave similarly, while properties change predictably as you move across rows or down columns.",
              advanced: "Electron configurations and effective nuclear charge explain the periodic trends observed. Anomalies in these trends often occur due to electron-electron repulsions, relativistic effects, or d-orbital and f-orbital filling patterns."
            },
            subject: "Chemistry",
            chapter: "Periodic Classification",
            difficulty: "Medium",
            estimatedTime: 25,
            completed: false,
            progress: 30,
            scheduledFor: 'today',
            examples: [
              "Alkali metals (Group 1) are highly reactive and form +1 ions.",
              "Noble gases (Group 18) have complete outer shells and are generally unreactive.",
              "Halogens (Group 17) readily form -1 ions by gaining one electron."
            ],
            commonMistakes: [
              "Incorrectly identifying periodic trends.",
              "Confusing properties of elements within the same group or period.",
              "Not understanding exceptions to periodic trends (e.g., anomalies in Group 13)."
            ],
            examRelevance: "The periodic table is a cornerstone of chemistry in IIT-JEE. Questions often focus on periodic trends, comparing element properties, and predicting chemical behavior based on position in the table.",
            relatedConcepts: ["c6", "c9", "c1"]
          },
          {
            id: 'c4',
            title: "Integration by Parts",
            description: "Master the technique for integrating products of functions.",
            content: {
              basic: "Integration by parts is a technique used to find the integral of a product of functions.",
              detailed: "Integration by parts is a technique used to find the integral of a product of functions. It is based on the product rule of differentiation and is given by the formula: ∫u dv = uv - ∫v du. This method is particularly useful when one function becomes simpler when differentiated (u) and the other function can be easily integrated (dv).",
              simplified: "Integration by parts is like a strategic trade-off. You choose one part of the expression to differentiate (making it simpler) and another part to integrate, then combine the results in a specific way.",
              advanced: "The integration by parts formula can be applied repeatedly for functions like xⁿ·eᵏˣ, xⁿ·sin(kx), or xⁿ·ln(x). For oscillating functions like sin(x)·cos(x), using the formula twice often leads back to the original integral with a coefficient, allowing for algebraic solution."
            },
            subject: "Mathematics",
            chapter: "Integral Calculus",
            difficulty: "Hard",
            estimatedTime: 30,
            completed: false,
            progress: 20,
            scheduledFor: 'week',
            examples: [
              "To integrate ∫x cos(x) dx, we can use u = x and dv = cos(x) dx.",
              "For ∫ln(x) dx, we can set u = ln(x) and dv = dx.",
              "When integrating ∫x e^x dx, we use u = x and dv = e^x dx."
            ],
            commonMistakes: [
              "Incorrect choice of u and dv, leading to more complex integrals.",
              "Forgetting the negative sign in the formula: ∫u dv = uv - ∫v du.",
              "Not recognizing when to apply integration by parts versus other integration techniques."
            ],
            examRelevance: "Integration by parts is a fundamental technique in calculus that frequently appears in IIT-JEE. You'll need to master this method to solve complex integration problems, especially those involving products of functions.",
            relatedConcepts: ["c1", "c3", "c7"]
          },
          {
            id: 'c5',
            title: "Thermodynamics First Law",
            description: "Understanding energy conservation in thermodynamic systems.",
            content: {
              basic: "The First Law of Thermodynamics is essentially the law of conservation of energy applied to thermodynamic systems.",
              detailed: "The First Law of Thermodynamics is essentially the law of conservation of energy applied to thermodynamic systems. It states that energy cannot be created or destroyed, only transformed from one form to another. Mathematically, it can be expressed as ΔU = Q - W, where ΔU is the change in internal energy, Q is the heat added to the system, and W is the work done by the system.",
              simplified: "The First Law of Thermodynamics says you can't get something for nothing when it comes to energy. If a system gains energy in one form, it must lose energy in another form, keeping the total energy constant.",
              advanced: "For cyclic processes, ∮δQ = ∮δW since ΔU = 0. The first law doesn't restrict the direction of processes but merely quantifies energy conservation. When combined with the Second Law (entropy), it provides a complete description of thermodynamic possibility."
            },
            subject: "Physics",
            chapter: "Thermodynamics",
            difficulty: "Hard",
            estimatedTime: 25,
            completed: false,
            progress: 15,
            scheduledFor: 'week',
            examples: [
              "When a gas is compressed in a piston, work is done on the gas, increasing its internal energy and temperature.",
              "In an electric kettle, electrical energy is converted to thermal energy, raising the temperature of water.",
              "During an adiabatic expansion of a gas, no heat is transferred, so the gas does work at the expense of its internal energy."
            ],
            commonMistakes: [
              "Confusing the sign convention for work done by vs. on the system.",
              "Not distinguishing between different thermodynamic processes (isothermal, isobaric, isochoric, adiabatic).",
              "Overlooking the fact that internal energy is a state function while heat and work are path functions."
            ],
            examRelevance: "Thermodynamics is a major topic in physics for IIT-JEE. The First Law forms the foundation for understanding thermodynamic processes, cycles, and efficiency calculations.",
            relatedConcepts: ["c1", "c7", "c8"]
          },
          {
            id: 'c6',
            title: "Chemical Bonding",
            description: "Learn about different types of chemical bonds and their properties.",
            content: {
              basic: "Chemical bonding is the attraction between atoms that holds them together in molecules or compounds.",
              detailed: "Chemical bonding is the attraction between atoms or ions that holds them together in molecules or crystals. The main types of chemical bonds are ionic bonds (electrostatic attraction between oppositely charged ions), covalent bonds (sharing of electron pairs between atoms), and metallic bonds (attraction between positive metal ions and delocalized electrons). Bond strength and properties depend on factors like electronegativity differences, bond length, and bond angles.",
              simplified: "Chemical bonds are like relationships between atoms. Some atoms share electrons fairly equally (covalent bonds), others give and take electrons (ionic bonds), and some pool all their electrons together (metallic bonds).",
              advanced: "Molecular orbital theory provides a more comprehensive understanding of bonding than the simplified Lewis and VSEPR approaches. It explains phenomena like paramagnetism in O₂ and delocalized bonding in benzene, which cannot be adequately described using localized electron models."
            },
            subject: "Chemistry",
            chapter: "Chemical Bonding",
            difficulty: "Medium",
            estimatedTime: 20,
            completed: true,
            progress: 100,
            scheduledFor: 'week',
            examples: [
              "Sodium chloride (NaCl) exhibits ionic bonding, with Na+ and Cl- ions.",
              "Water (H2O) has covalent bonds between oxygen and hydrogen atoms, with a bent molecular geometry.",
              "Metals like copper have metallic bonds, allowing for electrical conductivity and malleability."
            ],
            commonMistakes: [
              "Assuming all bonds are purely ionic or purely covalent, when many are somewhere in between.",
              "Not considering molecular geometry and its effect on polarity.",
              "Forgetting that bond strength affects physical properties like boiling point."
            ],
            examRelevance: "Chemical bonding appears extensively in IIT-JEE, covering topics like VSEPR theory, hybridization, molecular orbital theory, and bond properties.",
            relatedConcepts: ["c3", "c9", "c1"]
          },
          {
            id: 'c7',
            title: "Organic Chemistry Nomenclature",
            description: "Learn IUPAC naming rules for organic compounds.",
            content: {
              basic: "IUPAC nomenclature provides standardized rules for naming organic compounds.",
              detailed: "IUPAC nomenclature provides standardized rules for naming organic compounds. The process involves identifying the parent chain, numbering the carbon atoms, identifying substituents and functional groups, and combining these components with appropriate prefixes, infixes, and suffixes. The system ensures that each compound has a unique name that accurately reflects its structure.",
              simplified: "IUPAC naming is like addressing a letter with a very specific format. You need the right prefixes (like street name), the main part (house number), and suffixes (apartment number), all in the correct order so anyone can find the exact compound.",
              advanced: "Priority rules in IUPAC nomenclature can become complex for polyfunctional compounds. The sequence rule determines precedence among functional groups, while positional numbers aim to minimize the sum of locants while prioritizing principal groups."
            },
            subject: "Chemistry",
            chapter: "Organic Chemistry",
            difficulty: "Hard",
            estimatedTime: 35,
            completed: false,
            progress: 50,
            scheduledFor: 'month',
            examples: [
              "CH3-CH2-CH2-OH is named as propan-1-ol.",
              "CH3-CH(CH3)-COOH is named as 2-methylpropanoic acid.",
              "CH3-C(=O)-CH3 is named as propanone or acetone."
            ],
            commonMistakes: [
              "Incorrect identification of the parent chain (not always the longest carbon chain).",
              "Wrong numbering direction (should minimize substituent position numbers).",
              "Overlooking priority rules for multiple functional groups."
            ],
            examRelevance: "Organic nomenclature is fundamental to IIT-JEE chemistry. Questions often involve naming compounds or identifying structures from IUPAC names.",
            relatedConcepts: ["c3", "c6", "c8"]
          },
          {
            id: 'c8',
            title: "Quadratic Equations",
            description: "Solving and analyzing different forms of quadratic equations.",
            content: {
              basic: "A quadratic equation is a second-degree polynomial equation of the form ax² + bx + c = 0, where a ≠ 0.",
              detailed: "A quadratic equation is a second-degree polynomial equation of the form ax² + bx + c = 0, where a ≠ 0. Such equations can be solved using factorization, completing the square, or the quadratic formula: x = (-b ± √(b² - 4ac))/2a. The discriminant (b² - 4ac) determines the nature of roots: positive for two distinct real roots, zero for one real root (repeated), and negative for two complex conjugate roots.",
              simplified: "Quadratic equations are like mathematical puzzles where you need to find what value(s) of x make the equation true. There are several methods to solve them, like factoring or using the quadratic formula, and you can have one, two, or no real solutions.",
              advanced: "Vieta's formulas relate the coefficients of a quadratic equation to the sum and product of its roots: if the roots are r and s, then r + s = -b/a and rs = c/a. These relationships allow for solving problems without explicitly finding the roots."
            },
            subject: "Mathematics",
            chapter: "Algebra",
            difficulty: "Easy",
            estimatedTime: 15,
            completed: true,
            progress: 100,
            scheduledFor: 'month',
            examples: [
              "x² - 5x + 6 = 0 can be factored as (x - 2)(x - 3) = 0, giving roots x = 2, 3.",
              "x² + 4x + 4 = 0 has a discriminant of 0, resulting in one repeated root x = -2.",
              "x² + 1 = 0 has a negative discriminant, yielding complex roots x = ±i."
            ],
            commonMistakes: [
              "Errors in calculating the discriminant.",
              "Sign errors when applying the quadratic formula.",
              "Not checking solutions by substituting back into the original equation."
            ],
            examRelevance: "Quadratic equations are fundamental to algebra and appear frequently in IIT-JEE. Questions may involve finding roots, forming equations with given roots, or analyzing the nature of roots.",
            relatedConcepts: ["c4", "c5", "c7"]
          },
        ];
        
        setConceptCards(mockCards);
        setLoading(false);
      }, 500);
    };
    
    fetchData();
  }, []);

  return {
    conceptCards,
    loading
  };
};

// Export the hook for individual concept card details
export const useConceptCardDetails = (conceptId: string) => {
  const { conceptCards, loading } = useUserStudyPlan();
  const [conceptCard, setConceptCard] = useState<ConceptCard | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsLoading(true);
    
    // Find the concept card by ID
    const foundCard = conceptCards.find(card => card.id === conceptId);
    if (foundCard) {
      setConceptCard(foundCard);
    }
    
    setIsLoading(false);
  }, [conceptId, conceptCards]);
  
  return { conceptCard, loading: loading || isLoading };
};
