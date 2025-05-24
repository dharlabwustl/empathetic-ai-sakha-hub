
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle, UserCheck, BookOpen, ChevronRight, Volume2, Calendar, Target } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

interface WelcomeDashboardPromptProps {
  userName: string;
  onComplete: () => void;
  isReturningUser?: boolean;
  lastActivity?: string;
  pendingTasks?: string[];
}

const WelcomeDashboardPrompt: React.FC<WelcomeDashboardPromptProps> = ({ 
  userName, 
  onComplete,
  isReturningUser = false,
  lastActivity,
  pendingTasks = []
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [progress, setProgress] = useState(0);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const { toast } = useToast();
  
  const getWelcomeSteps = () => {
    // Check if user is returning based on login history
    const loginCount = parseInt(localStorage.getItem('login_count') || '0', 10);
    const hasSeenWelcome = localStorage.getItem('sawWelcomeSlider') === 'true';
    
    if (loginCount > 1 || hasSeenWelcome || isReturningUser) {
      return [
        {
          title: `Welcome Back, ${userName}!`,
          description: `Great to see you again! I'm Sakha AI, and I'm here to help you continue your learning journey. ${lastActivity ? `Last time you were ${lastActivity}.` : ''} Let's pick up where you left off and make today even more productive.`,
          icon: <UserCheck className="h-8 w-8 text-blue-500" />
        },
        {
          title: "Your Study Progress",
          description: `I've been tracking your progress and I'm ready to help you stay on track. ${pendingTasks.length > 0 ? `You have ${pendingTasks.length} pending activities that we can tackle together.` : 'Your study plan is up to date!'} Would you like me to suggest what to focus on today?`,
          icon: <BookOpen className="h-8 w-8 text-green-500" />
        },
        {
          title: "Ready to Continue?",
          description: `I'm here to assist you with your daily study plan, practice sessions, and any questions you might have. Use the voice assistant anytime by clicking the microphone button. Let's make today a great learning day!`,
          icon: <Target className="h-8 w-8 text-purple-500" />
        }
      ];
    } else {
      return [
        {
          title: "Welcome to PREPZR",
          description: `Welcome, ${userName}! I'm Sakha AI, your personalized learning companion. This is your central hub for exam preparation. Let's explore key features to maximize your learning experience.`,
          icon: <UserCheck className="h-8 w-8 text-indigo-500" />
        },
        {
          title: "Your Personalized Study Plans",
          description: "I've analyzed your learning style and created adaptive study plans to help you master the concepts you need. Your dashboard adapts to your progress and mood to offer the most effective learning path.",
          icon: <BookOpen className="h-8 w-8 text-blue-500" />
        },
        {
          title: "Ready to Begin?",
          description: "Your AI-powered learning journey starts now! Use voice commands anytime by clicking the microphone button on the bottom right of your screen. I'll be here to guide you throughout your preparation.",
          icon: <CheckCircle className="h-8 w-8 text-green-500" />
        }
      ];
    }
  };

  const welcomeSteps = getWelcomeSteps();

  useEffect(() => {
    // Mark that the user has seen the dashboard welcome
    localStorage.setItem("hasSeenDashboardWelcome", "true");
    
    // Start speaking the first step intro
    speakWelcomeMessage(welcomeSteps[currentStep].description);
    
    // Clean up
    return () => {
      if (window.speechSynthesis && speechRef.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Update progress when step changes
  useEffect(() => {
    setProgress(((currentStep + 1) / welcomeSteps.length) * 100);
    
    // Speak the new step content
    if (currentStep < welcomeSteps.length) {
      speakWelcomeMessage(welcomeSteps[currentStep].description);
    }
  }, [currentStep]);

  const speakWelcomeMessage = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    speechRef.current = new SpeechSynthesisUtterance();
    speechRef.current.text = text;
    speechRef.current.rate = 0.95; // Slightly slower for clarity
    speechRef.current.pitch = 1.05; // Slightly higher for more engagement
    
    // Get available voices
    const voices = window.speechSynthesis.getVoices();
    
    // Try to find a good voice
    const preferredVoiceNames = ['Google US English Female', 'Microsoft Zira', 'Samantha', 'en-US'];
    let selectedVoice = null;
    
    for (const name of preferredVoiceNames) {
      const voice = voices.find(v => 
        v.name?.toLowerCase().includes(name.toLowerCase()) || 
        v.lang?.toLowerCase().includes(name.toLowerCase())
      );
      if (voice) {
        selectedVoice = voice;
        break;
      }
    }
    
    if (selectedVoice) {
      speechRef.current.voice = selectedVoice;
    }
    
    // Set up events
    speechRef.current.onstart = () => setIsSpeaking(true);
    speechRef.current.onend = () => setIsSpeaking(false);
    speechRef.current.onerror = () => setIsSpeaking(false);
    
    // Start speaking
    window.speechSynthesis.speak(speechRef.current);
  };

  const handleNext = () => {
    if (currentStep < welcomeSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    // Cancel any ongoing speech
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    
    setIsOpen(false);
    
    // Delay to allow exit animation
    setTimeout(() => {
      onComplete();
      
      // Check if user is returning
      const loginCount = parseInt(localStorage.getItem('login_count') || '0', 10);
      const hasSeenWelcome = localStorage.getItem('sawWelcomeSlider') === 'true';
      const isReturning = loginCount > 1 || hasSeenWelcome || isReturningUser;
      
      // Show toast confirmation
      toast({
        title: isReturning ? "Welcome back!" : "Welcome tour completed!",
        description: isReturning 
          ? "Ready to continue your learning journey!" 
          : "You're all set to begin your personalized learning journey.",
        duration: 5000,
      });
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="max-w-lg w-full"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <Card className="border-2 border-indigo-200/50 dark:border-indigo-800/30 shadow-2xl">
              <CardHeader className="relative pb-2">
                <div className="absolute top-2 right-2">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                    Step {currentStep + 1} of {welcomeSteps.length}
                  </Badge>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-full bg-gradient-to-br from-indigo-100 to-blue-100 dark:from-indigo-900/40 dark:to-blue-900/40">
                    <motion.div
                      animate={isSpeaking ? 
                        { scale: [1, 1.1, 1], opacity: [1, 0.8, 1] } : 
                        { scale: 1, opacity: 1 }}
                      transition={{ duration: 1, repeat: isSpeaking ? Infinity : 0 }}
                    >
                      {welcomeSteps[currentStep].icon}
                    </motion.div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{welcomeSteps[currentStep].title}</h3>
                    <Progress value={progress} className="h-1 mt-2" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="relative min-h-[120px] flex items-center">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={currentStep}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-gray-700 dark:text-gray-300"
                    >
                      {welcomeSteps[currentStep].description}
                    </motion.p>
                  </AnimatePresence>
                </div>
                
                {/* Show pending tasks for returning users */}
                {(isReturningUser || localStorage.getItem('login_count')) && pendingTasks.length > 0 && currentStep === 1 && (
                  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-2">
                      Pending Activities:
                    </h4>
                    <ul className="text-xs text-blue-600 dark:text-blue-400 space-y-1">
                      {pendingTasks.slice(0, 3).map((task, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <Calendar className="h-3 w-3" />
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  disabled={!('speechSynthesis' in window)}
                  onClick={() => speakWelcomeMessage(welcomeSteps[currentStep].description)}
                  className={isSpeaking ? "text-indigo-600 animate-pulse" : ""}
                >
                  <Volume2 className="h-5 w-5" />
                </Button>
                <Button onClick={handleNext}>
                  {currentStep < welcomeSteps.length - 1 ? (
                    <>Next <ChevronRight className="ml-1 h-4 w-4" /></>
                  ) : (
                    // Check if returning user for button text
                    (isReturningUser || localStorage.getItem('login_count')) ? "Continue Learning" : "Get Started"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeDashboardPrompt;
