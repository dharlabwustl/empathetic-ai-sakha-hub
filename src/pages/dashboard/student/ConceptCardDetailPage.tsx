
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import { useUserProfile } from "@/hooks/useUserProfile";
import { UserRole } from "@/types/user/base";
import { motion } from "framer-motion";
import { useStudentDashboard } from "@/hooks/useStudentDashboard";
import { trackStudyActivity } from "./utils/UserSessionManager";
import { useToast } from "@/components/ui/toast";
import ConceptCardDetailView from "@/components/dashboard/student/concept-cards/ConceptCardDetailView";
import MainLayout from "@/components/layouts/MainLayout";

const ConceptCardDetailPage = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const { userProfile, loading: profileLoading } = useUserProfile(UserRole.Student);
  const [concept, setConcept] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const { trackUserActivity } = useStudentDashboard();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (conceptId) {
      setLoading(true);
      
      // Fetch concept data - in a real app this would be an API call
      // For now using mock data
      const mockConcept = {
        id: conceptId,
        name: "Kinematics in One Dimension",
        title: "Kinematics in One Dimension",
        subject: "Physics",
        topic: "Motion",
        chapter: "Mechanics",
        difficulty: "Medium",
        estimatedTime: 20,
        description: "Understanding motion along a straight line",
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
        ],
        completed: false
      };
      
      setConcept(mockConcept);
      
      // Track this activity for returning users
      trackUserActivity({
        type: 'concept',
        id: conceptId,
        name: mockConcept.name,
        description: `Studying ${mockConcept.name} (${mockConcept.subject})`,
        progress: 30 // Example progress value
      });
      
      // Also use the trackStudyActivity utility
      trackStudyActivity({
        type: 'concept',
        id: conceptId,
        name: mockConcept.name,
        description: `Studying ${mockConcept.name} (${mockConcept.subject})`,
        progress: 30
      });
      
      setLoading(false);
    }
  }, [conceptId, trackUserActivity]);

  const handleMarkCompleted = () => {
    // In a real app, this would be an API call to update the concept status
    setConcept(prev => prev ? { ...prev, completed: true } : null);
    
    toast({
      title: "Concept completed!",
      description: "Your progress has been updated",
    });
    
    // Track completion
    if (concept) {
      trackUserActivity({
        type: 'concept',
        id: conceptId || '',
        name: concept.name,
        description: `Completed ${concept.name} (${concept.subject})`,
        progress: 100
      });
    }
  };

  if (profileLoading || loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </MainLayout>
    );
  }

  if (!userProfile) {
    navigate("/login");
    return null;
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
              <p className="text-muted-foreground">
                The concept you're looking for may have been moved or doesn't exist
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default ConceptCardDetailPage;
