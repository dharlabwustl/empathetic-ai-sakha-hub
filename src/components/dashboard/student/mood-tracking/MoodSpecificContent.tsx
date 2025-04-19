
import React from "react";
import { MoodType } from "@/types/user/base";
import { AnimatePresence, motion } from "framer-motion";

interface MoodSpecificContentProps {
  currentMood?: MoodType;
}

// Component for mood-specific content
const MoodSpecificContent: React.FC<MoodSpecificContentProps> = ({ currentMood }) => {
  if (!currentMood) return null;
  
  // Map of mood-specific messages and recommendations
  const moodMessages: Record<string, { title: string; message: string; recommendations: string[] }> = {
    motivated: { 
      title: "You're feeling motivated!", 
      message: "Great time to tackle challenging problems or study difficult concepts.",
      recommendations: [
        "Try attempting harder practice problems",
        "Focus on advanced topics in your study plan",
        "Set ambitious goals for today's study session"
      ]
    },
    neutral: { 
      title: "You're feeling neutral", 
      message: "Good time to review learned material or organize your notes.",
      recommendations: [
        "Review previously learned concepts",
        "Organize your study materials",
        "Create summary notes of what you've learned"
      ]
    },
    happy: { 
      title: "You're feeling happy!", 
      message: "Your positive energy can help with creative thinking and problem solving.",
      recommendations: [
        "Work on creative problem-solving activities",
        "Try a collaborative study session",
        "Set up your weekly study schedule"
      ]
    },
    sad: { 
      title: "You're feeling sad", 
      message: "Consider a brief mood-boosting activity before returning to your studies.",
      recommendations: [
        "Try a quick 5-minute mindfulness exercise",
        "Focus on easier review topics today",
        "Set smaller, achievable goals for this session"
      ]
    }
  };

  const moodInfo = moodMessages[currentMood] || {
    title: "Thanks for sharing how you feel",
    message: "We'll tailor your experience accordingly.",
    recommendations: ["Continue with your regular study plan"]
  };
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentMood}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="mt-2 mb-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
      >
        <h3 className="font-medium text-lg mb-2">{moodInfo.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-3">{moodInfo.message}</p>
        
        <div className="mt-2">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Recommendations for today:</h4>
          <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400">
            {moodInfo.recommendations.map((rec, index) => (
              <li key={index} className="text-sm mb-1">{rec}</li>
            ))}
          </ul>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MoodSpecificContent;
