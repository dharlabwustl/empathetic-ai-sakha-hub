
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { BookOpen, Bookmark, Clock, ArrowRight } from "lucide-react";
import SakhaLogo from "@/components/common/SakhaLogo";

interface LastActivity {
  type: string;
  id?: string;
  name: string;
  description?: string;
  timestamp?: string;
  progress?: number;
}

interface ReturningUserPromptProps {
  lastActivity: LastActivity;
  onContinue: () => void;
  onSkip: () => void;
}

const ReturningUserPrompt: React.FC<ReturningUserPromptProps> = ({
  lastActivity,
  onContinue,
  onSkip
}) => {
  const formatTimeAgo = (timestamp: string) => {
    if (!timestamp) return "recently";
    
    const now = new Date();
    const lastTime = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - lastTime.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "less than an hour ago";
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  };
  
  const getActivityIcon = () => {
    switch(lastActivity.type) {
      case 'concept':
        return <BookOpen className="h-10 w-10 text-violet-500" />;
      case 'flashcard':
        return <Bookmark className="h-10 w-10 text-indigo-500" />;
      default:
        return <Clock className="h-10 w-10 text-blue-500" />;
    }
  };
  
  const getActivityTitle = () => {
    switch(lastActivity.type) {
      case 'concept':
        return `Continue learning "${lastActivity.name}"`;
      case 'flashcard':
        return "Continue your flashcard session";
      default:
        return "Continue where you left off";
    }
  };

  const getActivityDescription = () => {
    if (lastActivity.description) return lastActivity.description;
    
    switch(lastActivity.type) {
      case 'concept':
        return `You were studying this concept ${lastActivity.timestamp ? formatTimeAgo(lastActivity.timestamp) : 'recently'}. Continue to build your understanding.`;
      case 'flashcard':
        return `You were reviewing flashcards ${lastActivity.timestamp ? formatTimeAgo(lastActivity.timestamp) : 'recently'}. Continue to strengthen your memory.`;
      default:
        return `You were last active ${lastActivity.timestamp ? formatTimeAgo(lastActivity.timestamp) : 'recently'}.`;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-gray-900 dark:to-indigo-950 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <div className="flex justify-center mb-6">
          <SakhaLogo width={80} />
        </div>
        
        <Card className="shadow-lg border border-indigo-100 dark:border-indigo-900">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-indigo-900/30 dark:to-violet-900/30">
            <CardTitle className="text-2xl font-display text-center">Welcome Back!</CardTitle>
            <CardDescription className="text-center">
              We've saved your progress. Would you like to continue where you left off?
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-6">
            <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-100 dark:border-gray-700">
              <div className="flex-shrink-0">
                {getActivityIcon()}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                  {getActivityTitle()}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {getActivityDescription()}
                </p>
                {lastActivity.progress !== undefined && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-indigo-500 h-2 rounded-full" 
                        style={{ width: `${lastActivity.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {lastActivity.progress}% complete
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
            <Button 
              onClick={onContinue}
              className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 flex items-center justify-center"
            >
              Continue Learning
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              onClick={onSkip}
              className="w-full sm:w-auto border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300"
            >
              Go to Dashboard
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default ReturningUserPrompt;
