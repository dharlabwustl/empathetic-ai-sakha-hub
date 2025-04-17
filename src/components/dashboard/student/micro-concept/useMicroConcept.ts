
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface UseMicroConceptProps {
  id?: string;
  title: string;
  isCompleted: boolean;
  onComplete?: (id: string) => void;
  onNeedHelp?: (id: string) => void;
}

export const useMicroConcept = ({ 
  id, 
  title, 
  isCompleted: initialIsCompleted, 
  onComplete, 
  onNeedHelp 
}: UseMicroConceptProps) => {
  const [activeExplanation, setActiveExplanation] = useState<string>("Simple Explanation");
  const [isCompleted, setIsCompleted] = useState<boolean>(initialIsCompleted);
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const { toast } = useToast();

  // Timer to track time spent on the concept
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 60000); // Update every minute
    
    return () => clearInterval(timer);
  }, []);

  // Handle marking concept as complete
  const handleComplete = () => {
    if (id && onComplete && !isCompleted) {
      onComplete(id);
      setIsCompleted(true);
      
      // Show a toast notification
      toast({
        title: "Concept Completed!",
        description: `You've completed the concept: ${title}`,
        variant: "default",
      });
    }
  };
  
  // Request help
  const handleNeedHelp = () => {
    if (id && onNeedHelp) {
      onNeedHelp(id);
      
      toast({
        title: "Help Requested",
        description: "A tutor will be notified to help you with this concept.",
        variant: "default",
      });
    }
  };

  return {
    activeExplanation,
    setActiveExplanation,
    isCompleted,
    timeSpent,
    handleComplete,
    handleNeedHelp
  };
};
