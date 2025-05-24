
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EnhancedWelcomeScreen from '@/components/welcome/EnhancedWelcomeScreen';

const PostLoginWelcomeBack = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>({});
  const [isReturningUser, setIsReturningUser] = useState(false);
  const [lastActivity, setLastActivity] = useState<string>('');
  
  useEffect(() => {
    // Get user data from localStorage
    const storedData = localStorage.getItem('userData');
    
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setUserData(parsedData);
        
        // Check if user is returning (has logged in before)
        const loginCount = parsedData.loginCount || 0;
        const hasSeenWelcome = localStorage.getItem('sawWelcomeSlider') === 'true';
        
        if (loginCount > 1 || hasSeenWelcome) {
          setIsReturningUser(true);
          setLastActivity(parsedData.lastActivity || 'working on concept cards');
        }
        
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    } else {
      // If no user data, redirect to login
      navigate('/login');
      return;
    }
  }, [navigate]);
  
  const handleComplete = () => {
    // Set appropriate flags and navigate to dashboard
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('sawWelcomeSlider', 'true');
    localStorage.setItem('hasSeenDashboardWelcome', 'true');
    
    navigate('/dashboard/student');
  };

  return (
    <EnhancedWelcomeScreen 
      userName={userData.name || 'Student'}
      isReturningUser={isReturningUser}
      lastActivity={lastActivity}
      onComplete={handleComplete}
    />
  );
};

export default PostLoginWelcomeBack;
