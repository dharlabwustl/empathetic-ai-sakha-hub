
import React from "react";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { UserProfileType } from "@/types/user";
import { MoodType } from "@/types/user/base";
import { motion } from "framer-motion";
import { getMoodIcon } from "@/components/dashboard/student/mood-tracking/moodUtils";

interface DashboardHeaderProps {
  userProfile: UserProfileType;
  formattedTime: string;
  formattedDate: string;
  onViewStudyPlan: () => void;
  currentMood?: MoodType;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  userProfile,
  formattedTime,
  formattedDate,
  onViewStudyPlan,
  currentMood
}) => {
  // Get greeting based on time and mood
  const getGreeting = () => {
    const hour = new Date().getHours();
    let timeGreeting = "";
    
    if (hour < 12) timeGreeting = "Good Morning";
    else if (hour < 17) timeGreeting = "Good Afternoon";
    else timeGreeting = "Good Evening";
    
    if (currentMood) {
      switch(currentMood) {
        case "happy":
          return `${timeGreeting}, ${userProfile.name}! You're beaming today!`;
        case "motivated":
          return `${timeGreeting}, ${userProfile.name}! You're fired up today!`;
        case "focused":
          return `${timeGreeting}, ${userProfile.name}! You're in the zone today!`;
        case "curious":
          return `${timeGreeting}, ${userProfile.name}! Ready to explore today?`;
        case "neutral":
          return `${timeGreeting}, ${userProfile.name}! Ready for a balanced day?`;
        case "tired":
          return `${timeGreeting}, ${userProfile.name}! Let's take it easy today.`;
        case "stressed":
          return `${timeGreeting}, ${userProfile.name}. Let's take one step at a time.`;
        case "sad":
          return `${timeGreeting}, ${userProfile.name}. We're here for you today.`;
        case "overwhelmed":
          return `${timeGreeting}, ${userProfile.name}. Let's break things down together.`;
        case "okay":
          return `${timeGreeting}, ${userProfile.name}! Ready for steady progress?`;
        default:
          return `${timeGreeting}, ${userProfile.name}!`;
      }
    }
    
    return `${timeGreeting}, ${userProfile.name}!`;
  };
  
  // Get animation variants based on mood
  const getHeaderAnimationVariant = () => {
    if (!currentMood) return {};
    
    switch(currentMood) {
      case "happy":
      case "motivated":
        return {
          animate: {
            y: [-2, 2, -2],
            transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }
        };
      case "focused":
        return {
          animate: {
            scale: [1, 1.02, 1],
            transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }
        };
      case "curious":
        return {
          animate: {
            rotate: [-1, 1, -1],
            transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }
        };
      case "stressed":
      case "overwhelmed":
        return {
          animate: {
            opacity: [1, 0.8, 1],
            transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }
        };
      default:
        return {};
    }
  };

  return (
    <div className="dashboard-header w-full rounded-xl p-4 sm:p-6 bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-900/20 dark:to-indigo-900/20 shadow-sm border border-violet-100 dark:border-violet-800/30">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <motion.div {...getHeaderAnimationVariant()}>
          <div className="flex items-center">
            {currentMood && (
              <motion.div
                className="mr-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [-10, 10, -10] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              >
                {getMoodIcon(currentMood)}
              </motion.div>
            )}
            <h1 className="text-xl md:text-2xl font-semibold">{getGreeting()}</h1>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {formattedDate} • {formattedTime}
          </p>
        </motion.div>
        
        <div className="flex items-center gap-3">
          {userProfile.goals && userProfile.goals[0] && (
            <div className="px-3 py-1 bg-white dark:bg-gray-800 rounded-lg text-sm font-medium shadow-sm border border-violet-100 dark:border-violet-800/30">
              Goal: {userProfile.goals[0].title}
            </div>
          )}
          
          <Button
            size="sm"
            variant="outline"
            className="hidden sm:flex items-center bg-white hover:bg-violet-50 dark:bg-gray-800 dark:hover:bg-gray-700"
            onClick={onViewStudyPlan}
          >
            <BookOpen className="mr-2 h-4 w-4" /> Study Plan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
