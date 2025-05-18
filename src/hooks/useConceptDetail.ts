
import { useState, useCallback } from 'react';
import { ConceptCard } from '@/types/user/conceptCard';

interface ConceptMastery {
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  percentage: number;
}

export const useConceptDetail = (conceptId: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [concept, setConcept] = useState<ConceptCard | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  // Simulate fetching concept details
  useState(() => {
    setTimeout(() => {
      try {
        // Mock data for demo - in production this would come from API
        const mockConcept: ConceptCard = {
          id: conceptId,
          title: "Newton's Laws of Motion",
          subject: "Physics",
          chapter: "Mechanics",
          difficulty: "Medium",
          description: "The fundamental principles describing the relationship between forces and motion of objects.",
          content: "Newton's laws of motion are three laws that describe the relationship between the motion of an object and the forces acting on it. The first law states that an object at rest will stay at rest, and an object in motion will stay in motion unless acted on by an external force. The second law states that the acceleration of an object depends on the mass of the object and the amount of force applied. The third law states that for every action, there is an equal and opposite reaction.\n\nThese laws form the foundation of classical mechanics and are essential for understanding physical phenomena.",
          keyPoints: [
            "First Law (Inertia): An object continues in its state of rest or uniform motion unless acted upon by forces.",
            "Second Law (F=ma): The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.",
            "Third Law: For every action, there is an equal and opposite reaction."
          ],
          formulas: [
            "F = ma (Force equals mass times acceleration)",
            "p = mv (Momentum equals mass times velocity)"
          ],
          examples: [
            "A rocket launching into space demonstrates all three laws: engines push down (action), rocket goes up (reaction), acceleration depends on rocket mass and engine force.",
            "A book sitting on a table remains at rest due to the balanced forces of gravity and the normal force from the table."
          ],
          commonMistakes: [
            "Confusing mass and weight. Mass is an intrinsic property, while weight is a force due to gravity.",
            "Forgetting that Newton's laws apply only in inertial reference frames.",
            "Not accounting for all forces in a problem when calculating net force."
          ],
          mastery: {
            level: 'Intermediate',
            percentage: 65
          },
          notes: ["Remember to calculate the normal force in inclined plane problems.", "Draw free body diagrams to visualize all forces acting on the object."],
          videos: [
            {
              id: "v1",
              title: "Introduction to Newton's Laws",
              url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
              duration: "12:34",
              thumbnail: "https://picsum.photos/640/360"
            },
            {
              id: "v2",
              title: "Solving Force Problems",
              url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
              duration: "8:42",
              thumbnail: "https://picsum.photos/640/360"
            }
          ],
          practiceQuestions: [
            {
              id: "q1",
              text: "What is the acceleration of a 2 kg object with a 10 N force applied to it?",
              options: [
                { id: "a", text: "5 m/s²" },
                { id: "b", text: "20 m/s²" },
                { id: "c", text: "2 m/s²" },
                { id: "d", text: "10 m/s²" }
              ],
              correctOptionId: "a"
            },
            {
              id: "q2",
              text: "Which law states that for every action, there is an equal and opposite reaction?",
              options: [
                { id: "a", text: "First law" },
                { id: "b", text: "Second law" },
                { id: "c", text: "Third law" },
                { id: "d", text: "Law of conservation of momentum" }
              ],
              correctOptionId: "c"
            }
          ],
          resources: [
            {
              id: "r1",
              title: "Interactive Force Simulator",
              type: "other",
              url: "https://phet.colorado.edu/en/simulations/forces-and-motion-basics",
              source: "PhET Interactive Simulations"
            },
            {
              id: "r2",
              title: "Newton's Laws: Practice Problems",
              type: "worksheet",
              url: "#",
              isPremium: true
            }
          ],
          examRelevance: "High importance for NEET exams. Frequently appears in MCQs and numerical questions.",
          estimatedTime: 45,
        };
        
        setConcept(mockConcept);
        setLoading(false);
      } catch (err) {
        setError("Failed to load concept details");
        setLoading(false);
      }
    }, 1000);
  }, [conceptId]);
  
  // Handler for updating notes
  const updateNotes = useCallback((updatedNotes: string[]) => {
    setConcept(prev => {
      if (!prev) return null;
      return { ...prev, notes: updatedNotes };
    });
  }, []);
  
  // Handler for incrementing view count
  const incrementViews = useCallback(() => {
    console.log("View count incremented for concept", conceptId);
    // This would typically be an API call to update view count
  }, [conceptId]);
  
  // Handler for toggling bookmark status
  const toggleBookmark = useCallback(() => {
    setIsBookmarked(prev => !prev);
    // This would typically be an API call to update bookmark status
  }, []);
  
  // Handler for updating mastery level
  const updateMastery = useCallback((percentage: number) => {
    setConcept(prev => {
      if (!prev) return null;
      
      let level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
      
      if (percentage < 30) level = 'Beginner';
      else if (percentage < 60) level = 'Intermediate';
      else if (percentage < 90) level = 'Advanced';
      else level = 'Expert';
      
      return { 
        ...prev, 
        mastery: { level, percentage } 
      };
    });
  }, []);
  
  return {
    concept,
    loading,
    error,
    isBookmarked,
    updateNotes,
    incrementViews,
    toggleBookmark,
    updateMastery
  };
};
