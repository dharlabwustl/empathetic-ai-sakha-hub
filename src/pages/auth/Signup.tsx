
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import VoiceGreeting from '@/components/dashboard/student/voice/VoiceGreeting';
import { Loader2 } from 'lucide-react';

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if this is a Google signup
    const isGoogleSignup = new URLSearchParams(location.search).get('google') === 'true';
    
    if (isGoogleSignup) {
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
    
    // First navigate to welcome flow and then it will handle redirection
    window.location.href = '/welcome-flow';
  }, [navigate, location]);

  return (
    <div>
      <VoiceGreeting 
        isFirstTimeUser={true}
        userName="New User"
        language="hi"
      />
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-xl">Setting up your personalized learning experience...</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
