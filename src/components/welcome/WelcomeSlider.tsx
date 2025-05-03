
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, ArrowLeft, Calendar, Clock, GraduationCap, Sparkles, BookOpen, Brain, CheckCircle } from 'lucide-react';
import PrepzrLogo from '@/components/common/PrepzrLogo';

interface WelcomeSliderProps {
  onComplete: () => void;
  onSkip?: () => void;
  userData?: any;
}

const WelcomeSlider: React.FC<WelcomeSliderProps> = ({ onComplete, onSkip, userData = {} }) => {
  const [step, setStep] = useState(0);
  const [studyStats, setStudyStats] = useState({
    conceptCards: 135,
    flashCards: 240,
    examCards: 42,
    hoursAllocated: 180,
    subjects: ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'English'],
    examGoal: userData?.goals?.[0]?.title || 'NEET',
    learningStyle: userData?.preferences?.learningStyle || 'Visual-Kinesthetic'
  });
  
  const totalSteps = 3;
  
  useEffect(() => {
    // Update stats based on user data if available
    if (userData?.goals?.length > 0) {
      setStudyStats(prev => ({
        ...prev,
        examGoal: userData.goals[0].title
      }));
    }
    
    if (userData?.preferences?.learningStyle) {
      setStudyStats(prev => ({
        ...prev,
        learningStyle: userData.preferences.learningStyle
      }));
    }
    
    // You could add more customization based on user data here
  }, [userData]);

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };
  
  const slides = [
    // Welcome slide
    <motion.div
      key="welcome"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center"
    >
      <div className="mb-6">
        <PrepzrLogo width={120} height="auto" />
      </div>
      
      <h1 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
        Welcome to PREPZR!
      </h1>
      
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Your personalized study journey begins now
      </p>
      
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-medium">Your Goal</span>
          <span className="text-lg font-medium text-primary">{studyStats.examGoal}</span>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <GraduationCap className="h-4 w-4 text-indigo-500" />
            <span>Personalized study plan created</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Sparkles className="h-4 w-4 text-amber-500" />
            <span>AI-powered learning resources ready</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Brain className="h-4 w-4 text-green-500" />
            <span>Customized to your learning style</span>
          </div>
        </div>
        
        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">Let's explore what we've prepared for you!</p>
        </div>
      </div>
    </motion.div>,
    
    // Study Resources slide
    <motion.div
      key="resources"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-center">Your Study Resources</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <motion.div 
          whileHover={{ scale: 1.03 }}
          className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center"
        >
          <div className="bg-blue-100 dark:bg-blue-800/40 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
            <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">{studyStats.conceptCards}</h3>
          <p className="text-sm text-blue-700 dark:text-blue-300">Concept Cards</p>
          <p className="text-xs text-muted-foreground mt-1">Detailed explanations</p>
        </motion.div>
        
        <motion.div 
          whileHover={{ scale: 1.03 }}
          className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center"
        >
          <div className="bg-purple-100 dark:bg-purple-800/40 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
            <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400">{studyStats.flashCards}</h3>
          <p className="text-sm text-purple-700 dark:text-purple-300">Flashcards</p>
          <p className="text-xs text-muted-foreground mt-1">For quick revision</p>
        </motion.div>
        
        <motion.div 
          whileHover={{ scale: 1.03 }}
          className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg text-center"
        >
          <div className="bg-amber-100 dark:bg-amber-800/40 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
            <CheckCircle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
          </div>
          <h3 className="text-xl font-bold text-amber-600 dark:text-amber-400">{studyStats.examCards}</h3>
          <p className="text-sm text-amber-700 dark:text-amber-300">Practice Tests</p>
          <p className="text-xs text-muted-foreground mt-1">Exam simulation</p>
        </motion.div>
        
        <motion.div 
          whileHover={{ scale: 1.03 }}
          className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center"
        >
          <div className="bg-green-100 dark:bg-green-800/40 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
            <Clock className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-xl font-bold text-green-600 dark:text-green-400">{studyStats.hoursAllocated}</h3>
          <p className="text-sm text-green-700 dark:text-green-300">Study Hours</p>
          <p className="text-xs text-muted-foreground mt-1">Allocated for you</p>
        </motion.div>
      </div>
      
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg">
        <h3 className="font-medium mb-2">Your Subjects</h3>
        <div className="flex flex-wrap gap-2">
          {studyStats.subjects.map((subject, index) => (
            <motion.span 
              key={subject}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
              className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full text-sm"
            >
              {subject}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>,
    
    // Study Plan slide
    <motion.div
      key="plan"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-center">Your Personalized Study Plan</h2>
      
      <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 dark:from-indigo-900/30 dark:via-purple-900/20 dark:to-blue-900/20 p-5 rounded-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-full bg-white dark:bg-gray-800">
            <Calendar className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h3 className="font-medium">Study Plan Highlights</h3>
            <p className="text-sm text-muted-foreground">Based on your preferences</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm">Learning Style:</span>
            <span className="font-medium">{studyStats.learningStyle}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm">Daily Study Time:</span>
            <span className="font-medium">4 hours 30 minutes</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm">Recommended Breaks:</span>
            <span className="font-medium">10 minutes / hour</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm">Focus Sessions:</span>
            <span className="font-medium">25-45 minutes</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm">Best Study Time:</span>
            <span className="font-medium">Morning</span>
          </div>
        </div>
      </div>
      
      <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h3 className="font-medium mb-2">Get Started Now</h3>
        <p className="text-sm text-muted-foreground mb-2">
          Your dashboard is ready with all these resources!
        </p>
        <p className="text-sm text-blue-600 dark:text-blue-400">
          A quick tour will help you navigate the platform.
        </p>
      </div>
    </motion.div>
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-950/30 dark:via-gray-900 dark:to-purple-950/30 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Welcome to PREPZR
          </CardTitle>
        </CardHeader>
        
        <CardContent className="px-6 py-8">
          <AnimatePresence mode="wait">
            {slides[step]}
          </AnimatePresence>
        </CardContent>
        
        <CardFooter className="flex flex-col gap-4 pb-6">
          <div className="flex justify-between w-full">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 0}
              className="flex items-center gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            
            <Button
              onClick={handleNext}
              className="flex items-center gap-1"
            >
              {step === totalSteps - 1 ? "Start Tour" : "Next"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="w-full">
            <Progress value={((step + 1) / totalSteps) * 100} className="h-1" />
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>Welcome</span>
              <span>Resources</span>
              <span>Plan</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default WelcomeSlider;
