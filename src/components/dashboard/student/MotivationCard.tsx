
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { MoodType } from "@/types/user/base";

const MotivationCard: React.FC<{ currentMood?: MoodType | string | null }> = ({ currentMood }) => {
  let motivationTitle = "Ready to learn?";
  let motivationText =
    "Set clear goals, stay focused, and make progress step by step.";
  let ctaText = "Start Learning";

  // If we have a mood, provide tailored motivation
  if (currentMood) {
    // Convert string mood to MoodType enum if needed
    const mood = typeof currentMood === 'string' 
      ? currentMood.toUpperCase() as keyof typeof MoodType
      : currentMood;

    if (mood === MoodType.HAPPY) {
      motivationTitle = "Awesome mood for learning!";
      motivationText =
        "Your positive energy makes this the perfect time to tackle challenging concepts.";
      ctaText = "Maximize Your Momentum";
    } else if (mood === MoodType.MOTIVATED) {
      motivationTitle = "You're on fire today!";
      motivationText =
        "Channel that motivation into deep work sessions for maximum progress.";
      ctaText = "Keep The Momentum";
    } else if (mood === MoodType.FOCUSED) {
      motivationTitle = "Deep work mode activated!";
      motivationText =
        "Your concentration is primed for tackling difficult subjects.";
      ctaText = "Enter The Flow State";
    } else if (mood === MoodType.NEUTRAL || mood === MoodType.OKAY) {
      motivationTitle = "Ready for progress?";
      motivationText =
        "Even with neutral energy, consistent effort yields great results.";
      ctaText = "Build Momentum";
    } else if (mood === MoodType.TIRED) {
      motivationTitle = "Feeling low energy?";
      motivationText =
        "Try shorter study sessions with frequent breaks to maintain focus.";
      ctaText = "Easy Study Mode";
    } else if (mood === MoodType.ANXIOUS) {
      motivationTitle = "Feeling anxious?";
      motivationText =
        "Break your work into smaller chunks and celebrate small wins.";
      ctaText = "Step by Step";
    } else if (mood === MoodType.STRESSED) {
      motivationTitle = "Managing stress?";
      motivationText =
        "Focus on one task at a time. Remember to breathe and take breaks.";
      ctaText = "Gentle Progress";
    } else if (mood === MoodType.SAD) {
      motivationTitle = "Need a mood boost?";
      motivationText =
        "Learning something new can help lift your spirits. Start with something enjoyable.";
      ctaText = "Lift Your Spirit";
    }
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div>
          <h3 className="text-lg font-medium">{motivationTitle}</h3>
          <p className="text-sm text-muted-foreground mt-1">{motivationText}</p>
          <Button variant="ghost" className="mt-3 p-0 h-auto text-sm" size="sm">
            {ctaText} <ArrowRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MotivationCard;
