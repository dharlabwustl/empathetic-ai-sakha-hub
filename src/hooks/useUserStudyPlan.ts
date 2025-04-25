
import { useState, useEffect } from 'react';
import { useUserProfile } from '@/hooks/useUserProfile';

export interface ConceptCard {
  id: string;
  title: string;
  subject: string;
  chapter: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedTime: number;
  scheduledFor: 'today' | 'week' | 'month';
  completed: boolean;
  content?: string;
  examples?: string[];
  commonMistakes?: string[];
  examRelevance?: string;
  relatedConcepts?: string[];
}

export function useUserStudyPlan() {
  const [conceptCards, setConceptCards] = useState<ConceptCard[]>([]);
  const [loading, setLoading] = useState(true);
  const { userProfile } = useUserProfile();

  useEffect(() => {
    // This would typically come from an API call based on the user's exam goals and study plan
    // For now, we'll use mock data
    const fetchConceptCards = async () => {
      setLoading(true);
      try {
        // Simulating an API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // We would fetch based on the user's profile data
        const examGoal = userProfile?.goals?.[0]?.title || 'IIT-JEE';
        
        // Mock data structure - would come from API
        const mockConceptCards: ConceptCard[] = [
          {
            id: 'c1',
            title: "Newton's Third Law of Motion",
            subject: "Physics",
            chapter: "Laws of Motion",
            difficulty: "Medium",
            estimatedTime: 15,
            scheduledFor: 'today',
            completed: true
          },
          {
            id: 'c2',
            title: "Acid-Base Reactions",
            subject: "Chemistry",
            chapter: "Chemical Reactions",
            difficulty: "Easy",
            estimatedTime: 20,
            scheduledFor: 'today',
            completed: false
          },
          {
            id: 'c3',
            title: "Integration by Parts",
            subject: "Mathematics",
            chapter: "Integral Calculus",
            difficulty: "Hard",
            estimatedTime: 25,
            scheduledFor: 'today',
            completed: false
          },
          {
            id: 'c4',
            title: "DNA Replication",
            subject: "Biology",
            chapter: "Molecular Biology",
            difficulty: "Medium",
            estimatedTime: 30,
            scheduledFor: 'week',
            completed: false
          },
          {
            id: 'c5',
            title: "The Indian Constitution",
            subject: "Polity",
            chapter: "Indian Political System",
            difficulty: "Easy",
            estimatedTime: 20,
            scheduledFor: 'week',
            completed: false
          },
          {
            id: 'c6',
            title: "Redox Reactions",
            subject: "Chemistry",
            chapter: "Electrochemistry",
            difficulty: "Medium",
            estimatedTime: 25,
            scheduledFor: 'week',
            completed: true
          },
          {
            id: 'c7',
            title: "Electromagnetic Induction",
            subject: "Physics",
            chapter: "Electromagnetism",
            difficulty: "Hard",
            estimatedTime: 35,
            scheduledFor: 'month',
            completed: false
          },
          {
            id: 'c8',
            title: "Complex Numbers",
            subject: "Mathematics",
            chapter: "Algebra",
            difficulty: "Medium",
            estimatedTime: 30,
            scheduledFor: 'month',
            completed: true
          },
          {
            id: 'c9',
            title: "Cellular Respiration",
            subject: "Biology",
            chapter: "Cell Biology",
            difficulty: "Medium",
            estimatedTime: 25,
            scheduledFor: 'month',
            completed: false
          }
        ];
        
        setConceptCards(mockConceptCards);
      } catch (error) {
        console.error("Error fetching concept cards:", error);
        setConceptCards([]);
      } finally {
        setLoading(false);
      }
    };

    fetchConceptCards();
  }, [userProfile]);

  return {
    conceptCards,
    loading
  };
}

export function useConceptCardDetails(conceptId: string) {
  const [conceptCard, setConceptCard] = useState<ConceptCard | null>(null);
  const [loading, setLoading] = useState(true);
  const { conceptCards } = useUserStudyPlan();

  useEffect(() => {
    setLoading(true);
    // Simulate API fetch with delay
    setTimeout(() => {
      // Find the concept card from our collection or fetch from API
      const card = conceptCards.find(card => card.id === conceptId) || null;
      
      // If found, add the detailed content (in a real app, this would be a separate API call)
      if (card) {
        const enhancedCard: ConceptCard = {
          ...card,
          content: `This is detailed information about ${card.title}. In a real application, this would be comprehensive content explaining the concept in depth.`,
          examples: [
            "Real-world example 1 for explaining this concept.",
            "Real-world example 2 showing practical application.",
            "Real-world example 3 with interactive elements."
          ],
          commonMistakes: [
            "Common mistake 1: Misunderstanding the core principle.",
            "Common mistake 2: Application error in specific contexts.",
            "Common mistake 3: Calculation error due to sign convention."
          ],
          examRelevance: "This concept appears frequently in exams, typically in the form of direct questions worth 4-5 marks. It's considered a fundamental concept that forms the basis for more advanced topics.",
          relatedConcepts: ["c1", "c4", "c7"]
        };
        setConceptCard(enhancedCard);
      }
      
      setLoading(false);
    }, 800);
  }, [conceptId, conceptCards]);

  return {
    conceptCard,
    loading
  };
}
