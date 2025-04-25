
import { Location, NavigateFunction } from "react-router-dom";

interface SessionResult {
  shouldShowOnboarding: boolean;
  shouldShowWelcomeTour: boolean;
}

export const handleNewUser = (
  location: Location, 
  navigate: NavigateFunction
): SessionResult => {
  console.log("UserSessionManager - Current URL params:", location.search);
  
  const params = new URLSearchParams(location.search);
  const completedOnboarding = params.get('completedOnboarding');
  const isNew = params.get('new');
  const isReturning = params.get('returning');
  
  console.log("UserSessionManager - completedOnboarding param:", completedOnboarding);
  console.log("UserSessionManager - isNew param:", isNew);
  console.log("UserSessionManager - isReturning param:", isReturning);
  
  // Get user data from localStorage
  const userData = localStorage.getItem("userData");
  console.log("UserSessionManager - userData:", userData);
  
  // Default result
  const result: SessionResult = {
    shouldShowOnboarding: false,
    shouldShowWelcomeTour: false
  };
  
  // If user data exists, parse it
  if (userData) {
    const parsedUserData = JSON.parse(userData);
    
    // Determine if onboarding should be shown
    // Only show if explicitly set to false or not set
    result.shouldShowOnboarding = 
      parsedUserData.completedOnboarding !== true && 
      completedOnboarding !== 'true';
    
    // Determine if welcome tour should be shown
    // Show if user has completed onboarding but not seen welcome tour
    result.shouldShowWelcomeTour = 
      (parsedUserData.completedOnboarding === true || completedOnboarding === 'true') && 
      parsedUserData.sawWelcomeTour !== true;
    
  } else {
    // No user data, show onboarding by default
    result.shouldShowOnboarding = true;
    result.shouldShowWelcomeTour = false;
    
    // Initialize user data
    const newUserData = {
      completedOnboarding: false,
      sawWelcomeTour: false,
      firstLogin: new Date().toISOString(),
      lastLoginTime: new Date().toISOString()
    };
    
    localStorage.setItem("userData", JSON.stringify(newUserData));
  }
  
  // Clean URL parameters if needed
  if (completedOnboarding || isNew || isReturning) {
    navigate(location.pathname, { replace: true });
  }
  
  return result;
};
