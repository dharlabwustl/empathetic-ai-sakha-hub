import { Location, NavigateFunction } from "react-router-dom";

export const handleNewUser = (location: Location, navigate: NavigateFunction) => {
  console.log("UserSessionManager - Current URL params:", location.search);
  
  // Check URL params first
  const params = new URLSearchParams(location.search);
  const completedOnboardingParam = params.get('completedOnboarding');
  const isNewParam = params.get('new');
  const isReturningParam = params.get('returning');
  
  console.log("UserSessionManager - completedOnboarding param:", completedOnboardingParam);
  console.log("UserSessionManager - isNew param:", isNewParam);
  console.log("UserSessionManager - isReturning param:", isReturningParam);
  
  // Check local storage for user data
  const userData = localStorage.getItem("userData");
  console.log("UserSessionManager - userData:", userData);
  
  // For returning users from login, skip onboarding and welcome tour
  if (isReturningParam === 'true') {
    return {
      shouldShowOnboarding: false,
      shouldShowWelcomeTour: false
    };
  }
  
  // If URL param indicates completed onboarding, respect that
  if (completedOnboardingParam === 'true') {
    const shouldShowWelcomeTour = isNewParam === 'true';
    return {
      shouldShowOnboarding: false,
      shouldShowWelcomeTour
    };
  }
  
  // If URL param indicates new user, respect that
  if (isNewParam === 'true') {
    return {
      shouldShowOnboarding: true,
      shouldShowWelcomeTour: false
    };
  }
  
  // Otherwise check local storage
  if (userData) {
    const parsedData = JSON.parse(userData);
    
    // If user has completed onboarding, don't show it
    if (parsedData.completedOnboarding) {
      // Only show welcome tour if they haven't seen it yet
      return {
        shouldShowOnboarding: false,
        shouldShowWelcomeTour: !parsedData.sawWelcomeTour
      };
    }
    
    // If user has started but not completed onboarding
    if (parsedData.isNewUser) {
      return {
        shouldShowOnboarding: true,
        shouldShowWelcomeTour: false
      };
    }
  }
  
  // Default for truly new users or when user data is missing
  return {
    shouldShowOnboarding: true,
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
