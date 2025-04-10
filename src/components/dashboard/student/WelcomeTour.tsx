
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle, ChevronRight, Info } from "lucide-react";

interface WelcomeTourProps {
  onSkipTour: () => void;
  onCompleteTour: () => void;
}

export default function WelcomeTour({ onSkipTour, onCompleteTour }: WelcomeTourProps) {
  const [tourStep, setTourStep] = useState(0);

  const handleNextTourStep = () => {
    if (tourStep < 4) {
      setTourStep(tourStep + 1);
    } else {
      onCompleteTour();
    }
  };

  // Icons for each step
  const stepIcons = [
    <Info className="text-violet-500" size={24} />,
    <motion.div 
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <Info className="text-sky-500" size={24} />
    </motion.div>,
    <motion.div 
      initial={{ scale: 0.8 }}
      animate={{ scale: 1.2 }}
      transition={{ duration: 0.5, yoyo: Infinity }}
    >
      <Info className="text-indigo-500" size={24} />
    </motion.div>,
    <motion.div 
      initial={{ y: 0 }}
      animate={{ y: [-5, 5, -5] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <Info className="text-amber-500" size={24} />
    </motion.div>,
    <motion.div 
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, yoyo: Infinity }}
    >
      <Info className="text-emerald-500" size={24} />
    </motion.div>
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative z-20 mb-8 bg-gradient-to-r from-sky-50 to-violet-50 p-6 rounded-xl border border-violet-100 shadow-lg"
    >
      <div className="flex items-start mb-4">
        <div className="mr-4">
          {stepIcons[tourStep]}
        </div>
        <div>
          <h3 className="text-xl font-semibold gradient-text">
            {tourStep === 0 && "Welcome to Your Smart Study Plan! 🎉"}
            {tourStep === 1 && "Today's Focus 📚"}
            {tourStep === 2 && "Track Your Progress 📈"}
            {tourStep === 3 && "Practice with Flashcards & Quizzes 🧠"}
            {tourStep === 4 && "Get Help Anytime 💬"}
          </h3>
          
          <p className="mb-6 text-gray-700 mt-2">
            {tourStep === 0 && "Let's take a quick tour of your personalized dashboard. We've created a smart plan based on your exam goals and preferences."}
            {tourStep === 1 && "Your daily study tasks are organized here. Each day, we'll suggest topics based on your exam syllabus and learning pace."}
            {tourStep === 2 && "Monitor your study streak, completion rates, and performance metrics. We'll help you stay on track."}
            {tourStep === 3 && "Review key concepts with AI-generated flashcards and test your knowledge with adaptive quizzes."}
            {tourStep === 4 && "Have questions? Need help with a topic? The Sakha AI assistant is always ready to help you."}
          </p>
        </div>
      </div>
      
      {/* Progress indicator */}
      <div className="w-full h-1 bg-gray-200 rounded-full mb-4 overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-violet-500 to-sky-500"
          initial={{ width: `${(tourStep / 4) * 100}%` }}
          animate={{ width: `${((tourStep + 1) / 5) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onSkipTour} className="border-violet-200 text-violet-700">
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
    </motion.div>
  );
}
