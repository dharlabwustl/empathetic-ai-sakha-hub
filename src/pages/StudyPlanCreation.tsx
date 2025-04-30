
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { Brain, Check, FileText, BarChart, GraduationCap, Clock } from 'lucide-react';
import PrepzrLogo from '@/components/common/PrepzrLogo';

const StudyPlanCreation = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const [userData, setUserData] = useState<any>(null);

  // Stages of the animation
  const stages = [
    { title: "Analyzing profile...", duration: 2000 },
    { title: "Creating personalized concept cards...", duration: 2000 },
    { title: "Generating flashcards...", duration: 2000 },
    { title: "Building study plan...", duration: 2000 },
    { title: "Finalizing your personalized experience...", duration: 2000 }
  ];

  useEffect(() => {
    // Load user data
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }

    // Progress through the stages
    let timer = 0;
    
    stages.forEach((stage, index) => {
      setTimeout(() => {
        setCurrentStage(index);
        // Set progress based on stage
        setProgress(Math.round(((index + 1) / stages.length) * 100));
      }, timer);
      timer += stage.duration;
    });

    // After all stages, navigate to welcome screen
    setTimeout(() => {
      navigate('/welcome');
    }, timer);

    return () => {
      // Clear any running timers when component unmounts
      clearTimeout(timer);
    };
  }, [navigate]);

  const planDetails = {
    examGoal: userData?.examGoal || 'IIT-JEE',
    subjectCount: 3,
    totalCards: 120,
    conceptCards: 60,
    flashcards: 45,
    examCards: 15,
    weeklyStudyHours: 15,
    dailyGoalHours: 2.5
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100/30 via-white to-violet-100/30 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <div className="text-center mb-8">
          <PrepzrLogo width={100} className="mx-auto" />
          <h1 className="text-2xl font-bold mt-4">Creating Your Study Plan</h1>
          <p className="text-muted-foreground mt-2">
            Please wait while we build your personalized experience
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold">{stages[currentStage]?.title || "Processing..."}</h2>
            </div>
          </div>

          <div className="mb-8">
            <Progress value={progress} className="h-2" />
            <div className="text-right text-sm mt-1 text-muted-foreground">{progress}%</div>
          </div>

          <motion.div 
            className="grid grid-cols-2 gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: progress > 50 ? 1 : 0, 
              y: progress > 50 ? 0 : 20 
            }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-muted/20 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap className="w-4 h-4 text-primary" />
                <h3 className="font-medium">Exam Goal</h3>
              </div>
              <p className="font-bold">{planDetails.examGoal}</p>
            </div>
            
            <div className="bg-muted/20 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-indigo-600" />
                <h3 className="font-medium">Subjects</h3>
              </div>
              <p className="font-bold">{planDetails.subjectCount} core subjects</p>
            </div>
            
            <div className="bg-muted/20 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <BarChart className="w-4 h-4 text-green-600" />
                <h3 className="font-medium">Learning Cards</h3>
              </div>
              <p className="font-bold">{planDetails.totalCards} cards created</p>
              <div className="grid grid-cols-3 gap-1 text-xs mt-2 text-muted-foreground">
                <div>Concept: {planDetails.conceptCards}</div>
                <div>Flash: {planDetails.flashcards}</div>
                <div>Exam: {planDetails.examCards}</div>
              </div>
            </div>
            
            <div className="bg-muted/20 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-amber-600" />
                <h3 className="font-medium">Study Time</h3>
              </div>
              <p className="font-bold">{planDetails.weeklyStudyHours} hours/week</p>
              <p className="text-xs text-muted-foreground mt-1">
                Daily goal: {planDetails.dailyGoalHours} hrs
              </p>
            </div>
          </motion.div>

          <motion.div 
            className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: progress === 100 ? 1 : 0
            }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center">
              <Check className="text-green-600 dark:text-green-400 mr-2" />
              <span className="text-green-800 dark:text-green-300 font-medium">Your study plan is ready!</span>
            </div>
            <p className="text-green-700 dark:text-green-400 text-sm ml-6">
              Redirecting you to your personalized dashboard...
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default StudyPlanCreation;
