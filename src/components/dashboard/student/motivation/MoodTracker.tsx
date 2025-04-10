
import { useState } from "react";
import { Smile, Meh, Frown, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { MoodType } from "./types";

type MoodTrackerProps = {
  onMoodSubmit: (mood: MoodType, note: string) => void;
};

export function MoodTracker({ onMoodSubmit }: MoodTrackerProps) {
  const { toast } = useToast();
  const [currentMood, setCurrentMood] = useState<MoodType | null>(null);
  const [moodNote, setMoodNote] = useState("");
  
  const getMoodIcon = (mood: MoodType) => {
    switch (mood) {
      case "Happy":
        return <Smile className="text-green-500" />;
      case "Okay":
        return <Meh className="text-blue-500" />;
      case "Tired":
        return <Meh className="text-orange-500" />;
      case "Overwhelmed":
        return <Frown className="text-red-500" />;
      case "Focused":
        return <Star className="text-purple-500" />;
      default:
        return <Meh />;
    }
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
    
    onMoodSubmit(currentMood, moodNote);
    setCurrentMood(null);
    setMoodNote("");
    
    toast({
      title: "Mood logged",
      description: "Your mood has been recorded for today.",
    });
  };
  
  return (
    <div>
      <h3 className="font-medium mb-3">How are you feeling today?</h3>
      <div className="border rounded-lg p-4 space-y-4">
        <div className="grid grid-cols-5 gap-2">
          {["Happy", "Okay", "Tired", "Overwhelmed", "Focused"].map((mood) => (
            <Button
              key={mood}
              variant={currentMood === mood ? "default" : "outline"}
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
  );
}
