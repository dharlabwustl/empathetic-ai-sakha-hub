
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import { useUserProfile } from "@/hooks/useUserProfile";
import { UserRole } from "@/types/user/base";
import { motion } from "framer-motion";
import ConceptCardView from "@/components/dashboard/student/concept-cards/ConceptCardView";
import { useStudentDashboard } from "@/hooks/useStudentDashboard";
import { trackStudyActivity } from "./utils/UserSessionManager";

const ConceptCardDetailPage = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const { userProfile, loading } = useUserProfile(UserRole.Student);
  const [concept, setConcept] = useState<any | null>(null);
  const { trackUserActivity } = useStudentDashboard();

  useEffect(() => {
    if (conceptId) {
      // Fetch concept data - in a real app this would be an API call
      // For now using mock data
      const mockConcept = {
        id: conceptId,
        name: "Kinematics in One Dimension",
        subject: "Physics",
        topic: "Motion",
        difficulty: "Medium",
        estimatedTime: "20 minutes",
        description: "Understanding motion along a straight line",
        content: {
          basic: "Kinematics is the study of motion without considering its causes. In one dimension, we study motion along a straight line.",
          detailed: "Kinematics in one dimension deals with the mathematical description of motion along a straight line. It involves quantities like position, displacement, velocity, and acceleration.",
          simplified: "Think of kinematics as understanding how objects move in a straight line - like a car driving on a straight road.",
          advanced: "One-dimensional kinematics can be expressed using calculus relationships between position (x), velocity (v), and acceleration (a): v = dx/dt and a = dv/dt."
        },
        examples: [
          "A car traveling on a highway at constant speed.",
          "A ball thrown vertically upward and falling back down."
        ],
        commonMistakes: [
          "Confusing velocity and acceleration",
          "Forgetting to include the sign (direction) of quantities"
        ],
        examRelevance: "High - appears in 70% of mechanics questions",
        relatedConcepts: [
          { id: "c102", name: "Projectile Motion" },
          { id: "c103", name: "Newton's Laws of Motion" }
        ]
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
    }
  }, [conceptId, trackUserActivity]);

  if (loading || !userProfile) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <DashboardLayout userProfile={userProfile}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        {concept ? (
          <ConceptCardView concept={concept} />
        ) : (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold">Concept not found</h2>
            <p className="text-muted-foreground">
              The concept you're looking for may have been moved or doesn't exist
            </p>
          </div>
        )}
      </motion.div>
    </DashboardLayout>
  );
};

export default ConceptCardDetailPage;
