
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WelcomeSlider from '@/components/welcome/WelcomeSlider';
import WelcomeTour from '@/components/dashboard/student/WelcomeTour';
import { useToast } from "@/hooks/use-toast";
import VoiceGreeting from '@/components/dashboard/student/VoiceGreeting';

const PostLoginWelcomeBack = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userData, setUserData] = useState<any>({});
  const [showSlider, setShowSlider] = useState(true);
  const [showTour, setShowTour] = useState(false);
  const [showVoiceGreeting, setShowVoiceGreeting] = useState(false);
  const [currentStep, setCurrentStep] = useState<'slider' | 'tour' | 'voice' | 'complete'>('slider');
  
  useEffect(() => {
    // Get user data from localStorage
    const storedData = localStorage.getItem('userData');
    
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setUserData(parsedData);
        
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    } else {
      // If no user data, redirect to login
      navigate('/login');
      return;
    }
    
    // For new users (who came from signup), go directly to tour
    // This is because they would have gone through the welcome-flow already
    const isNewUser = localStorage.getItem('new_user_signup') === 'true';
    const sawWelcomeSlider = localStorage.getItem('sawWelcomeSlider') === 'true';
    const showFounderWelcome = localStorage.getItem('show_founder_welcome') === 'true';
    
    if (isNewUser) {
      // For new users, show tour immediately after welcome slider if slider seen
      if (sawWelcomeSlider) {
        if (showFounderWelcome) {
          // Show founder welcome (tour) first
          setShowSlider(false);
          setShowTour(true);
          setCurrentStep('tour');
        } else {
          // Set to complete state if all steps already seen
          navigate('/dashboard/student');
        }
      }
      return;
    }
    
    // For returning users who have seen both, skip directly to dashboard
    const sawWelcomeTour = localStorage.getItem('sawWelcomeTour') === 'true';
    
    if (sawWelcomeSlider && sawWelcomeTour) {
      navigate('/dashboard/student');
      return;
    }
    
    // If they've seen the slider but not the tour, show only the tour
    if (sawWelcomeSlider && !sawWelcomeTour) {
      setShowSlider(false);
      setShowTour(true);
      setCurrentStep('tour');
    }
    
    // Auto-redirect after 45 seconds if no action taken
    const timer = setTimeout(() => {
      navigate('/dashboard/student');
      toast({
        title: "Welcome to PREPZR!",
        description: "You've been automatically redirected to Today's Plan.",
      });
    }, 45000);
    
    return () => clearTimeout(timer);
  }, [navigate, toast]);

  const handleSliderComplete = () => {
    // Mark that they've seen the welcome slider
    localStorage.setItem('sawWelcomeSlider', 'true');
    setShowSlider(false);
    setShowTour(true); 
    setCurrentStep('tour');
  };
  
  const handleTourSkip = () => {
    // Mark that they've seen the welcome tour
    localStorage.setItem('sawWelcomeTour', 'true');
    localStorage.removeItem('show_founder_welcome');
    
    // Check if we should show voice greeting
    const showVoiceWelcome = localStorage.getItem('show_voice_welcome') === 'true';
    if (showVoiceWelcome) {
      setShowTour(false);
      setShowVoiceGreeting(true);
      setCurrentStep('voice');
    } else {
      navigate('/dashboard/student');
      toast({
        title: "Welcome to your dashboard!",
        description: "You can always access the tour again from the help menu."
      });
    }
  };
  
  const handleTourComplete = () => {
    // Mark that they've seen the welcome tour
    localStorage.setItem('sawWelcomeTour', 'true');
    localStorage.removeItem('show_founder_welcome');
    
    // Check if we should show voice greeting
    const showVoiceWelcome = localStorage.getItem('show_voice_welcome') === 'true';
    if (showVoiceWelcome) {
      setShowTour(false);
      setShowVoiceGreeting(true);
      setCurrentStep('voice');
    } else {
      navigate('/dashboard/student');
      toast({
        title: "Tour Completed!",
        description: "You're all set to start using PREPZR. Happy studying!"
      });
    }
  };
  
  const handleVoiceGreetingComplete = () => {
    localStorage.removeItem('show_voice_welcome');
    navigate('/dashboard/student');
    toast({
      title: "Welcome to PREPZR!",
      description: "Your AI study companion is ready to assist you."
    });
  };

  // If showing welcome slider
  if (showSlider && currentStep === 'slider') {
    return <WelcomeSlider onComplete={handleSliderComplete} userData={userData} />;
  }
  
  // If showing welcome tour 
  if (showTour && currentStep === 'tour') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-950/30 dark:via-gray-900 dark:to-purple-950/30">
        <WelcomeTour 
          open={true} 
          onOpenChange={() => {}} 
          onSkipTour={handleTourSkip} 
          onCompleteTour={handleTourComplete}
          isFirstTimeUser={true}
          loginCount={1}
          initialTab="founder" // Start on founder tab
        />
      </div>
    );
  }
  
  // If showing voice greeting
  if (showVoiceGreeting && currentStep === 'voice') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-950/30 dark:via-gray-900 dark:to-purple-950/30 flex flex-col items-center justify-center">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Meet Your Voice Assistant</h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Your PREPZR assistant can speak to you and guide you through your study journey.
          </p>
        </div>
        
        <VoiceGreeting 
          isFirstTimeUser={true} 
          userName={userData.name || 'Student'}
          language="en"
          onComplete={handleVoiceGreetingComplete}
          showUI={true}
        />
        
        <button 
          className="mt-12 px-6 py-3 bg-primary text-white rounded-lg shadow-lg hover:bg-primary/90 transition-colors"
          onClick={handleVoiceGreetingComplete}
        >
          Continue to Dashboard
        </button>
      </div>
    );
  }
  
  // Default loading state
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-center">
        <p className="text-xl">Loading your personalized dashboard...</p>
      </div>
    </div>
  );
};

export default PostLoginWelcomeBack;
