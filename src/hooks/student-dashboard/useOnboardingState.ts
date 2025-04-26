
import { useToast } from "@/hooks/use-toast";

export function useOnboardingState(
  setShowOnboarding: (show: boolean) => void,
  setShowWelcomeTour: (show: boolean) => void
) {
  const { toast } = useToast();

  const handleSkipTour = () => {
    setShowWelcomeTour(false);
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      parsedData.sawWelcomeTour = true;
      localStorage.setItem("userData", JSON.stringify(parsedData));
    }
  };

  const handleCompleteTour = () => {
    setShowWelcomeTour(false);
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      parsedData.sawWelcomeTour = true;
      localStorage.setItem("userData", JSON.stringify(parsedData));
    }
    
    toast({
      title: "Welcome to Sakha AI!",
      description: "You're all set to start your personalized learning journey.",
    });
  };

  const handleCompleteOnboarding = () => {
    setShowOnboarding(false);
    
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      parsedData.completedOnboarding = true;
      localStorage.setItem("userData", JSON.stringify(parsedData));
    }
    
    setShowWelcomeTour(true);
    
    toast({
      title: "Onboarding Complete!",
      description: "Your personalized learning plan is ready.",
    });
  };

  return {
    handleSkipTour,
    handleCompleteTour,
    handleCompleteOnboarding
  };
}
