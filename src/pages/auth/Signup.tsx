
import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import VoiceGreeting from '@/components/dashboard/student/voice/VoiceGreeting';

const Signup = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Set the flag that this is a new user signup
    localStorage.setItem('new_user_signup', 'true');
    localStorage.setItem('isLoggedIn', 'true');
    
    // Flag to indicate we need to show the study plan creation dialog after tour
    localStorage.setItem('needs_study_plan_creation', 'true');
    
    // Check if this is a Google signup
    const isGoogleSignup = localStorage.getItem('google_signup') === 'true';
    
    // Create a minimal user data object to avoid errors
    const userData = {
      id: `user_${Date.now()}`,
      name: isGoogleSignup ? "Google User" : "New User",
      email: isGoogleSignup ? `google${Date.now()}@example.com` : `user${Date.now()}@example.com`,
      role: 'student',
      isFirstTimeUser: true
    };
    
    // Store it in localStorage for downstream components
    localStorage.setItem('userData', JSON.stringify(userData));
    
    // First navigate to welcome flow and then it will handle redirection
    window.location.href = '/welcome-flow';
  }, [navigate]);

  return (
    <div>
      <VoiceGreeting 
        isFirstTimeUser={true}
        userName="New User"
        language="hi" // Changed to Hindi as default
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
