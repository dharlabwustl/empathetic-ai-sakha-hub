
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
  // Check if this is a first-time user and not coming from signup
  else if (!userData) {
    // First time user, show onboarding
    shouldShowOnboarding = true;
  }

  return {
    shouldShowOnboarding,
    shouldShowWelcomeTour
  };
};
