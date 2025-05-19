
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
    
    // Reset voice greeting flags to ensure they play again
    sessionStorage.removeItem('voiceGreetingPlayed');
    
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
    const redirectTimer = setTimeout(() => {
      navigate('/welcome-flow', { replace: true });
    }, 3000);
    
    return () => clearTimeout(redirectTimer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-violet-100 flex flex-col items-center justify-center">
      <VoiceGreeting 
        isFirstTimeUser={true}
        userName="New User"
        language="en"
      />
      
      <div className="text-center max-w-md mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">
          Welcome to PREPZR!
        </h1>
        
        <div className="animate-pulse text-center mb-6">
          <div className="h-8 w-8 mx-auto mb-2 rounded-full bg-blue-500/50"></div>
          <p className="text-xl">Setting up your personalized learning experience...</p>
          <p className="text-sm text-gray-500 mt-2">Creating your adaptive study plan tailored to your needs</p>
        </div>
        
        <div className="space-y-2 mt-8">
          <div className="h-2 w-full rounded bg-blue-200 overflow-hidden">
            <div className="h-full bg-blue-500 animate-[progress_2s_ease-in-out_forwards]"></div>
          </div>
          <p className="text-xs text-gray-500">Loading your personalized journey...</p>
        </div>
      </div>
      
      {/* Animation for progress bar */}
      <style jsx>{`
        @keyframes progress {
          0% { width: 5%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default Signup;
