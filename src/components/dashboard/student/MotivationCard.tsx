
import { useState } from "react";
import { Calendar, Smile, Frown, Meh, Activity, Star, Trophy } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { MoodType } from "@/types/user";

interface Habit {
  id: string;
  name: string;
  icon: JSX.Element;
  streak: number;
  target: number;
  unit: string;
  progress: number;
}

interface MoodLog {
  date: string;
  mood: MoodType;
  note?: string;
}

export default function MotivationCard() {
  const { toast } = useToast();
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: "habit-1",
      name: "Study Focus Time",
      icon: <Activity size={16} />,
      streak: 5,
      target: 120,
      unit: "minutes",
      progress: 75,
    },
    {
      id: "habit-2",
      name: "Sleep Schedule",
      icon: <Calendar size={16} />,
      streak: 7,
      target: 8,
      unit: "hours",
      progress: 90,
    },
  ]);
  
  const [moodLogs, setMoodLogs] = useState<MoodLog[]>([
    { date: "2025-05-12", mood: "focused" },
    { date: "2025-05-11", mood: "happy" },
    { date: "2025-05-10", mood: "tired" },
  ]);
  
  const [currentMood, setCurrentMood] = useState<MoodType | null>(null);
  const [moodNote, setMoodNote] = useState("");
  
  const handleHabitProgress = (habitId: string, increment: boolean) => {
    setHabits(prev => prev.map(habit => {
      if (habit.id === habitId) {
        const newProgress = Math.min(
          100, 
          Math.max(0, habit.progress + (increment ? 5 : -5))
        );
        return { ...habit, progress: newProgress };
      }
      return habit;
    }));
    
    toast({
      title: "Habit progress updated",
      description: `Your habit progress has been ${increment ? "increased" : "decreased"}.`,
    });
  };
  
  const handleMoodSubmit = () => {
    if (!currentMood) {
      toast({
        title: "Please select a mood",
        description: "Select how you're feeling today",
        variant: "destructive",
      });
      return;
    }
    
    const today = new Date().toISOString().split('T')[0];
    
    // Check if we already logged mood for today
    const existingIndex = moodLogs.findIndex(log => log.date === today);
    
    if (existingIndex !== -1) {
      // Update existing mood for today
      const updatedLogs = [...moodLogs];
      updatedLogs[existingIndex] = { date: today, mood: currentMood, note: moodNote };
      setMoodLogs(updatedLogs);
    } else {
      // Add new mood log
      setMoodLogs([
        { date: today, mood: currentMood, note: moodNote },
        ...moodLogs
      ]);
    }
    
    setCurrentMood(null);
    setMoodNote("");
    
    toast({
      title: "Mood logged",
      description: "Your mood has been recorded for today.",
    });
  };
  
  const getMoodIcon = (mood: MoodType) => {
    switch (mood) {
      case "happy":
        return <Smile className="text-green-500" />;
      case "okay":
        return <Meh className="text-blue-500" />;
      case "tired":
        return <Meh className="text-orange-500" />;
      case "overwhelmed":
        return <Frown className="text-red-500" />;
      case "focused":
        return <Star className="text-purple-500" />;
      default:
        return <Meh />;
    }
  };
  
  const getMotivationalQuote = () => {
    const quotes = [
      "The secret of getting ahead is getting started. – Mark Twain",
      "It always seems impossible until it's done. – Nelson Mandela",
      "The best way to predict your future is to create it. – Abraham Lincoln",
      "Don't watch the clock; do what it does. Keep going. – Sam Levenson",
      "Believe you can and you're halfway there. – Theodore Roosevelt"
    ];
    
    return quotes[Math.floor(Math.random() * quotes.length)];
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Motivation Coach</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-auto space-y-6">
        {/* Daily Motivation */}
        <div className="bg-gradient-to-r from-sakha-blue/10 to-sakha-purple/10 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Trophy size={16} className="text-sakha-blue" />
            <h3 className="font-medium">Today's Motivation</h3>
          </div>
          <p className="italic text-sm">"{getMotivationalQuote()}"</p>
        </div>
        
        {/* Habit Tracker */}
        <div>
          <h3 className="font-medium mb-3">Habit Tracker</h3>
          <div className="space-y-4">
            {habits.map((habit) => (
              <div key={habit.id} className="border rounded-lg p-3 space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/10 p-1.5 rounded">
                      {habit.icon}
                    </div>
                    <span className="text-sm font-medium">{habit.name}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Star size={14} className="text-amber-500" /> 
                    <span>{habit.streak} day streak</span>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Progress</span>
                    <span>Target: {habit.target} {habit.unit}</span>
                  </div>
                  <Progress value={habit.progress} />
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleHabitProgress(habit.id, false)}
                  >
                    -
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleHabitProgress(habit.id, true)}
                  >
                    +
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Mood Tracker */}
        <div>
          <h3 className="font-medium mb-3">How are you feeling today?</h3>
          <div className="border rounded-lg p-4 space-y-4">
            <div className="grid grid-cols-5 gap-2">
              {["happy", "okay", "tired", "overwhelmed", "focused"].map((mood) => (
                <Button
                  key={mood}
                  variant={currentMood === mood as MoodType ? "default" : "outline"}
                  className="flex flex-col items-center py-3 h-auto"
                  onClick={() => setCurrentMood(mood as MoodType)}
                >
                  {getMoodIcon(mood as MoodType)}
                  <span className="text-xs mt-1">{mood}</span>
                </Button>
              ))}
            </div>
            
            {currentMood && (
              <>
                <input
                  type="text"
                  placeholder="Any notes about how you're feeling? (optional)"
                  className="w-full p-2 border rounded"
                  value={moodNote}
                  onChange={(e) => setMoodNote(e.target.value)}
                />
                <Button 
                  onClick={handleMoodSubmit}
                  className="w-full bg-gradient-to-r from-sakha-blue to-sakha-purple text-white"
                >
                  Log Mood
                </Button>
              </>
            )}
          </div>
        </div>
        
        {/* Recent Mood Logs */}
        {moodLogs.length > 0 && (
          <div>
            <h3 className="font-medium mb-2">Recent Mood History</h3>
            <div className="space-y-2">
              {moodLogs.slice(0, 3).map((log, index) => (
                <div key={index} className="flex items-center gap-2 bg-muted/50 p-2 rounded">
                  <div className="p-1">
                    {getMoodIcon(log.mood)}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{log.mood}</div>
                    <div className="text-xs text-muted-foreground">{log.date}</div>
                  </div>
                  {log.note && (
                    <div className="text-xs ml-auto max-w-[150px] truncate">
                      "{log.note}"
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
