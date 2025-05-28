import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Brain, CheckCircle, Calendar, Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import PrepzrVoiceAssistant from '@/components/voice/PrepzrVoiceAssistant';

const PostSignupWelcome = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  
  // Get user name for personalized greeting
  const userData = localStorage.getItem('userData');
  const userName = userData ? JSON.parse(userData).name : 'Student';
  
  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Complete the welcome flow and redirect to the dashboard with tour flag
      localStorage.setItem("showWelcomeTour", "true");
      localStorage.setItem("completedWelcome", "true");
      navigate("/dashboard/student?tour=true");
      toast({
        title: "Welcome to PREPZR!",
        description: "Your study journey begins now."
      });
    }
  };
  
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center">Personalized Study Plan</h2>
            <p className="text-center text-gray-600">
              We've created a customized study plan based on your goals and preferences.
            </p>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Your Study Plan Includes:</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <span>Carefully selected subjects based on your goal</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <span>Key concepts prioritized for efficient learning</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <span>Optimized schedule that adapts to your progress</span>
                </li>
              </ul>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <Brain className="h-8 w-8 text-purple-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center">Smart Flashcards & Concepts</h2>
            <p className="text-center text-gray-600">
              Boost your memory and understanding with our intelligent learning tools.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-white">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <div className="p-1 bg-violet-100 rounded">
                      <BookOpen className="h-4 w-4 text-violet-600" />
                    </div>
                    Concept Cards
                  </h3>
                  <p className="text-sm text-gray-600">
                    Visual learning materials with detailed explanations and examples
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <div className="p-1 bg-blue-100 rounded">
                      <Brain className="h-4 w-4 text-blue-600" />
                    </div>
                    Smart Flashcards
                  </h3>
                  <p className="text-sm text-gray-600">
                    Adaptive flashcards that focus on your weak areas
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-green-100 rounded-full">
                <Target className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center">Practice Exams & Time Management</h2>
            <p className="text-center text-gray-600">
              Fine-tune your preparation with realistic exams and optimize your study time.
            </p>
            
            <div className="space-y-4">
              <Card className="bg-white">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <div className="p-1 bg-amber-100 rounded">
                      <CheckCircle className="h-4 w-4 text-amber-600" />
                    </div>
                    Practice Exams
                  </h3>
                  <p className="text-sm text-gray-600">
                    Take timed practice tests and get detailed performance analysis
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <div className="p-1 bg-blue-100 rounded">
                      <Calendar className="h-4 w-4 text-blue-600" />
                    </div>
                    Time Allocation
                  </h3>
                  <p className="text-sm text-gray-600">
                    {`Your study plan is optimized with ${3} hours of daily study at your ${
                      "moderate"
                    } learning pace`}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100/30 via-white to-violet-100/30 flex flex-col items-center justify-center p-4">
      {/* PREPZR Voice Assistant - Welcome Context */}
      <PrepzrVoiceAssistant 
        context="welcome"
        userName={userName}
      />
      
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <img src="/assets/logo.svg" alt="PREPZR Logo" className="h-16" />
        </div>
        
        <Card className="shadow-lg border-0">
          <CardContent className="p-8">
            <div className="flex justify-between items-center mb-8">
              <div className="flex space-x-2">
                {[1, 2, 3].map((stepNumber) => (
                  <div
                    key={stepNumber}
                    className={`w-3 h-3 rounded-full ${
                      stepNumber === step
                        ? 'bg-blue-600'
                        : stepNumber < step
                        ? 'bg-blue-400'
                        : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
              <div className="text-sm text-gray-500">
                Step {step} of 3
              </div>
            </div>
            
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderStep()}
            </motion.div>
            
            <div className="mt-8 flex justify-end">
              <Button onClick={handleNext}>
                {step < 3 ? 'Next' : 'Go to Dashboard'} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PostSignupWelcome;
