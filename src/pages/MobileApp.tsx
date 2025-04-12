
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import MobileSignup from '@/components/signup/MobileSignup';
import MobileOnboarding from '@/components/mobile/MobileOnboarding';
import MobileDashboard from '@/components/mobile/MobileDashboard';

const MobileApp = () => {
  // Flow states
  const [flowState, setFlowState] = useState<'intro' | 'signup' | 'onboarding' | 'dashboard'>('intro');
  const [userData, setUserData] = useState({
    name: '',
    phone: '',
    email: '',
    goal: 'JEE'
  });

  const handleSignupComplete = (data: {
    name: string;
    phone: string;
    email?: string;
    goal: string;
  }) => {
    setUserData({
      name: data.name,
      phone: data.phone,
      email: data.email || '',
      goal: data.goal
    });
    setFlowState('onboarding');
  };

  const handleOnboardingComplete = () => {
    setFlowState('dashboard');
  };

  // Helper function to navigate back
  const handleBack = () => {
    if (flowState === 'signup') {
      setFlowState('intro');
    } else if (flowState === 'onboarding') {
      setFlowState('signup');
    } else if (flowState === 'dashboard') {
      // No going back from dashboard in real app, but for demo purposes
      setFlowState('onboarding');
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white p-4 flex items-center gap-4">
        {flowState !== 'intro' && (
          <Button variant="ghost" size="icon" className="text-white" onClick={handleBack}>
            <ArrowLeft size={24} />
          </Button>
        )}
        <Link to="/" className="text-xl font-bold">Sakha AI</Link>
      </header>

      {/* Phone frame container */}
      <div className="flex-1 bg-gray-100 flex items-center justify-center p-4">
        <div className="relative mx-auto bg-black rounded-[36px] p-3 shadow-2xl border-8 border-gray-800" style={{ 
          width: flowState === 'intro' ? '340px' : '100%', 
          height: flowState === 'intro' ? '690px' : '100%',
          maxWidth: '500px', 
          maxHeight: '800px' 
        }}>
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-24 bg-black z-10 rounded-b-xl"></div>
          
          {/* Screen content */}
          <div className="h-full w-full bg-white rounded-3xl overflow-hidden relative">
            {/* Intro/Demo screen */}
            {flowState === 'intro' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col"
              >
                {/* App header demo */}
                <div className="bg-violet-600 text-white p-4">
                  <h1 className="font-bold text-lg text-center">Sakha AI Mobile Demo</h1>
                </div>
                
                {/* App content demo */}
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                  <img 
                    src="/lovable-uploads/2a3b330c-09e1-40bd-b9bd-85ecb5cc394a.png" 
                    alt="Sakha AI Logo" 
                    className="w-24 h-24 mb-6"
                  />
                  <h2 className="text-2xl font-bold text-violet-900 mb-2">Experience the App</h2>
                  <p className="text-gray-600 mb-8">
                    Try our interactive demo that simulates the full Android app experience
                  </p>
                  
                  <div className="space-y-4 w-full max-w-xs">
                    <Button 
                      className="w-full bg-violet-600 hover:bg-violet-700"
                      onClick={() => setFlowState('signup')}
                    >
                      Start Demo
                    </Button>
                    
                    <Link to="/android-app">
                      <Button 
                        variant="outline" 
                        className="w-full border-violet-300 text-violet-700"
                      >
                        <Download size={16} className="mr-2" /> Download App
                      </Button>
                    </Link>
                  </div>
                  
                  <p className="text-xs text-gray-500 mt-10">
                    This is a demonstration of the app functionality
                  </p>
                </div>
              </motion.div>
            )}
            
            {/* Signup screen */}
            {flowState === 'signup' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col"
              >
                <div className="bg-violet-600 text-white p-4">
                  <h1 className="font-bold text-lg text-center">Create Account</h1>
                </div>
                
                <div className="flex-1 flex flex-col justify-center p-4">
                  <MobileSignup onComplete={handleSignupComplete} />
                </div>
              </motion.div>
            )}
            
            {/* Onboarding screen */}
            {flowState === 'onboarding' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full"
              >
                <MobileOnboarding onComplete={handleOnboardingComplete} />
              </motion.div>
            )}
            
            {/* Dashboard screen */}
            {flowState === 'dashboard' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full"
              >
                <MobileDashboard userName={userData.name} examType={userData.goal} />
              </motion.div>
            )}
          </div>
        </div>
      </div>
      
      {/* Download info */}
      <footer className="bg-white border-t border-gray-200 p-4 text-center">
        <p className="mb-3 text-gray-700">Want to use the full app on your Android device?</p>
        <Link to="/android-app">
          <Button className="bg-violet-600 hover:bg-violet-700">
            <Download size={16} className="mr-2" /> Download Android App
          </Button>
        </Link>
      </footer>
    </div>
  );
};

export default MobileApp;
