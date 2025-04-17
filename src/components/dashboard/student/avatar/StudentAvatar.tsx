
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MoodType } from "@/types/user/base";
import { UserProfileType } from "@/types/user";
import { motion } from "framer-motion";

interface StudentAvatarProps {
  userProfile: UserProfileType;
  currentMood?: MoodType;
  size?: "sm" | "md" | "lg";
}

export const StudentAvatar: React.FC<StudentAvatarProps> = ({
  userProfile,
  currentMood = "neutral",
  size = "md"
}) => {
  const getAvatarSize = () => {
    switch (size) {
      case "sm": return "h-10 w-10";
      case "lg": return "h-20 w-20";
      default: return "h-16 w-16";
    }
  };

  const getAvatarImage = () => {
    // Default to neutral male/female avatars if no mood
    const gender = userProfile.gender || "male";
    
    if (!currentMood) {
      return `/avatars/${gender}-neutral.png`;
    }
    
    return `/avatars/${gender}-${currentMood}.png`;
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative"
    >
      <Avatar className={`${getAvatarSize()} ring-2 ring-white/20 shadow-lg`}>
        <AvatarImage src={getAvatarImage()} alt={`${userProfile.name}'s avatar`} />
        <AvatarFallback>
          {userProfile.name?.substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      
      {currentMood && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-lg"
        >
          <span className="text-lg" role="img" aria-label={currentMood}>
            {getMoodEmoji(currentMood)}
          </span>
        </motion.div>
      )}
    </motion.div>
  );
};

const getMoodEmoji = (mood: MoodType): string => {
  switch (mood) {
    case "happy": return "😊";
    case "motivated": return "💪";
    case "focused": return "🎯";
    case "curious": return "🤔";
    case "neutral": return "😐";
    case "tired": return "😴";
    case "stressed": return "😰";
    case "sad": return "😔";
    case "overwhelmed": return "😩";
    case "okay": return "🙂";
    default: return "😐";
  }
};
