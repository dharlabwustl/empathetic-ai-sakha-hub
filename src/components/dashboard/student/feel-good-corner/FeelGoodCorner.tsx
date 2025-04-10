
import { useState } from "react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Smile } from "lucide-react";
import { MoodSelector } from "./MoodSelector";
import { FeelGoodTabs } from "./FeelGoodTabs";

export function FeelGoodCorner() {
  const [moodSubmitted, setMoodSubmitted] = useState(false);

  const handleMoodSubmit = () => {
    setMoodSubmitted(true);
  };

  return (
    <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-900/20 dark:to-indigo-900/20">
      <CardHeader className="pb-3 bg-gradient-to-r from-violet-100 to-indigo-100 dark:from-violet-900/30 dark:to-indigo-900/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Smile className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            <CardTitle className="text-lg text-violet-700 dark:text-violet-300">Feel Good Corner</CardTitle>
          </div>
          <span className="text-xs text-muted-foreground">Your Pocket Smile Buddy</span>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        {!moodSubmitted ? (
          <MoodSelector onMoodSubmit={handleMoodSubmit} />
        ) : (
          <FeelGoodTabs defaultTab="joke" />
        )}
      </CardContent>
      
      {!moodSubmitted && (
        <CardFooter className="bg-violet-50/50 dark:bg-violet-900/10 p-3 flex justify-center items-center">
          <span className="text-xs text-muted-foreground">Your mood impacts study effectiveness</span>
        </CardFooter>
      )}
    </Card>
  );
}

export default FeelGoodCorner;
