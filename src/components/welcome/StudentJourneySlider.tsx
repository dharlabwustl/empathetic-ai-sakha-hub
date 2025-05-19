
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowRight, 
  ArrowLeft, 
  GraduationCap, 
  Sparkles, 
  Brain, 
  Book, 
  BookOpen, 
  Star, 
  Award, 
  Layers
} from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import PrepzrLogo from '@/components/common/PrepzrLogo';

interface StudentJourneySliderProps {
  onComplete: () => void;
  onSkip?: () => void;
  userData?: any;
}

const StudentJourneySlider: React.FC<StudentJourneySliderProps> = ({ onComplete, onSkip, userData = {} }) => {
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
  
  // Journey stages for animated pathway
  const journeyStages = [
    { 
      icon: <BookOpen className="h-5 w-5 text-blue-500" />, 
      title: "Learning", 
      color: "bg-blue-500",
      description: "Discover personalized concepts"
    },
    { 
      icon: <Brain className="h-5 w-5 text-purple-500" />, 
      title: "Practice", 
      color: "bg-purple-500",
      description: "Master through AI-guided practice"
    },
    { 
      icon: <Star className="h-5 w-5 text-amber-500" />, 
      title: "Revision", 
      color: "bg-amber-500",
      description: "Smart revision loops"
    },
    { 
      icon: <Award className="h-5 w-5 text-green-500" />, 
      title: "Test", 
      color: "bg-green-500",
      description: "Simulated exam environments"
    },
    { 
      icon: <GraduationCap className="h-5 w-5 text-indigo-500" />, 
      title: "Success", 
      color: "bg-indigo-500",
      description: "Achieve your exam goals"
    }
  ];

  const slides = [
    // Welcome slide with animated avatar
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
        We understand your mindset, not just the exam
      </p>
      
      {/* Animated Avatar Section */}
      <motion.div 
        className="relative h-40 w-full max-w-md mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Avatar className="h-24 w-24 border-4 border-white shadow-xl">
              <AvatarImage src={userData?.avatar || "/lovable-uploads/caff3d84-1157-41ac-961f-be3b0b5bb9b8.png"} />
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-2xl text-white">
                {userData?.name?.charAt(0) || 'S'}
              </AvatarFallback>
            </Avatar>
          </motion.div>
        </div>
        
        {/* Circular journey path */}
        <svg className="absolute w-full h-full" viewBox="0 0 200 80">
          <path
            d="M20,40 Q100,0 180,40"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="2"
            strokeDasharray="5,5"
            className="dark:stroke-gray-700"
          />
        </svg>
        
        {/* Journey stages along the path */}
        {journeyStages.map((stage, index) => {
          const xPos = 20 + (index * 40);
          const yPos = index % 2 === 0 ? 25 : 55;
          
          return (
            <motion.div
              key={stage.title}
              className="absolute"
              style={{ left: `${(index * 20) + 10}%`, top: index % 2 === 0 ? '5%' : '65%' }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + (index * 0.2), duration: 0.4 }}
            >
              <div className={`h-10 w-10 rounded-full ${stage.color} flex items-center justify-center shadow-lg text-white`}>
                {stage.icon}
              </div>
              <div className="absolute text-xs font-medium w-20 text-center -left-5 mt-1">
                {stage.title}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
      
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
    
    // Study Resources slide with animated resources
    <motion.div
      key="resources"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-center">Your Study Resources</h2>
      
      {/* Animated Avatar With Resources */}
      <div className="relative flex justify-center py-6 mb-4">
        <motion.div
          className="absolute z-10"
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
            <AvatarImage src={userData?.avatar || "/lovable-uploads/caff3d84-1157-41ac-961f-be3b0b5bb9b8.png"} />
            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-xl text-white">
              {userData?.name?.charAt(0) || 'S'}
            </AvatarFallback>
          </Avatar>
        </motion.div>
        
        {/* Orbiting Resources */}
        <div className="relative h-44 w-44 flex items-center justify-center">
          {[0, 72, 144, 216, 288].map((angle, i) => {
            const icons = [
              <BookOpen className="h-5 w-5 text-blue-500" />,
              <Book className="h-5 w-5 text-purple-500" />,
              <Layers className="h-5 w-5 text-amber-500" />,
              <Star className="h-5 w-5 text-green-500" />,
              <Brain className="h-5 w-5 text-indigo-500" />
            ];
            
            return (
              <motion.div
                key={i}
                className="absolute"
                initial={{ rotate: angle }}
                animate={{ rotate: angle + 360 }}
                transition={{ 
                  repeat: Infinity,
                  duration: 20,
                  ease: "linear"
                }}
                style={{ transformOrigin: "center" }}
              >
                <motion.div 
                  className="bg-white dark:bg-gray-800 h-12 w-12 rounded-full shadow-lg flex items-center justify-center -ml-6"
                  whileHover={{ scale: 1.2 }}
                >
                  {icons[i]}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
      
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
            <Award className="h-6 w-6 text-amber-600 dark:text-amber-400" />
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
            <Layers className="h-6 w-6 text-green-600 dark:text-green-400" />
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
    
    // Study Plan slide with interactive journey path
    <motion.div
      key="plan"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-center">Your Personalized Study Journey</h2>
      
      {/* Student Journey Animation */}
      <div className="relative h-36 py-4 mb-8">
        {/* Path Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 transform -translate-y-1/2 rounded-full"></div>
        
        {/* Path Stages */}
        <div className="relative h-full flex justify-between items-center px-4">
          {['Sign Up', 'Assessment', 'Daily Plan', 'Practice', 'Success'].map((stage, i) => {
            const isActive = i === 2; // Current stage
            const isPast = i < 2; // Past stages
            
            return (
              <div key={i} className="relative flex flex-col items-center">
                <motion.div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center z-10 
                    ${isActive 
                      ? 'bg-blue-600 text-white' 
                      : isPast 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
                    } shadow-md`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.2, duration: 0.3 }}
                >
                  {isPast ? (
                    <Award className="h-5 w-5" />
                  ) : isActive ? (
                    <Star className="h-5 w-5" />
                  ) : (
                    <span className="text-sm">{i+1}</span>
                  )}
                </motion.div>
                
                <motion.div 
                  className="absolute top-12 text-center w-20 text-xs font-medium"
                  style={{ transform: 'translateX(-50%)' }}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 + 0.1, duration: 0.3 }}
                >
                  {stage}
                </motion.div>
                
                {/* Avatar on active stage */}
                {isActive && (
                  <motion.div 
                    className="absolute -top-14"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.4 }}
                  >
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <Avatar className="h-12 w-12 border-2 border-white shadow-md">
                        <AvatarImage src={userData?.avatar || "/lovable-uploads/caff3d84-1157-41ac-961f-be3b0b5bb9b8.png"} />
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-sm text-white">
                          {userData?.name?.charAt(0) || 'S'}
                        </AvatarFallback>
                      </Avatar>
                    </motion.div>
                  </motion.div>
                )}
                
                {/* Progress fill */}
                {i < 4 && (
                  <motion.div 
                    className={`absolute top-1/2 left-5 h-1 transform -translate-y-1/2 rounded-full ${isPast || isActive ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'}`}
                    style={{ width: 'calc(100% - 40px)', left: '20px' }}
                    initial={{ width: 0 }}
                    animate={{ width: isPast ? 'calc(100% - 40px)' : isActive ? 'calc(50% - 20px)' : 0 }}
                    transition={{ delay: i * 0.2 + 0.3, duration: 1 }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 dark:from-indigo-900/30 dark:via-purple-900/20 dark:to-blue-900/20 p-5 rounded-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-full bg-white dark:bg-gray-800">
            <Book className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
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
              <span>Journey</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default StudentJourneySlider;
