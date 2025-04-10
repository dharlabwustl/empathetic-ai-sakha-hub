
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { MoodType, MoodLog } from "./motivation/types";
import { MotivationalQuote } from "./motivation/MotivationalQuote";
import { HabitTracker } from "./motivation/HabitTracker";
import { MoodTracker } from "./motivation/MoodTracker";
import { MoodHistory } from "./motivation/MoodHistory";

export default function MotivationCard() {
  const [moodLogs, setMoodLogs] = useState<MoodLog[]>([
    { date: "2025-05-12", mood: "Focused" },
    { date: "2025-05-11", mood: "Happy" },
    { date: "2025-05-10", mood: "Tired" },
  ]);
  
  const handleMoodSubmit = (mood: MoodType, note: string) => {
    const today = new Date().toISOString().split('T')[0];
    
    // Check if we already logged mood for today
    const existingIndex = moodLogs.findIndex(log => log.date === today);
    
    if (existingIndex !== -1) {
      // Update existing mood for today
      const updatedLogs = [...moodLogs];
      updatedLogs[existingIndex] = { date: today, mood: mood, note: note };
      setMoodLogs(updatedLogs);
    } else {
      // Add new mood log
      setMoodLogs([
        { date: today, mood: mood, note: note },
        ...moodLogs
      ]);
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Motivation Coach</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-auto space-y-6">
        {/* Daily Motivation */}
        <MotivationalQuote />
        
        {/* Habit Tracker */}
        <HabitTracker />
        
        {/* Mood Tracker */}
        <MoodTracker onMoodSubmit={handleMoodSubmit} />
        
        {/* Recent Mood Logs */}
        <MoodHistory moodLogs={moodLogs} />
      </CardContent>
    </Card>
  );
}
