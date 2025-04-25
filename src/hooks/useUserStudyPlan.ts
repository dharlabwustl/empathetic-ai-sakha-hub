
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

export interface ConceptCard {
  id: string;
  title: string;
  subject: string;
  chapter: string;
  description?: string;
  estimatedTime: number;
  scheduledFor: "today" | "tomorrow" | "later";
  completed: boolean;
  difficulty: "easy" | "medium" | "hard";
  topics: string[];
}

export const useUserStudyPlan = () => {
  const [loading, setLoading] = useState(true);
  const [conceptCards, setConceptCards] = useState<ConceptCard[]>([]);
  const { toast } = useToast();
  
  // Fetch concept cards data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // In a real app, this would be an API call
        // For now, we use mock data
        const mockConceptCards: ConceptCard[] = [
          {
            id: "concept1",
            title: "Introduction to Kinematics",
            subject: "Physics",
            chapter: "Motion in One Dimension",
            description: "Basic concepts of position, velocity, and acceleration",
            estimatedTime: 30,
            scheduledFor: "today",
            completed: false,
            difficulty: "medium",
            topics: ["kinematics", "velocity", "acceleration"]
          },
          {
            id: "concept2",
            title: "Newton's Laws of Motion",
            subject: "Physics",
            chapter: "Forces and Motion",
            description: "Understanding force and its effects on motion",
            estimatedTime: 45,
            scheduledFor: "today",
            completed: false,
            difficulty: "medium",
            topics: ["forces", "newton's laws", "motion"]
          },
          {
            id: "concept3",
            title: "Organic Chemistry Introduction",
            subject: "Chemistry",
            chapter: "Carbon Compounds",
            description: "Basic concepts of organic chemistry and carbon compounds",
            estimatedTime: 40,
            scheduledFor: "today",
            completed: false,
            difficulty: "hard",
            topics: ["organic chemistry", "carbon compounds", "hydrocarbons"]
          },
          {
            id: "concept4",
            title: "Differential Calculus",
            subject: "Mathematics",
            chapter: "Calculus",
            description: "Introduction to derivatives and their applications",
            estimatedTime: 60,
            scheduledFor: "tomorrow",
            completed: false,
            difficulty: "hard",
            topics: ["calculus", "derivatives", "limits"]
          },
          {
            id: "concept5",
            title: "Periodic Table Trends",
            subject: "Chemistry",
            chapter: "Elements and Periodicity",
            description: "Understanding trends and patterns in the periodic table",
            estimatedTime: 35,
            scheduledFor: "today",
            completed: false,
            difficulty: "medium",
            topics: ["periodic table", "elements", "periodicity"]
          }
        ];
        
        setConceptCards(mockConceptCards);
      } catch (error) {
        console.error("Error fetching study plan:", error);
        toast({
          title: "Error",
          description: "Failed to load your study plan. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Mark concept as completed
  const markConceptCompleted = (conceptId: string, isCompleted: boolean = true) => {
    setConceptCards(prevCards => 
      prevCards.map(card => 
        card.id === conceptId ? { ...card, completed: isCompleted } : card
      )
    );
    
    // In a real app, you would also make an API call to persist this change
  };
  
  return {
    conceptCards,
    loading,
    markConceptCompleted
  };
};
