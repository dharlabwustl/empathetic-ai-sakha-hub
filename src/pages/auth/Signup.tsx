
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VoiceGreeting from '@/components/dashboard/student/voice/VoiceGreeting';

const Signup = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Set the flag that this is a new user signup
    localStorage.setItem('new_user_signup', 'true');
    localStorage.setItem('isLoggedIn', 'true');
    
    // Flag to indicate we need to show the study plan creation dialog after tour
    localStorage.setItem('needs_study_plan_creation', 'true');
    
    // Create a minimal user data object to avoid errors
    const userData = {
      id: `user_${Date.now()}`,
      name: "New User",
      email: `user${Date.now()}@example.com`,
      role: 'student',
      isFirstTimeUser: true
    };
    
    // Store it in localStorage for downstream components
    localStorage.setItem('userData', JSON.stringify(userData));
    
    // First navigate directly to welcome flow - skip login screen completely
    navigate('/welcome-flow', { replace: true });
  }, [navigate]);

  return (
    <div>
      <VoiceGreeting 
        isFirstTimeUser={true}
        userName="New User"
        language="hi"
      />
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <p className="text-xl">Setting up your personalized learning experience...</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
