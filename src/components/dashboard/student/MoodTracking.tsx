
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { MoodType } from "@/types/user/base";
import MoodLogButton from "./MoodLogButton";
import MoodSpecificContent from "./mood-tracking/MoodSpecificContent";
import { 
  getMoodDisplayName, 
  getMoodToastContent,
  applyMoodTheme,
  saveMoodToLocalStorage,
  getMoodEnergyLevel,
  getStudyRecommendations,
  checkNeedsEncouragement
} from "./mood-tracking/moodUtils";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Brain, Video } from "lucide-react";

interface MoodTrackingProps {
  className?: string;
}

const MoodTracking: React.FC<MoodTrackingProps> = ({ className = "" }) => {
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>(undefined);
  const [showEncouragement, setShowEncouragement] = useState(false);
  const [energyLevel, setEnergyLevel] = useState(5);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check localStorage on component mount
  useEffect(() => {
    const savedMood = localStorage.getItem('currentMood') as MoodType | null;
    if (savedMood) {
      setCurrentMood(savedMood);
      setEnergyLevel(getMoodEnergyLevel(savedMood));
      applyMoodTheme(savedMood);
    }
    
    // Check if user needs encouragement (3+ days of low mood)
    if (checkNeedsEncouragement()) {
      setShowEncouragement(true);
    }
    
    // Check if it's been more than 24 hours since last mood update
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (userData.lastMoodUpdate) {
      const lastUpdate = new Date(userData.lastMoodUpdate);
      const now = new Date();
      const hoursSinceUpdate = (now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60);
      
      if (hoursSinceUpdate > 24) {
        // Prompt for new mood after 24 hours
        toast({
          title: "How are you feeling today?",
          description: "Your mood affects your learning. Update it to get personalized recommendations.",
        });
      }
    }
  }, [toast]);

  const handleMoodChange = (mood: MoodType) => {
    setCurrentMood(mood);
    const newEnergyLevel = getMoodEnergyLevel(mood);
    setEnergyLevel(newEnergyLevel);
    saveMoodToLocalStorage(mood);
    applyMoodTheme(mood);
    
    // Show toast notification with personalized content
    toast({
      title: `Mood updated`,
      description: getMoodToastContent(mood),
    });
    
    // Smart notification based on mood
    const smartNotifications = {
      stressed: "Take a quick revision, no pressure. Small steps still move you forward.",
      happy: "You're on fire today! Want to try a mock test?",
      motivated: "Great energy! Perfect time to tackle that challenging chapter.",
      tired: "How about some flashcards? They're perfect for low-energy days.",
      sad: "It's okay to take it easier today. Focus on small wins."
    };
    
    if (smartNotifications[mood]) {
      setTimeout(() => {
        toast({
          title: "Smart Suggestion",
          description: smartNotifications[mood],
        });
      }, 3000);
    }
  };

  const handleViewFullReport = () => {
    navigate("/dashboard/student/mood");
  };
  
  const handleCloseEncouragement = () => {
    setShowEncouragement(false);
    
    // Reset consecutive low mood days counter
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    userData.consecutiveLowMoodDays = 0;
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  // Get recommended study session details based on energy level
  const studyRecommendations = getStudyRecommendations(energyLevel);

  return (
    <>
      <Card className={`overflow-hidden ${className} ${currentMood === 'stressed' || currentMood === 'sad' || currentMood === 'tired' || currentMood === 'overwhelmed' ? 'border-blue-200 bg-blue-50/50 dark:bg-slate-800/50 dark:border-blue-900' : ''}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">How are you feeling today?</h3>
            <MoodLogButton 
              currentMood={currentMood}
              onMoodChange={handleMoodChange}
            />
          </div>

          {currentMood && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <MoodSpecificContent currentMood={currentMood} />
              
              {/* Energy-Based Session Suggestions */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mt-4 p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50"
              >
                <h4 className="text-sm font-medium mb-1 flex items-center">
                  <Brain className="h-4 w-4 mr-1 text-purple-500" />
                  <span>Energy-Based Study Recommendation</span>
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Based on your current mood, we suggest:
                </p>
                <ul className="mt-2 space-y-1 text-sm">
                  <li className="flex items-baseline">
                    <span className="font-medium w-28">Session length:</span>
                    <span className="text-gray-600 dark:text-gray-400">{studyRecommendations.sessionLength}</span>
                  </li>
                  <li className="flex items-baseline">
                    <span className="font-medium w-28">Focus on:</span>
                    <span className="text-gray-600 dark:text-gray-400">{studyRecommendations.sessionType}</span>
                  </li>
                  <li className="flex items-baseline">
                    <span className="font-medium w-28">Take breaks:</span>
                    <span className="text-gray-600 dark:text-gray-400">{studyRecommendations.breakFrequency}</span>
                  </li>
                </ul>
              </motion.div>
              
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleViewFullReport}
                  className="text-xs"
                >
                  View Full Mood Report
                </Button>
                
                <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                    {getMoodDisplayName(currentMood)}
                  </Badge>
                  <span>Updated just now</span>
                </div>
              </div>
            </motion.div>
          )}
          
          {!currentMood && (
            <div className="text-muted-foreground text-sm">
              Click the button above to log how you're feeling today
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Personalized Encouragement Dialog */}
      <AlertDialog open={showEncouragement} onOpenChange={setShowEncouragement}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center">
              <Video className="h-5 w-5 mr-2 text-blue-500" />
              A message just for you
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-4">
              <p>
                We've noticed you've been feeling low for a few days. Remember that progress isn't always linear,
                and it's okay to have tough days. Many successful students faced similar challenges.
              </p>
              <div className="mt-4 aspect-video w-full bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
                <iframe 
                  className="w-full h-full rounded-md" 
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                  title="Motivational video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <p className="italic text-sm mt-2">
                "Small steps still count as progress. What matters is that you're here."
                <br />— <span className="font-medium">Aman Dhattarwal, JEE AIR-1 2018</span>
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleCloseEncouragement}>
              Thank you, I feel better now
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default MoodTracking;
