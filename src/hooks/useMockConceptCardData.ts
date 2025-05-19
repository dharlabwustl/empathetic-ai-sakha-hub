
import { useState, useEffect } from 'react';
import { ConceptCard } from '@/types/user/conceptCard';

// This hook provides mock data for concept cards
export const useMockConceptCardData = () => {
  const [conceptCards, setConceptCards] = useState<ConceptCard[]>([]);
  
  useEffect(() => {
    // Create mock concept card data
    const mockData: ConceptCard[] = [
      {
        id: 'c001',
        title: "Newton's Second Law of Motion",
        description: "An explanation of how force relates to mass and acceleration",
        subject: "Physics",
        chapter: "Mechanics",
        topic: "Forces and Motion",
        difficulty: "medium",
        completed: false,
        progress: 25,
        content: `<p>Newton's Second Law states that the acceleration of an object is directly proportional to the net force acting on it, and inversely proportional to its mass.</p>
                  <p>This relationship is expressed by the equation:</p>
                  <p class="font-mono text-center my-4">F = ma</p>
                  <p>Where:</p>
                  <ul class="list-disc pl-5 space-y-1">
                    <li>F is the net force (in Newtons, N)</li>
                    <li>m is the mass (in kilograms, kg)</li>
                    <li>a is the acceleration (in meters per second squared, m/s²)</li>
                  </ul>
                  <p class="mt-4">This law allows us to calculate how objects move when forces are applied to them. The direction of the acceleration is in the same direction as the net force.</p>`,
        estimatedTime: 20,
        relatedConcepts: ['c002', 'c003', 'c004'],
        keyPoints: [
          "The acceleration of an object is directly proportional to the force applied",
          "The acceleration is inversely proportional to the object's mass",
          "The direction of acceleration is the same as the direction of the net force",
          "Net force is the vector sum of all forces acting on an object"
        ],
        examples: [
          "A 2 kg object experiences a net force of 10 N. Its acceleration will be 5 m/s².",
          "If you push a shopping cart with the same force, a full cart will accelerate more slowly than an empty one due to the increased mass."
        ],
        commonMistakes: [
          "Forgetting that force is a vector quantity with both magnitude and direction",
          "Not considering all forces when calculating the net force",
          "Confusing mass and weight"
        ],
        examRelevance: "This concept appears frequently in exams, often in calculation problems involving forces and motion, and in conceptual questions regarding acceleration.",
        practiceQuestions: [
          {
            id: "q1",
            question: "A 4 kg object experiences a net force of 12 N. What is its acceleration?",
            options: ["2 m/s²", "3 m/s²", "4 m/s²", "6 m/s²"],
            correctAnswer: "3 m/s²",
            explanation: "Using F = ma, we get: a = F/m = 12 N / 4 kg = 3 m/s²"
          },
          {
            id: "q2",
            question: "If a 1500 kg car accelerates at 2 m/s², what is the net force acting on it?",
            options: ["750 N", "1500 N", "3000 N", "4500 N"],
            correctAnswer: "3000 N",
            explanation: "Using F = ma, we get: F = 1500 kg × 2 m/s² = 3000 N"
          }
        ],
        formulas: ["F = ma", "a = F/m", "F = F₁ + F₂ + ... (vector sum)"],
        mastery: {
          level: "Basic",
          percentage: 35
        }
      },
      {
        id: 'c002',
        title: "Conservation of Momentum",
        description: "Understanding how momentum is conserved in collisions and interactions",
        subject: "Physics",
        chapter: "Mechanics",
        topic: "Momentum",
        difficulty: "hard",
        completed: false,
        progress: 10,
        content: `<p>The law of conservation of momentum states that the total momentum of a closed system remains constant if no external forces act on it.</p>
                  <p>Mathematically, for a collision or interaction between objects:</p>
                  <p class="font-mono text-center my-4">m₁v₁ + m₂v₂ = m₁v₁' + m₂v₂'</p>
                  <p>Where:</p>
                  <ul class="list-disc pl-5 space-y-1">
                    <li>m₁ and m₂ are the masses of the objects</li>
                    <li>v₁ and v₂ are the initial velocities</li>
                    <li>v₁' and v₂' are the final velocities</li>
                  </ul>
                  <p class="mt-4">This principle applies to all collisions, whether elastic or inelastic, and is a fundamental conservation law in physics.</p>`,
        estimatedTime: 30,
        scheduledFor: "today",
        keyPoints: [
          "Momentum is defined as mass × velocity (p = mv)",
          "Total momentum before interaction equals total momentum after interaction",
          "Applies to both elastic and inelastic collisions",
          "External forces can change the total momentum of a system"
        ],
        formulas: ["p = mv", "m₁v₁ + m₂v₂ = m₁v₁' + m₂v₂'"],
        mastery: {
          level: "Beginner",
          percentage: 15
        }
      },
      {
        id: 'c003',
        title: "Organic Chemistry: Alkanes",
        description: "Introduction to alkanes and their properties",
        subject: "Chemistry",
        chapter: "Organic Chemistry",
        topic: "Hydrocarbons",
        difficulty: "medium",
        completed: false,
        progress: 0,
        content: `<p>Alkanes are saturated hydrocarbons with the general formula C₅H₂ₙ₊₂, where n is the number of carbon atoms.</p>
                  <p>They feature single bonds between carbon atoms and are considered saturated compounds.</p>
                  <p>The first four alkanes are:</p>
                  <ul class="list-disc pl-5 space-y-1">
                    <li>Methane (CH₄)</li>
                    <li>Ethane (C₂H₆)</li>
                    <li>Propane (C₃H₈)</li>
                    <li>Butane (C₄H₁₀)</li>
                  </ul>
                  <p class="mt-4">Alkanes exhibit tetrahedral geometry around each carbon atom with bond angles of approximately 109.5°.</p>`,
        estimatedTime: 25,
        scheduledFor: "today",
        keyPoints: [
          "Alkanes are saturated hydrocarbons with single C-C bonds",
          "General formula: CₙH₂ₙ₊₂",
          "Tetrahedral geometry around carbon atoms",
          "Low reactivity compared to other hydrocarbon groups"
        ]
      },
      {
        id: 'c004',
        title: "Cell Division: Mitosis",
        description: "Understanding the process of mitotic cell division",
        subject: "Biology",
        chapter: "Cell Biology",
        topic: "Cell Division",
        difficulty: "hard",
        completed: true,
        progress: 100,
        content: `<p>Mitosis is the process of cell division that results in two identical daughter cells from a single parent cell.</p>
                  <p>The process consists of several distinct phases:</p>
                  <ol class="list-decimal pl-5 space-y-1">
                    <li><strong>Prophase:</strong> Chromatin condenses into chromosomes, nuclear envelope breaks down</li>
                    <li><strong>Metaphase:</strong> Chromosomes align at the metaphase plate</li>
                    <li><strong>Anaphase:</strong> Sister chromatids separate and move to opposite poles</li>
                    <li><strong>Telophase:</strong> Nuclear envelopes reform, chromosomes decondense</li>
                    <li><strong>Cytokinesis:</strong> Cytoplasm divides, creating two separate daughter cells</li>
                  </ol>
                  <p class="mt-4">Mitosis is crucial for growth, development, and repair of multicellular organisms.</p>`,
        estimatedTime: 35,
        scheduledFor: "today",
        keyPoints: [
          "Mitosis produces two genetically identical daughter cells",
          "The process occurs in several phases: prophase, metaphase, anaphase, telophase",
          "Cytokinesis completes the cell division process",
          "Mitosis is essential for growth, development, and tissue repair"
        ]
      },
      {
        id: 'c005',
        title: "Acid-Base Reactions",
        description: "Understanding acid-base reactions and pH",
        subject: "Chemistry",
        chapter: "Chemical Reactions",
        topic: "Acid-Base Chemistry",
        difficulty: "medium",
        completed: false,
        progress: 45,
        content: `<p>Acid-base reactions involve the transfer of protons (H⁺) from one substance to another.</p>
                  <p>According to the Brønsted-Lowry theory:</p>
                  <ul class="list-disc pl-5 space-y-1">
                    <li>An acid is a proton donor</li>
                    <li>A base is a proton acceptor</li>
                  </ul>
                  <p class="mt-4">The pH scale measures the acidity or basicity of a solution:</p>
                  <ul class="list-disc pl-5 space-y-1">
                    <li>pH < 7: Acidic solution</li>
                    <li>pH = 7: Neutral solution</li>
                    <li>pH > 7: Basic solution</li>
                  </ul>
                  <p class="mt-4">The reaction between an acid and a base produces a salt and water.</p>`,
        estimatedTime: 30,
        scheduledFor: "today",
        keyPoints: [
          "Acids donate protons (H⁺), bases accept protons",
          "pH scale ranges from 0 (strongly acidic) to 14 (strongly basic)",
          "Neutralization reactions produce salts and water",
          "pH = -log[H⁺]"
        ]
      },
      {
        id: 'c006',
        title: "Integration by Parts",
        description: "Technique for integrating products of functions",
        subject: "Mathematics",
        chapter: "Calculus",
        topic: "Integration Techniques",
        difficulty: "hard",
        completed: false,
        progress: 20,
        content: `<p>Integration by parts is a technique used to find the integral of a product of functions.</p>
                  <p>The formula is derived from the product rule for differentiation:</p>
                  <p class="font-mono text-center my-4">∫u(x)v'(x)dx = u(x)v(x) - ∫v(x)u'(x)dx</p>
                  <p>Where:</p>
                  <ul class="list-disc pl-5 space-y-1">
                    <li>u(x) and v'(x) are functions</li>
                    <li>v(x) is the antiderivative of v'(x)</li>
                    <li>u'(x) is the derivative of u(x)</li>
                  </ul>
                  <p class="mt-4">This technique is particularly useful when integrating products where one function becomes simpler when differentiated and the other doesn't become too complex when integrated.</p>`,
        estimatedTime: 40,
        scheduledFor: "today",
        keyPoints: [
          "Derived from the product rule for derivatives",
          "Formula: ∫u(x)v'(x)dx = u(x)v(x) - ∫v(x)u'(x)dx",
          "Choose u and v strategically - typically u should simplify when differentiated",
          "May need to be applied multiple times for complex integrals"
        ]
      }
    ];
    
    setConceptCards(mockData);
  }, []);
  
  return conceptCards;
};
