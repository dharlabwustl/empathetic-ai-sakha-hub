
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArrowRight, X, CheckCircle, LayoutDashboard, BookOpen, MessageSquareText, Brain, LineChart, CalendarCheck, Smile, Music } from "lucide-react";
import { motion } from "framer-motion";

interface WelcomeTourProps {
  onSkipTour: () => void;
  onCompleteTour: () => void;
  isFirstTimeUser: boolean;
  lastActivity?: { type: string; description: string } | null;
  suggestedNextAction?: string | null;
  loginCount?: number;
}

const WelcomeTour: React.FC<WelcomeTourProps> = ({
  onSkipTour,
  onCompleteTour,
  isFirstTimeUser,
  lastActivity,
  suggestedNextAction,
  loginCount = 1
}) => {
  const tourSteps = [
    {
      icon: <LayoutDashboard className="h-6 w-6 text-blue-500" />,
      title: "Dashboard Overview",
      description: "Your complete learning journey in one place—track your goals, progress, and personalized recommendations.",
      actionText: "Start here to stay organized and focused every day."
    },
    {
      icon: <Brain className="h-6 w-6 text-purple-600" />,
      title: "Study Plan & Academic Advisor",
      description: "Smart study plans and tailored strategies based on your chosen exam.",
      actionText: "Your AI Academic Advisor helps you plan better, study smarter, and reach your goals faster."
    },
    {
      icon: <BookOpen className="h-6 w-6 text-emerald-500" />,
      title: "Concept Cards & Practice Decks",
      description: "Bite-sized flashcards, visual breakdowns, and mini quizzes for every topic.",
      actionText: "Perfect for revising, reinforcing, and retaining important concepts easily."
    },
    {
      icon: <MessageSquareText className="h-6 w-6 text-indigo-500" />,
      title: "24/7 AI Tutor",
      description: "Stuck on a question or concept? Ask your AI tutor anytime, anywhere.",
      actionText: "Available 24/7 to resolve doubts instantly—like a study buddy who never sleeps."
    },
    {
      icon: <LineChart className="h-6 w-6 text-amber-500" />,
      title: "Surrounding Influence Check",
      description: "Understand how your environment affects your performance—sleep, noise, routine, and more.",
      actionText: "Get feedback and tips on how to build a high-performance study zone."
    },
    {
      icon: <Smile className="h-6 w-6 text-rose-500" />,
      title: "Log Today's Mood",
      description: "Track your daily mood and emotions with one tap.",
      actionText: "Receive wellness suggestions and tailored support based on how you feel today."
    },
    {
      icon: <Music className="h-6 w-6 text-pink-500" />,
      title: "Feel-Good Corner",
      description: "Take a break. Relax with music, videos, or motivation boosters to recharge.",
      actionText: "Your safe space to unwind, refresh, and get back to studying stronger."
    },
    {
      icon: <CalendarCheck className="h-6 w-6 text-teal-500" />,
      title: "Progress Tracking",
      description: "Detailed insights into your strengths, improvement areas, and learning pace.",
      actionText: "Know where you stand and how to level up, every single week."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6"
    >
      <Card className="overflow-hidden border-0 shadow-lg bg-white">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6">
          <div className="flex justify-between items-start">
            <div className="text-white">
              <h2 className="text-2xl font-bold">Welcome to Sakha AI!</h2>
              <p className="text-blue-100 mt-1">
                Your personalized learning companion is here. Let's take a quick tour of your dashboard.
              </p>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onSkipTour}
              className="text-white hover:bg-blue-700/50"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <CardContent className="p-6">
          {/* Founder's message */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-blue-200">
              <AvatarImage src="/lovable-uploads/30e8bd24-2d17-453e-b6f3-0a4fa2b9120d.png" alt="Amit Singh" />
              <AvatarFallback>AS</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h3 className="font-semibold text-blue-900">Founder's Message - Amit Singh</h3>
              <p className="text-sm text-blue-700">
                Welcome! We built Sakha AI to transform how you prepare for exams. 
                Our platform adapts to your unique learning style and needs. 
                I'm excited to have you join us on this learning journey!
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {tourSteps.map((step, index) => (
              <motion.div
                key={step.title}
                className="p-4 rounded-lg border border-gray-200 bg-gray-50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center justify-center p-2 rounded-full bg-white shadow-sm">
                    {step.icon}
                    <span className="ml-1 font-medium text-gray-500">{index + 1}️⃣</span>
                  </div>
                  <h3 className="font-medium">{step.title}</h3>
                </div>
                <p className="text-gray-600 text-sm mb-2">🔍 What you get:</p>
                <p className="text-gray-600 text-sm ml-4">{step.description}</p>
                <div className="mt-2 flex items-start gap-2 p-2 bg-blue-50 rounded-md">
                  <div className="mt-0.5">
                    <CheckCircle className="h-4 w-4 text-blue-500" />
                  </div>
                  <p className="text-xs text-blue-700">
                    ✨ {step.actionText}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          
          {!isFirstTimeUser && lastActivity && (
            <div className="mb-6 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
              <h3 className="font-medium text-indigo-800">Pick up where you left off</h3>
              <p className="text-indigo-700 text-sm mt-1">{lastActivity.description}</p>
              
              {suggestedNextAction && (
                <div className="mt-3 flex items-center">
                  <ArrowRight className="h-4 w-4 text-indigo-600 mr-2" />
                  <p className="text-sm font-medium text-indigo-800">{suggestedNextAction}</p>
                </div>
              )}
            </div>
          )}
          
          <div className="flex justify-between mt-4">
            <Button variant="outline" onClick={onSkipTour}>
              Skip Tour
            </Button>
            <Button onClick={onCompleteTour} className="bg-gradient-to-r from-blue-600 to-indigo-700">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default WelcomeTour;
