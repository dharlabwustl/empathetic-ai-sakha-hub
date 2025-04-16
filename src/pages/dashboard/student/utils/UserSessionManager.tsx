
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
  const isNew = searchParams.get('new');
  
  let shouldShowOnboarding = false;
  let shouldShowWelcomeTour = false;
  
  console.log("UserSessionManager - Current URL params:", location.search);
  console.log("UserSessionManager - completedOnboarding param:", completedOnboarding);
  console.log("UserSessionManager - isNew param:", isNew);
  console.log("UserSessionManager - userData:", userData);
  
  // If specifically coming from signup flow with URL parameters
  if (completedOnboarding === 'true' || isNew === 'true') {
    console.log("UserSessionManager - New user detected from URL parameters");
    shouldShowOnboarding = true;
    
    // Clear the URL parameters after processing to avoid loops
    if (location.search) {
      // We'll clean up the URL after processing
      navigate(location.pathname, { replace: true });
    }
  }
  // Check if user data exists
  else if (userData) {
    const parsedUserData = JSON.parse(userData);
    console.log("UserSessionManager - parsedUserData:", parsedUserData);
    
    // For returning users who have completed onboarding previously, skip onboarding
    if (parsedUserData.completedOnboarding === true) {
      shouldShowOnboarding = false;
      shouldShowWelcomeTour = parsedUserData.sawWelcomeTour !== true; // Only show welcome tour if they haven't seen it
      console.log("UserSessionManager - User has completed onboarding before, skipping onboarding flow");
    } 
    // For users who explicitly haven't completed onboarding, show it
    else if (parsedUserData.completedOnboarding === false) {
      shouldShowOnboarding = true;
      console.log("UserSessionManager - User has not completed onboarding, showing onboarding flow");
    }
    // Default case for existing users
    else {
      shouldShowOnboarding = false;
      console.log("UserSessionManager - User data exists but no onboarding status, skipping onboarding");
    }
  }
  // First time user with no data
  else {
    // For completely new users without params, skip onboarding and treat as regular login
    shouldShowOnboarding = false;
    console.log("UserSessionManager - No user data and no URL params, assuming regular login");
  }

  console.log("UserSessionManager - Final Result:", { shouldShowOnboarding, shouldShowWelcomeTour });
  return {
    shouldShowOnboarding,
    shouldShowWelcomeTour
  };
};
