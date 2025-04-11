
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
  const completedOnboarding = searchParams.get('completedOnboarding');
  
  let shouldShowOnboarding = false;
  let shouldShowWelcomeTour = false;
  
  // If first time login flow (coming from signup)
  if (completedOnboarding === 'true') {
    shouldShowWelcomeTour = true;
    // Clean the URL to remove the query param
    navigate(location.pathname, { replace: true });
  }
  // Check if user data exists
  else if (userData) {
    const parsedUserData = JSON.parse(userData);
    
    // For returning users who have completed onboarding, skip both flows
    if (parsedUserData.completedOnboarding === true) {
      shouldShowOnboarding = false;
      shouldShowWelcomeTour = parsedUserData.sawWelcomeTour !== true; // Only show welcome tour if they haven't seen it
    } 
    // For new users who haven't completed onboarding, show onboarding
    else {
      shouldShowOnboarding = true;
    }
  }
  // First time user with no data
  else {
    shouldShowOnboarding = true;
  }

  return {
    shouldShowOnboarding,
    shouldShowWelcomeTour
  };
};
