
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Clock, FileText, Calendar } from "lucide-react";
import PrepzrLogo from '@/components/common/PrepzrLogo';
import { useToast } from "@/hooks/use-toast";

interface ThreeStepWelcomeProps {
  userName: string;
  examGoal: string;
  onComplete: () => void;
}

const ThreeStepWelcome: React.FC<ThreeStepWelcomeProps> = ({ 
  userName, 
  examGoal,
  onComplete 
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setLoading(true);
      
      // Store in localStorage that user has seen the welcome flow
      localStorage.setItem("welcomeFlowCompleted", "true");
      
      // Navigate to dashboard and indicate to show the tour
      setTimeout(() => {
        onComplete();
      }, 1000);
    }
  };
  
  const progress = (step / 3) * 100;
  
  const welcomeSteps = [
    // Step 1: Study Plan Overview
    <div className="space-y-6">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block p-3 bg-blue-50 rounded-full mb-3">
            <Calendar className="h-8 w-8 text-blue-600" />
          </div>
        </motion.div>
        <h3 className="text-xl font-bold">Your Personalized Study Plan</h3>
        <p className="text-muted-foreground mt-1">
          Tailored for your {examGoal} preparation
        </p>
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-lg">
        <h4 className="font-medium mb-3 flex items-center">
          <Calendar className="h-4 w-4 mr-2 text-blue-700 dark:text-blue-400" />
          Study Plan Highlights
        </h4>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm">Physics</span>
            <div className="flex items-center">
              <div className="w-32 h-2 bg-gray-200 rounded-full mr-2">
                <div className="w-3/4 h-full bg-blue-600 rounded-full"></div>
              </div>
              <span className="text-xs text-muted-foreground">12 hr/week</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm">Chemistry</span>
            <div className="flex items-center">
              <div className="w-32 h-2 bg-gray-200 rounded-full mr-2">
                <div className="w-2/3 h-full bg-green-600 rounded-full"></div>
              </div>
              <span className="text-xs text-muted-foreground">10 hr/week</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm">Biology</span>
            <div className="flex items-center">
              <div className="w-32 h-2 bg-gray-200 rounded-full mr-2">
                <div className="w-5/6 h-full bg-purple-600 rounded-full"></div>
              </div>
              <span className="text-xs text-muted-foreground">14 hr/week</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-sm text-center text-muted-foreground">
        Your study plan is customized based on your subject preferences, learning style, and exam date.
      </div>
    </div>,
    
    // Step 2: Concepts and Flashcards
    <div className="space-y-6">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block p-3 bg-purple-50 rounded-full mb-3">
            <BookOpen className="h-8 w-8 text-purple-600" />
          </div>
        </motion.div>
        <h3 className="text-xl font-bold">Concept Cards & Flashcards</h3>
        <p className="text-muted-foreground mt-1">
          Master key concepts with our learning tools
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
          <h4 className="font-medium text-center mb-3">Concept Cards</h4>
          <div className="text-center">
            <span className="text-3xl font-bold text-purple-700">124</span>
            <p className="text-xs text-muted-foreground mt-1">Comprehensive concepts</p>
          </div>
          <div className="mt-3 text-xs">
            <div className="flex justify-between">
              <span>Physics</span>
              <span>42 concepts</span>
            </div>
            <div className="flex justify-between mt-1">
              <span>Chemistry</span>
              <span>38 concepts</span>
            </div>
            <div className="flex justify-between mt-1">
              <span>Biology</span>
              <span>44 concepts</span>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h4 className="font-medium text-center mb-3">Flashcards</h4>
          <div className="text-center">
            <span className="text-3xl font-bold text-blue-700">350+</span>
            <p className="text-xs text-muted-foreground mt-1">Smart flashcards</p>
          </div>
          <div className="mt-3 text-xs">
            <div className="flex justify-between">
              <span>Quick revision</span>
              <span>✓</span>
            </div>
            <div className="flex justify-between mt-1">
              <span>Spaced repetition</span>
              <span>✓</span>
            </div>
            <div className="flex justify-between mt-1">
              <span>Adaptive learning</span>
              <span>✓</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-sm text-center text-muted-foreground">
        Our concept cards and flashcards use AI to adapt to your learning style and focus on your weak areas.
      </div>
    </div>,
    
    // Step 3: Practice Exams and Time Allocation
    <div className="space-y-6">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block p-3 bg-green-50 rounded-full mb-3">
            <Clock className="h-8 w-8 text-green-600" />
          </div>
        </motion.div>
        <h3 className="text-xl font-bold">Practice Exams & Study Pace</h3>
        <p className="text-muted-foreground mt-1">
          Perfect your timing and track your progress
        </p>
      </div>
      
      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Practice Exam Statistics</h4>
        <div className="grid grid-cols-3 gap-2 text-center mb-4">
          <div className="bg-white dark:bg-green-800/20 p-2 rounded">
            <div className="text-xl font-bold text-green-700 dark:text-green-400">12</div>
            <div className="text-xs text-muted-foreground">Full-length exams</div>
          </div>
          <div className="bg-white dark:bg-green-800/20 p-2 rounded">
            <div className="text-xl font-bold text-green-700 dark:text-green-400">24</div>
            <div className="text-xs text-muted-foreground">Subject tests</div>
          </div>
          <div className="bg-white dark:bg-green-800/20 p-2 rounded">
            <div className="text-xl font-bold text-green-700 dark:text-green-400">48</div>
            <div className="text-xs text-muted-foreground">Topic quizzes</div>
          </div>
        </div>
        
        <h4 className="font-medium mb-2">Your Study Pace</h4>
        <div className="flex items-center mb-1">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-600 h-2 rounded-full" style={{ width: '65%' }}></div>
          </div>
          <span className="ml-2 text-xs text-muted-foreground">Balanced</span>
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Relaxed</span>
          <span>Aggressive</span>
        </div>
      </div>
      
      <div className="text-sm text-center text-muted-foreground">
        Your recommended daily study time: <span className="font-medium">4-5 hours</span><br />
        With this pace, you'll complete the curriculum with <span className="font-medium">3 weeks</span> for revision.
      </div>
    </div>
  ];
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-violet-50 dark:from-blue-950/30 dark:to-violet-950/30 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex justify-center mb-2">
              <PrepzrLogo width={80} height="auto" />
            </div>
            <CardTitle>Welcome to PREPZR, {userName}!</CardTitle>
            <CardDescription>
              Let's explore what we've prepared for your {examGoal} preparation
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {welcomeSteps[step - 1]}
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              className="w-full" 
              onClick={handleNext}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Setting up your dashboard...
                </>
              ) : (
                <>
                  {step < 3 ? "Continue" : "Go to Dashboard"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
            
            <Progress value={progress} className="h-1" />
            <div className="text-xs text-center text-muted-foreground">
              Step {step} of 3
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default ThreeStepWelcome;
