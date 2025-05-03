
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Calendar, GraduationCap, Brain, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

const PostSignupWelcome = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  
  // Mock study plan data
  const studyPlan = {
    subjects: ['Physics', 'Chemistry', 'Biology'],
    conceptCards: 320, // Total concept cards
    flashcards: 450,   // Total flashcards
    practiceExams: 25, // Total practice exams
    studyHours: 6,     // Daily study hours
    pace: 'Balanced',  // Learning pace
    conceptsBySubject: {
      'Physics': 110,
      'Chemistry': 120,
      'Biology': 90
    },
    flashcardsBySubject: {
      'Physics': 150,
      'Chemistry': 170,
      'Biology': 130
    }
  };

  const handleContinue = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Store in localStorage that the user has completed the welcome flow
      localStorage.setItem("hasCompletedWelcomeFlow", "true");
      
      // Navigate to dashboard with a parameter to show tour
      navigate('/dashboard/student?showTour=true');
      
      toast({
        title: "Welcome to PREPZR!",
        description: "Your dashboard is ready. Let's get started with your study journey.",
      });
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <GraduationCap className="h-16 w-16 mx-auto text-indigo-600 mb-4" />
              <h2 className="text-2xl font-bold">Your Study Plan is Ready!</h2>
              <p className="text-muted-foreground mt-2">
                We've created a personalized study plan for your NEET exam preparation
              </p>
            </div>
            
            <Card className="border-2 border-indigo-200 bg-indigo-50 dark:bg-indigo-900/10 dark:border-indigo-900/20">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Daily Study Time:</span>
                    <span className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full text-indigo-600 dark:text-indigo-400">
                      {studyPlan.studyHours} hours
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Learning Pace:</span>
                    <span className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full text-indigo-600 dark:text-indigo-400">
                      {studyPlan.pace}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Focus Areas:</span>
                    <div className="flex flex-wrap gap-2 justify-end">
                      {studyPlan.subjects.map((subject) => (
                        <span key={subject} className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full text-indigo-600 dark:text-indigo-400">
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <BookOpen className="h-16 w-16 mx-auto text-blue-600 mb-4" />
              <h2 className="text-2xl font-bold">Learning Resources Ready</h2>
              <p className="text-muted-foreground mt-2">
                We've prepared comprehensive study materials for your NEET preparation
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-6 text-center">
                <div className="flex flex-col items-center">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mb-3">
                    <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-medium">{studyPlan.conceptCards}</h3>
                  <p className="text-sm text-muted-foreground">Concept Cards</p>
                </div>
                <div className="mt-4 space-y-2 text-sm text-left">
                  {Object.entries(studyPlan.conceptsBySubject).map(([subject, count]) => (
                    <div key={subject} className="flex justify-between">
                      <span>{subject}:</span>
                      <span>{count} cards</span>
                    </div>
                  ))}
                </div>
              </Card>
              
              <Card className="p-6 text-center">
                <div className="flex flex-col items-center">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full mb-3">
                    <Brain className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-lg font-medium">{studyPlan.flashcards}</h3>
                  <p className="text-sm text-muted-foreground">Flashcards</p>
                </div>
                <div className="mt-4 space-y-2 text-sm text-left">
                  {Object.entries(studyPlan.flashcardsBySubject).map(([subject, count]) => (
                    <div key={subject} className="flex justify-between">
                      <span>{subject}:</span>
                      <span>{count} cards</span>
                    </div>
                  ))}
                </div>
              </Card>
              
              <Card className="p-6 text-center">
                <div className="flex flex-col items-center">
                  <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full mb-3">
                    <Calendar className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-lg font-medium">{studyPlan.practiceExams}</h3>
                  <p className="text-sm text-muted-foreground">Practice Exams</p>
                </div>
              </Card>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Check className="h-16 w-16 mx-auto text-green-600 mb-4" />
              <h2 className="text-2xl font-bold">You're All Set!</h2>
              <p className="text-muted-foreground mt-2">
                Your personalized NEET preparation journey is about to begin
              </p>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 rounded-lg p-6">
              <h3 className="font-medium text-green-800 dark:text-green-400 mb-4">What's next?</h3>
              
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="bg-green-200 dark:bg-green-800 h-6 w-6 flex items-center justify-center rounded-full text-sm mt-0.5 flex-shrink-0">
                    <Check className="h-3.5 w-3.5 text-green-700 dark:text-green-300" />
                  </div>
                  <span>Explore your personalized dashboard</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-green-200 dark:bg-green-800 h-6 w-6 flex items-center justify-center rounded-full text-sm mt-0.5 flex-shrink-0">
                    <Check className="h-3.5 w-3.5 text-green-700 dark:text-green-300" />
                  </div>
                  <span>Review today's study plan in the Today's Plan section</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-green-200 dark:bg-green-800 h-6 w-6 flex items-center justify-center rounded-full text-sm mt-0.5 flex-shrink-0">
                    <Check className="h-3.5 w-3.5 text-green-700 dark:text-green-300" />
                  </div>
                  <span>Explore concept cards and flashcards for your subjects</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-green-200 dark:bg-green-800 h-6 w-6 flex items-center justify-center rounded-full text-sm mt-0.5 flex-shrink-0">
                    <Check className="h-3.5 w-3.5 text-green-700 dark:text-green-300" />
                  </div>
                  <span>Take a guided tour of the platform features</span>
                </li>
              </ul>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100/30 via-white to-violet-100/30 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl"
        >
          <div className="mb-8 text-center">
            <img src="/assets/logo.svg" alt="PREPZR Logo" className="h-16 mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Welcome to PREPZR!
            </h1>
          </div>
          
          <Card className="shadow-lg border-0">
            <CardContent className="p-8">
              {/* Progress indicator */}
              <div className="flex justify-between items-center mb-8">
                <div className="flex space-x-2">
                  {[1, 2, 3].map((stepNumber) => (
                    <div
                      key={stepNumber}
                      className={`w-3 h-3 rounded-full ${
                        stepNumber === step
                          ? 'bg-primary'
                          : stepNumber < step
                          ? 'bg-primary/60'
                          : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    />
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  Step {step} of 3
                </div>
              </div>
              
              {/* Step content */}
              {renderStepContent()}
              
              {/* Navigation */}
              <div className="mt-8 flex justify-end">
                <Button 
                  onClick={handleContinue}
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600"
                >
                  {step === 3 ? 'Start Learning' : 'Continue'} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      <footer className="p-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} PREPZR. All rights reserved.
      </footer>
    </div>
  );
};

export default PostSignupWelcome;
