
import { useState, useEffect } from "react";

export function useActivityTracking() {
  const [lastActivity, setLastActivity] = useState<{ type: string, description: string } | null>(null);
  const [suggestedNextAction, setSuggestedNextAction] = useState<string | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      
      if (parsedData.lastActivity) {
        setLastActivity(parsedData.lastActivity);
      } else {
        setLastActivity({
          type: "login",
          description: "You last logged in yesterday"
        });
      }
      
      if (parsedData.completedModules && parsedData.completedModules.length > 0) {
        const lastModule = parsedData.completedModules[parsedData.completedModules.length - 1];
        setSuggestedNextAction(`Continue with ${lastModule.nextModule || "Practice Exercises"}`);
      } else {
        setSuggestedNextAction("Start today's recommended study plan");
      }
    }
  }, []);

  // Add a function to track new activities
  const trackActivity = (type: string, description: string) => {
    const newActivity = { type, description };
    setLastActivity(newActivity);
    
    // Store in localStorage
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      parsedData.lastActivity = newActivity;
      localStorage.setItem("userData", JSON.stringify(parsedData));
    }
  };

  return {
    lastActivity,
    suggestedNextAction,
    trackActivity
  };
}
