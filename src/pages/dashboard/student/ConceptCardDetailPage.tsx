
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import ConceptCardDetailView from "@/components/dashboard/student/concept-cards/ConceptCardDetailView";
import MainLayout from "@/components/layouts/MainLayout";
import { ConceptCard } from "@/hooks/useUserStudyPlan";
import { useUserStudyPlan } from "@/hooks/useUserStudyPlan";

interface ConceptDetail extends ConceptCard {
  content: {
    basic: string;
    detailed: string;
    simplified: string;
    advanced: string;
  };
  examples: string[];
  commonMistakes: string[];
  examRelevance: string;
  relatedConcepts: string[];
}

const ConceptCardDetailPage = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const { conceptCards, loading: cardsLoading, markConceptCompleted } = useUserStudyPlan();
  const [concept, setConcept] = useState<ConceptDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (conceptId && !cardsLoading) {
      setLoading(true);
      
      // First check if the concept exists in our conceptCards
      const foundCard = conceptCards.find(card => card.id === conceptId);
      
      if (foundCard) {
        // Extend the concept card with additional information for the detail view
        const detailedConcept: ConceptDetail = {
          ...foundCard,
          content: {
            basic: "Kinematics is the study of motion without considering its causes. In one dimension, we study motion along a straight line.",
            detailed: "Kinematics in one dimension deals with the mathematical description of motion along a straight line. It involves quantities like position, displacement, velocity, and acceleration. The key equations include: x = x₀ + v₀t + ½at², v = v₀ + at, and v² = v₀² + 2a(x - x₀), where x is position, v is velocity, a is acceleration, and t is time.",
            simplified: "Think of kinematics as understanding how objects move in a straight line - like a car driving on a straight road or a ball thrown vertically upward and falling back down.",
            advanced: "One-dimensional kinematics can be expressed using calculus relationships between position (x), velocity (v), and acceleration (a): v = dx/dt and a = dv/dt. These differential equations can be solved to predict the motion of objects under various conditions."
          },
          examples: [
            "A car traveling on a highway at constant speed covers equal distances in equal time intervals.",
            "A ball thrown vertically upward slows down due to gravity until it momentarily stops at its maximum height, then falls back down with increasing speed.",
            "A train accelerating from rest follows the equation x = ½at², where a is its constant acceleration."
          ],
          commonMistakes: [
            "Confusing velocity and acceleration - velocity is the rate of change of position, while acceleration is the rate of change of velocity.",
            "Forgetting to include the sign (direction) of quantities - in one dimension, positive and negative signs indicate direction.",
            "Applying constant acceleration equations to situations where acceleration varies.",
            "Mixing up average velocity and instantaneous velocity in calculations."
          ],
          examRelevance: "Kinematics is highly important for competitive exams, appearing in approximately 70% of mechanics questions. You'll encounter problems involving free fall, projectile motion, relative motion, and graphical analysis of motion. Mastering these concepts is crucial as they form the foundation for more complex topics like Newton's laws and energy conservation.",
          relatedConcepts: [
            "c2", "c3", "c4" // IDs of related concept cards
          ]
        };
        
        setConcept(detailedConcept);
      } else {
        // If concept not found, show an error toast
        toast({
          title: "Concept not found",
          description: "The requested concept could not be found",
          variant: "destructive"
        });
        
        // Navigate back to all concepts
        setTimeout(() => {
          navigate("/dashboard/student/concepts/all");
        }, 2000);
      }
      
      setLoading(false);
    }
  }, [conceptId, conceptCards, cardsLoading, navigate]);

  const handleMarkCompleted = () => {
    if (!concept || !conceptId) return;
    
    // Update the concept card with the mark completed function from the hook
    markConceptCompleted(conceptId, true);
    
    // Update the local state to reflect completion
    setConcept({
      ...concept,
      completed: true
    });
    
    // Show success message
    toast({
      title: "Concept completed!",
      description: "Your progress has been updated",
    });
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          {concept ? (
            <ConceptCardDetailView 
              concept={concept} 
              onMarkCompleted={handleMarkCompleted}
            />
          ) : (
            <div className="p-8 text-center">
              <h2 className="text-2xl font-bold">Concept not found</h2>
              <p className="text-gray-500">
                The concept you're looking for may have been moved or doesn't exist
              </p>
              <Link to="/dashboard/student/concepts/all">
                <Button className="mt-4">View All Concepts</Button>
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default ConceptCardDetailPage;
