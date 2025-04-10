
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface WelcomeTourProps {
  onSkipTour: () => void;
  onCompleteTour: () => void;
}

export default function WelcomeTour({ onSkipTour, onCompleteTour }: WelcomeTourProps) {
  const [tourStep, setTourStep] = useState(0);

  const tourSteps = [
    {
      title: "Welcome to Your Smart Study Plan! 🎉",
      content: "Let's take a quick tour of your personalized dashboard. We've created a smart plan based on your exam goals and preferences."
    },
    {
      title: "Today's Focus 📚",
      content: "Your daily study tasks are organized here. Each day, we'll suggest topics based on your exam syllabus and learning pace."
    },
    {
      title: "Track Your Progress 📈",
      content: "Monitor your study streak, completion rates, and performance metrics. We'll help you stay on track."
    },
    {
      title: "Practice with Flashcards & Quizzes 🧠",
      content: "Review key concepts with AI-generated flashcards and test your knowledge with adaptive quizzes."
    },
    {
      title: "Get Help Anytime 💬",
      content: "Have questions? Need help with a topic? The Sakha AI assistant is always ready to help you."
    }
  ];

  const handleNextTourStep = () => {
    if (tourStep < tourSteps.length - 1) {
      setTourStep(tourStep + 1);
    } else {
      onCompleteTour();
    }
  };

  const currentStep = tourSteps[tourStep];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative z-20 mb-8 bg-gradient-to-r from-sky-50 to-violet-50 p-6 rounded-xl border border-violet-100 shadow-lg"
    >
      <h3 className="text-xl font-semibold mb-4 gradient-text">
        {currentStep.title}
      </h3>
      
      <p className="mb-6 text-gray-700">
        {currentStep.content}
      </p>
      
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <Button variant="outline" onClick={onSkipTour}>Skip Tour</Button>
        <Button 
          onClick={handleNextTourStep} 
          className="bg-gradient-to-r from-sky-500 to-violet-500 flex items-center gap-2"
        >
          {tourStep < tourSteps.length - 1 ? (
            <>
              <span>Next</span>
              <ChevronRight size={16} />
            </>
          ) : (
            "Start Studying"
          )}
        </Button>
      </div>
      
      {/* Progress indicator */}
      <div className="mt-4 flex justify-center items-center gap-2">
        {tourSteps.map((_, index) => (
          <motion.div
            key={index}
            initial={{ width: index === tourStep ? "1rem" : "0.5rem" }}
            animate={{ 
              width: index === tourStep ? "1rem" : "0.5rem",
              backgroundColor: index === tourStep ? "rgb(139, 92, 246)" : "rgb(233, 213, 255)" 
            }}
            className={`h-2 rounded-full transition-all`}
          />
        ))}
      </div>
    </motion.div>
  );
}
