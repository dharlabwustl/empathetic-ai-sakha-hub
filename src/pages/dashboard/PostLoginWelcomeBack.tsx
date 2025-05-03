
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import WelcomeSlider from '@/components/welcome/WelcomeSlider';
import WelcomeTour from '@/components/dashboard/student/WelcomeTour';
import LoadingScreen from '@/components/common/LoadingScreen';
import { useToast } from "@/hooks/use-toast";

const PostLoginWelcomeBack = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [userData, setUserData] = useState<any>({});
  const [showSlider, setShowSlider] = useState(true);
  const [showTour, setShowTour] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pendingTasks, setPendingTasks] = useState<any[]>([]);
  
  const searchParams = new URLSearchParams(location.search);
  const returnTo = searchParams.get('returnTo') || '/dashboard/student/today';
  
  useEffect(() => {
    // Get user data from localStorage
    const storedData = localStorage.getItem('userData');
    
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setUserData(parsedData);
        
        // Check if it's a new user who hasn't seen the welcome tour
        const isNewUser = parsedData.isNewUser === true || parsedData.completedOnboarding === false;
        const sawWelcomeSlider = localStorage.getItem('sawWelcomeSlider') === 'true';
        const sawWelcomeTour = localStorage.getItem('sawWelcomeTour') === 'true';
        
        // Setup mock pending tasks
        const mockTasks = [
          { id: 1, title: 'Complete your profile details', route: '/dashboard/student/profile' },
          { id: 2, title: 'Review your study plan', route: '/dashboard/student/study-plan' },
          { id: 3, title: 'Start today\'s flashcards', route: '/dashboard/student/flashcards' },
        ];
        setPendingTasks(mockTasks);
        
        // For returning users who have seen both, skip directly to dashboard
        if (!isNewUser && sawWelcomeSlider && sawWelcomeTour) {
          navigate(returnTo);
          return;
        }
        
        // If they've seen the slider but not the tour, show only the tour
        if (sawWelcomeSlider && !sawWelcomeTour) {
          setShowSlider(false);
          setShowTour(true);
        }
        
        // New user needs to see both slider and tour
        if (isNewUser) {
          setShowSlider(true);
          // Tour will show after slider completes
        }
        
        setLoading(false);
        
      } catch (error) {
        console.error("Error parsing user data:", error);
        navigate('/login');
        return;
      }
    } else {
      // If no user data, redirect to login
      navigate('/login');
      return;
    }
    
    // Auto-redirect after 45 seconds if no action taken
    const timer = setTimeout(() => {
      navigate('/dashboard/student/today');
      toast({
        title: "Welcome to PREPZR!",
        description: "You've been automatically redirected to Today's Plan.",
      });
    }, 45000);
    
    return () => clearTimeout(timer);
  }, [navigate, toast, returnTo]);

  const handleSliderComplete = () => {
    // Mark that they've seen the welcome slider
    localStorage.setItem('sawWelcomeSlider', 'true');
    setShowSlider(false);
    setShowTour(true);
  };
  
  const handleTourSkip = () => {
    // Mark that they've seen the welcome tour
    localStorage.setItem('sawWelcomeTour', 'true');
    
    // Show tasks screen
    setShowTour(false);
    
    // Auto-redirect after 3 seconds
    setTimeout(() => {
      navigate('/dashboard/student');
      toast({
        title: "Welcome to your dashboard!",
        description: "You can always access the tour again from the help menu."
      });
    }, 3000);
  };
  
  const handleTourComplete = () => {
    // Mark that they've seen the welcome tour
    localStorage.setItem('sawWelcomeTour', 'true');
    
    // Show tasks screen
    setShowTour(false);
    
    // Update user data to mark onboarding as completed
    if (userData) {
      const updatedUserData = {
        ...userData,
        completedOnboarding: true,
        isNewUser: false,
        sawWelcomeTour: true
      };
      localStorage.setItem('userData', JSON.stringify(updatedUserData));
    }
    
    // Auto-redirect after 3 seconds
    setTimeout(() => {
      navigate('/dashboard/student');
      toast({
        title: "Tour Completed!",
        description: "You're all set to start using PREPZR. Happy studying!"
      });
    }, 3000);
  };
  
  const handleTaskClick = (route: string) => {
    navigate(route);
    toast({
      title: "Navigating to task",
      description: "Let's get started with this activity!"
    });
  };

  // Loading state
  if (loading) {
    return <LoadingScreen message="Preparing your personalized dashboard..." />;
  }
  
  // If showing welcome slider
  if (showSlider) {
    return <WelcomeSlider onComplete={handleSliderComplete} userData={userData} />;
  }
  
  // If showing welcome tour
  if (showTour) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-950/30 dark:via-gray-900 dark:to-purple-950/30">
        <WelcomeTour 
          open={true} 
          onOpenChange={() => {}} 
          onSkipTour={handleTourSkip} 
          onCompleteTour={handleTourComplete}
          isFirstTimeUser={true}
          loginCount={userData.loginCount || 1}
        />
      </div>
    );
  }
  
  // Show pending tasks screen
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-950/30 dark:via-gray-900 dark:to-purple-950/30 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <h1 className="text-2xl font-bold">Welcome back, {userData.name || 'Student'}!</h1>
          <p className="mt-2">Here are your pending tasks to get started:</p>
        </div>
        
        <div className="p-6">
          <ul className="space-y-4">
            {pendingTasks.map((task) => (
              <li key={task.id}>
                <button 
                  onClick={() => handleTaskClick(task.route)}
                  className="w-full p-4 text-left rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  <h3 className="font-medium">{task.title}</h3>
                  <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">Click to continue →</p>
                </button>
              </li>
            ))}
          </ul>
          
          <div className="mt-6 flex justify-between">
            <button 
              onClick={() => navigate('/dashboard/student/today')}
              className="px-4 py-2 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800/50"
            >
              Today's Plan
            </button>
            <button 
              onClick={() => navigate('/dashboard/student')}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostLoginWelcomeBack;
