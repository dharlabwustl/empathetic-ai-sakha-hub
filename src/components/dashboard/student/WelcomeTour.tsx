
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, X, CheckCircle, LayoutDashboard, BookOpen, MessageSquareText, Brain, LineChart, Calendar, Smile, Music, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  const tourFeatures = [
    {
      icon: <LayoutDashboard className="h-6 w-6 text-blue-500" />,
      emoji: "1️⃣",
      title: "Dashboard Overview",
      description: "Your complete learning journey in one place—track your goals, progress, and personalized recommendations.",
      highlight: "✨ Start here to stay organized and focused every day."
    },
    {
      icon: <Calendar className="h-6 w-6 text-emerald-500" />,
      emoji: "2️⃣",
      title: "Study Plan & Academic Advisor",
      description: "Smart study plans and tailored strategies based on your chosen exam.",
      highlight: "🎯 Your AI Academic Advisor helps you plan better, study smarter, and reach your goals faster."
    },
    {
      icon: <BookOpen className="h-6 w-6 text-indigo-500" />,
      emoji: "3️⃣",
      title: "Concept Cards & Practice Decks",
      description: "Bite-sized flashcards, visual breakdowns, and mini quizzes for every topic.",
      highlight: "💡 Perfect for revising, reinforcing, and retaining important concepts easily."
    },
    {
      icon: <MessageSquareText className="h-6 w-6 text-violet-500" />,
      emoji: "4️⃣",
      title: "24/7 AI Tutor",
      description: "Stuck on a question or concept? Ask your AI tutor anytime, anywhere.",
      highlight: "🕒 Available 24/7 to resolve doubts instantly—like a study buddy who never sleeps."
    },
    {
      icon: <Globe className="h-6 w-6 text-amber-500" />,
      emoji: "5️⃣",
      title: "Surrounding Influence Check",
      description: "Understand how your environment affects your performance—sleep, noise, routine, and more.",
      highlight: "📈 Get feedback and tips on how to build a high-performance study zone."
    },
    {
      icon: <Smile className="h-6 w-6 text-pink-500" />,
      emoji: "6️⃣", 
      title: "Log Today's Mood",
      description: "Track your daily mood and emotions with one tap.",
      highlight: "💬 Receive wellness suggestions and tailored support based on how you feel today."
    },
    {
      icon: <Music className="h-6 w-6 text-cyan-500" />,
      emoji: "7️⃣",
      title: "Feel-Good Corner",
      description: "Take a break. Relax with music, videos, or motivation boosters to recharge.",
      highlight: "🧘 Your safe space to unwind, refresh, and get back to studying stronger."
    },
    {
      icon: <LineChart className="h-6 w-6 text-teal-500" />,
      emoji: "📊",
      title: "Progress Tracking",
      description: "Detailed insights into your strengths, improvement areas, and learning pace.",
      highlight: "📍 Know where you stand and how to level up, every single week."
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
                {isFirstTimeUser 
                  ? "Let's take a quick tour to help you get started." 
                  : `Welcome back! This is login #${loginCount}.`}
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
          <div className="flex items-center gap-4 mb-6 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
            <Avatar className="h-16 w-16 border-2 border-indigo-200">
              <AvatarImage src="/lovable-uploads/ffd1ed0a-7a25-477e-bc91-1da9aca3497f.png" alt="Founder" />
              <AvatarFallback>AS</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-indigo-800">Message from the Founder - Amit Singh</h3>
              <p className="text-indigo-600 text-sm mt-1">
                Your personalized learning companion is here. Let's take a quick tour of your dashboard to help you get started.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {tourFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="p-4 rounded-lg border border-gray-200 bg-gray-50 hover:bg-white hover:shadow-md transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="text-xl">{feature.emoji}</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="p-1.5 rounded-full bg-white shadow-sm">
                        {feature.icon}
                      </div>
                      <h3 className="font-medium text-lg">{feature.title}</h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">
                      <span className="font-medium">What you get:</span> {feature.description}
                    </p>
                    <p className="text-sm text-indigo-700 font-medium bg-indigo-50 p-2 rounded">
                      {feature.highlight}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {!isFirstTimeUser && lastActivity && (
            <div className="mt-6 mb-4 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
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
          
          <div className="flex justify-between mt-6">
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
