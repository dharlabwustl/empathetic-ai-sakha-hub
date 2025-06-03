
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EnhancedWelcomeScreen from '@/components/welcome/EnhancedWelcomeScreen';
import WelcomeVoiceGreeting from '@/components/welcome/WelcomeVoiceGreeting';

const WelcomeToPrepr = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('Student');
  
  useEffect(() => {
    // Get user name from localStorage
    const userData = localStorage.getItem('userData');
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        if (parsedData.name) {
          setUserName(parsedData.name);
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
    
    // Set the first-time user flag
    localStorage.setItem('new_user_signup', 'true');
  }, []);
  
  const handleComplete = () => {
    // Navigate to dashboard with new user flag
    navigate('/dashboard/student?new=true');
  };

  return (
    <>
      <WelcomeVoiceGreeting userName={userName} />
      <EnhancedWelcomeScreen 
        userName={userName}
        isReturningUser={false}
        onComplete={handleComplete}
      />
    </>
  );
};

export default WelcomeToPrepr;
