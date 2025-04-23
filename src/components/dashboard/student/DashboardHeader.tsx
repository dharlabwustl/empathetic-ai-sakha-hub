
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarCheck2, BookOpen, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { UserProfileType, MoodType } from "@/types/user/base";
import MoodLogButton from "./MoodLogButton";

interface DashboardHeaderProps {
  userProfile: UserProfileType;
  formattedTime: string;
  formattedDate: string;
  onViewStudyPlan?: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  userProfile,
  formattedTime,
  formattedDate,
  onViewStudyPlan
}) => {
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState<string>("");
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>(userProfile.mood);
  
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 17) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
    
    // Try to get saved mood from local storage
    const savedUserData = localStorage.getItem("userData");
    if (savedUserData) {
      const parsedData = JSON.parse(savedUserData);
      if (parsedData.mood) {
        setCurrentMood(parsedData.mood);
      }
    }
  }, []);
  
  const handleMoodSelect = (mood: MoodType) => {
    setCurrentMood(mood);
  };

  const handleViewProfile = () => {
    navigate("/profile");
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full sm:flex items-start justify-between"
      >
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-primary/20">
            <AvatarImage src={userProfile.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"} alt={userProfile.name} />
            <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div>
            <h2 className="text-2xl font-bold">
              {greeting}, {userProfile.name.split(" ")[0]}!
            </h2>
            <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-muted-foreground">
              <span className="flex items-center">
                <Clock className="h-3.5 w-3.5 mr-1 text-primary/70" />
                {formattedTime}
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center">
                <CalendarCheck2 className="h-3.5 w-3.5 mr-1 text-primary/70" />
                {formattedDate}
              </span>
              
              <div className="ml-2">
                <MoodLogButton currentMood={currentMood} onMoodSelect={handleMoodSelect} />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 sm:mt-0 flex flex-col sm:items-end">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={handleViewProfile} className="flex-shrink-0">
              View Profile
            </Button>
            {onViewStudyPlan && (
              <Button 
                onClick={onViewStudyPlan} 
                className="flex items-center gap-1 bg-gradient-to-r from-indigo-400 to-primary hover:from-indigo-500 hover:to-primary/90"
              >
                <BookOpen className="h-4 w-4 mr-1" />
                Today's Plan
              </Button>
            )}
          </div>
          
          {userProfile.subscription && typeof userProfile.subscription === 'object' && (
            <div className="mt-2 text-xs text-muted-foreground">
              <span className="font-medium">{userProfile.subscription.planName || "Free Plan"}</span>
              {userProfile.subscription.endDate && (
                <> • <span>Expires: {new Date(userProfile.subscription.endDate).toLocaleDateString()}</span></>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default DashboardHeader;
