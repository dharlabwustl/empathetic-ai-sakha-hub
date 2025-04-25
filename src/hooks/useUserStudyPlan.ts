
import { useState, useEffect } from 'react';

export interface ConceptCard {
  id: string;
  title: string;
  subject: string;
  chapter: string;
  difficulty: string;
  completed: boolean;
  scheduledFor: 'today' | 'week' | 'month';
  estimatedTime: number;
  progress?: number;
  examGoal?: string; // Added field for concept filtering
  tags?: string[]; // Added field for concept filtering
}

export const useUserStudyPlan = () => {
  const [conceptCards, setConceptCards] = useState<ConceptCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const loadData = async () => {
      setLoading(true);
      
      // Mock data
      const mockCards: ConceptCard[] = [
        {
          id: '1',
          title: 'Newton\'s Laws of Motion',
          subject: 'Physics',
          chapter: 'Classical Mechanics',
          difficulty: 'Medium',
          completed: true,
          scheduledFor: 'today',
          estimatedTime: 20,
          tags: ['mechanics', 'fundamental', 'forces']
        },
        {
          id: '2',
          title: 'Integration Techniques',
          subject: 'Mathematics',
          chapter: 'Calculus',
          difficulty: 'Hard',
          completed: false,
          scheduledFor: 'today',
          estimatedTime: 25,
          tags: ['calculus', 'advanced', 'integration']
        },
        {
          id: '3',
          title: 'Periodic Table Trends',
          subject: 'Chemistry',
          chapter: 'Inorganic Chemistry',
          difficulty: 'Easy',
          completed: false,
          scheduledFor: 'today',
          estimatedTime: 15,
          tags: ['periodic table', 'elements', 'trends']
        },
        {
          id: '4',
          title: 'Cell Structure',
          subject: 'Biology',
          chapter: 'Cell Biology',
          difficulty: 'Medium',
          completed: true,
          scheduledFor: 'week',
          estimatedTime: 20,
          tags: ['cells', 'organelles', 'membrane']
        },
        {
          id: '5',
          title: 'Thermodynamics Laws',
          subject: 'Physics',
          chapter: 'Thermal Physics',
          difficulty: 'Hard',
          completed: false,
          scheduledFor: 'week',
          estimatedTime: 30,
          tags: ['thermal', 'energy', 'laws']
        },
        {
          id: '6',
          title: 'Quantum Mechanics',
          subject: 'Physics',
          chapter: 'Modern Physics',
          difficulty: 'Hard',
          completed: false,
          scheduledFor: 'month',
          estimatedTime: 35,
          tags: ['quantum', 'advanced', 'waves']
        }
      ];
      
      // Add examGoal to each card
      mockCards.forEach(card => {
        card.examGoal = 'IIT-JEE';
      });
      
      setTimeout(() => {
        setConceptCards(mockCards);
        setLoading(false);
      }, 1000);
    };
    
    loadData();
  }, []);
  
  const markConceptCompleted = (conceptId: string) => {
    setConceptCards(prevCards => 
      prevCards.map(card => 
        card.id === conceptId 
          ? { ...card, completed: true } 
          : card
      )
    );
  };
  
  return { conceptCards, loading, markConceptCompleted };
};
