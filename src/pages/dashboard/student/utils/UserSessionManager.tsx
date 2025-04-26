import { Location, NavigateFunction } from "react-router-dom";

interface UserSessionResult {
  shouldShowOnboarding: boolean;
  shouldShowWelcomeTour: boolean;
}

export const handleNewUser = (
  location: Location,
  navigate: NavigateFunction
): UserSessionResult => {
  const userData = localStorage.getItem("userData");
  
  if (userData) {
    const parsedUserData = JSON.parse(userData);
    
    // Completed onboarding users
    if (parsedUserData.completedOnboarding) {
      return {
        shouldShowOnboarding: false,
        shouldShowWelcomeTour: !parsedUserData.sawWelcomeTour
      };
    }
    
    // New users who haven't completed onboarding
    if (parsedUserData.isNewUser) {
      return {
        shouldShowOnboarding: true,
        shouldShowWelcomeTour: false
      };
    }
  }
  
  // Default for truly new users
  return {
    shouldShowOnboarding: true,
    shouldShowWelcomeTour: false
  };
};

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
