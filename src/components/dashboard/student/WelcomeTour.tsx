
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  CheckCircle, 
  ChevronRight, 
  Info, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  Calendar, 
  Target, 
  Brain, 
  BookOpen, 
  ChartBar, 
  Lightbulb,
  Zap 
} from "lucide-react";
import ReturnUserRecap from "./ReturnUserRecap";

interface WelcomeTourProps {
  onSkipTour: () => void;
  onCompleteTour: () => void;
  isFirstTimeUser?: boolean;
  lastActivity?: { type: string; description: string; } | null;
  suggestedNextAction?: string | null;
  loginCount?: number;
  handleSkipTour?: () => void; // Alias for onSkipTour
  handleCompleteTour?: () => void; // Alias for onCompleteTour
}

export default function WelcomeTour({ 
  onSkipTour, 
  onCompleteTour, 
  isFirstTimeUser = true,
  lastActivity,
  suggestedNextAction,
  loginCount = 0,
  handleSkipTour,
  handleCompleteTour
}: WelcomeTourProps) {
  const [tourStep, setTourStep] = useState(0);
  
  // Handle alias props for backward compatibility
  const skipTourHandler = handleSkipTour || onSkipTour;
  const completeTourHandler = handleCompleteTour || onCompleteTour;

  const handleNextTourStep = () => {
    if (tourStep < 4) {
      setTourStep(tourStep + 1);
    } else {
      completeTourHandler();
    }
  };

  // Dynamic icons for each step with different animations
  const stepIcons = [
    <motion.div 
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 5 }}
      className="p-2 bg-violet-100 rounded-full"
    >
      <Target className="text-violet-600" size={24} />
    </motion.div>,
    <motion.div 
      initial={{ scale: 0.9 }}
      animate={{ scale: 1.1 }}
      transition={{ duration: 1, yoyo: Infinity }}
      className="p-2 bg-blue-100 rounded-full"
    >
      <Calendar className="text-blue-600" size={24} />
    </motion.div>,
    <motion.div 
      initial={{ y: 0 }}
      animate={{ y: [-3, 3, -3] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      className="p-2 bg-amber-100 rounded-full"
    >
      <ChartBar className="text-amber-600" size={24} />
    </motion.div>,
    <motion.div 
      whileHover={{ rotate: 15 }}
      className="p-2 bg-green-100 rounded-full"
    >
      <Brain className="text-green-600" size={24} />
    </motion.div>,
    <motion.div 
      initial={{ opacity: 0.7 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, yoyo: Infinity }}
      className="p-2 bg-purple-100 rounded-full"
    >
      <Sparkles className="text-purple-600" size={24} />
    </motion.div>
  ];

  const tourSections = [
    {
      title: "Welcome to Your Smart Study Plan! 🎉",
      description: "Let's take a quick tour of your personalized dashboard. We've created a smart plan based on your exam goals and preferences.",
      icon: stepIcons[0],
      highlights: [
        { title: "Personalized For You", description: "Every element of your dashboard is tailored to your learning needs." },
        { title: "Adaptive Learning", description: "The more you use the platform, the better it understands your style." }
      ],
      image: "dashboard-overview.png"
    },
    {
      title: "Today's Focus 📚",
      description: "Your daily study tasks are organized here. Each day, we'll suggest topics based on your exam syllabus and learning pace.",
      icon: stepIcons[1],
      highlights: [
        { title: "Smart Scheduling", description: "Tasks are scheduled based on your learning patterns and spaced repetition." },
        { title: "Bite-sized Learning", description: "Tasks are broken down into manageable chunks to maximize retention." }
      ],
      image: "todays-focus.png"
    },
    {
      title: "Track Your Progress 📈",
      description: "Monitor your study streak, completion rates, and performance metrics. We'll help you stay on track.",
      icon: stepIcons[2],
      highlights: [
        { title: "Visual Progress", description: "See your improvement over time with detailed charts and statistics." },
        { title: "Identify Patterns", description: "Understand your strengths and areas needing improvement." }
      ],
      image: "progress-tracking.png"
    },
    {
      title: "Practice with Flashcards & Quizzes 🧠",
      description: "Review key concepts with AI-generated flashcards and test your knowledge with adaptive quizzes.",
      icon: stepIcons[3],
      highlights: [
        { title: "Active Recall", description: "Strengthen memory through active recall techniques built into our system." },
        { title: "Real Exam Simulation", description: "Practice with questions modeled after your specific exam." }
      ],
      image: "practice-tools.png"
    },
    {
      title: "Get Help Anytime 💬",
      description: "Have questions? Need help with a topic? The Sakha AI assistant is always ready to help you.",
      icon: stepIcons[4],
      highlights: [
        { title: "24/7 Support", description: "Get answers to your questions at any time of day or night." },
        { title: "Personalized Explanations", description: "Our AI adapts explanations to your learning style." }
      ],
      image: "ai-assistant.png"
    }
  ];

  // If this is a returning user, show the recap screen instead
  if (!isFirstTimeUser) {
    // For users with multiple logins, show our new recap component
    if (loginCount && loginCount > 2) {
      // Transform lastActivity and suggestedNextAction into the format ReturnUserRecap expects
      const completedTasks = lastActivity ? [
        { 
          id: '1', 
          title: lastActivity.description, 
          date: 'Last session', 
          type: lastActivity.type 
        }
      ] : [];
      
      const suggestedTasks = suggestedNextAction ? [suggestedNextAction] : [];
      
      return (
        <ReturnUserRecap
          userName=""
          lastLoginDate="your last session"
          completedTasks={completedTasks}
          suggestedNextTasks={suggestedTasks}
          onClose={completeTourHandler}
          loginCount={loginCount}
        />
      );
    }
    
    // For users with fewer logins, keep the original welcome back UI
    return (
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-20 mb-8 bg-gradient-to-r from-amber-50 to-indigo-50 p-6 rounded-xl border border-indigo-100 shadow-lg"
      >
        <div className="flex items-start mb-4">
          <div className="mr-4">
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1.1 }}
              transition={{ duration: 1, yoyo: Infinity }}
              className="p-2 bg-indigo-100 rounded-full"
            >
              <Sparkles className="text-indigo-600" size={24} />
            </motion.div>
          </div>
          <div>
            <h3 className="text-xl font-semibold gradient-text">
              Welcome Back! 
            </h3>
            
            <div className="mt-4 space-y-3">
              {lastActivity && (
                <div className="flex items-start gap-2 bg-white/80 p-3 rounded-lg border border-gray-100">
                  <Clock className="text-purple-500 mt-0.5" size={18} />
                  <div>
                    <p className="text-sm font-medium">Last Activity</p>
                    <p className="text-sm text-gray-600">{lastActivity.description}</p>
                  </div>
                </div>
              )}
              
              {suggestedNextAction && (
                <div className="flex items-start gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg border border-indigo-100">
                  <Calendar className="text-indigo-600 mt-0.5" size={18} />
                  <div>
                    <p className="text-sm font-medium">Suggested Next Step</p>
                    <p className="text-sm text-gray-600">{suggestedNextAction}</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-4 text-gray-600 text-sm">
              <p>Pick up right where you left off or explore new content from your personalized study plan.</p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end mt-2">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              onClick={completeTourHandler} 
              className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white flex items-center gap-2"
            >
              Continue Learning
              <ArrowRight size={16} />
            </Button>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  // For first-time users, show the dynamic interactive tour
  const currentSection = tourSections[tourStep];
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative z-20 mb-8 bg-white p-6 rounded-xl border border-violet-100 shadow-lg overflow-hidden"
      style={{
        background: `linear-gradient(135deg, rgb(233, 226, 255, 0.8) 0%, rgba(255, 255, 255, 0.95) 100%)`,
      }}
    >
      {/* Dynamic animated background */}
      <div className="absolute top-0 left-0 right-0 bottom-0 opacity-10 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-300 rounded-full filter blur-3xl -mt-20 -mr-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-300 rounded-full filter blur-3xl -mb-20 -ml-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-7/12">
            <div className="flex items-start mb-4">
              <div className="mr-4">
                {currentSection.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold bg-gradient-to-r from-violet-700 to-indigo-600 bg-clip-text text-transparent">
                  {currentSection.title}
                </h3>
                
                <p className="mb-6 text-gray-700 mt-2">
                  {currentSection.description}
                </p>
                
                <div className="space-y-3 mt-6">
                  {currentSection.highlights.map((highlight, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + (idx * 0.2) }}
                      className="flex items-start gap-2 bg-white p-3 rounded-lg shadow-sm border border-indigo-50"
                    >
                      {tourStep === 0 ? <Target size={18} className="text-violet-500 mt-0.5" /> :
                       tourStep === 1 ? <BookOpen size={18} className="text-blue-500 mt-0.5" /> :
                       tourStep === 2 ? <ChartBar size={18} className="text-amber-500 mt-0.5" /> :
                       tourStep === 3 ? <Brain size={18} className="text-green-500 mt-0.5" /> :
                       <Lightbulb size={18} className="text-purple-500 mt-0.5" />}
                      <div>
                        <p className="text-sm font-medium">{highlight.title}</p>
                        <p className="text-xs text-gray-600">{highlight.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <motion.div 
            className="md:w-5/12 flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="bg-white p-2 border border-violet-200 rounded-lg shadow-md w-full max-w-xs aspect-video flex items-center justify-center">
              <div className="text-center text-gray-400 flex flex-col items-center">
                <Zap size={32} className="mb-2 text-indigo-400" />
                <p className="text-sm">Interactive visualization for {currentSection.title.split(' ')[0]} {currentSection.title.split(' ')[1]}</p>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Progress indicator */}
        <div className="w-full h-1.5 bg-gray-200 rounded-full mb-4 mt-6 overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-violet-500 to-sky-500"
            initial={{ width: `${(tourStep / 4) * 100}%` }}
            animate={{ width: `${((tourStep + 1) / 5) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        
        <div className="flex justify-between">
          <Button variant="outline" onClick={skipTourHandler} className="border-violet-200 text-violet-700">
            Skip Tour
          </Button>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              onClick={handleNextTourStep} 
              className="bg-gradient-to-r from-sky-500 to-violet-500 text-white flex items-center gap-2"
            >
              {tourStep < 4 ? (
                <>
                  Next
                  <ChevronRight size={16} />
                </>
              ) : (
                <>
                  Start Studying
                  <CheckCircle size={16} />
                </>
              )}
            </Button>
          </motion.div>
        </div>
        
        {/* Step indicators */}
        <div className="flex justify-center mt-4 gap-2">
          {[0, 1, 2, 3, 4].map(step => (
            <button
              key={step}
              onClick={() => setTourStep(step)}
              className={`w-2.5 h-2.5 rounded-full ${tourStep === step ? 'bg-violet-500' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
