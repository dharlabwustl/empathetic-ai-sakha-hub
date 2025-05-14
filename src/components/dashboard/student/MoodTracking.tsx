
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Calendar, LineChart, ArrowRight } from "lucide-react";
import MoodSelector from '@/components/dashboard/MoodSelector';
import { MoodType } from '@/types/user/base';
import { useToast } from '@/hooks/use-toast';

interface MoodTrackingProps {
  defaultMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

const MoodTracking: React.FC<MoodTrackingProps> = ({ 
  defaultMood = MoodType.NEUTRAL,
  onMoodChange
}) => {
  const [selectedMood, setSelectedMood] = useState<MoodType>(defaultMood);
  const [userMoods, setUserMoods] = useState<{date: string, mood: MoodType}[]>([]);
  const { toast } = useToast();
  
  useEffect(() => {
    // For demo purposes, generate some mock mood data
    const mockMoods = [
      { date: '2023-09-01', mood: MoodType.HAPPY },
      { date: '2023-09-02', mood: MoodType.MOTIVATED },
      { date: '2023-09-03', mood: MoodType.FOCUSED },
      { date: '2023-09-04', mood: MoodType.NEUTRAL },
      { date: '2023-09-05', mood: MoodType.TIRED },
      { date: '2023-09-06', mood: MoodType.ANXIOUS },
      { date: '2023-09-07', mood: MoodType.STRESSED },
      { date: '2023-09-08', mood: MoodType.SAD },
      // Add more mock data as needed
    ];
    
    setUserMoods(mockMoods);
  }, []);
  
  const handleMoodSelection = (mood: MoodType) => {
    setSelectedMood(mood);
    
    // Update mood history
    const today = new Date().toISOString().split('T')[0];
    const existingEntryIndex = userMoods.findIndex(m => m.date === today);
    
    if (existingEntryIndex !== -1) {
      const updatedMoods = [...userMoods];
      updatedMoods[existingEntryIndex].mood = mood;
      setUserMoods(updatedMoods);
    } else {
      setUserMoods([...userMoods, { date: today, mood }]);
    }
    
    if (onMoodChange) {
      onMoodChange(mood);
    }
    
    // Show confirmation toast
    const moodLabels: Record<MoodType, string> = {
      [MoodType.HAPPY]: "happy",
      [MoodType.MOTIVATED]: "motivated",
      [MoodType.FOCUSED]: "focused",
      [MoodType.NEUTRAL]: "neutral",
      [MoodType.TIRED]: "tired",
      [MoodType.ANXIOUS]: "anxious",
      [MoodType.STRESSED]: "stressed",
      [MoodType.SAD]: "sad",
    };
    
    toast({
      title: "Mood Updated",
      description: `Your mood has been set to ${moodLabels[mood] || String(mood)}.`
    });
  };
  
  // Function to get emoji for mood
  const getMoodEmoji = (mood: MoodType): string => {
    switch (mood) {
      case MoodType.HAPPY:
        return "😃";
      case MoodType.MOTIVATED:
        return "💪";
      case MoodType.FOCUSED:
        return "🧠";
      case MoodType.NEUTRAL:
        return "😐";
      case MoodType.TIRED:
        return "😴";
      case MoodType.ANXIOUS:
        return "😰";
      case MoodType.STRESSED:
        return "😣";
      case MoodType.SAD:
        return "😢";
      default:
        return "😐";
    }
  };
  
  return (
    <Card className="border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Heart className="h-5 w-5 text-rose-500" />
          Mood Tracking
        </CardTitle>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Calendar className="h-5 w-5" />
          <span className="sr-only">View Calendar</span>
        </Button>
      </CardHeader>
      <CardContent className="pt-2">
        <Tabs defaultValue="daily" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="daily">How are you today?</TabsTrigger>
            <TabsTrigger value="history">Mood History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="daily">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Select your current mood to help personalize your learning experience.
              </p>
              
              <div className="py-2">
                <MoodSelector onSelectMood={handleMoodSelection} selectedMood={selectedMood} />
              </div>
              
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">
                  Your current mood: <span className="text-lg ml-1">{getMoodEmoji(selectedMood)}</span>
                </p>
                <Button size="sm" className="h-8">
                  Save <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Your recent mood patterns</p>
              <Button variant="outline" size="sm" className="h-7">
                <LineChart className="h-3.5 w-3.5 mr-1" />
                Analysis
              </Button>
            </div>
            
            <div className="space-y-2">
              {userMoods.slice(-5).reverse().map((entry, index) => (
                <div key={index} className="flex items-center justify-between px-3 py-2 bg-muted/50 rounded-md">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{getMoodEmoji(entry.mood)}</span>
                    <span className="text-sm font-medium">{entry.mood}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{entry.date}</span>
                </div>
              ))}
            </div>
            
            <div className="pt-2">
              <Button variant="outline" className="w-full">
                View Full Mood Journal
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MoodTracking;
