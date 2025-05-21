
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  FileText,
  Calendar,
  Brain,
  CheckCircle,
  FlaskConical,
  RefreshCw,
  Star,
  Users,
  Award,
  Volume2,
  ChevronLeft,
  ChevronRight,
  X,
  Book,
  ScrollText,
  Search
} from 'lucide-react';

interface TourStep {
  title: string;
  description: string;
  imageSrc?: string;
  route: string;
  icon: React.ReactNode;
}

const StudentJourneyTourGuide: React.FC<{
  onClose: () => void;
  onComplete: () => void;
  isVisible: boolean;
}> = ({ onClose, onComplete, isVisible }) => {
  const [step, setStep] = useState(0);
  const [readAloud, setReadAloud] = useState(false);
  const navigate = useNavigate();

  // Define the tour steps with focused descriptions
  const tourSteps: TourStep[] = [
    {
      title: "Academic Advisor",
      description: "Start your journey here! The Academic Advisor page shows your exam-specific details, tracks your progress across subjects, and helps you create personalized study plans tailored to your target exam.",
      route: "/dashboard/student/academic",
      icon: <Book className="h-8 w-8 text-blue-600" />
    },
    {
      title: "Today's Plan",
      description: "Your daily tasks are broken down based on your learning style and behavior. Each day has a specific focus to ensure you cover all topics before your exam date.",
      route: "/dashboard/student/today",
      icon: <Calendar className="h-8 w-8 text-green-600" />
    },
    {
      title: "Concept Cards",
      description: "Master key concepts with detailed cards. Each concept is broken down into easy-to-understand chunks with visual aids, examples, and practice questions to strengthen your understanding.",
      route: "/dashboard/student/concepts",
      icon: <BookOpen className="h-8 w-8 text-purple-600" />
    },
    {
      title: "Concept Details",
      description: "Deep dive into each concept with comprehensive explanations, related formulas, practice questions, and visual illustrations to enhance your understanding.",
      route: "/dashboard/student/concepts/concept-1",
      icon: <Brain className="h-8 w-8 text-indigo-600" />
    },
    {
      title: "Flashcards",
      description: "Quick revision tools to test your memory and understanding. Flip through flashcards to reinforce key concepts and formulas before your exams.",
      route: "/dashboard/student/flashcards",
      icon: <RefreshCw className="h-8 w-8 text-amber-600" />
    },
    {
      title: "Practice Exams",
      description: "Test your knowledge with exam-like questions. Analyze your performance, identify weak areas, and track your progress over time.",
      route: "/dashboard/student/practice-exam",
      icon: <FileText className="h-8 w-8 text-red-600" />
    },
    {
      title: "Formula Lab",
      description: "Practice subject-specific formulas with interactive tools. Customize formula sets based on your exam goals and track your mastery of each formula.",
      route: "/dashboard/student/concepts",
      icon: <FlaskConical className="h-8 w-8 text-cyan-600" />
    },
    {
      title: "Previous Papers",
      description: "Analyze past exam patterns to understand question types, important topics, and marking schemes to better prepare for your upcoming exams.",
      route: "/dashboard/student/practice-exam",
      icon: <ScrollText className="h-8 w-8 text-gray-600" />
    },
    {
      title: "24/7 AI Tutor",
      description: "Get instant help with difficult concepts, clarify doubts, and receive personalized explanations whenever you need assistance.",
      route: "/dashboard/student/academic",
      icon: <Search className="h-8 w-8 text-blue-600" />
    },
    {
      title: "Community & Gamification",
      description: "Engage with fellow students, participate in challenges, earn badges, and make learning fun through gamified elements to stay motivated.",
      route: "/dashboard/student",
      icon: <Users className="h-8 w-8 text-pink-600" />
    }
  ];

  // Navigate to the current step's route when step changes
  useEffect(() => {
    if (isVisible && tourSteps[step]) {
      navigate(tourSteps[step].route);
    }
  }, [step, isVisible, navigate]);

  // Text-to-speech functionality
  useEffect(() => {
    if (readAloud && isVisible) {
      const speech = new SpeechSynthesisUtterance();
      speech.text = `${tourSteps[step].title}. ${tourSteps[step].description}`;
      speech.rate = 0.9;
      speechSynthesis.speak(speech);
      
      return () => {
        speechSynthesis.cancel();
      };
    }
  }, [step, readAloud, isVisible]);

  const handleNext = () => {
    if (step < tourSteps.length - 1) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleComplete = () => {
    speechSynthesis.cancel();
    setReadAloud(false);
    onComplete();
    navigate('/dashboard/student');
  };

  const toggleReadAloud = () => {
    if (readAloud) {
      speechSynthesis.cancel();
    }
    setReadAloud(!readAloud);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="bg-white dark:bg-gray-900 rounded-xl max-w-3xl w-full shadow-2xl overflow-hidden"
        >
          <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              Student Journey Tour: {step + 1}/{tourSteps.length}
            </h2>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleReadAloud}
                className={readAloud ? "text-blue-600" : "text-gray-500"}
              >
                <Volume2 className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg p-6 h-32 w-32">
                {tourSteps[step].icon}
              </div>
              
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2 text-primary">
                  {tourSteps[step].title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {tourSteps[step].description}
                </p>
                
                {tourSteps[step].imageSrc && (
                  <div className="mb-4 rounded-lg overflow-hidden">
                    <img 
                      src={tourSteps[step].imageSrc} 
                      alt={tourSteps[step].title} 
                      className="w-full h-auto object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="px-6 pb-6">
            <Progress value={((step + 1) / tourSteps.length) * 100} className="h-1 mb-4" />
            
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={step === 0}
                className="flex items-center gap-1"
              >
                <ChevronLeft className="h-4 w-4" /> Previous
              </Button>
              
              <div className="flex gap-2">
                <Button variant="outline" onClick={onClose}>
                  Skip Tour
                </Button>
                
                {step === tourSteps.length - 1 ? (
                  <Button onClick={handleComplete} className="bg-primary hover:bg-primary/90">
                    Complete Tour
                  </Button>
                ) : (
                  <Button onClick={handleNext} className="bg-primary hover:bg-primary/90 flex items-center gap-1">
                    Next <ChevronRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default StudentJourneyTourGuide;
