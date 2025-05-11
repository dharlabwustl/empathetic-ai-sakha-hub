
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import MoodSelector from "./MoodSelector";
import { MoodType } from '@/types/user/base';
import { useToast } from '@/hooks/use-toast';
import { BarChart, LineChart } from '@/components/ui/chart';
import { LineUp } from "lucide-react";

interface MoodTrackingProps {
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

const MoodTracking: React.FC<MoodTrackingProps> = ({ currentMood, onMoodChange }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedMood, setSelectedMood] = useState<MoodType | undefined>(currentMood);
  const { toast } = useToast();

  // Mock mood history data for the charts
  const moodHistory = [
    { date: "May 5", mood: MoodType.HAPPY, level: 8 },
    { date: "May 6", mood: MoodType.MOTIVATED, level: 9 },
    { date: "May 7", mood: MoodType.FOCUSED, level: 7 },
    { date: "May 8", mood: MoodType.NEUTRAL, level: 5 },
    { date: "May 9", mood: MoodType.TIRED, level: 4 },
    { date: "May 10", mood: MoodType.ANXIOUS, level: 3 },
    { date: "May 11", mood: MoodType.STRESSED, level: 2 },
    { date: "May 12", mood: MoodType.SAD, level: 1 },
    { date: "May 13", mood: currentMood || MoodType.MOTIVATED, level: 8 }
  ];

  useEffect(() => {
    // Update the selected mood when props change
    setSelectedMood(currentMood);
  }, [currentMood]);

  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
  };

  const handleSaveMood = () => {
    if (selectedMood && onMoodChange) {
      onMoodChange(selectedMood);
      setDialogOpen(false);
      toast({
        title: "Mood saved",
        description: `Your mood has been updated to ${getMoodLabel(selectedMood)}.`
      });
    }
  };

  const getMoodLabel = (mood: MoodType): string => {
    switch (mood) {
      case MoodType.HAPPY:
        return "Happy";
      case MoodType.MOTIVATED:
        return "Motivated";
      case MoodType.FOCUSED:
        return "Focused";
      case MoodType.NEUTRAL:
        return "Neutral";
      case MoodType.TIRED:
        return "Tired";
      case MoodType.ANXIOUS:
        return "Anxious";
      case MoodType.STRESSED:
        return "Stressed";
      case MoodType.SAD:
        return "Sad";
      default:
        return "Unknown";
    }
  };

  // Line chart data
  const lineData = {
    labels: moodHistory.map(entry => entry.date),
    datasets: [
      {
        label: 'Mood Level',
        data: moodHistory.map(entry => entry.level),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.3
      }
    ]
  };

  // Bar chart data for mood distribution
  const barData = {
    labels: ['Happy', 'Motivated', 'Focused', 'Neutral', 'Tired', 'Anxious', 'Stressed', 'Sad'],
    datasets: [
      {
        label: 'Times Logged',
        data: [3, 4, 2, 1, 2, 1, 1, 1],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(201, 203, 207, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 205, 86, 0.6)',
          'rgba(65, 65, 65, 0.6)'
        ]
      }
    ]
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LineUp className="h-5 w-5" />
          Mood Tracking
        </CardTitle>
        <CardDescription>Track your mood to see patterns in your study performance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 rounded-full">
              {currentMood && getMoodEmoji(currentMood)}
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Current Mood</div>
              <div className="font-medium">{currentMood ? getMoodLabel(currentMood) : "Not set"}</div>
            </div>
          </div>
          
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">Log Mood</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>How are you feeling today?</DialogTitle>
                <DialogDescription>
                  Select your current mood. This helps us personalize your study experience.
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-4">
                <MoodSelector 
                  onMoodSelect={handleMoodSelect} 
                  selectedMood={selectedMood} 
                />
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveMood}>
                  Save Mood
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <Tabs defaultValue="trends">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="trends">Mood Trends</TabsTrigger>
            <TabsTrigger value="distribution">Distribution</TabsTrigger>
          </TabsList>
          <TabsContent value="trends" className="h-52 md:h-64">
            <LineChart data={lineData} />
          </TabsContent>
          <TabsContent value="distribution" className="h-52 md:h-64">
            <BarChart data={barData} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

// Helper function to get mood emoji
const getMoodEmoji = (mood: MoodType): string => {
  switch (mood) {
    case MoodType.HAPPY:
      return "😊";
    case MoodType.MOTIVATED:
      return "💪";
    case MoodType.FOCUSED:
      return "🧠";
    case MoodType.CALM:
      return "😌";
    case MoodType.TIRED:
      return "😴";
    case MoodType.ANXIOUS:
      return "😟";
    case MoodType.STRESSED:
      return "😰";
    case MoodType.SAD:
      return "😢";
    case MoodType.NEUTRAL:
      return "😐";
    case MoodType.OVERWHELMED:
      return "🥴";
    default:
      return "❓";
  }
};

export default MoodTracking;
