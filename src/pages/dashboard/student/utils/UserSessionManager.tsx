
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
  const searchParams = new URLSearchParams(location.search);
  
  // Always prioritize URL parameters
  const returningParam = searchParams.get('returning');
  const completedOnboardingParam = searchParams.get('completedOnboarding');
  const isNewParam = searchParams.get('new');
  
  console.log("UserSessionManager - URL Params:", {
    returning: returningParam,
    completedOnboarding: completedOnboardingParam,
    isNew: isNewParam
  });
  
  // Returning user flow
  if (returningParam === 'true') {
    return {
      shouldShowOnboarding: false,
      shouldShowWelcomeTour: false
    };
  }
  
  // New user flow
  if (isNewParam === 'true') {
    return {
      shouldShowOnboarding: true,
      shouldShowWelcomeTour: false
    };
  }
  
  // If no URL params, check localStorage
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
