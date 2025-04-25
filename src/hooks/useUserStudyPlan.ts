
import { useState, useEffect } from 'react';

export interface ConceptCard {
  id: string;
  title: string;
  subject: string;
  chapter: string;
  scheduledFor: 'today' | 'week' | 'month';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedTime: number;
  completed: boolean;
}

export const useUserStudyPlan = () => {
  const [conceptCards, setConceptCards] = useState<ConceptCard[]>([
    {
      id: 'c1',
      title: 'Kinematics in One Dimension',
      subject: 'Physics',
      chapter: 'Mechanics',
      scheduledFor: 'today',
      difficulty: 'Medium',
      estimatedTime: 20,
      completed: false
    },
    {
      id: 'c2',
      title: 'Newton\'s Laws of Motion',
      subject: 'Physics',
      chapter: 'Mechanics',
      scheduledFor: 'today',
      difficulty: 'Medium',
      estimatedTime: 25,
      completed: false
    },
    {
      id: 'c3',
      title: 'Work, Energy and Power',
      subject: 'Physics',
      chapter: 'Mechanics',
      scheduledFor: 'today',
      difficulty: 'Hard',
      estimatedTime: 30,
      completed: false
    },
    {
      id: 'c4',
      title: 'Rotational Motion',
      subject: 'Physics',
      chapter: 'Mechanics',
      scheduledFor: 'week',
      difficulty: 'Hard',
      estimatedTime: 35,
      completed: false
    },
    {
      id: 'c5',
      title: 'Periodic Table and Elements',
      subject: 'Chemistry',
      chapter: 'Inorganic Chemistry',
      scheduledFor: 'today',
      difficulty: 'Easy',
      estimatedTime: 15,
      completed: true
    },
    {
      id: 'c6',
      title: 'Organic Chemistry Basics',
      subject: 'Chemistry',
      chapter: 'Organic Chemistry',
      scheduledFor: 'week',
      difficulty: 'Medium',
      estimatedTime: 25,
      completed: false
    },
    {
      id: 'c7',
      title: 'Differentiation Techniques',
      subject: 'Mathematics',
      chapter: 'Calculus',
      scheduledFor: 'today',
      difficulty: 'Medium',
      estimatedTime: 30,
      completed: true
    },
    {
      id: 'c8',
      title: 'Integration Methods',
      subject: 'Mathematics',
      chapter: 'Calculus',
      scheduledFor: 'week',
      difficulty: 'Hard',
      estimatedTime: 40,
      completed: false
    },
    {
      id: 'c9',
      title: 'Equilibrium and Acids/Bases',
      subject: 'Chemistry',
      chapter: 'Physical Chemistry',
      scheduledFor: 'today',
      difficulty: 'Medium',
      estimatedTime: 25,
      completed: false
    },
    {
      id: 'c10',
      title: 'Quadratic Equations',
      subject: 'Mathematics',
      chapter: 'Algebra',
      scheduledFor: 'week',
      difficulty: 'Easy',
      estimatedTime: 20,
      completed: true
    },
    {
      id: 'c11',
      title: 'Thermodynamics',
      subject: 'Physics',
      chapter: 'Thermal Physics',
      scheduledFor: 'month',
      difficulty: 'Hard',
      estimatedTime: 35,
      completed: false
    },
    {
      id: 'c12',
      title: 'Waves and Sound',
      subject: 'Physics',
      chapter: 'Waves',
      scheduledFor: 'month',
      difficulty: 'Medium',
      estimatedTime: 25,
      completed: false
    },
    {
      id: 'c13',
      title: 'Organic Reactions',
      subject: 'Chemistry',
      chapter: 'Organic Chemistry',
      scheduledFor: 'month',
      difficulty: 'Hard',
      estimatedTime: 30,
      completed: false
    },
    {
      id: 'c14',
      title: 'Probability',
      subject: 'Mathematics',
      chapter: 'Statistics',
      scheduledFor: 'month',
      difficulty: 'Medium',
      estimatedTime: 20,
      completed: false
    }
  ]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Function to mark a concept card as completed
  const markConceptCompleted = (conceptId: string, completed: boolean = true) => {
    setConceptCards(prevCards => 
      prevCards.map(card => 
        card.id === conceptId ? { ...card, completed } : card
      )
    );
  };
  
  // Function to get a specific concept card
  const getConceptCard = (conceptId: string) => {
    return conceptCards.find(card => card.id === conceptId);
  };
  
  return { 
    conceptCards, 
    loading, 
    setConceptCards,
    markConceptCompleted,
    getConceptCard
  };
};

export default useUserStudyPlan;
