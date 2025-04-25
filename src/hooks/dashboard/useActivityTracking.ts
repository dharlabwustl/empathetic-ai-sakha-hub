
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

  return {
    lastActivity,
    suggestedNextAction
  };
}
