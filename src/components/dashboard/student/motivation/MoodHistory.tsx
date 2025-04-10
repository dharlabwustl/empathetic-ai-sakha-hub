
import { Smile, Meh, Frown, Star } from "lucide-react";
import { MoodLog, MoodType } from "./types";

type MoodHistoryProps = {
  moodLogs: MoodLog[];
};

export function MoodHistory({ moodLogs }: MoodHistoryProps) {
  if (moodLogs.length === 0) return null;
  
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
  
  return (
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
  );
}
