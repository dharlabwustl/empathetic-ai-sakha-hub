
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import VoiceGreeting from '@/components/dashboard/student/voice/VoiceGreeting';

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Check if this is a Google signup
    const searchParams = new URLSearchParams(location.search);
    const isGoogleSignup = searchParams.get('provider') === 'google';
    
    if (isGoogleSignup) {
      // Set Google signup flag
      localStorage.setItem('google_signup', 'true');
    }
    
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
    
    // For Google signup, navigate directly to welcome flow
    // This ensures no login page is shown in between
    if (isGoogleSignup) {
      window.location.href = '/welcome-flow';
    } else {
      // For regular signup, follow the normal flow
      window.location.href = '/welcome-flow';
    }
  }, [navigate, location.search]);

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
