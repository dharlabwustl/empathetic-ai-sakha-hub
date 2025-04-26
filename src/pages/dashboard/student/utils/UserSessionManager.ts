
import { Location, NavigateFunction } from "react-router-dom";

export const handleNewUser = (location: Location, navigate: NavigateFunction) => {
  // Get user data from localStorage to determine user state
  const userData = localStorage.getItem("userData");
  console.log("UserSessionManager - userData:", userData);
  
  if (userData) {
    const parsedData = JSON.parse(userData);
    
    // For users who have completed onboarding
    if (parsedData.completedOnboarding) {
      return {
        shouldShowOnboarding: false,
        shouldShowWelcomeTour: !parsedData.sawWelcomeTour
      };
    }
    
    // For new users who haven't completed onboarding
    if (parsedData.isNewUser) {
      return {
        shouldShowOnboarding: true,
        shouldShowWelcomeTour: false
      };
    }
    
    // For returning users
    if (parsedData.isReturningUser) {
      return {
        shouldShowOnboarding: false,
        shouldShowWelcomeTour: false
      };
    }
  }
  
  // Default for truly new users or when user data is missing
  // Don't enforce onboarding if accessed directly for now (allows direct access to dashboard)
  console.log("UserSessionManager - No user data found, allowing access to dashboard");
  return {
    shouldShowOnboarding: false,
    shouldShowWelcomeTour: false
  };
};

// Helper to track a concept card or flashcard activity
export const trackStudyActivity = (activity: {
  type: string;
  id?: string;
  name: string;
  description?: string;
  progress?: number;
}) => {
  const userData = localStorage.getItem("userData");
  if (userData) {
    const parsedData = JSON.parse(userData);
    parsedData.lastActivity = {
      ...activity,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem("userData", JSON.stringify(parsedData));
    return true;
  }
  return false;
};
