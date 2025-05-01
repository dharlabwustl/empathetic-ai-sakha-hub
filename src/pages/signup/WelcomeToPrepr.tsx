
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, ArrowRight, Book, Calendar, ChevronRight, Target } from 'lucide-react';
import PrepzrLogo from '@/components/common/PrepzrLogo';
import { motion } from 'framer-motion';

const WelcomeToPrepr = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    {
      title: "Define Your Learning Goals",
      description: "PREPZR helps you set clear goals and track your progress every step of the way.",
      icon: Target,
      color: "bg-blue-500"
    },
    {
      title: "Create Your Study Schedule",
      description: "Optimize your learning with personalized study plans based on your availability and preferences.",
      icon: Calendar,
      color: "bg-purple-500"
    },
    {
      title: "Access Learning Resources",
      description: "Explore our extensive library of concept cards, flashcards, and practice tests.",
      icon: Book,
      color: "bg-indigo-500"
    }
  ];
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save to localStorage that user has seen this welcome
      const userData = localStorage.getItem('userData');
      if (userData) {
        const parsedData = JSON.parse(userData);
        parsedData.sawWelcomeSteps = true;
        localStorage.setItem('userData', JSON.stringify(parsedData));
      }
      
      // Navigate directly to the dashboard
      navigate('/dashboard/student', { replace: true });
    }
  };
  
  const goToDashboard = () => {
    // Save to localStorage that user has seen this welcome
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      parsedData.sawWelcomeSteps = true;
      localStorage.setItem('userData', JSON.stringify(parsedData));
    }
    
    // Navigate directly to dashboard with replace:true to avoid back button issues
    navigate('/dashboard/student', { replace: true });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-900 dark:to-purple-950/20 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full text-center mb-8">
        <PrepzrLogo width={180} height="auto" className="mx-auto mb-4" />
        <h1 className="mt-4 text-4xl font-bold gradient-text">Welcome to PREPZR</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Your AI-powered study companion</p>
      </div>
      
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardContent className="p-0">
          <div className="flex justify-between p-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-t-lg">
            <div className="flex items-center">
              <span className="font-medium">Your Journey</span>
            </div>
            <div className="flex space-x-1">
              {steps.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`w-2 h-2 rounded-full ${idx === currentStep ? 'bg-white' : 'bg-white/40'}`}
                />
              ))}
            </div>
          </div>
          
          <div className="p-8">
            <motion.div 
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className={`w-16 h-16 rounded-full ${steps[currentStep].color} flex items-center justify-center mx-auto text-white`}>
                {React.createElement(steps[currentStep].icon, { size: 32 })}
              </div>
              
              <h2 className="text-2xl font-bold text-center">
                {steps[currentStep].title}
              </h2>
              
              <p className="text-center text-gray-600 dark:text-gray-400">
                {steps[currentStep].description}
              </p>
              
              <div className="pt-4">
                <Button 
                  onClick={handleNext}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  {currentStep < steps.length - 1 ? (
                    <>
                      Continue <ChevronRight className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
                
                {currentStep < steps.length - 1 && (
                  <Button 
                    variant="ghost" 
                    className="w-full mt-2" 
                    onClick={goToDashboard}
                  >
                    Skip & Go to Dashboard
                  </Button>
                )}
              </div>
            </motion.div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex mt-8 space-x-2">
        {steps.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full transition-colors ${
              idx === currentStep ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-700'
            }`}
            onClick={() => setCurrentStep(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default WelcomeToPrepr;
