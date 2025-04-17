
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { StudyPlanType } from "./types";

// Mock data for today's plan
const mockTodayPlan: StudyPlanType = {
  date: new Date(),
  totalConcepts: 5,
  completedConcepts: 2,
  timeSpent: 45, // minutes
  targetTime: 120, // minutes
  streak: 7, // days
  concepts: [
    {
      id: "c1",
      title: "Newton's Third Law of Motion",
      subject: "Physics",
      chapter: "Laws of Motion",
      difficulty: "Medium",
      estimatedTime: 15,
      content: "Newton's third law states that for every action, there is an equal and opposite reaction. When one body exerts a force on a second body, the second body exerts a force equal in magnitude and opposite in direction on the first body.",
      resourceType: "Video",
      resourceUrl: "#",
      completed: true
    },
    {
      id: "c2",
      title: "Acid-Base Reactions",
      subject: "Chemistry",
      chapter: "Chemical Reactions",
      difficulty: "Easy",
      estimatedTime: 20,
      content: "Acid-base reactions involve the transfer of H+ ions (protons) from one substance to another. In these reactions, acids act as proton donors while bases act as proton acceptors.",
      resourceType: "Text",
      resourceUrl: "#",
      completed: true
    },
    {
      id: "c3",
      title: "Integration by Parts",
      subject: "Mathematics",
      chapter: "Integral Calculus",
      difficulty: "Hard",
      estimatedTime: 25,
      content: "Integration by parts is a technique used to evaluate integrals where the integrand is a product of two functions. The formula is: ∫u(x)v'(x)dx = u(x)v(x) - ∫u'(x)v(x)dx",
      resourceType: "PDF",
      resourceUrl: "#",
      completed: false
    },
    {
      id: "c4",
      title: "DNA Replication",
      subject: "Biology",
      chapter: "Molecular Biology",
      difficulty: "Medium",
      estimatedTime: 30,
      content: "DNA replication is the process by which DNA makes a copy of itself during cell division. The structure of the double helix allows each strand to serve as a template for a new strand of complementary DNA.",
      resourceType: "Video",
      resourceUrl: "#",
      completed: false
    },
    {
      id: "c5",
      title: "The Indian Constitution",
      subject: "Polity",
      chapter: "Indian Political System",
      difficulty: "Easy",
      estimatedTime: 20,
      content: "The Constitution of India is the supreme law of India. It lays down the framework defining fundamental political principles, establishes the structure, procedures, powers and duties of government institutions.",
      resourceType: "Text",
      resourceUrl: "#",
      completed: false
    }
  ]
};

export const useTodayStudyPlan = () => {
  const [todayPlan, setTodayPlan] = useState<StudyPlanType>(mockTodayPlan);
  const { toast } = useToast();
  
  const handleCompleteConcept = (id: string) => {
    setTodayPlan(prev => {
      const updatedConcepts = prev.concepts.map(concept => 
        concept.id === id ? {...concept, completed: true} : concept
      );
      
      const completedCount = updatedConcepts.filter(c => c.completed).length;
      
      // Show completion milestone toast if needed
      if (completedCount > prev.completedConcepts) {
        const percentComplete = Math.round((completedCount / prev.totalConcepts) * 100);
        if (percentComplete === 100) {
          toast({
            title: "Amazing achievement!",
            description: "You've completed all concepts in today's study plan!",
            variant: "default",
          });
        } else if (percentComplete >= 50 && prev.completedConcepts < Math.ceil(prev.totalConcepts / 2)) {
          toast({
            title: "Halfway there!",
            description: "You've completed 50% of today's study plan.",
            variant: "default",
          });
        }
      }
      
      return {
        ...prev,
        concepts: updatedConcepts,
        completedConcepts: completedCount
      };
    });
  };
  
  const handleNeedHelp = (id: string) => {
    // In a real app, this would open a chat assistant or help modal
    toast({
      title: "Help requested",
      description: `A tutor will be notified about your question on concept ${id}`,
      variant: "default",
    });
    console.log(`Help requested for concept ${id}`);
  };
  
  // Calculate progress percentage
  const progressPercentage = Math.round((todayPlan.completedConcepts / todayPlan.totalConcepts) * 100);
  
  return {
    todayPlan,
    progressPercentage,
    handleCompleteConcept,
    handleNeedHelp
  };
};
