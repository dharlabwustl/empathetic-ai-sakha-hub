
import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, X, CheckCircle, LayoutDashboard, BookOpen, MessageSquareText, Brain, LineChart, Calendar, Smile, Music, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface WelcomeTourProps {
  onSkipTour: () => void;
  onCompleteTour: () => void;
  isFirstTimeUser: boolean;
  lastActivity?: { type: string; description: string } | null;
  suggestedNextAction?: string | null;
  loginCount?: number;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const WelcomeTour: React.FC<WelcomeTourProps> = ({
  onSkipTour,
  onCompleteTour,
  isFirstTimeUser,
  lastActivity,
  suggestedNextAction,
  loginCount = 1,
  open = false,
  onOpenChange
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      type: "founder",
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg border border-indigo-100 shadow-sm">
            <Avatar className="h-20 w-20 border-2 border-indigo-200">
              <AvatarImage src="/lovable-uploads/622fa3cd-0a65-49dc-89a3-0987c4462bdd.png" alt="Amit Singh" />
              <AvatarFallback>AS</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-indigo-900">A Message from Our Founder – Amit Singh</h3>
              <div className="space-y-2 text-indigo-700">
                <p>"Welcome to Sakha AI – your trusted learning companion.</p>
                <p>We built Sakha with one goal: to make exam preparation fair, human, and truly supportive.</p>
                <p>No student should feel left out or alone in their journey.</p>
                <p>Here, you're seen, heard, and guided – every step of the way.</p>
                <p>Let's crack it together!"</p>
                <p className="text-sm italic mt-2">– Amit Singh, Founder, Sakha AI</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      icon: <LayoutDashboard className="h-8 w-8 text-blue-500" />,
      emoji: "1️⃣",
      title: "Dashboard Overview",
      description: "Your complete learning journey in one place—track your goals, progress, and personalized recommendations.",
      highlight: "✨ Start here to stay organized and focused every day."
    },
    {
      icon: <Calendar className="h-8 w-8 text-emerald-500" />,
      emoji: "2️⃣",
      title: "Study Plan & Academic Advisor",
      description: "Smart study plans and tailored strategies based on your chosen exam.",
      highlight: "🎯 Your AI Academic Advisor helps you plan better, study smarter, and reach your goals faster."
    },
    {
      icon: <BookOpen className="h-8 w-8 text-indigo-500" />,
      emoji: "3️⃣",
      title: "Concept Cards & Practice Decks",
      description: "Bite-sized flashcards, visual breakdowns, and mini quizzes for every topic.",
      highlight: "💡 Perfect for revising, reinforcing, and retaining important concepts easily."
    },
    {
      icon: <MessageSquareText className="h-8 w-8 text-violet-500" />,
      emoji: "4️⃣",
      title: "24/7 AI Tutor",
      description: "Stuck on a question or concept? Ask your AI tutor anytime, anywhere.",
      highlight: "🕒 Available 24/7 to resolve doubts instantly—like a study buddy who never sleeps."
    },
    {
      icon: <Globe className="h-8 w-8 text-amber-500" />,
      emoji: "5️⃣",
      title: "Surrounding Influence Check",
      description: "Understand how your environment affects your performance—sleep, noise, routine, and more.",
      highlight: "📈 Get feedback and tips on how to build a high-performance study zone."
    },
    {
      icon: <Smile className="h-8 w-8 text-pink-500" />,
      emoji: "6️⃣",
      title: "Log Today's Mood",
      description: "Track your daily mood and emotions with one tap.",
      highlight: "💬 Receive wellness suggestions and tailored support based on how you feel today."
    },
    {
      icon: <Music className="h-8 w-8 text-cyan-500" />,
      emoji: "7️⃣",
      title: "Feel-Good Corner",
      description: "Take a break. Relax with music, videos, or motivation boosters to recharge.",
      highlight: "🧘 Your safe space to unwind, refresh, and get back to studying stronger."
    },
    {
      icon: <LineChart className="h-8 w-8 text-teal-500" />,
      emoji: "📊",
      title: "Progress Tracking",
      description: "Detailed insights into your strengths, improvement areas, and learning pace.",
      highlight: "📍 Know where you stand and how to level up, every single week."
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onCompleteTour();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = (step: typeof steps[number], index: number) => {
    if (step.type === "founder") {
      return step.content;
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100">
            {step.icon}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{step.emoji}</span>
              <h3 className="text-xl font-semibold">{step.title}</h3>
            </div>
          </div>
        </div>
        
        <div className="space-y-4 p-4 rounded-lg bg-gradient-to-br from-gray-50 to-indigo-50 border border-indigo-100">
          <div>
            <p className="font-medium text-gray-900 mb-1">What you get:</p>
            <p className="text-gray-700">{step.description}</p>
          </div>
          <div className="p-3 bg-white rounded border border-indigo-100 shadow-sm">
            <p className="text-indigo-700">{step.highlight}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0">
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 z-10"
            onClick={onSkipTour}
          >
            <X className="h-4 w-4" />
          </Button>
          
          <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-700">
            <h2 className="text-2xl font-bold text-white">Welcome to Sakha AI!</h2>
            <p className="text-blue-100 mt-1">
              {isFirstTimeUser 
                ? "Let's take a quick tour to help you get started." 
                : `Welcome back! This is login #${loginCount}.`}
            </p>
          </div>

          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {renderStepContent(steps[currentStep], currentStep)}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="p-4 border-t bg-gray-50/80 backdrop-blur-sm flex items-center justify-between gap-4">
            {currentStep > 0 ? (
              <Button variant="outline" onClick={handlePrevious}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
            ) : (
              <div /> /* Spacer */
            )}

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">
                Step {currentStep + 1} of {steps.length}
              </span>
            </div>

            <Button onClick={handleNext}>
              {currentStep === steps.length - 1 ? (
                <>
                  Get Started
                  <CheckCircle className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeTour;
