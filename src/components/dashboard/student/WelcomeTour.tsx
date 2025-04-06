
import { useState } from "react";
import { Button } from "@/components/ui/button";

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

  return (
    <div className="relative z-20 mb-8 bg-gradient-to-r from-sky-50 to-violet-50 p-6 rounded-xl border border-violet-100 shadow-lg">
      <h3 className="text-xl font-semibold mb-4 gradient-text">
        {tourStep === 0 && "Welcome to Your Smart Study Plan! 🎉"}
        {tourStep === 1 && "Today's Focus 📚"}
        {tourStep === 2 && "Track Your Progress 📈"}
        {tourStep === 3 && "Practice with Flashcards & Quizzes 🧠"}
        {tourStep === 4 && "Get Help Anytime 💬"}
      </h3>
      
      <p className="mb-6 text-gray-700">
        {tourStep === 0 && "Let's take a quick tour of your personalized dashboard. We've created a smart plan based on your exam goals and preferences."}
        {tourStep === 1 && "Your daily study tasks are organized here. Each day, we'll suggest topics based on your exam syllabus and learning pace."}
        {tourStep === 2 && "Monitor your study streak, completion rates, and performance metrics. We'll help you stay on track."}
        {tourStep === 3 && "Review key concepts with AI-generated flashcards and test your knowledge with adaptive quizzes."}
        {tourStep === 4 && "Have questions? Need help with a topic? The Sakha AI assistant is always ready to help you."}
      </p>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onSkipTour}>Skip Tour</Button>
        <Button onClick={handleNextTourStep} className="bg-gradient-to-r from-sky-500 to-violet-500">
          {tourStep < 4 ? "Next" : "Start Studying"}
        </Button>
      </div>
    </div>
  );
}
