
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, X, CheckCircle, LayoutDashboard, BookOpen, MessageSquareText, Brain, LineChart } from "lucide-react";
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
  const tourFeatures = [
    {
      icon: <LayoutDashboard className="h-6 w-6 text-blue-500" />,
      title: "Dashboard Overview",
      description: "Access your study plans, progress tracking, and personalized recommendations all in one place."
    },
    {
      icon: <BookOpen className="h-6 w-6 text-emerald-500" />,
      title: "Concept Cards",
      description: "Break down complex topics into easy-to-understand cards with visual explanations and examples."
    },
    {
      icon: <MessageSquareText className="h-6 w-6 text-indigo-500" />,
      title: "24/7 AI Tutor",
      description: "Get instant help with your questions and doubts from our AI tutor anytime you need it."
    },
    {
      icon: <Brain className="h-6 w-6 text-violet-500" />,
      title: "Academic Advisor",
      description: "Receive personalized guidance on your study plan and course selection based on your goals."
    },
    {
      icon: <LineChart className="h-6 w-6 text-amber-500" />,
      title: "Progress Tracking",
      description: "Monitor your performance and improvement over time with detailed analytics."
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {tourFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="p-4 rounded-lg border border-gray-200 bg-gray-50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-full bg-white shadow-sm">
                    {feature.icon}
                  </div>
                  <h3 className="font-medium">{feature.title}</h3>
                </div>
                <p className="text-gray-600 text-sm">{feature.description}</p>
                
                {index === 0 && (
                  <div className="mt-2 flex items-start gap-2 p-2 bg-blue-50 rounded-md">
                    <div className="mt-0.5">
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                    </div>
                    <p className="text-xs text-blue-700">
                      Start here to get an overview of your personalized learning journey
                    </p>
                  </div>
                )}
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
