
import React, { useEffect, useState } from "react";
import { UserProfileType, StudyStreak } from "@/types/user/base";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Clock,
  Fire,
  CalendarCheck
} from "lucide-react";
import { getWelcomeMessage } from "./utils/WelcomeMessageGenerator";
import MoodLogButton from "./mood-tracking/MoodLogButton";

interface DashboardHeaderProps {
  userProfile: UserProfileType;
  formattedTime: string;
  formattedDate: string;
  onViewStudyPlan: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  userProfile,
  formattedTime,
  formattedDate,
  onViewStudyPlan
}) => {
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [quote, setQuote] = useState({
    text: "Education is the passport to the future, for tomorrow belongs to those who prepare for it today.",
    author: "Malcolm X"
  });
  
  useEffect(() => {
    setWelcomeMessage(getWelcomeMessage(userProfile.name || "Student"));
  }, [userProfile.name]);

  // Handle mood selection
  const handleMoodSelect = (mood: 'happy' | 'sad' | 'neutral' | 'motivated' | 'tired' | 'stressed' | 'focused' | 'curious' | 'overwhelmed' | 'okay' | undefined) => {
    if (mood) {
      // Save mood to local storage
      const userData = localStorage.getItem("userData");
      if (userData) {
        const parsedData = JSON.parse(userData);
        parsedData.mood = mood;
        localStorage.setItem("userData", JSON.stringify(parsedData));
      } else {
        localStorage.setItem("userData", JSON.stringify({ mood }));
      }
    }
  };
  
  // Create study streak if it doesn't exist
  const studyStreak: StudyStreak = userProfile.studyStreak || {
    current: 0,
    best: 0,
    lastStudyDate: new Date().toISOString(),
    thisWeek: 0,
    thisMonth: 0
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center mb-1.5">
            <h1 className="text-3xl font-bold mr-3">
              {welcomeMessage}
            </h1>
            <MoodLogButton 
              onMoodSelect={handleMoodSelect} 
              className="text-xs h-8 px-2 py-1"
            />
          </div>
          
          <div className="flex items-center text-muted-foreground text-sm">
            <Clock className="mr-1 h-4 w-4" />
            <span>{formattedTime}</span>
            <span className="mx-2">•</span>
            <Calendar className="mr-1 h-4 w-4" />
            <span>{formattedDate}</span>
            
            {studyStreak && studyStreak.current > 0 && (
              <>
                <span className="mx-2">•</span>
                <Badge variant="outline" className="flex items-center bg-orange-50 text-orange-700 border-orange-200">
                  <Fire className="mr-1 h-3.5 w-3.5 text-orange-500" />
                  <span>{studyStreak.current} day streak</span>
                </Badge>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {userProfile.goals && userProfile.goals[0] && userProfile.goals[0].examDate && (
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100"
              onClick={onViewStudyPlan}
            >
              <CalendarCheck className="mr-2 h-4 w-4" />
              {userProfile.goals[0].title || "Exam"}: {userProfile.goals[0].examDate}
            </Button>
          )}
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 p-4 rounded-lg border border-indigo-100 dark:border-indigo-800/20 mb-6">
        <p className="text-sm italic text-indigo-700 dark:text-indigo-300">{quote.text}</p>
        <p className="text-xs text-indigo-600/70 dark:text-indigo-400/70 mt-1">— {quote.author}</p>
      </div>
    </div>
  );
};

export default DashboardHeader;
